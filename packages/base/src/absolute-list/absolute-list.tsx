import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AbsoluteListProps } from './absolute-list.type';
import { util } from '@sheinx/hooks';
import { getPositionStyle } from './get-position-style';
import useContainer from './use-container';

//todo rtl

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

const AbsoluteList = (props: AbsoluteListProps) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const childStyle = props.children?.props?.style || {};
  const { current: context } = React.useRef({
    element: null as HTMLDivElement | null,
    containerRect: { left: 0, width: 0 } as DOMRect,
    containerScroll: { left: 0, width: 0 } as DOMRect,
  });
  const {
    absolute,
    position,
    children,
    parentElement,
    scrollElement,
    fixedWidth,
    zIndex,
    focus,
    listMargin = 2,
  } = props;

  const { getElement, getContainer } = useContainer({
    container: typeof absolute === 'function' ? absolute : undefined,
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
    let targetPosition: string = position;
    const rootContainer = getContainer();
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
        style.left = rect.right;
        style.transform = 'translateX(-100%)';
      } else {
        // 居中对齐
        style.left = rect.left + rect.width / 2;
        style.transform = 'translateX(-50%)';
      }
      if (v === 'bottom') {
        style.top = rect.bottom - containerRect.top + containerScroll.top + listMargin;
      } else {
        style.top = rect.top - containerRect.top + containerScroll.top - listMargin;
        style.transform += 'translateY(-100%)';
      }
    } else if (horizontalPosition.includes(targetPosition)) {
      const [h, v] = targetPosition.split('-');
      if (v === 'top') {
        style.top = rect.top - containerRect.top + containerScroll.top;
        style.transform = '';
      } else if (v === 'bottom') {
        style.top = rect.bottom;
        style.transform = 'translateY(-100%)';
      } else {
        // 居中对齐
        style.top = rect.top + rect.height / 2;
        style.transform = 'translateY(-50%)';
      }
      if (h === 'right') {
        style.left = rect.right - containerRect.left + containerScroll.left + listMargin;
      } else {
        style.left = rect.left - containerRect.left + containerScroll.left - listMargin;
        style.transform += ' translateX(-100%)';
      }
    }
    return style;
  };

  const getAbsoluteStyle = () => {
    if (!parentElement) return;
    const rect = parentElement.getBoundingClientRect();
    if (scrollElement) {
      const scrollRect = scrollElement?.getBoundingClientRect() || {};
      if (
        rect.bottom < scrollRect.top ||
        rect.top > scrollRect.bottom ||
        rect.right < scrollRect.left ||
        rect.left > scrollRect.right
      ) {
        return;
      }
    }
    const style = getAbsolutePositionStyle(rect);
    return style;
  };

  // todo overDoc
  const adjustOverDoc = () => {};

  // absolute 模式
  useEffect(() => {
    if (!parentElement || !position || !focus || !absolute) return;
    const newStyle = getAbsoluteStyle();
    if (newStyle && !util.shallowEqual(newStyle, style)) {
      setStyle({ ...childStyle, ...newStyle });
      setTimeout(() => {
        adjustOverDoc();
      });
    }
  }, [absolute, position, parentElement, scrollElement, focus]);

  // 非 absolute 模式
  useEffect(() => {
    if (absolute) return;
    setStyle({ ...childStyle, ...getPositionStyle(position, { listMargin }) });
  }, [position, absolute]);

  if (React.isValidElement(children) === false) return null;
  const styledChild = React.cloneElement(children, { style });
  if (absolute) {
    const element = getElement();
    element.className = props.rootClass || '';
    return ReactDOM.createPortal(styledChild, element);
  }

  return styledChild;
};

export default AbsoluteList;
