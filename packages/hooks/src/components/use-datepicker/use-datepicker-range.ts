import { usePersistFn } from '../../common/use-persist-fn';
import { useLatestObj } from '../../common/use-latest-obj';
import { useRangeProps } from './use-datepicker-range.type';
import utils from './util';
import { useRef } from 'react';
import { isFunc } from '../../utils/is';

const useRangePick = (props: useRangeProps) => {
  const {
    range,
    setDateArr,
    setTargetArr,
    setMode,
    options,
    defaultTime,
    close,
    min,
    max,
    disabled,
  } = props;

  const { current: context } = useRef({ modeCache: props.mode });

  const defaultTimeArr = (
    Array.isArray(defaultTime) ? props.defaultTime : [props.defaultTime, props.defaultTime]
  ) as Array<number | string | Date>;

  const setDate = (index: number, date: Date, noClose: boolean = false) => {
    setDateArr((arr) => {
      const newArr = [...arr];
      newArr[index] = date;
      if (date && range && index === 0 && newArr[1]) {
        if (typeof range === 'number') {
          const rangeMax = utils.addSeconds(date, range, options);
          if (rangeMax.getTime() < newArr[1].getTime()) {
            newArr[1] = rangeMax;
          }
        }
        if (date.getTime() > newArr[1]!.getTime()) {
          const a = utils.cloneTime(
            new Date(date),
            arr[1] || defaultTimeArr[1],
            'HH:mm:ss',
            options,
          );
          newArr[1] = a.getTime() > date.getTime() ? a : new Date(date);
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

  const setCurrent = usePersistFn((index: number, date: Date, ...args: any[]) => {
    props.setCurrentArr((arr: Date[]) => {
      const newArr = [...arr];
      newArr[index] = date;
      const modeCache = context.modeCache;
      if (date && modeCache[0] === modeCache[1]) {
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
    }, ...args);
  });

  const setCurrentStart = usePersistFn((date: Date, ...args: any[]) => {
    setCurrent(0, date, ...args);
  });

  const setCurrentEnd = usePersistFn((date: Date, ...args: any[]) => {
    setCurrent(1, date, ...args);
  });

  const setDateStart = usePersistFn((date: Date, noClose?: boolean) => {
    setDate(0, date, noClose);
    setCurrentStart(date);
  });

  const setDateEnd = usePersistFn((date: Date, noClose?: boolean) => {
    setDate(1, date, noClose);
    setCurrentEnd(date);
  });

  const setTargetStart = usePersistFn((date?: Date) => {
    setTargetArr([date, undefined]);
  });

  const getStartDobule = usePersistFn((date: Date) => {
    const end = utils.getDateWithTime(
      date,
      props.dateArr[1],
      defaultTimeArr[1],
      endMin,
      endMax,
      options,
    );
    return end;
  });

  const getEndDobule = usePersistFn((date: Date) => {
    const start = utils.getDateWithTime(
      date,
      props.dateArr[1],
      defaultTimeArr[1],
      startMin,
      startMax,
      options,
    );
    return start;
  });

  const setTargetEnd = usePersistFn((date?: Date) => {
    setTargetArr([undefined, date]);
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

  const startDisabled = usePersistFn((date: Date) => {
    if (isFunc(disabled)) {
      return disabled(date, 'start', props.dateArr[0], props.dateArr[1]);
    }
    if (Array.isArray(disabled)) {
      const disabledDate = disabled[0];
      if (isFunc(disabledDate)) {
        return disabledDate(date);
      } else {
        return !!disabledDate;
      }
    }
    return !!disabled;
  });

  const endDisabled = usePersistFn((date: Date) => {
    if (isFunc(disabled)) {
      return disabled(date, 'end', props.dateArr[0], props.dateArr[1]);
    }
    if (Array.isArray(disabled)) {
      const disabledDate = disabled[1];
      if (isFunc(disabledDate)) {
        return disabledDate(date);
      } else {
        return !!disabledDate;
      }
    }
    return !!disabled;
  });
  const func = useLatestObj({
    setModeStart,
    setModeEnd,
    setDateStart,
    setDateEnd,
    setCurrentStart,
    setCurrentEnd,
    setTargetStart,
    setTargetEnd,
    startDisabled,
    endDisabled,
    getStartDobule,
    getEndDobule,
  });
  const minDate = min ? utils.toDate(min, options) : undefined;
  const maxDate = max ? utils.toDate(max, options) : undefined;

  let endMin = minDate;
  let endMax = maxDate;

  const disabledEnd = Array.isArray(disabled) && disabled[1] === true;

  if (props.dateArr[0] && !disabledEnd) {
    if (!endMin || utils.compareAsc(endMin, props.dateArr[0]) < 0) {
      endMin = props.dateArr[0];
    }
    if (typeof range === 'number') {
      const rangeDate = utils.addSeconds(props.dateArr[0], range, options);
      if (!endMax || utils.compareAsc(endMax, rangeDate) > 0) {
        endMax = rangeDate;
      }
    }
  }

  let startMin = minDate;
  let startMax = maxDate;

  let staticStartMin = minDate;
  let staticStartMax = maxDate;

  if (disabledEnd && props.dateArr[1]) {
    if (!startMax || utils.compareAsc(startMax, props.dateArr[1]) > 0) {
      startMax = props.dateArr[1];
    }

    if (typeof range === 'number') {
      const rangeDate = utils.addSeconds(props.dateArr[1], -range, options);
      if (!startMin || utils.compareAsc(startMin, rangeDate) < 0) {
        startMin = rangeDate;
      }
    }
  }

  if (!disabledEnd && props.dateArr[1]) {
    if (!staticStartMax || utils.compareAsc(staticStartMax, props.dateArr[1]) > 0) {
      staticStartMax = props.dateArr[1];
    }

    if (typeof range === 'number') {
      const rangeDate = utils.addSeconds(props.dateArr[1], -range, options);
      if (!staticStartMin || utils.compareAsc(staticStartMin, rangeDate) < 0) {
        staticStartMin = rangeDate;
      }
    }
  }

  return {
    defaultTimeArr,
    endMin,
    endMax,
    startMin,
    startMax,

    staticStartMin,
    staticStartMax,
    func,
  };
};

export default useRangePick;
