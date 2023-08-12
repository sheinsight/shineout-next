// import React from 'react';
// import { CommonType } from '../types/common';
// import { BaseSpinProps } from '@sheinx/hooks';

export interface SpinClasses {
  /**
   * 最外层class
   */
  wrapper: string;

  //...
}

export interface SpinProps {
  jssStyle?: {
    spin: SpinClasses;
  };

  //...
}
