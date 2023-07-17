import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AbsoluteListProps } from './absolute-list.type';
import { util } from '@sheinx/hooks';
import { getDefaultContainer } from '../config';
import { getPositionStyle, PICKER_MARGIN } from './get-position-style';

let root: HTMLDivElement;

function initRoot() {
  const defaultContainer = getDefaultContainer();
  root = document.createElement('div');
  root.setAttribute('data-type', 'absolute-list-wrap');
  defaultContainer.appendChild(root);
}

const listPosition = ['drop-down', 'drop-up'];
const pickerPosition = ['left-bottom', 'left-top', 'right-bottom', 'right-top'];
const dropdownPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];

function getRoot() {
  if (!root || util.isInDocument(root) === false) initRoot();
  return root;
}

const AbsoluteList = (props: AbsoluteListProps) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const childStyle = props.children?.props?.style || {};
  const { current: context } = React.useRef({
    element: null as HTMLDivElement | null,
    containerRect: { left: 0, width: 0 } as DOMRect,
    containerScroll: { left: 0, width: 0 } as DOMRect,
  });
  const { absolute, position, children, parentElement, scrollElement, fixedWidth, zIndex, focus } =
    props;

  const getContainer = () => {
    if (typeof absolute === 'function') {
      return absolute();
    }
    return getRoot();
  };

  const getElement = () => {
    if (!context.element) {
      context.element = document.createElement('div');
    }
    const container = getContainer();
    if (util.isInDocument(context.element) === false) {
      container.appendChild(context.element);
    }
    return context.element;
  };

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
    if (dropdownPosition.includes(position)) {
      targetPosition = position.split('-').reverse().join('-');
    }
    const container = getContainer();
    const defaultContainer = getDefaultContainer();
    const rootContainer = container === getRoot() || !container ? defaultContainer : container;
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
    } else if (pickerPosition.includes(targetPosition)) {
      const [h, v] = targetPosition.split('-');
      if (h === 'left') {
        style.left = rect.left - containerRect.left + containerScroll.left;
      } else {
        style.right =
          containerRect.width - rect.width - rect.left + containerRect.left - containerScroll.left;
        style.left = 'auto';
      }
      if (v === 'bottom') {
        style.top = rect.bottom - containerRect.top + containerScroll.top + PICKER_MARGIN;
      } else {
        style.top = rect.top - containerRect.top + containerScroll.top - PICKER_MARGIN;
        style.transform = 'translateY(-100%)';
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

  // absolute 模式
  useEffect(() => {
    if (!parentElement || !position || !focus || !absolute) return;
    const newStyle = getAbsoluteStyle();
    if (newStyle && !util.shallowEqual(newStyle, style)) {
      setStyle({ ...childStyle, ...newStyle });
    }
  }, [absolute, position, parentElement, scrollElement, focus]);

  // 非 absolute 模式
  useEffect(() => {
    if (absolute) return;
    setStyle({ ...childStyle, ...getPositionStyle(position) });
  }, [position, absolute]);
  const element = getElement();

  element.className = props.rootClass || '';

  if (React.isValidElement(children) === false) return null;
  const styledChild = React.cloneElement(children, { style });
  if (absolute) return ReactDOM.createPortal(styledChild, getElement());
  return styledChild;
};

export default AbsoluteList;
