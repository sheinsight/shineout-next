// import React from 'react';
// import { CommonType } from '../types/common';
// import { BaseTabsProps } from '@sheinx/hooks';

export interface TabsClasses {
  /**
   * 最外层class
   */
  wrapper: string;

  //...
}

export interface TabsProps {
  jssStyle?: {
    tabs: TabsClasses;
  };

  //...
}
