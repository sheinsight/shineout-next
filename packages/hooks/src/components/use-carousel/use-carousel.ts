import { useEffect, useRef, useState } from 'react';
import { usePersistFn } from '../../common/use-persist-fn';
import useLatestObj from '../../common/use-latest-obj';

export interface UseCarouselProps {
  total: number;
  /**
   * 自动播放间隔时间, 等于0 不自动播放
   */
  interval?: number;
  onMove?: (
    current: number,
    extra: { prev: number; direction: 'forward' | 'backward'; moveTo: (num: number) => void },
  ) => void;
}

export type DirectionType = 'forward' | 'backward' | 'stop';

const useCarousel = (props: UseCarouselProps) => {
  const { total, interval = 0 } = props;
  const [{ current, pre, direction }, setState] = useState({
    current: 0,
    pre: -1,
    direction: 'stop' as DirectionType,
  });
  const { current: context } = useRef({
    timer: null as NodeJS.Timeout | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setNext: (next: number) => {},
  });

  const autoPlay = interval > 0 && total > 1;
  const moveTo = usePersistFn((i: number) => {
    let next = i;
    if (next === current) return;
    let dir: DirectionType = next > current ? 'forward' : 'backward';
    if (next >= total) {
      dir = 'forward';
      next = 0;
    } else if (next < 0) {
      dir = 'backward';
      next = total - 1;
    }
    setState({
      current: next,
      pre: current,
      direction: dir,
    });
    if (props.onMove) {
      props.onMove(next, {
        prev: current,
        direction: dir,
        moveTo: moveTo,
      });
    }
    context.setNext(next + 1);
  });
  const stop = usePersistFn(() => {
    if (context.timer) {
      clearTimeout(context.timer);
      context.timer = null;
    }
  });
  const setNext = usePersistFn((next: number) => {
    if (!autoPlay) return;
    stop();
    context.timer = setTimeout(() => {
      moveTo(next);
    }, interval);
  });
  context.setNext = setNext;
  const start = usePersistFn(() => {
    setNext(current + 1);
  });
  const forward = usePersistFn(() => {
    moveTo(current + 1);
  });
  const backward = usePersistFn(() => {
    moveTo(current - 1);
  });
  const func = useLatestObj({
    start,
    stop,
    forward,
    backward,
    moveTo,
  });

  useEffect(() => {
    if (interval > 0 && total > 1) {
      start();
    }
  }, []);
  return {
    current,
    pre,
    direction,
    func,
  };
};

export default useCarousel;
