// import React from 'react';
// import { BaseCardProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface CardClasses {
  wrapper: string;
}

export interface CardProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    card: () => CardClasses;
  };

  //...
}
