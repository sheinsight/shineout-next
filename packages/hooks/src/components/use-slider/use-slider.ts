import { useState, useRef } from 'react';
import { toPrecision } from '../../utils/number';
import usePersistFn from '../../common/use-persist-fn';
import useLatestObj from '../../common/use-latest-obj';
import useDragMock from '../../common/use-drag-mock';
import type { UseSliderProps } from './use-slider.type';

/**
 *  结构：
 *   <track>
 *     <inner>
 *      <startPoint>
 *      <endPoint>
 *     <inner>
 *   <track>
 *
 */

const getValueFromRate = (per: number, scale: number[], step = 0) => {
  const range = scale.length - 1;

  if (step === 0) return scale[Math.round(per * range)];

  if (per >= 1) return scale[range];
  const ps = Math.floor(per * range);
  const min = scale[ps];
  const max = scale[ps + 1];
  const count = (max - min) / step;
  const sper = (per - ps / range) * range;

  return toPrecision(min + Math.round(sper * count) * step);
};

const getRateFromValue = (value: number, scale: number[]) => {
  if (value <= scale[0]) return 0;
  if (value >= scale[scale.length - 1]) return 1;
  const range = scale.length - 1;
  let ps = 0;
  scale.forEach((s, i) => {
    if (value > s) ps = i;
  });
  if (ps >= range) return 1;

  const min = scale[ps];
  const max = scale[ps + 1];

  return (ps + (value - min) / (max - min)) / range;
};

export const useSlider = <Value extends number | number[]>(props: UseSliderProps<Value>) => {
  const { scale, step, direction = 'ltr' } = props;
  const isReserve = direction === 'rtl';

  const [rate, setRate] = useState([0, 0]);

  const startValue = props.range && Array.isArray(props.value) ? props.value[0] : 0;
  const endValue = (
    props.range && Array.isArray(props.value) ? props.value[1] : props.value || 0
  ) as number;

  const { current: context } = useRef({
    dragIndex: -1,
    clickLock: false,
    clickLockTimer: null as NodeJS.Timeout | null,
  });

  const trackRef = useRef<HTMLDivElement>(null);

  const handleDragStart = usePersistFn(() => {
    setRate([getRateFromValue(startValue, scale), getRateFromValue(endValue, scale)]);
  });

  const lockClick = usePersistFn(() => {
    context.clickLock = true;
    if (context.clickLockTimer) clearTimeout(context.clickLockTimer);
    context.clickLockTimer = setTimeout(() => {
      context.clickLock = false;
    }, 100);
  });
  const isDisabled = usePersistFn((value: number) => {
    if (typeof props.disabled === 'function') {
      return props.disabled(value);
    }
    return !!props.disabled;
  });

  const handleDragEnd = usePersistFn(() => {
    lockClick();
    const start = getValueFromRate(rate[0], scale, step);
    const end = getValueFromRate(rate[1], scale, step);
    context.dragIndex = -1;
    if (props.range) {
      props.onChange([start, end] as Value);
    } else {
      props.onChange(end as Value);
    }
  });
  const handleDragMove = usePersistFn((deltaX: number, deltaY: number, mouseEvent?: MouseEvent) => {
    setRate((r) => {
      const target = trackRef.current;
      if (!target) return r;
      const newRate = [...r];
      const v = context.dragIndex === 0 ? r[0] : r[1];

      let rate: number;

      // If disabled function is used and we have mouse event, use absolute position
      if (typeof props.disabled === 'function' && mouseEvent) {
        const rect = target.getBoundingClientRect();
        const currentIndicatorRate = v;

        // Calculate mouse position rate
        let mouseRate: number;
        if (props.vertical) {
          mouseRate = (rect.bottom - mouseEvent.clientY) / rect.height;
        } else {
          mouseRate = isReserve
            ? (rect.right - mouseEvent.clientX) / rect.width
            : (mouseEvent.clientX - rect.left) / rect.width;
        }

        // Only allow movement if mouse crossed the indicator position
        if (mouseRate > currentIndicatorRate) {
          // Mouse is to the right/top, allow moving right/up
          rate = Math.max(Math.min(mouseRate, 1), 0);
        } else if (mouseRate < currentIndicatorRate) {
          // Mouse is to the left/bottom, allow moving left/down
          rate = Math.max(Math.min(mouseRate, 1), 0);
        } else {
          // Mouse is at same position, no change
          return r;
        }
      } else {
        // Normal delta-based movement
        const max = props.vertical ? target.clientHeight : target.clientWidth;
        const delta = props.vertical ? deltaY * -1 : deltaX * (isReserve ? -1 : 1);
        rate = Math.max(v + delta / max, 0);
      }

      if (rate > 1) {
        rate = 1;
        if (typeof props.onIncrease === 'function') props.onIncrease();
      }

      newRate[context.dragIndex] = rate;

      // Check if the new value would be disabled
      const newValue = getValueFromRate(newRate[context.dragIndex], scale, step);
      if (isDisabled(newValue)) {
        // Stay at current position to prevent flickering
        return r;
      }

      if (newRate[0] > newRate[1]) {
        context.dragIndex = context.dragIndex === 0 ? 1 : 0;
        const temp = newRate[0];
        newRate[0] = newRate[1];
        newRate[1] = temp;
      }
      return newRate;
    });
  });

  const dragInfo = useDragMock({
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
  });

  const handleStartMouseDown = (e: React.MouseEvent) => {
    context.dragIndex = 0;
    dragInfo.handleMouseDown(e);
  };
  const handleEndMouseDown = (e: React.MouseEvent) => {
    context.dragIndex = 1;
    dragInfo.handleMouseDown(e);
  };

  const handleTrackClick = usePersistFn((e: React.MouseEvent) => {
    if (context.clickLock) return;
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const rate = !props.vertical
      ? (isReserve ? rect.right - e.clientX : e.clientX - rect.left) / rect.width
      : (rect.bottom - e.clientY) / rect.height;
    const value = getValueFromRate(rate, scale, step);

    // Check if the clicked value would be disabled
    if (isDisabled(value)) return;

    if (props.range) {
      let start = startValue;
      let end = endValue;
      if (value < startValue) {
        start = value;
      } else {
        end = value;
      }
      if (start === startValue && end === endValue) return;
      props.onChange([start, end] as Value);
    } else {
      if (value === endValue) return;
      props.onChange(value as Value);
    }
  });

  const getTrackInnerStyle = (start: number, end: number) => {
    if (props.vertical)
      return {
        bottom: start * 100 + '%',
        top: (1 - end) * 100 + '%',
      };
    if (isReserve) {
      return {
        right: start * 100 + '%',
        left: (1 - end) * 100 + '%',
      };
    }
    return {
      left: start * 100 + '%',
      right: (1 - end) * 100 + '%',
    };
  };

  const func = useLatestObj({
    handleStartMouseDown,
    handleEndMouseDown,
    handleTrackClick,
  });

  // During dragging, optionally snap to quantized values in discrete mode
  const start = dragInfo.isDragging
    ? props.discrete
      ? getRateFromValue(getValueFromRate(rate[0], scale, step), scale)
      : rate[0]
    : getRateFromValue(startValue, scale);
  const end = dragInfo.isDragging
    ? props.discrete
      ? getRateFromValue(getValueFromRate(rate[1], scale, step), scale)
      : rate[1]
    : getRateFromValue(endValue, scale);
  const innerStyle = getTrackInnerStyle(start, end);

  return {
    func,
    trackRef,
    dragIndex: context.dragIndex,
    start,
    end,
    startValue: getValueFromRate(start, scale, step),
    endValue: getValueFromRate(end, scale, step),
    innerStyle,
  };
};

export default useSlider;
