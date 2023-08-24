// import React from 'react';
// import { CommonType } from '../types/common';
// import { BaseAlertProps } from '@sheinx/hooks';

export interface AlertClasses {
  /**
   * 最外层class
   */
  wrapper: string;

  //...
}

export interface AlertProps {
  jssStyle?: {
    alert: AlertClasses;
  };

  //...
}
