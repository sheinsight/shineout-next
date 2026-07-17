'use client';

import { useLatestObj, usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import WatermarkContext, { DisabledWatermarkContext, WatermarkContextValue } from './context';
import { WatermarkFont, WatermarkProps } from './watermark.type';
import { drawWatermark, getContentLines, getMarkSize, getStyleString, mergeFont } from './utils';

const DefaultFont: Required<WatermarkFont> = {
  color: 'rgba(0, 0, 0, 0.15)',
  fontSize: 16,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontFamily: 'sans-serif',
  textAlign: 'center',
};
const DefaultGap: [number, number] = [100, 100];
const DefaultRotate = -22;
const DefaultZIndex = 999;

interface WatermarkTile {
  dataURL: string;
  width: number;
  height: number;
}

interface LatestWatermarkProps {
  content: WatermarkProps['content'];
  font: WatermarkProps['font'];
  gap: WatermarkProps['gap'];
  height: WatermarkProps['height'];
  image: WatermarkProps['image'];
  offset: WatermarkProps['offset'];
  onRemove: WatermarkProps['onRemove'];
  rotate: number;
  width: WatermarkProps['width'];
  zIndex: number;
}

interface PendingFrame {
  id: number;
  token: number;
  type: 'animation-frame' | 'timeout';
}

type DrawingSignature = unknown[];
type OverlayStyle = Omit<React.CSSProperties, 'visibility'> & {
  visibility?: React.CSSProperties['visibility'] | 'visible !important';
};

interface RootAttributeBaseline {
  className: string | null;
  style: string | null;
}

const ObserverOptions: MutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
  attributeFilter: ['style', 'class', 'hidden', 'aria-hidden'],
};

function normalizeDpr(): number {
  const ratio = window.devicePixelRatio;
  return Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
}

function createDrawingSignature(props: LatestWatermarkProps, ratio: number): DrawingSignature {
  const gap = props.gap || DefaultGap;
  const font = mergeFont(DefaultFont, props.font);
  const content = getContentLines(props.content, font);
  const signature: DrawingSignature = [
    props.image,
    props.rotate,
    props.width,
    props.height,
    gap[0],
    gap[1],
    ratio,
    content.length,
  ];

  content.forEach((line) => {
    signature.push(
      line.text,
      line.font.color,
      line.font.fontSize,
      line.font.fontWeight,
      line.font.fontStyle,
      line.font.fontFamily,
      line.font.textAlign,
    );
  });

  return signature;
}

function createStyleSignature(props: LatestWatermarkProps): DrawingSignature {
  const gap = props.gap || DefaultGap;
  const offset = props.offset || [gap[0] / 2, gap[1] / 2];
  return [gap[0], gap[1], offset[0], offset[1], props.zIndex];
}

function signaturesEqual(first: DrawingSignature | null, second: DrawingSignature): boolean {
  if (!first || first.length !== second.length) return false;
  return first.every(
    (value, index) =>
      value === second[index] || (Number.isNaN(value) && Number.isNaN(second[index])),
  );
}

function restoreAttribute(element: HTMLElement, name: string, value: string | null) {
  if (value === null) {
    if (element.hasAttribute(name)) element.removeAttribute(name);
    return;
  }
  if (element.getAttribute(name) !== value) element.setAttribute(name, value);
}

function createOverlayStyle(props: LatestWatermarkProps, tile: WatermarkTile): OverlayStyle | null {
  const gap = props.gap || DefaultGap;
  const offset = props.offset || [gap[0] / 2, gap[1] / 2];
  const horizontalOffset = offset[0] - gap[0] / 2;
  const verticalOffset = offset[1] - gap[1] / 2;

  if (
    ![
      gap[0],
      gap[1],
      offset[0],
      offset[1],
      horizontalOffset,
      verticalOffset,
      tile.width,
      tile.height,
    ].every(Number.isFinite)
  ) {
    return null;
  }

  return {
    position: 'absolute',
    left: `${Math.max(horizontalOffset, 0)}px`,
    top: `${Math.max(verticalOffset, 0)}px`,
    width: horizontalOffset > 0 ? `calc(100% - ${horizontalOffset}px)` : '100%',
    height: verticalOffset > 0 ? `calc(100% - ${verticalOffset}px)` : '100%',
    zIndex: props.zIndex,
    pointerEvents: 'none',
    backgroundImage: `url("${tile.dataURL}")`,
    backgroundRepeat: 'repeat',
    backgroundSize: `${tile.width}px ${tile.height}px`,
    backgroundPosition: `${Math.min(horizontalOffset, 0)}px ${Math.min(verticalOffset, 0)}px`,
    visibility: 'visible !important',
  };
}

const Watermark = (props: WatermarkProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rootAttributeBaselineRef = useRef<RootAttributeBaseline | null>(null);
  const targetsRef = useRef(new Set<HTMLElement>());
  const targetRegistrationCountsRef = useRef(new Map<HTMLElement, number>());
  const overlaysRef = useRef(new Map<HTMLElement, HTMLElement>());
  const latestTileRef = useRef<WatermarkTile | null>(null);
  const latestStyleRef = useRef<OverlayStyle | null>(null);
  const requestedDrawingSignatureRef = useRef<DrawingSignature | null>(null);
  const renderedDrawingSignatureRef = useRef<DrawingSignature | null>(null);
  const styleSignatureRef = useRef<DrawingSignature | null>(null);
  const renderTokenRef = useRef(0);
  const imageTokenRef = useRef(0);
  const pendingFrameRef = useRef<PendingFrame | null>(null);
  const pendingImageRef = useRef<HTMLImageElement | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const observerPauseDepthRef = useRef(0);
  const repairMutationsRef = useRef<(mutations: MutationRecord[]) => void>(() => undefined);
  const mountedRef = useRef(false);
  const latestProps = useLatestObj<LatestWatermarkProps>({
    content: props.content,
    font: props.font,
    gap: props.gap,
    height: props.height,
    image: props.image,
    offset: props.offset,
    onRemove: props.onRemove,
    rotate: props.rotate ?? DefaultRotate,
    width: props.width,
    zIndex:
      typeof props.zIndex === 'number' && Number.isFinite(props.zIndex)
        ? props.zIndex
        : DefaultZIndex,
  });

  const withObserverPaused = usePersistFn(
    (callback: () => void, ignoreRootAttributeRecords = false) => {
      const observer = observerRef.current;
      const ownsPause = Boolean(observer && observerPauseDepthRef.current === 0);
      const pendingRecords = ownsPause ? observer?.takeRecords() || [] : [];
      if (ownsPause) observer?.disconnect();
      observerPauseDepthRef.current += 1;

      try {
        const root = rootRef.current;
        const records = ignoreRootAttributeRecords
          ? pendingRecords.filter(
              (record) =>
                !(
                  record.type === 'attributes' &&
                  record.target === root &&
                  (record.attributeName === 'class' || record.attributeName === 'style')
                ),
            )
          : pendingRecords;
        if (records.length) repairMutationsRef.current(records);
        callback();
      } finally {
        observerPauseDepthRef.current -= 1;
        if (ownsPause && mountedRef.current && observerRef.current === observer) {
          targetsRef.current.forEach((target) => observer?.observe(target, ObserverOptions));
        }
      }
    },
  );

  const clearOverlays = usePersistFn(() => {
    withObserverPaused(() => {
      overlaysRef.current.forEach((overlay) => overlay.remove());
    });
  });

  const releasePendingImage = usePersistFn((cancelRequest = false) => {
    const image = pendingImageRef.current;
    if (!image) return;

    pendingImageRef.current = null;
    image.onload = null;
    image.onerror = null;
    if (cancelRequest) {
      try {
        image.src = '';
      } catch (_error) {
        // Ignore a source implementation that rejects cancellation.
      }
    }
  });

  const writeOverlay = usePersistFn((target: HTMLElement, style: OverlayStyle) => {
    let overlay = overlaysRef.current.get(target);
    if (!overlay) {
      overlay = document.createElement('div');
      overlaysRef.current.set(target, overlay);
    }

    overlay.removeAttribute('class');
    overlay.removeAttribute('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('style', getStyleString(style as unknown as React.CSSProperties));
    while (overlay.firstChild) overlay.removeChild(overlay.firstChild);
    if (overlay.parentElement !== target) target.appendChild(overlay);
  });

  const applyLatestStyle = usePersistFn(() => {
    const tile = latestTileRef.current;
    if (!tile) return;

    const style = createOverlayStyle(latestProps, tile);
    latestStyleRef.current = style;
    if (!style) {
      clearOverlays();
      return;
    }

    withObserverPaused(() => {
      targetsRef.current.forEach((target) => writeOverlay(target, style));
    });
  });

  const drawLatest = usePersistFn(() => {
    const ratio = normalizeDpr();
    const drawingSignature = createDrawingSignature(latestProps, ratio);
    const gap = latestProps.gap || DefaultGap;
    const font = mergeFont(DefaultFont, latestProps.font);
    const content = getContentLines(latestProps.content, font);
    const isEmptyContent =
      !latestProps.image &&
      (content.length === 0 || content.every((line) => line.text.length === 0));
    if (
      signaturesEqual(renderedDrawingSignatureRef.current, drawingSignature) &&
      (latestTileRef.current || isEmptyContent)
    ) {
      applyLatestStyle();
      return;
    }

    if (isEmptyContent) {
      latestTileRef.current = null;
      latestStyleRef.current = null;
      clearOverlays();
      renderedDrawingSignatureRef.current = drawingSignature;
      return;
    }

    const imageToken = ++imageTokenRef.current;
    const isCurrentDrawing = () => mountedRef.current && imageToken === imageTokenRef.current;
    const clearFailedDrawing = () => {
      if (!isCurrentDrawing()) return;
      requestedDrawingSignatureRef.current = null;
      latestTileRef.current = null;
      latestStyleRef.current = null;
      clearOverlays();
    };

    try {
      const measureCanvas = document.createElement('canvas');
      const context = measureCanvas.getContext('2d');
      if (!context) {
        clearFailedDrawing();
        return;
      }

      const image = latestProps.image;
      const rotate = latestProps.rotate;
      const [width, height] = getMarkSize(
        context,
        content,
        image,
        latestProps.width,
        latestProps.height,
      );
      const drawContent = (drawnContent: typeof content | HTMLImageElement) => {
        if (!isCurrentDrawing()) return false;
        try {
          const tile = drawWatermark(drawnContent, rotate, ratio, width, height, gap[0], gap[1]);
          if (!tile || !isCurrentDrawing()) return false;

          latestTileRef.current = tile;
          renderedDrawingSignatureRef.current = drawingSignature;
          applyLatestStyle();
          return true;
        } catch (_error) {
          return false;
        }
      };
      const drawFallback = () => {
        if (!isCurrentDrawing()) return;
        const isEmptyFallback =
          content.length === 0 || content.every((line) => line.text.length === 0);
        if (isEmptyFallback || !drawContent(content)) clearFailedDrawing();
      };

      if (!image) {
        if (!drawContent(content)) clearFailedDrawing();
        return;
      }

      if (typeof Image === 'undefined') {
        drawFallback();
        return;
      }

      try {
        const imageElement = new Image();
        pendingImageRef.current = imageElement;
        const releaseImage = () => {
          imageElement.onload = null;
          imageElement.onerror = null;
          if (pendingImageRef.current === imageElement) pendingImageRef.current = null;
        };
        imageElement.onload = () => {
          if (!isCurrentDrawing()) {
            releaseImage();
            return;
          }
          const drawn = drawContent(imageElement);
          releaseImage();
          if (!drawn) drawFallback();
        };
        imageElement.onerror = () => {
          if (!isCurrentDrawing()) {
            releaseImage();
            return;
          }
          releaseImage();
          drawFallback();
        };
        imageElement.crossOrigin = 'anonymous';
        imageElement.referrerPolicy = 'no-referrer';
        imageElement.src = image;
      } catch (_error) {
        releasePendingImage();
        drawFallback();
      }
    } catch (_error) {
      clearFailedDrawing();
    }
  });

  const cancelPendingFrame = usePersistFn(() => {
    const pendingFrame = pendingFrameRef.current;
    renderTokenRef.current += 1;
    pendingFrameRef.current = null;
    if (!pendingFrame) return;

    if (pendingFrame.type === 'animation-frame') {
      if (typeof window.cancelAnimationFrame === 'function') {
        window.cancelAnimationFrame(pendingFrame.id);
      }
      return;
    }
    window.clearTimeout(pendingFrame.id);
  });

  const scheduleRender = usePersistFn(() => {
    if (!mountedRef.current || pendingFrameRef.current) return;

    const token = ++renderTokenRef.current;
    const run = () => {
      pendingFrameRef.current = null;
      if (!mountedRef.current || token !== renderTokenRef.current) return;
      drawLatest();
    };

    if (typeof window.requestAnimationFrame === 'function') {
      const id = window.requestAnimationFrame(run);
      pendingFrameRef.current = { id, token, type: 'animation-frame' };
      return;
    }

    const id = window.setTimeout(run, 16);
    pendingFrameRef.current = { id, token, type: 'timeout' };
  });

  const addTarget = usePersistFn((target: HTMLElement) => {
    const registrations = targetRegistrationCountsRef.current;
    registrations.set(target, (registrations.get(target) || 0) + 1);
    targetsRef.current.add(target);
    const tile = latestTileRef.current;
    const style = latestStyleRef.current;
    if (tile && style) {
      withObserverPaused(() => writeOverlay(target, style));
    } else if (observerRef.current && mountedRef.current) {
      withObserverPaused(() => undefined);
    }
  });

  const removeTarget = usePersistFn((target: HTMLElement) => {
    const registrations = targetRegistrationCountsRef.current;
    const count = registrations.get(target) || 0;
    if (count > 1) {
      registrations.set(target, count - 1);
      return;
    }
    registrations.delete(target);
    if (target === rootRef.current) return;

    withObserverPaused(() => {
      targetsRef.current.delete(target);
      const overlay = overlaysRef.current.get(target);
      overlay?.remove();
      overlaysRef.current.delete(target);
    });
  });

  const handleMutations = usePersistFn((mutations: MutationRecord[]) => {
    const root = rootRef.current;
    const restoreTargets = new Set<HTMLElement>();
    let restoreRoot = false;
    let removedOverlay = false;

    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.target === root &&
        (mutation.attributeName === 'class' || mutation.attributeName === 'style')
      ) {
        restoreRoot = true;
      }

      overlaysRef.current.forEach((overlay, target) => {
        if (
          (mutation.type === 'attributes' || mutation.type === 'childList') &&
          mutation.target === overlay
        ) {
          restoreTargets.add(target);
        }
        if (mutation.type === 'childList' && Array.from(mutation.removedNodes).includes(overlay)) {
          restoreTargets.add(target);
          removedOverlay = true;
        }
      });
    });

    withObserverPaused(() => {
      const baseline = rootAttributeBaselineRef.current;
      if (restoreRoot && root && baseline) {
        restoreAttribute(root, 'class', baseline.className);
        restoreAttribute(root, 'style', baseline.style);
      }

      const style = latestStyleRef.current;
      if (style) restoreTargets.forEach((target) => writeOverlay(target, style));
    });

    if (removedOverlay) latestProps.onRemove?.();
  });
  repairMutationsRef.current = handleMutations;

  const contextValue = useMemo<WatermarkContextValue>(
    () => ({ add: addTarget, remove: removeTarget }),
    [addTarget, removeTarget],
  );

  useEffect(() => {
    mountedRef.current = true;
    if (rootRef.current) targetsRef.current.add(rootRef.current);
    if (typeof MutationObserver !== 'undefined') {
      try {
        observerRef.current = new MutationObserver(handleMutations);
        targetsRef.current.forEach((target) =>
          observerRef.current?.observe(target, ObserverOptions),
        );
      } catch (_error) {
        observerRef.current = null;
      }
    }

    return () => {
      mountedRef.current = false;
      imageTokenRef.current += 1;
      releasePendingImage(true);
      observerRef.current?.disconnect();
      observerRef.current = null;
      cancelPendingFrame();
      overlaysRef.current.forEach((overlay) => overlay.remove());
      targetsRef.current.clear();
      targetRegistrationCountsRef.current.clear();
      overlaysRef.current.clear();
      latestTileRef.current = null;
      latestStyleRef.current = null;
      requestedDrawingSignatureRef.current = null;
      renderedDrawingSignatureRef.current = null;
      styleSignatureRef.current = null;
    };
  }, [cancelPendingFrame, handleMutations, releasePendingImage]);

  useEffect(() => {
    const drawingSignature = createDrawingSignature(latestProps, normalizeDpr());
    const styleSignature = createStyleSignature(latestProps);
    const drawingChanged = !signaturesEqual(requestedDrawingSignatureRef.current, drawingSignature);
    const styleChanged = !signaturesEqual(styleSignatureRef.current, styleSignature);
    requestedDrawingSignatureRef.current = drawingSignature;
    styleSignatureRef.current = styleSignature;

    if (drawingChanged) {
      imageTokenRef.current += 1;
      releasePendingImage(true);
      scheduleRender();
    } else if (styleChanged) {
      applyLatestStyle();
    }
  });

  const watermarkClasses = props.jssStyle?.watermark();
  const providerValue = props.inherit ?? true ? contextValue : DisabledWatermarkContext;
  const rootClassName = classNames(
    watermarkClasses?.rootClass,
    watermarkClasses?.wrapper,
    props.className,
  );
  const rootAttributeSignature = `${rootClassName}\u0000${getStyleString(props.style || {})}`;
  const saveRoot = useCallback(
    (root: HTMLDivElement | null) => {
      if (!root) {
        if (rootRef.current) withObserverPaused(() => undefined);
        rootRef.current = null;
        return;
      }
      rootRef.current = root;
      withObserverPaused(() => {
        rootAttributeBaselineRef.current = {
          className: root.getAttribute('class'),
          style: root.getAttribute('style'),
        };
      }, true);
    },
    [rootAttributeSignature, withObserverPaused],
  );

  return (
    <div ref={saveRoot} className={rootClassName} style={props.style}>
      <WatermarkContext.Provider value={providerValue}>{props.children}</WatermarkContext.Provider>
    </div>
  );
};

export default Watermark;
