import React from 'react';

import { ObjectType, BaseFormProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface FormClasses {
  wrapper: string;
}
export interface FormProps<V extends ObjectType>
  extends Partial<BaseFormProps<V>>,
    Pick<CommonType, 'className' | 'style'> {
  jssStyle: FormClasses;
  children?: React.ReactNode;
}
export default {};
