import { ReactNode } from 'react';
import { CommonType } from '../common/type';
import type { BaseCollapseProps, BaseCollapseItemContext } from '@sheinx/hooks';
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
    Pick<BaseCollapseItemContext, 'triggerRegion'>,
    BaseCollapseProps {
  jssStyle?: {
    collapse: CollapseClasses;
  };
  border?: boolean;
  expandContentPosition?: 'left' | 'right';
  lazyload?: boolean;
  children?: ReactNode;
}
