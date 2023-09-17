// import React from 'react';
// import { CommonType } from '../types/common';
// import { BaseDescriptionsProps } from '@sheinx/hooks';

export interface DescriptionsClasses {
  /**
   * 最外层class
   */
  wrapper: string;

  //...
}

export interface DescriptionsProps {
  jssStyle?: {
    descriptions: DescriptionsClasses;
  };

  //...
}
