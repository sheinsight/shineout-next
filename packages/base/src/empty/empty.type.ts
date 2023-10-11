import React from 'react';
import { CommonType } from '../common/type';
// import { BaseEmptyProps } from '@sheinx/hooks';

export interface EmptyClasses {
  empty: string;
  wrapper: string;
  image: string;
  description: string;
}

export interface EmptyProps
  extends Pick<CommonType, 'className' | 'style'>,
    React.HTMLAttributes<HTMLDivElement> {
  jssStyle?: {
    empty: () => EmptyClasses;
  };
  imgSrc?: string;
  icon?: React.ReactNode;
  description?: React.ReactNode | boolean;
}
