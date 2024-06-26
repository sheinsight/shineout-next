import React, { useRef, useContext } from 'react';
import { usePositionStyle, util } from '@sheinx/hooks';
import ReactDOM from 'react-dom';
import { AbsoluteListProps } from './absolute-list.type';
import useContainer from './use-container';
import AbsoluteContext from './absolute-context';

const AbsoluteList = (props: AbsoluteListProps) => {
  const {
    position,
    children,
    parentElRef,
    scrollElRef,
    fixedWidth,
    zIndex = 1051,
    focus,
    popupElRef,
    updateKey,
    popupGap,
    adjust,
    destroy = false,
    lazy = true,
  } = props;

  const defaultAbsolute = useContext(AbsoluteContext);
  const absolute = props.absolute === undefined ? defaultAbsolute : props.absolute;

  const { getRoot } = useContainer({
    container: typeof absolute === 'function' ? absolute : undefined,
  });

  const { current: context } = useRef({ rendered: false });

  const style = usePositionStyle({
    getContainer: getRoot,
    position,
    absolute: !!absolute,
    parentElRef,
    show: focus,
    fixedWidth,
    zIndex,
    scrollElRef,
    popupElRef,
    updateKey,
    popupGap,
    adjust,
  });
  const childStyle = children.props.style;
  const newStyle: React.CSSProperties = {
    ...style,
    ...childStyle,
  };

  if (React.isValidElement(children) === false) return null;

  const styledChild = React.cloneElement(children as any, { style: newStyle });
  if (!util.isBrowser()) return null;
  if (lazy && !context.rendered && !focus) return null;
  if (destroy && !focus) return null;
  context.rendered = true;
  if (absolute) {
    const root = getRoot();
    if (!root) return null;
    root.className = props.rootClass || '';
    return ReactDOM.createPortal(styledChild, root);
  }

  return styledChild;
};

export default AbsoluteList;
