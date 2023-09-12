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
        range
        placeholder={['开始日期', '结束日期']}
        value={value}
        allowSingle
        align={'left'}
        jssStyle={{ datePicker: datePickerStyle }}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </div>
  );
};
