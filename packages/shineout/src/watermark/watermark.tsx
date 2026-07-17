import React from 'react';
import { Watermark as UnStyledWatermark } from '@sheinx/base';
import { useWatermarkStyle } from '@sheinx/shineout-style';
import { WatermarkProps } from './watermark.type';

const jssStyle = {
  watermark: useWatermarkStyle,
};

export default (props: WatermarkProps) => {
  return <UnStyledWatermark {...props} jssStyle={jssStyle} />;
};
