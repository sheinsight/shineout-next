import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getPositionStyle } from './get-position-style';
import { useCheckElementPosition, type Position } from './check-position'
import { useCheckElementBorderWidth } from './check-border';
import { useCheckElementSize } from './check-element-size'
import shallowEqual from '../../utils/shallow-equal';
import usePersistFn from '../use-persist-fn';
import { getCurrentCSSZoom } from '../../utils';
import { docSize } from '../../utils';

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
  offset?: [number, number];
}

const hideStyle: React.CSSProperties = {
  pointerEvents: 'none',
  position: 'fixed',
  visibility: 'hidden',
};

function setTransform(style: React.CSSProperties, transform: string, addon?: boolean) {
  if (addon) {
    style.transform += ' ' + transform;
  } else {
    style.transform = transform;
  }
  // 提供给动画侧合并使用
  if(addon){
    (style as any)['--soui-popup-transform'] += ' ' + transform;
  } else {
    (style as any)['--soui-popup-transform'] = transform;
  }
}

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
    offset,
  } = config || {};
  // 初次渲染无样式的时候， 隐藏展示
  const [style, setStyle] = useState<React.CSSProperties>(hideStyle);

  const { current: context } = React.useRef({
    containerRect: { left: 0, width: 0 } as DOMRect,
    containerScroll: { left: 0, width: 0 } as DOMRect,
    parentRect: { left: 0, width: 0 } as DOMRect,
    popUpHeight: 0,
    popUpWidth: 0,
    prevParentPosition: null as (Position | null),
  });

  const parentElNewPosition = useCheckElementPosition(parentElRef, {scrollContainer: scrollElRef?.current, enable: show && adjust});

  const parentElBorderWidth = useCheckElementBorderWidth(parentElRef, {direction: 'horizontal', enable: show});

  const popupElSize = useCheckElementSize(popupElRef, { enable: show });

  const [popupElWidth, setPopupElWidth] = useState(0);
  useLayoutEffect(() => {
    if (!show || !popupElRef.current) return;
    if (popupElRef.current) {
      // 二次打开弹出层时，元素被之前的动画设置了display: none，重新获取元素尺寸时，需要立即设置display: block
      if (popupElRef.current.style.display === 'none') {
        popupElRef.current.style.display = 'block';
      }
      setPopupElWidth(popupElRef.current.getBoundingClientRect().width);
    }
  }, [show, popupElRef.current])

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
    } else {
      // absolute 场景下，右侧溢出判断需要考虑弹出层元素的尺寸
      const [, horizontalPosition] = position.split('-');
      if (horizontalPosition === 'left' && context.parentRect.left + (popupElWidth || context.popUpWidth) > docSize.width) {
        newPosition = newPosition.replace('left', 'right') as VerticalPosition;
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
        style.left = rect.left - containerRect.left + containerScroll.left - (offset ? offset[0] : 0);
        setTransform(style, '');
        if (adjust) {
          overRight = rect.left + context.popUpWidth - bodyRect.right + containerScrollBarWidth;
          if (style.left < 0 && targetRect) {
            style.left = 'auto';
          }
        }
      } else if (h === 'right') {
        style.right =
          containerRect.right - rect.right + containerScrollBarWidth - containerScroll.left - (offset ? offset[0] : 0);

        style.left = 'auto';
        setTransform(style, '');
      } else {
        // 居中对齐
        style.left = rect.left + rect.width / 2 - containerRect.left + containerScroll.left;
        setTransform(style, 'translateX(-50%)')
        if (adjust) {
          overRight =
            rect.left +
            rect.width / 2 +
            context.popUpWidth / 2 -
            bodyRect.width +
            containerScrollBarWidth;
          overLeft = bodyRect.left - (rect.left + rect.width / 2 - context.popUpWidth / 2);
        }
      }
      if (adjust) {
        // 调节左右溢出
        if (overRight > 0) {
          const toRightDistance = bodyRect.right - rect.right;
          (style.left as number) -= overRight;
          // 扣除触发器距离页面右侧的距离，以保证从右侧弹出的窗口最右边对齐触发器最右边
          (style.left as number) -= toRightDistance;
        }
        if (overLeft > 0) {
          (style.left as number) += overLeft;
        }
      }
      if (v === 'bottom') {
        style.top = rect.bottom - containerRect.top + containerScroll.top + popupGap;
      } else {
        style.top = rect.top - containerRect.top + containerScroll.top - popupGap;
        setTransform(style, 'translateY(-100%)', true);
      }
    } else if (horizontalPosition.includes(targetPosition)) {
      const [h, v] = targetPosition.split('-');
      if (v === 'top') {
        style.top = rect.top - containerRect.top + containerScroll.top - (offset ? offset[1] : 0);
        setTransform(style, '');
      } else if (v === 'bottom') {
        style.top = rect.bottom - containerRect.top + containerScroll.top + (offset ? offset[1] : 0);
        setTransform(style, 'translateY(-100%)');
      } else {
        // 居中对齐
        style.top = rect.top - containerRect.top + containerScroll.top + rect.height / 2;

        setTransform(style, 'translateY(-50%)');
      }
      if (h === 'right') {
        style.left = rect.right - containerRect.left + containerScroll.left + popupGap;
      } else {
        style.right = containerRect.right - rect.left + popupGap;
      }
    } else if (position === 'cover') {
      style.top = rect.top - containerRect.top + containerScroll.top;
      style.left = rect.left - containerRect.left + containerScroll.left;
    }
    return { style };
  };

  const getAbsoluteStyle = (position: string) => {
    if (!parentElRef.current) return { style: hideStyle };
    const rect = context.parentRect;

    const needCheck = !show || !shallowEqual(context.prevParentPosition, parentElNewPosition)

    if (needCheck && scrollElRef?.current && scrollElRef.current?.contains(parentElRef.current)) {
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
    const { style } = getAbsolutePositionStyle(rect, position);

    const currentCSSZoom = getCurrentCSSZoom()
    if (currentCSSZoom && currentCSSZoom !== 1) {
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
    return { style };
  };

  const getStyle = () => {
    let newStyle: React.CSSProperties = {};
    const { position, absolute } = config || {};
    if (!position || !show || !parentElRef.current) return { newStyle: style };
    context.parentRect = parentElRef.current.getBoundingClientRect();

    let realPosition = position
    if (adjust) {
      const popupInfo = getPopUpInfo(context.parentRect);
      context.popUpHeight = popupInfo.height;
      context.popUpWidth = popupInfo.width;
      realPosition = adjustPosition(position);
    }

    if (!absolute) {
      newStyle = getPositionStyle(realPosition, { popupGap, zIndex, fixedWidth, parentBorderWidth: parentElBorderWidth });
    } else {
      const { style: nextStyle } = getAbsoluteStyle(realPosition)!;
      newStyle = nextStyle;
    }
    // for animation
    if (realPosition.indexOf('top') === 0) {
      newStyle.transformOrigin = 'center bottom';
    } else if(realPosition.indexOf('bottom') === 0){
      newStyle.transformOrigin = 'center top';
    }
    return { newStyle };
  };

  const updateStyle = usePersistFn(() => {
    const { newStyle } = getStyle();
    if (newStyle && !shallowEqual(style, newStyle)) {
      setStyle(newStyle);
    }

    // 当父元素的滚动容器滚动时，判断是否需要更新弹出层位置，包括是否隐藏弹出层（通过hideStyle隐藏，不是show状态）
    context.prevParentPosition = parentElNewPosition;
  });



  useEffect(updateStyle, [
    show,
    position,
    absolute,
    updateKey,
    fixedWidth,
    parentElNewPosition,
    popupElSize,
  ]);

  return { style };
};

export default usePositionStyle;
