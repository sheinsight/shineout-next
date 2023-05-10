import React from 'react';
import type { ObjectType, BaseFormProps } from '@shined/hooks';
import type { CommonType } from '../types/common';

export interface FormClasses {
  wrapper: string;
}
export interface FormProps<V extends ObjectType>
  extends BaseFormProps<V>,
    Pick<CommonType, 'className' | 'style'> {
  jssStyle: FormClasses;
  children?: React.ReactNode;
}
