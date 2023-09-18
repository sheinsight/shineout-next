import { ReactNode } from 'react';
import { CommonType } from '../common/type';
import { BaseDescriptionsProps } from '@sheinx/hooks';

export interface DescriptionsClasses {
  /**
   * 最外层class
   */
  wrapper: string;

  //...
}

export interface DescriptionsProps
  extends Pick<CommonType, 'className' | 'style'>,
    BaseDescriptionsProps {
  jssStyle?: {
    descriptions: DescriptionsClasses;
    header: DescriptionsClasses;
    title: DescriptionsClasses;
    extra: DescriptionsClasses;
    body: DescriptionsClasses;
    table: DescriptionsClasses;
    row: DescriptionsClasses;
    label: DescriptionsClasses;
    value: DescriptionsClasses;
  };
  border?: boolean;
  extra?: ReactNode;
  size?: 'default' | 'large' | 'small';
  title?: ReactNode;
  layout?: 'horizontal' | 'vertical';
  colon?: ReactNode;
  //...
}
