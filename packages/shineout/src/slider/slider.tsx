import React from 'react';
import { Slider } from '@sheinx/base';
import { useSliderStyle } from '@sheinx/shineout-style';
import { BaseSliderProps, SliderProps, SliderValueType } from './slider.type';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  slider: useSliderStyle,
};
const BaseSlider = <Value extends SliderValueType>(props: BaseSliderProps<Value>) => {
  return <Slider jssStyle={jssStyle} {...props} />;
};

BaseSlider.displayName = 'ShineoutSlider';

export default <Value extends SliderValueType>(props: SliderProps<Value>) => {
  return useFieldCommon(props, BaseSlider<Value>, 'number');
};
