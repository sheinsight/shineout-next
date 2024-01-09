import React from 'react';
import { Steps } from '@sheinx/base';
import { useStepsStyle } from '@sheinx/shineout-style';
import { StepsProps } from './steps.type';

const jssStyle = {
  steps: useStepsStyle,
};
export default (props: StepsProps) => {
  return <Steps jssStyle={jssStyle} {...props} />;
};
