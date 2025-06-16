import React, { useEffect, useRef, useState } from 'react';
import dateUtil from './util';
import type {
  DatePickerModeType,
  DatePickerValueType,
  UseDatePickerFormatProps,
} from './use-datepicker-format.type';
import shallowEqual from '../../utils/shallow-equal';
import { usePersistFn } from '../../common/use-persist-fn';
import useLatestObj from '../../common/use-latest-obj';

export const convertValueToDateArr = (
  value: DatePickerValueType,
  format: string,
  options: {
    timeZone?: string;
    weekStartsOn?: number;
  },
) => {
  const valueArr = Array.isArray(value) ? value : [value];
  return valueArr.map((item) => {
    if (!item) return undefined;
    return dateUtil.toDateWithFormat(item, format, undefined, options);
  });
};

export const getFormat = (format: string | undefined, type: string) => {
  if (typeof format === 'string') return format;
  switch (type) {
    case 'datetime':
      return 'YYYY-MM-DD HH:mm:ss';
    case 'month':
      return 'YYYY-MM';
    case 'time':
      return 'HH:mm:ss';
    case 'week':
      return 'gggg-ww';
    case 'year':
      return 'YYYY';
    case 'quarter':
      return 'YYYY-[Q]Q';
    default:
      return 'YYYY-MM-DD';
  }
};

const getTypeMode = (type: string) => {
  let mode: DatePickerModeType;
  switch (type) {
    case 'year':
      mode = 'year';
      break;
    case 'month':
      mode = 'month';
      break;
    case 'quarter':
      mode = 'quarter';
      break;
    case 'time':
      mode = 'time';
      break;
    default:
      mode = 'day';
  }
  return mode;
};

const getDefaultMode = (type: string) => {
  const mode = getTypeMode(type);
  return [mode, mode];
};

interface FormatValueType {
  dateArr: (Date | undefined)[];
  format: string;
  fmt?: string;
  type: 'date' | 'datetime' | 'month' | 'time' | 'week' | 'year' | 'quarter';
  clearWithUndefined?: boolean;
  options: {
    timeZone?: string;
    weekStartsOn?: number;
  };
}

export const getFormatValueArr = (opts: FormatValueType) => {
  const { dateArr, format, clearWithUndefined, options, type } = opts;
  const fmt = getFormat(format, type);
  return dateArr.map((item) => {
    if (!item) return clearWithUndefined ? undefined : '';
    return dateUtil.format(item, fmt, options);
  });
};

const useDatePickerFormat = <Value extends DatePickerValueType>(
  props: UseDatePickerFormatProps<Value>,
) => {
  const { value, onChange, type, options = {}, range, disabled, clearable } = props;
  const format = getFormat(props.format, type);
  const [control, setControl] = useState(false);

  let disabledStatus: 'left' | 'right' | 'all' | undefined = undefined;
  const disabledLeft = Array.isArray(disabled) && disabled[0] && typeof disabled[0] !== 'function';
  const disabledRight = Array.isArray(disabled) && disabled[1] && typeof disabled[1] !== 'function';
  const disabledAll = typeof disabled !== 'function' && !Array.isArray(disabled) && disabled;
  if (disabledAll || (disabledLeft && disabledRight)) disabledStatus = 'all';
  else if (disabledLeft) disabledStatus = 'left';
  else if (disabledRight) disabledStatus = 'right';

  const getCurrentArr = () => {
    const arr = convertValueToDateArr(value, format, options);
    const currentArr = convertValueToDateArr(props.defaultCurrent, 'YYYY-MM-DD', options);

    const validArr = arr.filter((item) => item);
    const validCurrentArr = currentArr.filter((item) => item);
    if (!validArr.length && currentArr.length) return validCurrentArr as Date[];

    if (!arr[0]) arr[0] = arr[1] || currentArr[0] || new Date();
    if (range && !arr[1]) arr[1] = arr[0] || currentArr[1] || new Date();
    return arr as Date[];
  };

  const [mode, setMode] = useState(getDefaultMode(type));
  const [currentArr, setCurrentArr] = useState(getCurrentArr());
  const [targetArr, setTargetArr] = useState<Array<Date | undefined>>([]);
  const [inputArr, setInputArr] = useState<Array<Date | undefined>>([]);
  const [params, setParams] = useState<{ type: any; quick: any }>({
    type: undefined,
    quick: undefined,
  });

  const { current: context } = useRef({
    cachedDateArr: convertValueToDateArr(value, format, options),
    modeDisabledStart: {} as Record<string, (d: Date, triggerType?: string) => boolean>,
    modeDisabledEnd: {} as Record<string, (d: Date, triggerType?: string) => boolean>,
  });

  type FormatValueType = Value extends any[] ? string[] : string;

  // 当edit 为true时，stateDate 否则返回 props date
  const [stateDate, setStateDate] = useState<(Date | undefined)[]>(context.cachedDateArr);
  const [edit, setEdit] = useState(false);

  // 收集所有的disabled
  const registerModeDisabled = usePersistFn(
    (position: 'start' | 'end' | undefined, mode: string, fn: (d: Date) => boolean) => {
      if (position === 'end') {
        context.modeDisabledEnd[mode] = fn;
      } else {
        context.modeDisabledStart[mode] = fn;
      }
    },
  );

  const setCurrentArrWithParams = usePersistFn(
    (
      arg: React.SetStateAction<Date[]>,
      type: string,
      quick: { name: React.ReactNode; value: any } | undefined,
    ) => {
      setCurrentArr(arg);
      if (!type && !quick) return;
      setParams({ type, quick });
    },
  );

  const isDisabledInputDate = (rangeData: (Date | undefined)[]) => {
    const start = rangeData[0];
    const end = rangeData[1];

    let isDis = false;
    if (disabled && typeof disabled === 'function') {
      if (start && disabled(start)) isDis = true;
      if (end && disabled(end)) isDis = true;
      if (isDis) return isDis;
    }
    if (start && end) {
      if (dateUtil.compareAsc(start, end) > 0) {
        isDis = true;
        return isDis;
      }
    }
    if (range && typeof range === 'number') {
      if (start) {
        if (!end) return isDis;
        const rangeDate = dateUtil.addSeconds(start, range, options);
        if (dateUtil.compareAsc(end, rangeDate) > 0) {
          isDis = true;
        }
      }
      if (end) {
        if (!start) return isDis;
        const rangeDate = dateUtil.addSeconds(end, -range, options);
        if (dateUtil.compareAsc(start, rangeDate) < 0) {
          isDis = true;
        }
      }
    }
    return isDis;
  };

  const isDisabledDate = usePersistFn(
    (date: Date, position: 'start' | 'end' | undefined, triggerType?: string) => {
      const mode = getTypeMode(type);
      const disabled =
        position === 'end' ? context.modeDisabledEnd[mode] : context.modeDisabledStart[mode];

      let isDisabled = disabled ? disabled(date) : false;

      if (triggerType === 'input' && !isDisabled) {
        isDisabled = isDisabledInputDate(
          position === 'end' ? [currentArr[0], date] : [date, currentArr[1]],
        );
      }

      if (type === 'datetime' && !isDisabled) {
        const disabledTime =
          position === 'end' ? context.modeDisabledEnd['time'] : context.modeDisabledStart['time'];
        isDisabled = disabledTime ? disabledTime(date, triggerType) : false;
      }
      return isDisabled;
    },
  );

  const getFormatValueArr = (dateArr: (Date | undefined)[], fmt?: string) => {
    return dateArr.map((item) => {
      if (!item) return props.clearWithUndefined ? undefined : '';
      return dateUtil.format(item, fmt || format, options);
    });
  };

  const getResultValueArr = (dateArr: (Date | undefined)[]) => {
    if (props.formatResult) {
      if (typeof props.formatResult === 'string') {
        return getFormatValueArr(dateArr, props.formatResult);
      } else if (typeof props.formatResult === 'function') {
        return dateArr.map((item) => (props.formatResult as (date?: Date) => string)(item));
      } else {
        return dateArr.map((item) => {
          if (!item) return '';
          return dateUtil.format(item, format, options) || '';
        });
      }
    }
    return getFormatValueArr(dateArr);
  };

  const handlePropsValueChange = (value: DatePickerValueType) => {
    const dateArr = convertValueToDateArr(value, format, options);
    context.cachedDateArr = dateArr;
    setStateDate(dateArr);
    if (!value) return;
    if (Array.isArray(value) && !value[0] && !value[1]) {
      return;
    }
    const formatValue = getFormatValueArr(dateArr);
    const v = range ? formatValue : formatValue[0];
    if (!shallowEqual(v, value)) {
      onChange?.(v as FormatValueType);
    }
  };

  const getDateArr = () => {
    if (!control) return stateDate;
    return context.cachedDateArr;
  };

  const startEdit = () => {
    setEdit(true);
    setCurrentArr(getCurrentArr());
    setStateDate(context.cachedDateArr);
    setMode(getDefaultMode(type));
  };

  const finishEdit = () => {
    setEdit(false);
    let formatValue = getFormatValueArr(stateDate);

    if (inputArr.length && inputArr.some((i) => i)) {
      const inputValue = stateDate.map((item, index) => {
        if (inputArr[index]) return inputArr[index];
        return item;
      });

      const isDis = isDisabledInputDate(inputValue);
      if (!isDis) {
        formatValue = getFormatValueArr(inputValue);
      }
    }
    const v = range ? formatValue : formatValue[0];
    if (range && (!stateDate[0] || !stateDate[1]) && !props.allowSingle) {
      return;
    }
    if (!shallowEqual(v, value)) {
      const { quick } = params;
      onChange?.(v as FormatValueType, quick);
    }
  };

  const handleClear = usePersistFn((e?: React.MouseEvent) => {
    if (!clearable) return;
    e?.stopPropagation();
    if (disabledStatus === 'all') return;

    setInputArr([]);

    if (edit) {
      if (range) {
        if (disabledStatus === 'left') setStateDate((arr) => [arr[0], undefined]);
        else if (disabledStatus === 'right') setStateDate((arr) => [undefined, arr[1]]);
        else setStateDate([undefined, undefined]);
      } else {
        setStateDate([undefined]);
      }
    } else {
      const emptyValue = props.clearWithUndefined || props.clearToUndefined ? undefined : '';
      let v: string | undefined | Array<string | undefined> = emptyValue;
      if (range) {
        v = [emptyValue, emptyValue];
        if (Array.isArray(props.value)) {
          if (props.value[0] && disabledStatus === 'left') {
            v = [props.value[0] as string, emptyValue];
          } else if (props.value[1] && disabledStatus === 'right') {
            v = [emptyValue, props.value[1] as string];
          } else if (props.clearToUndefined) {
            v = undefined;
          }
        }
      }
      props.onChange?.(v as FormatValueType);
    }

    props.onClear?.();
  });

  const handleInputChange = usePersistFn((str: string, index: number, isFromBlur?: boolean) => {
    // 比较 日期字符串是否符合format格式, 如果符合返回 true 否则返回 false
    const isValid = dateUtil.isValidString(str, format, isFromBlur);
    if (!isValid) return;
    const date = dateUtil.toDateWithFormat(str, format, undefined, options);

    setInputArr((prev) => {
      const arr = [...prev];
      arr[index] = date;
      return arr;
    });

    // 此次校验是由输入触发的
    if (date && isDisabledDate(date, index === 1 ? 'end' : 'start', 'input')) {
      return;
    }

    setStateDate((prev) => {
      const arr = [...prev];
      arr[index] = date;
      return arr;
    });
    setCurrentArr((prev) => {
      const arr = [...prev];
      arr[index] = date;
      return arr;
    });
  });

  // 失焦时，需要宽松模式校验，eg: 2025-06-16 18:00 和 2025-06-16 18 都可以校验通过
  const handleInputBlur = usePersistFn((str: string, index: number) => {
    handleInputChange(str, index, true);
  });

  const handleClearInputArr = usePersistFn((index?: number) => {
    if (index !== undefined) {
      setInputArr((prev) => {
        const arr = [...prev];
        arr[index] = undefined;
        return arr;
      });
      return;
    }
    setInputArr([]);
  });

  useEffect(() => {
    handlePropsValueChange(value);
  }, [value]);

  useEffect(() => {
    setControl(!edit);
  }, [edit]);

  useEffect(() => {
    const { type, quick } = params;
    if (!type) return;
    const pickerValue = getFormatValueArr(currentArr) as string[];
    props.onPickerChange?.(range ? pickerValue : pickerValue[0], quick, type);
  }, [params]);

  const dateArr = getDateArr();
  const resultArr = getResultValueArr(dateArr);
  const targetResultArr = getResultValueArr(targetArr);
  const isEmpty = dateArr.reduce((prev, cur) => prev && dateUtil.isInvalid(cur), true);
  const func = useLatestObj({
    setMode,
    setDateArr: setStateDate,
    // 编辑模式下只会修改内部状态
    startEdit,
    // 结束编辑会触发onChange
    finishEdit,
    setCurrentArr,
    setTargetArr,
    handleClear,
    handleClearInputArr,
    handleInputChange,
    handleInputBlur,
    registerModeDisabled,
    setCurrentArrWithParams,
    isDisabledDate,
  });

  return {
    inputArr,
    resultArr,
    targetResultArr,
    dateArr: dateArr,
    disabledStatus,
    currentArr,
    mode,
    isEmpty,
    format,
    func,
  };
};

export default useDatePickerFormat;
