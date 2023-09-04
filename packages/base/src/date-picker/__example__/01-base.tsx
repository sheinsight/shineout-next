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
  return (
    <div>
      <DatePicker jssStyle={{ datePicker: datePickerStyle }} />
    </div>
  );
};
