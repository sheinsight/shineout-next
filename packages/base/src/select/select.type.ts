// import React from 'react';
// import { BaseSelectProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface SelectClasses {
  wrapper: string;
}

export interface SelectProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    select: () => SelectClasses;
  };

  //...
}
