import { useMemo } from 'react';
import { DatePicker } from '@sheinx/base';
import { useDatePickerStyle, useButtonStyle, useInnerTitleStyle } from '@sheinx/shineout-style';

import type { BaseDatePickerProps, DatePickerProps, DatePickerValueType } from './date-picker.type';
import useFieldCommon from '../hooks/use-field-common';

const BaseDatePicker = <Value extends DatePickerValueType>(props: BaseDatePickerProps<Value>) => {
  const datePickerStyle = useDatePickerStyle();
  const buttonStyle = useButtonStyle();
  const innerTitleStyle = useInnerTitleStyle();
  const jssStyle = useMemo(
    () => ({
      datePicker: datePickerStyle,
      button: buttonStyle,
      innerTitle: innerTitleStyle,
    }),
    [datePickerStyle, buttonStyle, innerTitleStyle],
  );

  return <DatePicker jssStyle={jssStyle} {...props} />;
};

export default <Value extends DatePickerValueType = DatePickerValueType>(
  props: DatePickerProps<Value>,
) => {
  return useFieldCommon<BaseDatePickerProps<Value>, BaseDatePickerProps<Value>['value']>(
    props,
    BaseDatePicker,
  );
};
