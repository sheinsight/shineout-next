// import React from 'react';
// import { BaseStepsProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { StepsClasses } from '@sheinx/shineout-style';

export type JssStyleType = {
  steps: () => StepsClasses;
};

export interface StepsProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: JssStyleType;
  children: React.ReactNode;
}
