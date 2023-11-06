// import React from 'react';
// import { BaseStepsProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { StepsClasses } from '@sheinx/shineout-style';

export type StepsStatusType = 'wait' | 'process' | 'finish' | 'error';

export type JssStyleType = {
  steps: () => StepsClasses;
};

export interface StepsProps extends Pick<CommonType, 'className' | 'style' | 'size'> {
  jssStyle?: JssStyleType;
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  type?: 'default' | 'dot' | 'arrow';
  labelPlacement?: 'horizontal' | 'vertical';
  status?: StepsStatusType;
  current?: number;
  onChange?: (index: number) => void;
}

export type StepStyleProps = Pick<StepsProps, 'type' | 'size' | 'status'>;
