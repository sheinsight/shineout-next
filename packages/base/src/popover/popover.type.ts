// import React from 'react';
// import { CommonType } from '../types/common';
// import { BasePopoverProps } from '@sheinx/hooks';

export interface PopoverClasses {
  /**
   * 最外层class
   */
  wrapper: string;

  //...
}

export interface PopoverProps {
  jssStyle?: {
    popover: PopoverClasses;
  };

  //...
}
