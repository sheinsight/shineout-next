import { usePersistFn } from '../../common/use-persist-fn';
import { useLatestObj } from '../../common/use-latest-obj';
import { useRangeProps } from './use-datepicker-range.type';
import utils from './util';
import { useRef } from 'react';

const useRangePick = (props: useRangeProps) => {
  const { range, setDateArr, setMode, options, defaultTime, close, min, max } = props;

  const { current: context } = useRef({ modeCache: props.mode });

  const defaultTimeArr = (
    Array.isArray(defaultTime) ? props.defaultTime : [props.defaultTime, props.defaultTime]
  ) as Array<number | string | Date>;

  const setDate = (index: number, date: Date, noClose: boolean = false) => {
    setDateArr((arr) => {
      const newArr = [...arr];
      newArr[index] = date;
      if (range && index === 0 && newArr[1]) {
        if (date.getTime() > newArr[1]!.getTime()) {
          newArr[1] = new Date(date);
        }
      }
      if (!noClose) {
        if (!range) close();
        if (range && newArr[1 - index] !== undefined) {
          close();
        }
      }

      return newArr;
    });
  };

  const setCurrent = usePersistFn((index: number, date: Date) => {
    props.setCurrentArr((arr: Date[]) => {
      const newArr = [...arr];
      newArr[index] = date;
      const modeCache = context.modeCache;
      if (modeCache[0] === modeCache[1]) {
        const mode = modeCache[0];
        if (range && index === 0 && newArr[1]) {
          if (mode === 'year') {
            if (utils.getStartYear(date, options) > utils.getStartYear(newArr[1]!, options)) {
              newArr[1] = new Date(date);
            }
          } else if (date.getTime() > newArr[1]!.getTime()) {
            newArr[1] = new Date(date);
          }
        }
        if (range && index === 1 && newArr[0]) {
          if (mode === 'year') {
            if (utils.getStartYear(date, options) < utils.getStartYear(newArr[0]!, options)) {
              newArr[0] = new Date(date);
            }
          } else if (date.getTime() < newArr[0]!.getTime()) {
            newArr[0] = new Date(date);
          }
        }
      }

      return newArr;
    });
  });

  const setCurrentStart = usePersistFn((date: Date) => {
    setCurrent(0, date);
  });

  const setCurrentEnd = usePersistFn((date: Date) => {
    setCurrent(1, date);
  });

  const setDateStart = usePersistFn((date: Date, noClose?: boolean) => {
    setDate(0, date, noClose);
  });

  const setDateEnd = usePersistFn((date: Date, noClose?: boolean) => {
    setDate(1, date, noClose);
  });

  const setModeStart = usePersistFn((m) => {
    context.modeCache[0] = m;
    setMode((mode) => {
      const newMode = [m, mode[1]];
      context.modeCache[0] = m;
      return newMode;
    });
  });

  const setModeEnd = usePersistFn((m) => {
    context.modeCache[1] = m;
    setMode((mode) => {
      const newMode = [mode[0], m];
      return newMode;
    });
  });
  const func = useLatestObj({
    setModeStart,
    setModeEnd,
    setDateStart,
    setDateEnd,
    setCurrentStart,
    setCurrentEnd,
  });
  const minDate = min ? utils.toDate(min, options) : undefined;
  const maxDate = max ? utils.toDate(max, options) : undefined;

  let endMin = minDate;
  if (!endMin || (props.dateArr[0] && utils.compareAsc(endMin, props.dateArr[0]) < 0)) {
    endMin = props.dateArr[0];
  }
  let endMax = maxDate;
  if (!maxDate && typeof range === 'number' && props.dateArr[0]) {
    const rangeDate = utils.addSeconds(props.dateArr[0], range, options);
    if (utils.compareAsc(endMax, rangeDate) > 0) {
      endMax = rangeDate;
    }
  }

  return {
    defaultTimeArr,
    endMin,
    endMax,
    startMin: minDate,
    startMax: maxDate,
    func,
  };
};

export default useRangePick;
