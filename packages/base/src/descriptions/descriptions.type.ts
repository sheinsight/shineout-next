import { ReactNode } from 'react';
import { CommonType } from '../common/type';
import { BaseDescriptionsProps } from '@sheinx/hooks';

export interface DescriptionsClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  header: string;
  title: string;
  extra: string;
  body: string;
  table: string;
  row: string;
  label: string;
  value: string;
}

export interface DescriptionsProps
  extends Pick<CommonType, 'className' | 'style'>,
    BaseDescriptionsProps {
  jssStyle?: {
    descriptions: DescriptionsClasses;
  };
  border?: boolean;
  extra?: ReactNode;
  size?: 'default' | 'large' | 'small';
  title?: ReactNode;
  layout?: 'horizontal' | 'vertical';
  colon?: ReactNode;
  //...
}
