import { DatePicker } from '@sheinx/base';
import { useButtonStyle, useDatePickerStyle, useInnerTitleStyle } from '@sheinx/shineout-style';

import type { BaseDatePickerProps, DatePickerProps, DatePickerValueType } from './date-picker.type';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  datePicker: useDatePickerStyle,
  button: useButtonStyle,
  innerTitle: useInnerTitleStyle,
};
const BaseDatePicker = <Value extends DatePickerValueType>(props: BaseDatePickerProps<Value>) => {
  return <DatePicker jssStyle={jssStyle} {...props} />;
};

export default <Value extends DatePickerValueType = DatePickerValueType>(
  props: DatePickerProps<Value>,
) => {
  return useFieldCommon(props, BaseDatePicker<Value>);
};
