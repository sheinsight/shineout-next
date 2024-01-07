import { useState, useEffect } from 'react';
import { addResizeObserver } from '../../utils/dom/element';
import { banOverScrollx } from '../../utils/dom/scroll-behavior';
import { UseTransformProps } from './use-transform.type';

const useTransform = <T>(props: UseTransformProps) => {
  const { direction, container, target, autoScroll } = props;

  const [delta, setDelta] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [atStart, setAtStart] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);

  const style = {
    transform: `translate${direction}(${-delta}px)`,
  };

  const getDimension = () => {
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
      if (atEnd === false) {
        setAtEnd(true);
      }
      return;
    }

    // 移动距离大于0，说明已经到达最左边或者最上边，无需移动
    if (dimension <= 0) {
      setDelta(0);
      if (atStart === false) {
        setAtStart(true);
      }
      return;
    }
    // 移动距离大于最大可移动距离，说明已经到达最右边或者最下边，无需移动
    const maxDelta = targetDimension - containerDimension;
    if (dimension >= maxDelta) {
      setDelta(maxDelta);
      if (atEnd === false) {
        setAtEnd(true);
      }
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
    if (atStart && dimension <= 0) return;
    if (atEnd && dimension >= 0) return;

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

  const getRectDiff = (node: HTMLElement, pNode: HTMLElement) => {
    const nodeRect = node.getBoundingClientRect();
    const pNodeRect = pNode.getBoundingClientRect();
    const scaleX = pNode.offsetWidth / pNodeRect.width;
    const scaleY = pNode.offsetHeight / pNodeRect.height;
    return {
      left: (nodeRect.left - pNodeRect.left) * scaleX,
      right: (nodeRect.right - pNodeRect.right) * scaleX,
      top: (nodeRect.top - pNodeRect.top) * scaleY,
      bottom: (nodeRect.bottom - pNodeRect.bottom) * scaleY,
    };
  };

  useEffect(() => {
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
  }, [container, target, shouldScroll]);

  return {
    atStart,
    atEnd,
    style,
    delta,
    shouldScroll,
    setTransform,
    handleTransform,
    getRectDiff,
  };
};

export default useTransform;
