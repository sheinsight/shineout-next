// import React from 'react';
// import { BaseStepsProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface StepsClasses {
  wrapper: string;
}

export interface StepsProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    steps: () => StepsClasses;
  };

  //...
}
