import React, { CSSProperties, ReactNode } from 'react';
import { CommonType } from '../common/type';
// import { BaseDescriptionsProps } from '@sheinx/hooks';

export interface DescriptionsClasses {
  /**
   * 最外层class
   */
  wrapper: string;

  //...
}

export interface DescriptionsItemProps {
  key?: React.Key;
  label?: ReactNode;
  value?: ReactNode;
  span?: number;
  labelStyle?: CSSProperties;
  valueStyle?: CSSProperties;
}

export interface DescriptionsProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    descriptions: DescriptionsClasses;
  };
  border?: boolean;
  extra?: ReactNode;
  item?: DescriptionsItemProps[];
  size?: 'default' | 'large' | 'small';
  title?: ReactNode;
  layout?: 'horizontal' | 'vertical';
  colon?: ReactNode;
  column?: number;
  //...
}
