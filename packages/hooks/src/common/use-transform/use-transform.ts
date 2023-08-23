import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!container || !target) return;
    if (delta === 0 && atStart === false) {
      setAtStart(true);
    }

    if (autoScroll) {
      const observer = new ResizeObserver(() => {
        const { targetDimension, containerDimension } = getDimension();
        if (!containerDimension || !targetDimension) return;
        if (targetDimension <= containerDimension) {
          setShouldScroll(false);
        } else {
          setShouldScroll(true);
        }
      });

      observer.observe(container);

      return () => {
        observer.unobserve(container);
      };
    }
  }, [container, target]);

  return {
    atStart,
    atEnd,
    style,
    delta,
    shouldScroll,
    setTransform,
    handleTransform,
  };
};

export default useTransform;
