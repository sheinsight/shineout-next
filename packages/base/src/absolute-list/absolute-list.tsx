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
    arrowRef,
    popupElRef,
    updateKey,
    popupGap,
    adjust,
    follow,
    destroy = false,
    lazy = true,
  } = props;

  const { absolute: defaultAbsolute, scrollContainer } = useContext(AbsoluteContext);
  const absolute = props.absolute === undefined ? defaultAbsolute : props.absolute;

  const { getRoot } = useContainer({
    container: typeof absolute === 'function' ? absolute : undefined,
  });

  const { current: context } = useRef({ rendered: false });

  const { style, arrayStyle } = usePositionStyle({
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
    follow,
    scrollContainer,
  });

  const childStyle = children.props.style;
  const newStyle: React.CSSProperties = {
    ...style,
    ...childStyle,
  };

  if (React.isValidElement(children) === false) return null;

  if (arrowRef && arrayStyle && Object.keys(arrayStyle).length > 0) {
    Object.keys(arrayStyle).forEach((key) => {
      if (arrowRef.current) {
        // @ts-ignore
        arrowRef.current.style[key] = arrayStyle[key];
      }
    });
  }

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
