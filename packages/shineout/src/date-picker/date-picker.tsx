import { useMemo } from 'react';
import { DatePicker as BaseDatePicker, getLocale, useConfig } from '@sheinx/base';
import {
  useButtonStyle,
  useDatePickerStyle,
  useInnerTitleStyle,
  usePopoverStyle,
  useLinkStyle,
} from '@sheinx/shineout-style';
import { convertValueToDateArr, getFormat, getFormatValueArr } from '@sheinx/hooks'

import type { BaseDatePickerProps, DatePickerProps, DatePickerValueType } from './date-picker.type';
import useFieldCommon from '../hooks/use-field-common';


const jssStyle = {
  datePicker: useDatePickerStyle,
  button: useButtonStyle,
  innerTitle: useInnerTitleStyle,
  popover: usePopoverStyle,
  link: useLinkStyle,
};
const DatePicker = <Value extends DatePickerValueType>(props: BaseDatePickerProps<Value>) => {
  return <BaseDatePicker jssStyle={jssStyle} {...props} />;
};

DatePicker.displayName = 'ShineoutDatePicker';

export default <Value extends DatePickerValueType = DatePickerValueType>(
  props: DatePickerProps<Value>,
) => {
  const { locale } = useConfig();

  // datepicker 默认值需要提格式化前处理，否则内部会根据 format 进行格式化并再次触发 onChange，参考 v1 v2 的 value hoc 行为
  const defaultValue = useMemo(() => {
    if (props.defaultValue) {
      const options = {
        timeZone: props.timeZone,
        weekStartsOn: Number(getLocale(locale, 'startOfWeek')),
      }
      const type = props.type || 'date';
      const format = getFormat(props.format, type);
      const dateArr = convertValueToDateArr(props.defaultValue, format, options);
      const formattedDefaultValue = getFormatValueArr({
        dateArr,
        format,
        type,
        options
      });

      return (props.range ? formattedDefaultValue : formattedDefaultValue[0]) as Value;
    }
    return props.defaultValue;
  }, [])


  return useFieldCommon({
    ...props,
    defaultValue,
  }, DatePicker<Value>);
};
