// import React from 'react';
// import { CommonType } from '../types/common';
// import { BaseDatePickerProps } from '@sheinx/hooks';

export interface DatePickerClasses {
  /**
   * 最外层class
   */
  wrapper: string;

  //...
}

export interface DatePickerProps {
  jssStyle?: {
    datePicker: DatePickerClasses;
  };

  //...
}
