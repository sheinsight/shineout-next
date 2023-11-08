/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Rate } from '@sheinx/base';
import { useRateStyle } from '@sheinx/shineout-style';

const jssStyle = {
  rate: useRateStyle,
};

export default () => {
  return (
    <div>
      <Rate jssStyle={jssStyle} allowHalf />
    </div>
  );
};
