import React from 'react';
import { usePositionStyle } from '@sheinx/hooks';
import ReactDOM from 'react-dom';
import { AbsoluteListProps } from './absolute-list.type';
import useContainer from './use-container';

const AbsoluteList = (props: AbsoluteListProps) => {
  const {
    absolute,
    position,
    children,
    parentElement,
    scrollElement,
    fixedWidth,
    zIndex = 1051,
    focus,
    popupEl,
    updateKey,
    popupGap,
    adjust,
    destroy = false,
  } = props;

  const { getRoot, getContainer } = useContainer({
    container: typeof absolute === 'function' ? absolute : undefined,
  });
  const style = usePositionStyle({
    getContainer: getContainer,
    position,
    absolute: !!absolute,
    parentEl: parentElement,
    show: focus,
    fixedWidth,
    zIndex,
    visibleEl: scrollElement,
    popupEl,
    updateKey,
    popupGap,
    adjust,
  });
  const childStyle = children.props.style;
  const newStyle = {
    ...style,
    ...childStyle,
  };

  if (React.isValidElement(children) === false) return null;

  const styledChild = React.cloneElement(children, { style: newStyle });
  if (destroy && !focus) return null;
  if (absolute) {
    const root = getRoot();
    root.className = props.rootClass || '';
    return ReactDOM.createPortal(styledChild, root);
  }

  return styledChild;
};

export default AbsoluteList;
