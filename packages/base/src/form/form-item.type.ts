import React from 'react';

import { FormLabelConfig } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface FormItemClasses {
  wrapper: string;
  wrapperLabelTop: string;
  wrapperInline: string;
  wrapperLabelVerticalMiddle: string;
  wrapperLabelVerticalBottom: string;
  wrapperKeepHeight: string;
  wrapperRequired: string;
  wrapperTip: string;
  label: string;
  labelLeft: string;
  control: string;
  error: string;
  tip: string;
}
export interface FormItemProps extends FormLabelConfig, Pick<CommonType, 'className' | 'style'> {
  label?: React.ReactNode;
  tip?: React.ReactNode;
  required?: boolean;
  children?: React.ReactNode;
  jssStyle?: FormItemClasses;
}
