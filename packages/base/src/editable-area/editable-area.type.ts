// import React from 'react';
// import { CommonType } from '../types/common';
// import { BaseEditableAreaProps } from '@sheinx/hooks';

export interface EditableAreaClasses {
  /**
   * 最外层class
   */
  wrapper: string;

  //...
}

export interface EditableAreaProps {
    jssStyle?: {
        editableArea: EditableAreaClasses;
    };

    //...
}
