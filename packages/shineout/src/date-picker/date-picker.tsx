import { useMemo } from 'react';
import { DatePicker } from '@sheinx/base';
import { useDatePickerStyle } from '@sheinx/shineout-style';
import { DatePickerProps } from './date-picker.type';

export default (props: DatePickerProps) => {
  const {} = props;
  const datePickerStyle = useDatePickerStyle();
  const jssStyle = useMemo(() => ({ datePicker: datePickerStyle }), [datePickerStyle]);

  return (
    <DatePicker
      jssStyle={jssStyle}
      // ...
    />
  );
};
