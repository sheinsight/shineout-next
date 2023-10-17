import { CSSProperties, ReactNode } from 'react';
import type { CommonType } from '../common/type';
import type { BaseCollapseItemProps } from '@sheinx/hooks';

export interface CollapseItemClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  header: string;
  active: string;
  icon: string;
  title: string;
  extra: string;
  content: string;
  expanded: string;
  contentMain: string;
  noIcon: string;
  rightIcon: string;
  disabled: string;
  activeTransform: string;
  activeTransformRight: string;
  region: string;
}

export interface CollapseItemProps
  extends Pick<CommonType, 'className' | 'style'>,
    BaseCollapseItemProps {
  jssStyle?: {
    collapseItem: CollapseItemClasses;
  };
  destroyOnHide?: boolean;
  showExpandIcon?: boolean;
  expandContent?: ReactNode;
  extra?: ReactNode;
  title?: ReactNode;
  contentStyle?: CSSProperties;
  children?: ReactNode;
}
