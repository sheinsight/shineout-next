import React from 'react';
import { Spin as UnStyledSpin } from '@sheinx/base';
import { useSpinStyle } from '@sheinx/shineout-style';
import { SpinProps } from './spin.type';

const jssStyle = {
  spin: useSpinStyle,
};
export default (props: SpinProps) => {
  return <UnStyledSpin {...props} jssStyle={jssStyle} />;
};
