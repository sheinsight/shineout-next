// import React from 'react';
// import { BaseTreeSelectProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface TreeSelectClasses {
  wrapper: string;
}

export interface TreeSelectProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    treeSelect: () => TreeSelectClasses;
  };

  //...
}
