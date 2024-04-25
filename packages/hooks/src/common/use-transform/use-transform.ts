import { useState, useEffect } from 'react';
import { addResizeObserver } from '../../utils/dom/element';
import { banOverScrollx } from '../../utils/dom/scroll-behavior';
import { UseTransformProps } from './use-transform.type';

const useTransform = <T>(props: UseTransformProps) => {
  const { direction, containerRef, targetRef, autoScroll } = props;
  const isRtl = direction === 'X' && props.isRtl;

  const [delta, setDelta] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [atStart, setAtStart] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const style = {
    transform: `translate${direction}(${-delta}px)`,
  };

  const getDimension = () => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return {};
    const targetDimension = direction === 'X' ? target.clientWidth : target.clientHeight;
    const containerDimension = direction === 'X' ? container.clientWidth : container.clientHeight;
    return {
      targetDimension,
      containerDimension,
    };
  };

  const setTransform = (dimension: number) => {
    const { targetDimension, containerDimension } = getDimension();
    if (!containerDimension || !targetDimension) return;
    // 内部容器的宽度小于外部容器的宽度，无需移动
    if (targetDimension < containerDimension) {
      if (atEnd === true) setAtEnd(false);
      if (atStart === true) setAtStart(false);
      return;
    }

    // 移动距离小于0，说明已经到达最左边或者最上边，无需移动
    const single = isRtl ? -1 : 1;
    if (dimension * single <= 0) {
      setDelta(0);
      if (atEnd === true) setAtEnd(false);
      if (atStart === false) setAtStart(true);
      return;
    }
    // 移动距离大于最大可移动距离，说明已经到达最右边或者最下边，无需移动
    const maxDelta = targetDimension - containerDimension;
    if (dimension * single >= maxDelta) {
      setDelta(maxDelta * single);
      if (atEnd === false) setAtEnd(true);
      if (atStart === true) setAtStart(false);
      return;
    }
    if (atStart === true) setAtStart(false);
    if (atEnd === true) setAtEnd(false);
    setDelta(dimension);
  };

  const handleTransform = (e: React.WheelEvent<T>) => {
    const { deltaX, deltaY } = e;
    const dimension = direction === 'X' ? deltaX : deltaY;

    // 抵达边界，无需移动
    if (isRtl) {
      if (atStart && dimension >= 0) return;
      if (atEnd && dimension <= 0) return;
    } else {
      if (atStart && dimension <= 0) return;
      if (atEnd && dimension >= 0) return;
    }
    setTransform(dimension + delta);
  };

  const handleResize = () => {
    const { targetDimension, containerDimension } = getDimension();
    if (!containerDimension || !targetDimension) return;
    if (targetDimension <= containerDimension) {
      setShouldScroll(false);
    } else {
      setShouldScroll(true);
    }
  };


  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;
    if (delta === 0 && atStart === false) {
      setAtStart(true);
    }
    let removeWheelListener: () => void;
    if (autoScroll) {
      const removeMouse = shouldScroll ? banOverScrollx(container) : null;
      removeWheelListener = addResizeObserver(container, handleResize);
      return () => {
        removeMouse?.();
        removeWheelListener?.();
      };
    }
  }, [containerRef.current, targetRef.current, shouldScroll]);

  return {
    atStart,
    atEnd,
    style,
    delta,
    shouldScroll,
    setTransform,
    handleTransform,
    handleResize,
  };
};

export default useTransform;
