import React from 'react';

import { BaseFormProps, ObjectType } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface FormClasses {
  wrapper: string;
  wrapperInline: string;
}
export interface FormProps<V extends ObjectType>
  extends Partial<BaseFormProps<V>>,
    Pick<CommonType, 'className' | 'style'> {
  jssStyle: FormClasses;
  children?: React.ReactNode;
  // todo
  scrollToError?: boolean;
}
export default {};
