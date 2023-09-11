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
  const [value, setValue] = React.useState(['2021-02-02', '2021-02-03']);
  return (
    <div>
      <DatePicker
        value={value}
        range
        jssStyle={{ datePicker: datePickerStyle }}
        onChange={(v) => {
          console.log('change', v);
          setValue(v);
        }}
      />
    </div>
  );
};
