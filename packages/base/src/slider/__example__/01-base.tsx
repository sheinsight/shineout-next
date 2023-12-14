/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Slider } from '@sheinx/base';
import { useSliderStyle } from '@sheinx/shineout-style';

const jssStyle = {
  slider: useSliderStyle,
};

export default () => {
  return (
    <div>
      <Slider jssStyle={jssStyle} />
    </div>
  );
};
