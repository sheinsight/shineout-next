import React, { useEffect, useRef, useState } from 'react';
import dateUtil from './util';
import { DatePickerValue, UseDatePickerFormatProps } from './use-datepicker-format.type';
import shallowEqual from '../../utils/shallowEqual';
import { usePersistFn } from '../../common/use-persist-fn';
import useLatestObj from '../../common/use-latest-obj';

const convertValueToDateArr = (
  value: DatePickerValue,
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

const getFormat = (format: string | undefined, type: string) => {
  if (typeof format === 'string') return format;
  switch (type) {
    case 'datetime':
      return 'YYYY-MM-DD HH:mm:ss';
    case 'month':
      return 'YYYY-MM';
    case 'time':
      return 'HH:mm:ss';
    case 'week':
      return 'gggg ww';
    case 'year':
      return 'YYYY';
    case 'quarter':
      return 'YYYY-[Q]Q';
    default:
      return 'YYYY-MM-DD';
  }
};

const getDefaultMode = (type: string) => {
  let mode = '';
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
  return [mode, mode];
};

const useDatePickerFormat = <Value extends DatePickerValue>(
  props: UseDatePickerFormatProps<Value>,
) => {
  const { value, onChange, type, options = {}, range, disabled } = props;
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
    if (!arr[0]) arr[0] = arr[1] || currentArr[0] || new Date();
    if (range && !arr[1]) arr[1] = arr[0] || currentArr[1] || new Date();
    return arr as Date[];
  };

  const [mode, setMode] = useState(getDefaultMode(type));
  const [currentArr, setCurrentArr] = useState(getCurrentArr());
  const [targetArr, setTargetArr] = useState<Array<Date | undefined>>([]);

  const { current: context } = useRef({
    cachedDateArr: convertValueToDateArr(value, format, options),
  });

  type FormatValueType = Value extends any[] ? string[] : string;

  // 当edit 为true时，stateDate 否则返回 props date
  const [stateDate, setStateDate] = useState<(Date | undefined)[]>(context.cachedDateArr);
  const [edit, setEdit] = useState(false);

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
      } else {
        return dateArr.map((item) => {
          if (!item) return '';
          return dateUtil.format(item, format, options) || '';
        });
      }
    }
    return getFormatValueArr(dateArr);
  };

  const handlePropsValueChange = (value: DatePickerValue) => {
    const dateArr = convertValueToDateArr(value, format, options);
    context.cachedDateArr = dateArr;
    setStateDate(dateArr);
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

  const finishEdit = (...args: any) => {
    setEdit(false);
    const formatValue = getFormatValueArr(stateDate);
    const v = range ? formatValue : formatValue[0];
    if (range && (!stateDate[0] || !stateDate[1]) && !props.allowSingle) {
      return;
    }
    if (!shallowEqual(v, value)) {
      onChange?.(v as FormatValueType, ...args);
    }
  };

  const handleClear = usePersistFn((e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabledStatus === 'all') return;
    if (edit) {
      if (range) {
        if (disabledStatus === 'left') setStateDate((arr) => [arr[0], undefined]);
        else if (disabledStatus === 'right') setStateDate((arr) => [undefined, arr[1]]);
        else setStateDate([undefined, undefined]);
      } else {
        setStateDate([undefined]);
      }
    } else {
      const emptyValue = props.clearWithUndefined ? undefined : '';
      let v: string | undefined | Array<string | undefined> = emptyValue;
      if (range) {
        v = [emptyValue, emptyValue];
        if (Array.isArray(props.value)) {
          if (props.value[0] && disabledStatus === 'left') {
            v = [props.value[0] as string, emptyValue];
          } else if (props.value[1] && disabledStatus === 'right') {
            v = [emptyValue, props.value[1] as string];
          }
        }
      }
      props.onChange?.(v as FormatValueType);
    }
    props.onClear?.();
  });

  const handleInputChange = usePersistFn((str: string, index: number) => {
    // 比较 日期字符串是否符合format格式, 如果符合返回 true 否则返回 false
    const isValid = dateUtil.isValidString(str, format);
    if (!isValid) return;
    const date = dateUtil.toDateWithFormat(str, format, undefined, options);
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

  useEffect(() => {
    handlePropsValueChange(value);
  }, [value]);

  useEffect(() => {
    setControl(!edit);
  }, [edit]);

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
    handleInputChange,
  });

  return {
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
