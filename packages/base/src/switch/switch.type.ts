import React from 'react';
import { BaseCheckProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface SwitchClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperSmall: string;
  wrapperLarge: string;
  indicator: string;
  content: string;
  wrapperChecked: string;
  wrapperDisabled: string;
  loading: string;
  textPadding: string;
}

export interface SwitchProps
  extends Omit<BaseCheckProps, 'defaultChecked'>,
    Pick<CommonType, 'style' | 'className' | 'size'> {
  jssStyle?: {
    switch?: () => SwitchClasses;
  };
  content?: [React.ReactNode, React.ReactNode];
  loading?: boolean;
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  beforeChange?: (value: boolean) => boolean | undefined;
}
