import { useEffect, useRef, useState } from 'react';
import { usePersistFn } from '../../common/use-persist-fn';
import useLatestObj from '../../common/use-latest-obj';

export interface UseCarouselProps {
  total: number;
  /**
   * 自动播放间隔时间, 等于0 不自动播放
   */
  interval?: number;
  /**
   * 默认当前索引（非受控模式）
   */
  defaultValue?: number;
  /**
   * 当前索引（受控模式）
   */
  value?: number;
  /**
   * 当前索引变化回调
   */
  onChange?: (current: number) => void;
  onMove?: (
    current: number,
    extra: { prev: number; direction: 'forward' | 'backward'; moveTo: (num: number) => void },
  ) => void;
}

export type DirectionType = 'forward' | 'backward' | 'stop';

const useCarousel = (props: UseCarouselProps) => {
  const { total, interval = 0, defaultValue = 0, value: valueProp, onChange } = props;

  // 规范化初始值，确保在有效范围内
  const normalizeIndex = (index: number) => {
    if (index < 0) return 0;
    if (index >= total) return Math.max(0, total - 1);
    return index;
  };

  const initialValue = normalizeIndex(valueProp !== undefined ? valueProp : defaultValue);

  const [{ current, pre, direction }, setState] = useState({
    current: initialValue,
    pre: -1,
    direction: 'stop' as DirectionType,
  });
  const { current: context } = useRef({
    timer: null as NodeJS.Timeout | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setNext: (next: number) => {},
    prevValue: initialValue, // 用于追踪上一次的值
  });

  // 判断是否为受控模式
  const isControlled = valueProp !== undefined;
  // 获取实际使用的 current 值
  const actualCurrent = isControlled ? normalizeIndex(valueProp) : current;

  // 在受控模式下，计算 direction 和 pre
  let actualPre = pre;
  let actualDirection = direction;
  if (isControlled) {
    if (actualCurrent !== context.prevValue) {
      actualPre = context.prevValue;
      actualDirection = actualCurrent > context.prevValue ? 'forward' : 'backward';
      context.prevValue = actualCurrent;
    }
  }

  const autoPlay = interval > 0 && total > 1;
  const moveTo = usePersistFn((i: number) => {
    let next = i;
    const prevCurrent = actualCurrent;

    if (next === prevCurrent) return;

    let dir: DirectionType = next > prevCurrent ? 'forward' : 'backward';
    if (next >= total) {
      dir = 'forward';
      next = 0;
    } else if (next < 0) {
      dir = 'backward';
      next = total - 1;
    }

    // 非受控模式下更新内部状态
    if (!isControlled) {
      setState({
        current: next,
        pre: prevCurrent,
        direction: dir,
      });
    }
    // 受控模式下不更新内部状态，由外部 value 控制

    // 触发 onChange 回调
    if (onChange) {
      onChange(next);
    }

    // 触发 onMove 回调（向后兼容）
    if (props.onMove) {
      props.onMove(next, {
        prev: prevCurrent,
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
    setNext(actualCurrent + 1);
  });
  const forward = usePersistFn(() => {
    moveTo(actualCurrent + 1);
  });
  const backward = usePersistFn(() => {
    moveTo(actualCurrent - 1);
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

  // 受控模式下，当外部 value 变化时，重置自动轮播定时器
  useEffect(() => {
    if (isControlled && autoPlay && valueProp !== undefined) {
      stop();
      context.setNext(actualCurrent + 1);
    }
  }, [valueProp]);

  return {
    current: actualCurrent,
    pre: actualPre,
    direction: actualDirection,
    func,
  };
};

export default useCarousel;
