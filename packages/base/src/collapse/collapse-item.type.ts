import { CSSProperties, ReactNode } from 'react';
import { CommonType } from '../common/type';

export interface CollapseItemClasses {
  /**
   * 最外层class
   */
  wrapper: string;
}

export interface CollapseItemProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    collapseItem: CollapseItemClasses;
  };
  name: string;
  destroyOnHide?: boolean;
  disabled?: boolean;
  showExpandIcon?: boolean;
  expandContent?: ReactNode;
  extra?: ReactNode;
  title?: ReactNode;
  contentStyle?: CSSProperties;
}
