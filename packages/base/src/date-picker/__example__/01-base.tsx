/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { DatePicker } from '@sheinx/base';
import { useDatePickerStyle, useButtonStyle } from '@sheinx/shineout-style';

export default () => {
  const datePickerStyle = useDatePickerStyle();
  const buttonStyle = useButtonStyle();
  const [value, setValue] = React.useState(['', '']);
  return (
    <div>
      <DatePicker
        range
        value={value}
        showSelNow
        quickSelect={[
          {
            name: '此刻',
            value: () => [Date.now(), Date.now()],
          },
          {
            name: '此刻2',
            value: () => [Date.now(), Date.now()],
          },
        ]}
        type={'datetime'}
        allowSingle
        jssStyle={{ datePicker: datePickerStyle, button: buttonStyle }}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </div>
  );
};
