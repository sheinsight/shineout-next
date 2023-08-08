import React, { useEffect, useState } from 'react';
import { getPositionStyle } from './get-position-style';
import shallowEqual from '../../utils/shallowEqual';
import usePersistFn from '../use-persist-fn';

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
export type ListPosition = 'drop-down' | 'drop-up';

const listPosition = ['drop-down', 'drop-up'];
const horizontalPosition = [
  'left-bottom',
  'left-top',
  'right-bottom',
  'right-top',
  'left',
  'right',
];
const verticalPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'bottom', 'top'];

export interface PositionStyleConfig {
  position: HorizontalPosition | VerticalPosition | ListPosition | undefined;
  absolute: boolean;
  show: boolean;
  parentEl: HTMLElement | null | undefined;
  popupEl?: HTMLElement | null | undefined;
  visibleEl?: HTMLElement | null;
  getContainer: () => HTMLElement | null | undefined;
  zIndex?: number;
  popupGap?: number;
  fixedWidth?: boolean | 'min';
  updateKey?: number | string;
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
    parentEl,
    popupEl,
    visibleEl,
    updateKey,
  } = config || {};
  const [style, setStyle] = useState<React.CSSProperties>({});
  const { current: context } = React.useRef({
    element: null as HTMLDivElement | null,
    containerRect: { left: 0, width: 0 } as DOMRect,
    containerScroll: { left: 0, width: 0 } as DOMRect,
  });

  const getAbsolutePositionStyle = (rect: DOMRect) => {
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
    const containerScroll = {
      left: rootContainer.scrollLeft,
      top: rootContainer.scrollTop,
    } as DOMRect;
    context.containerRect = containerRect;
    context.containerScroll = containerScroll;
    if (listPosition.includes(targetPosition)) {
      style.left = rect.left - containerRect.left + containerScroll.left;
      if (targetPosition === 'drop-down') {
        style.top = rect.top - containerRect.top + rect.height + containerScroll.top;
      } else {
        style.bottom = -(rect.top - containerRect.top + containerScroll.top);
      }
    } else if (verticalPosition.includes(targetPosition)) {
      const [v, h] = targetPosition.split('-');
      if (h === 'left') {
        style.left = rect.left - containerRect.left + containerScroll.left;
        style.transform = '';
      } else if (h === 'right') {
        style.left = rect.right - containerRect.left + containerScroll.left;
        style.transform = 'translateX(-100%)';
      } else {
        // 居中对齐
        style.left = rect.left + rect.width / 2;
        style.transform = 'translateX(-50%)';
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
        style.top = rect.top + rect.height / 2;
        style.transform = 'translateY(-50%)';
      }
      if (h === 'right') {
        style.left = rect.right - containerRect.left + containerScroll.left + popupGap;
      } else {
        style.left = rect.left - containerRect.left + containerScroll.left - popupGap;
        style.transform += ' translateX(-100%)';
      }
    }
    return style;
  };

  const adjustStyle = (style: React.CSSProperties) => {
    if (!popupEl) return;
    const el = popupEl.cloneNode(true) as HTMLElement;
    el.style.visibility = 'true';
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    Object.keys(style).forEach((key) => {
      (el.style as any)[key] =
        typeof (style as any)[key] === 'number' ? `${(style as any)[key]}px` : (style as any)[key];
    });
    popupEl.parentElement?.appendChild(el);
    const rect = el.getBoundingClientRect();
    el.remove();

    const containerRect = context.containerRect || { left: 0, width: 0 };

    const overRight = rect.right - containerRect.right;
    const overLeft = containerRect.left - rect.left;
    if (overRight > 0 && overLeft < 0) {
      // 右边超出 左边没有超出
      if (typeof style.left === 'number') {
        style.left = Math.max(style.left - overRight, 0);
      } else if (typeof style.right === 'number') {
        style.right = Math.max(style.right + overRight, 0);
      }
    }

    if (overLeft > 0 && overRight < 0) {
      // 左边超出 右边没有超出
      if (typeof style.left === 'number') {
        style.left = Math.max(style.left + overLeft, 0);
      } else if (typeof style.right === 'number') {
        style.right = Math.max(style.right - overLeft, 0);
      }
    }
  };

  const getAbsoluteStyle = () => {
    if (!parentEl) return;
    const rect = parentEl.getBoundingClientRect();
    if (visibleEl) {
      const visibleRect = visibleEl?.getBoundingClientRect() || {};
      if (
        rect.bottom < visibleRect.top ||
        rect.top > visibleRect.bottom ||
        rect.right < visibleRect.left ||
        rect.left > visibleRect.right
      ) {
        return;
      }
    }
    const style = getAbsolutePositionStyle(rect);
    adjustStyle(style);
    return style;
  };

  const updateStyle = usePersistFn(() => {
    const { position, absolute } = config || {};
    if (!show || !position || !parentEl) return;
    let newStyle: React.CSSProperties = {};
    if (!absolute) {
      newStyle = getPositionStyle(position, { popupGap });
    } else {
      newStyle = getAbsoluteStyle()!;
    }
    if (newStyle && !shallowEqual(style, newStyle)) {
      setStyle(newStyle);
    }
  });

  useEffect(updateStyle, [show, position, absolute, parentEl, visibleEl, updateKey]);

  return style;
};

export default usePositionStyle;
