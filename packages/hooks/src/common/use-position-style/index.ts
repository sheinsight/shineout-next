import React, { useEffect, useState } from 'react';
import { getPositionStyle } from './get-position-style';
import { useCheckElementPosition } from './check-position'
import shallowEqual from '../../utils/shallow-equal';
import usePersistFn from '../use-persist-fn';
import { docSize, isChromeLowerThan } from '../../utils';

export type HorizontalPosition =
  | 'left-bottom'
  | 'left-top'
  | 'right-bottom'
  | 'right-top'
  | 'left'
  | 'right';
export type VerticalPosition =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right'
  | 'top'
  | 'bottom';

const horizontalPosition = [
  'left-bottom',
  'left-top',
  'right-bottom',
  'right-top',
  'left',
  'right',
];
const verticalPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'bottom', 'top'];

type PositionType = HorizontalPosition | VerticalPosition | 'cover';
export interface PositionStyleConfig {
  position: PositionType | undefined;
  absolute: boolean;
  show: boolean;
  // 弹出层的目标元素scrollElRef
  parentElRef: React.RefObject<HTMLElement>;
  // 弹出层
  popupElRef: React.RefObject<HTMLElement>;
  // 可视区域
  scrollElRef?: React.RefObject<HTMLElement>;
  getContainer: () => HTMLElement | null | undefined;
  zIndex?: number;
  popupGap?: number;
  fixedWidth?: boolean | 'min';
  updateKey?: number | string;
  adjust?: boolean;
}

const hideStyle: React.CSSProperties = {
  pointerEvents: 'none',
  position: 'fixed',
  visibility: 'hidden',
};
export const usePositionStyle = (config: PositionStyleConfig) => {
  const {
    absolute,
    show,
    position = 'bottom-left',
    zIndex,
    fixedWidth,
    popupGap = 2,
    getContainer,
    parentElRef,
    popupElRef,
    scrollElRef,
    updateKey,
    adjust,
  } = config || {};
  // 初次渲染无样式的时候， 隐藏展示
  const [style, setStyle] = useState<React.CSSProperties>(hideStyle);
  const [arrayStyle, setArrayStyle] = useState<React.CSSProperties>({});

  const { current: context } = React.useRef({
    containerRect: { left: 0, width: 0 } as DOMRect,
    containerScroll: { left: 0, width: 0 } as DOMRect,
    parentRect: { left: 0, width: 0 } as DOMRect,
    popUpHeight: 0,
    popUpWidth: 0,
  });

  const parentElNewPosition = useCheckElementPosition(parentElRef, {scrollContainer: scrollElRef?.current, enable: show});

  const adjustPosition = (position: PositionType) => {
    const winHeight = docSize.height;
    if (!verticalPosition.includes(position)) return position;
    let newPosition = position;
    const verticalPoint = context.parentRect.top + context.parentRect.height / 2;
    if (position.startsWith('top')) {
      if (
        verticalPoint / winHeight < 0.5 &&
        context.parentRect.top - context.popUpHeight - popupGap < 0
      ) {
        newPosition = newPosition.replace('top', 'bottom') as VerticalPosition;
      }
    } else {
      if (
        verticalPoint / winHeight > 0.5 &&
        context.parentRect.bottom + context.popUpHeight + popupGap > winHeight
      ) {
        newPosition = newPosition.replace('bottom', 'top') as VerticalPosition;
      }
    }
    if (!absolute) {
      const winWidth = docSize.width;
      const horizontalPoint = context.parentRect.left + context.parentRect.width / 2;
      if (newPosition.endsWith('right')) {
        if (horizontalPoint / winWidth < 0.5 && context.parentRect.right - context.popUpWidth < 0) {
          newPosition = newPosition.replace('right', 'left') as VerticalPosition;
        }
      } else {
        if (
          horizontalPoint / winWidth > 0.5 &&
          context.parentRect.left + context.popUpWidth > winWidth
        ) {
          newPosition = newPosition.replace('left', 'right') as VerticalPosition;
        }
      }
    }

    return newPosition;
  };

  const getPopUpInfo = (parentRect: DOMRect) => {
    if (!popupElRef.current) return { width: 0, height: 0 };
    const el = popupElRef.current.cloneNode(true) as HTMLElement;
    el.style.visibility = 'true';
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    el.style.display = '';
    if (absolute && fixedWidth) {
      const widthKey = fixedWidth === 'min' ? 'minWidth' : 'width';
      el.style[widthKey] = parentRect.width + 'px';
    }
    popupElRef.current.parentElement?.appendChild(el);
    const height = el.offsetHeight;
    const width = el.offsetWidth;
    el.remove();
    return { height, width };
  };

  const getAbsolutePositionStyle = (rect: DOMRect, position: string) => {
    const style: React.CSSProperties = {
      position: 'absolute',
      zIndex,
    };
    const arrayStyle: React.CSSProperties = {};

    if (fixedWidth) {
      const widthKey = fixedWidth === 'min' ? 'minWidth' : 'width';
      style[widthKey] = rect.width;
    }
    let targetPosition = position;
    const rootContainer = getContainer() || document.body;

    const containerRect = rootContainer.getBoundingClientRect();
    const bodyRect = (document.documentElement || document.body).getBoundingClientRect();
    const containerScrollBarWidth = rootContainer.offsetWidth - rootContainer.clientWidth;
    const targetRect = popupElRef.current?.getBoundingClientRect();
    const containerScroll = {
      left: rootContainer.scrollLeft,
      top: rootContainer.scrollTop,
    } as DOMRect;

    context.containerRect = containerRect;
    context.containerScroll = containerScroll;
    if (verticalPosition.includes(targetPosition)) {
      const [v, h] = targetPosition.split('-');
      let overRight = 0;
      let overLeft = 0;
      if (h === 'left') {
        style.left = rect.left - containerRect.left + containerScroll.left;
        style.transform = '';
        arrayStyle.left = `8px`;
        if (adjust) {
          overRight = rect.left + context.popUpWidth - bodyRect.right + containerScrollBarWidth;
          if (style.left < 0 && targetRect) {
            style.left = 'auto';
          }
        }
      } else if (h === 'right') {
        style.right =
          containerRect.right - rect.right + containerScrollBarWidth - containerScroll.left;

        style.left = 'auto';
        style.transform = '';
        arrayStyle.right = `8px`;
        if (adjust) {
          overLeft = bodyRect.left - (rect.right - context.popUpWidth);
          if (style.right < 0 && targetRect) {
            style.left = bodyRect.width - targetRect.width;
            style.right = 'auto';
          }
        }
      } else {
        // 居中对齐
        style.left = rect.left + rect.width / 2 - containerRect.left + containerScroll.left;
        style.transform = 'translateX(-50%)';
        if (adjust) {
          overRight =
            rect.left +
            rect.width / 2 +
            context.popUpWidth / 2 -
            bodyRect.width +
            containerScrollBarWidth;
          overLeft = bodyRect.left - (rect.left + rect.width / 2 - context.popUpWidth / 2);
        }
        if (targetRect) {
          arrayStyle.left = `${targetRect.width / 2 - 5.9}px`;
        }
      }
      if (adjust) {
        // 调节左右溢出
        if (overRight > 0) {
          const toRightDistance = bodyRect.right - rect.right;
          (style.left as number) -= overRight;
          // 扣除触发器距离页面右侧的距离，以保证从右侧弹出的窗口最右边对齐触发器最右边
          (style.left as number) -= toRightDistance;
          if (targetRect) {
            arrayStyle.left = `${targetRect?.width - context.parentRect.width / 2 - 5.9}px`;
          }
        }
        if (overLeft > 0) {
          (style.left as number) += overLeft;

          arrayStyle.left = `${rect.width / 2 - 5.9}px`;
        }
      }
      if (v === 'bottom') {
        style.top = rect.bottom - containerRect.top + containerScroll.top + popupGap;
        if (targetRect) {
          arrayStyle.top = `${0}px`;
        }
      } else {
        style.top = rect.top - containerRect.top + containerScroll.top - popupGap;
        style.transform += 'translateY(-100%)';
        if (targetRect) {
          arrayStyle.top = `${targetRect.height - 5.9 - 4}px`;
        }
      }
    } else if (horizontalPosition.includes(targetPosition)) {
      const [h, v] = targetPosition.split('-');
      if (v === 'top') {
        style.top = rect.top - containerRect.top + containerScroll.top;
        style.transform = '';
        arrayStyle.top = `8px`;
      } else if (v === 'bottom') {
        style.top = rect.bottom - containerRect.top + containerScroll.top;
        arrayStyle.bottom = `8px`;
        style.transform = 'translateY(-100%)';
      } else {
        // 居中对齐
        style.top = rect.top - containerRect.top + containerScroll.top + rect.height / 2;
        if (targetRect) {
          arrayStyle.top = `${targetRect.height / 2 - 5.9 / 2}px`;
        }
        style.transform = 'translateY(-50%)';
      }
      if (h === 'right') {
        style.left = rect.right - containerRect.left + containerScroll.left + popupGap;
      } else {
        style.left = rect.left - containerRect.left + containerScroll.left - popupGap;
        arrayStyle.right = `0px`;
        style.transform += ' translateX(-100%)';
      }
    } else if (position === 'cover') {
      style.top = rect.top - containerRect.top + containerScroll.top;
      style.left = rect.left - containerRect.left + containerScroll.left;
    }
    return { style, arrayStyle };
  };

  const getAbsoluteStyle = (position: string) => {
    if (!parentElRef.current) return { style: hideStyle };
    const rect = context.parentRect;
    if (scrollElRef?.current) {
      const visibleRect = scrollElRef.current?.getBoundingClientRect() || {};
      if (
        rect.bottom < visibleRect.top ||
        rect.top > visibleRect.bottom ||
        rect.right < visibleRect.left ||
        rect.left > visibleRect.right
      ) {
        return { style: hideStyle };
      }
    }
    const { style, arrayStyle } = getAbsolutePositionStyle(rect, position);

    // TODO: 如果是版本大于chrome128，需要根据currentCSSZoom处理chrome的bug
    if (!isChromeLowerThan(128)) {
      // @ts-ignore currentCSSZoom
      const currentCSSZoom = document.body.currentCSSZoom;
      if (currentCSSZoom === 1 || !currentCSSZoom) return { style, arrayStyle };
      if (style.left && typeof style.left === 'number') {
        style.left = style.left * (1 / currentCSSZoom);
      }
      if (style.top && typeof style.top === 'number') {
        style.top = style.top * (1 / currentCSSZoom);
      }
      if (style.right && typeof style.right === 'number') {
        style.right = style.right * (1 / currentCSSZoom);
      }
      if (style.bottom && typeof style.bottom === 'number') {
        style.bottom = style.bottom * (1 / currentCSSZoom);
      }
    }
    return { style, arrayStyle };
  };

  const getStyle = () => {
    let newStyle: React.CSSProperties = {};
    let newArrayStyle: React.CSSProperties | undefined = {};
    const { position, absolute } = config || {};
    if (!position || !show || !parentElRef.current) return { newStyle: style };
    context.parentRect = parentElRef.current.getBoundingClientRect();
    if (adjust) {
      const popupInfo = getPopUpInfo(context.parentRect);
      context.popUpHeight = popupInfo.height;
      context.popUpWidth = popupInfo.width;
    }

    const realPosition = adjust ? adjustPosition(position) : position;
    if (!absolute) {
      newStyle = getPositionStyle(realPosition, { popupGap, zIndex, fixedWidth });
    } else {
      const { style: nextStyle, arrayStyle: nextArrayStyle } = getAbsoluteStyle(realPosition)!;
      newStyle = nextStyle;
      newArrayStyle = nextArrayStyle;
    }
    // for animation
    if (realPosition.indexOf('top') === 0) {
      newStyle.transformOrigin = 'center bottom';
    }
    return { newStyle, newArrayStyle };
  };

  const updateStyle = usePersistFn(() => {
    const { newStyle, newArrayStyle } = getStyle();
    if (newStyle && !shallowEqual(style, newStyle)) {
      setStyle(newStyle);
      setArrayStyle(newArrayStyle || {});
    }
  });

  useEffect(updateStyle, [
    show,
    position,
    absolute,
    updateKey,
    fixedWidth,
    parentElNewPosition
  ]);

  return { style, arrayStyle };
};

export default usePositionStyle;
