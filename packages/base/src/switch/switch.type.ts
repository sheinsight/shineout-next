// import React from 'react';
// import { CommonType } from '../types/common';
// import { BaseSwitchProps } from '@sheinx/hooks';

export interface SwitchClasses {
  /**
   * 最外层class
   */
  wrapper: string;

  //...
}

export interface SwitchProps {
  jssStyle?: {
    switch: SwitchClasses;
  };

  //...
}
