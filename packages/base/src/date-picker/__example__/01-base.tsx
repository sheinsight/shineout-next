/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { DatePicker } from '@sheinx/base';
import { useDatePickerStyle } from '@sheinx/shineout-style';

export default () => {
  const datePickerStyle = useDatePickerStyle();
  const [value, setValue] = React.useState(['', '']);
  return (
    <div>
      <DatePicker
        range
        value={value}
        type={'time'}
        allowSingle
        jssStyle={{ datePicker: datePickerStyle }}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </div>
  );
};
