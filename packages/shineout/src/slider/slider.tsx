import React from 'react';
import { Slider } from '@sheinx/base';
import { useSliderStyle } from '@sheinx/shineout-style';
import { SliderProps } from './slider.type';

const jssStyle = {
  slider: useSliderStyle,
};
export default <Value extends number | number[]>(props: SliderProps<Value>) => {
  return <Slider jssStyle={jssStyle} {...props} />;
};
