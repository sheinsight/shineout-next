import React, { useRef, useContext, useEffect } from 'react';
import { getClosestScrollContainer, usePositionStyle, util } from '@sheinx/hooks';
import ReactDOM from 'react-dom';
import { AbsoluteListProps } from './absolute-list.type';
import useContainer from './use-container';
import AbsoluteContext from './absolute-context';

const AbsoluteList = (props: AbsoluteListProps) => {
  const {
    position,
    children,
    parentElRef,
    scrollElRef: scrollElRefProp,
    fixedWidth,
    zIndex = 1051,
    focus,
    popupElRef,
    updateKey,
    popupGap,
    adjust,
    onAdjust,
    offset,
    destroy = false,
    lazy = true,
  } = props;

  const { absolute: defaultAbsolute, scrollElRef: scrollElRefContext } = useContext(AbsoluteContext);
  const absolute = props.absolute === undefined ? defaultAbsolute : props.absolute;

  const { getRoot } = useContainer({
    container: typeof absolute === 'function' ? absolute : undefined,
  });

  const { current: context } = useRef({ rendered: false });
  const closestScrollContainerRef = React.useRef<HTMLElement | null>(null);

  // scrollElRef的3个来源：1. 外部传入 2. 上下文传入 3. 最接近的滚动容器
  const finalScrollElRef = React.useMemo(() => {
    return scrollElRefProp || scrollElRefContext || closestScrollContainerRef;
  }, [scrollElRefProp, scrollElRefContext]);

  useEffect(() => {
    if (scrollElRefProp || scrollElRefContext || !focus) return;
    const closestScrollContainer = getClosestScrollContainer(parentElRef.current);
    if (closestScrollContainer) {
      closestScrollContainerRef.current = closestScrollContainer;
    }
  }, [parentElRef, scrollElRefProp, scrollElRefContext, focus]);

  const { style } = usePositionStyle({
    getContainer: getRoot,
    position,
    absolute: !!absolute,
    parentElRef,
    show: focus,
    fixedWidth,
    zIndex,
    scrollElRef: finalScrollElRef,
    popupElRef,
    updateKey,
    popupGap,
    adjust,
    offset,
    onAdjust,
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
