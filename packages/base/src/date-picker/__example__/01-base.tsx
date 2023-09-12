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
        allowSingle
        range
        align={'left'}
        jssStyle={{ datePicker: datePickerStyle }}
        defaultPickerValue={['2021-12-02', '2021-12-03']}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </div>
  );
};
