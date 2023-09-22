import { ReactNode } from 'react';
import { CommonType } from '../common/type';
import type { BaseCollapseProps } from '@sheinx/hooks';
import { CollapseItemProps } from './collapse-item.type';

export interface CollapseClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  borderLess: string;
}

export interface CollapseProps
  extends Pick<CommonType, 'className' | 'style'>,
    Pick<CollapseItemProps, 'destroyOnHide' | 'expandContent'>,
    BaseCollapseProps {
  jssStyle?: {
    collapse: CollapseClasses;
  };
  border?: boolean;
  expandContentPosition?: 'left' | 'right';
  triggerRegion?: 'icon' | 'header' | 'disabled';
  lazyload?: boolean;
  children?: ReactNode;
}
