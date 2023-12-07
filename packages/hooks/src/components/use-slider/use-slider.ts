// import {useState } from 'react';
import { toPrecision } from '../../utils/number';
import usePersistFn from '../../common/use-persist-fn';
import useLatestObj from '../../common/use-latest-obj';
import type { UseSliderProps } from './use-slider.type';

/**
 *  结构：
 *   <track>
 *     <path>
 *      <startPoint>
 *      <endPoint>
 *     <handler>
 *   <track>
 *  状态 无
 *
 */

const defaultScale = [0, 10, 100];
export const useSlider = <Value extends number | number[]>(props: UseSliderProps<Value>) => {
  const { scale = defaultScale, step = 1 } = props;
  // const [isDragging, setIsDragging] = useState(false)
  // const [start, setStart] = useState(0)
  const getValueFromRate = usePersistFn((rate: number) => {
    const range = scale.length - 1;
    if (step === 0) return scale[Math.round(rate * range)];

    if (rate >= 1) return scale[range];
    const ps = Math.floor(rate * range);
    const min = scale[ps];
    const max = scale[ps + 1];
    const count = (max - min) / step;
    const sper = (rate - ps / range) * range;

    return toPrecision(min + Math.round(sper * count) * step);
  });
  const getRateFromValue = usePersistFn((value: number) => {
    const range = scale.length - 1;
    let ps = 0;
    scale.forEach((s, i) => {
      if (value > s) ps = i;
    });
    if (ps >= range) return 1;

    const min = scale[ps];
    const max = scale[ps + 1];

    return (ps + (value - min) / (max - min)) / range;
  });

  //  const handleStartDrag =

  const func = useLatestObj({
    getValueFromRate,
    getRateFromValue,
  });

  return {
    func,
  };
};
