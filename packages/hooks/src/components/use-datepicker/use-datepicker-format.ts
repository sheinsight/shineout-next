import React, { useEffect, useRef, useState } from 'react';
import dateUtil from './util';
import { DatePickerValue, UseDatePickerFormatProps } from './use-datepicker-format.type';
import shallowEqual from '../../utils/shallowEqual';
import { usePersistFn } from '../../common/use-persist-fn';

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
  const { value, onChange, type, options = {}, range } = props;
  const format = getFormat(props.format, type);
  const [control, setControl] = useState(false);
  const getCurrentArr = () => {
    const arr = convertValueToDateArr(value, format, options);
    const currentArr = convertValueToDateArr(props.defaultCurrent, 'YYYY-MM-DD', options);
    if (!arr[0]) arr[0] = currentArr[0] || new Date();
    if (range && !arr[1]) arr[1] = currentArr[1] || new Date();
    return arr as Date[];
  };

  const [mode, setMode] = useState(getDefaultMode(type));
  const [currentArr, setCurrentArr] = useState(getCurrentArr());

  const { current: context } = useRef({
    cachedDateArr: convertValueToDateArr(value, format, options),
  });

  type FormatValueType = Value extends any[] ? string[] : string;

  // 当edit 为true时，stateDate 否则返回 props date
  const [stateDate, setStateDate] = useState<(Date | undefined)[]>(context.cachedDateArr);
  const [edit, setEdit] = useState(false);

  const getFormatValueArr = (dateArr: (Date | undefined)[]) => {
    return dateArr.map((item) => {
      if (!item) return props.clearWithUndefined ? undefined : '';
      return dateUtil.format(item, format, options);
    });
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
    if (edit) {
      setStateDate(range ? [undefined, undefined] : [undefined]);
    } else {
      const emptyValue = props.clearWithUndefined ? undefined : '';
      const value = props.range ? [emptyValue, emptyValue] : emptyValue;
      props.onChange?.(value as FormatValueType);
    }
    props.onClear?.();
  });

  useEffect(() => {
    handlePropsValueChange(value);
  }, [value]);

  useEffect(() => {
    setControl(!edit);
  }, [edit]);

  const dateArr = getDateArr();
  const resultArr = getFormatValueArr(dateArr);
  const isEmpty = dateArr.reduce((prev, cur) => prev && dateUtil.isInvalid(cur), true);

  return {
    resultArr,
    mode,
    setMode,
    dateArr: dateArr,
    setDateArr: setStateDate,
    // 编辑模式下只会修改内部状态
    startEdit,
    // 结束编辑会触发onChange
    finishEdit,
    currentArr,
    setCurrentArr,
    handleClear,
    isEmpty,
  };
};

export default useDatePickerFormat;
