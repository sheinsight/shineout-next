import React, { useEffect, useState } from 'react';
import { getPositionStyle } from './get-position-style';
import shallowEqual from '../../utils/shallow-equal';
import usePersistFn from '../use-persist-fn';
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
  // 弹出层的目标元素
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
  position: 'absolute',
  zIndex: -1000,
  opacity: 0,
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

  const { current: context } = React.useRef({
    element: null as HTMLDivElement | null,
    containerRect: { left: 0, width: 0 } as DOMRect,
    containerScroll: { left: 0, width: 0 } as DOMRect,
    parentRect: { left: 0, width: 0 } as DOMRect,
    popUpHeight: 0,
    popUpWidth: 0,
    opsStyle: {} as React.CSSProperties,
  });

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
    const containerScrollBarWidth = rootContainer.offsetWidth - rootContainer.clientWidth;
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
        if (adjust) {
          overRight =
            rect.left + context.popUpWidth - containerRect.right + containerScrollBarWidth;
        }
      } else if (h === 'right') {
        style.right =
          containerRect.right - rect.right + containerScrollBarWidth - containerScroll.left;
        style.left = 'auto';
        style.transform = '';
        if (adjust) overLeft = containerRect.left - (rect.right - context.popUpWidth);
      } else {
        // 居中对齐
        style.left = rect.left + rect.width / 2 - containerRect.left + containerScroll.left;
        style.transform = 'translateX(-50%)';
        if (adjust) {
          overRight =
            rect.left +
            rect.width / 2 +
            context.popUpWidth / 2 -
            containerRect.width +
            containerScrollBarWidth;
          overLeft = containerRect.left - (rect.left + rect.width / 2 - context.popUpWidth / 2);
        }
      }

      if (adjust) {
        // 调节左右溢出
        if (overRight > 0) {
          (style.left as number) -= overRight;
        }
        if (overLeft > 0) {
          (style.left as number) += overLeft;
        }
      }

      if (v === 'bottom') {
        style.top = rect.bottom - containerRect.top + containerScroll.top + popupGap;
      } else {
        style.top = rect.top - containerRect.top + containerScroll.top - popupGap;
        style.transform += 'translateY(-100%)';
      }
    } else if (horizontalPosition.includes(targetPosition)) {
      const [h, v] = targetPosition.split('-');
      if (v === 'top') {
        style.top = rect.top - containerRect.top + containerScroll.top;
        style.transform = '';
      } else if (v === 'bottom') {
        style.top = rect.bottom - containerRect.top + containerScroll.top;
        style.transform = 'translateY(-100%)';
      } else {
        // 居中对齐
        style.top = rect.top - containerRect.top + containerScroll.top + rect.height / 2;
        style.transform = 'translateY(-50%)';
      }
      if (h === 'right') {
        style.left = rect.right - containerRect.left + containerScroll.left + popupGap;
      } else {
        style.left = rect.left - containerRect.left + containerScroll.left - popupGap;
        style.transform += ' translateX(-100%)';
      }
    } else if (position === 'cover') {
      style.top = rect.top - containerRect.top + containerScroll.top;
      style.left = rect.left - containerRect.left + containerScroll.left;
    }
    return style;
  };

  const getAbsoluteStyle = (position: string) => {
    if (!parentElRef.current) return hideStyle;
    const rect = context.parentRect;
    if (scrollElRef?.current) {
      const visibleRect = scrollElRef.current?.getBoundingClientRect() || {};
      if (
        rect.bottom < visibleRect.top ||
        rect.top > visibleRect.bottom ||
        rect.right < visibleRect.left ||
        rect.left > visibleRect.right
      ) {
        return hideStyle;
      }
    }
    const style = getAbsolutePositionStyle(rect, position);
    return style;
  };

  const getStyle = () => {
    let newStyle: React.CSSProperties = {};
    const { position, absolute } = config || {};
    if (!position || !show || !parentElRef.current) return style;
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
      newStyle = getAbsoluteStyle(realPosition)!;
    }
    // for animation
    if (realPosition.indexOf('top') === 0) {
      newStyle.transformOrigin = 'center bottom';
    }
    return newStyle;
  };

  const updateStyle = usePersistFn(() => {
    const newStyle = getStyle();
    if (newStyle && !shallowEqual(style, newStyle)) {
      setStyle(newStyle);
    }
  });

  useEffect(updateStyle, [show, position, absolute, updateKey]);
  return style;
};

export default usePositionStyle;
