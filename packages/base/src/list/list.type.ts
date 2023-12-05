// import React from 'react';
// import { BaseListProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface ListClasses {
  wrapper: string;
}

export interface ListProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    list: () => ListClasses;
  };

  //...
}
