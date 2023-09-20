import { ReactNode } from 'react';
import { CommonType } from '../common/type';
// import { BaseCollapseProps } from '@sheinx/hooks';

export interface CollapseClasses {
  /**
   * 最外层class
   */
  wrapper: string;
}

export interface CollapseProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    collapse: CollapseClasses;
  };
  accordion?: boolean;
  border?: boolean;
  expandContent?: ReactNode;
  expandContentPosition?: 'left' | 'right';
  active?: string | string[];
  defaultActive?: string | string[];
  triggerRegion?: 'icon' | 'header' | 'disabled';
  lazyload?: boolean;
  destroyonHide?: boolean;
  onChange?: (key?: string, keys?: string[]) => void;
  // TODO: children必须为符合collapseItemProps类型的item
  children?: ReactNode;
}
