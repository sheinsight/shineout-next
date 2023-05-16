import React from 'react';

import { ObjectType, BaseFormProps } from '@shined/hooks';
import { CommonType } from '../types/common';

export interface FormClasses {
  wrapper: string;
}
export interface FormProps<V extends ObjectType>
  extends BaseFormProps<V>,
    Pick<CommonType, 'className' | 'style'> {
  jssStyle: FormClasses;
  children?: React.ReactNode;
}
export default {};
