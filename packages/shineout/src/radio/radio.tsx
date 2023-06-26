import React from 'react';
import { Radio as UnStyledRadio } from '@sheinx/base';
import { useRadioStyle } from '@sheinx/shineout-style';
import { RadioProps } from './radio.type';

const Radio = <T,>(props: RadioProps<T>) => {
  const jssStyle = useRadioStyle();
  return <UnStyledRadio {...props} jssStyle={jssStyle} />;
};

export default Radio;
