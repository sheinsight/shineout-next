// import React from 'react';
import { BaseStepProps, StepProps } from './step.type';
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
  renderIcon?: (index: number, status?: StepsStatusType) => React.ReactNode;
  onChange?: (index: number) => void;
}

export interface StepStyleProps
  extends Pick<
      BaseStepProps,
      'jssStyle' | 'size' | 'status' | 'title' | 'description' | 'renderIcon'
    >,
    Pick<StepProps, 'labelPlacement' | 'direction'> {
  index: number;
  onChange?: () => void;
}
