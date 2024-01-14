// import React from 'react';
// import { BaseGridProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface GridClasses {
  wrapper: string;
}

export interface GridProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    grid: () => GridClasses;
  };

  //...
}
