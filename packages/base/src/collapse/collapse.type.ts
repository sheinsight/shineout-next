import { ReactNode } from 'react';
import { CommonType } from '../common/type';
import type { BaseCollapseProps, BaseCollapseItemContext } from '@sheinx/hooks';
import { CollapseItemProps } from './collapse-item.type';

export interface CollapseClasses {
  rootClass: string;
  /**
   * 最外层class
   */
  wrapper: string;
  borderLess: string;
}

export interface CollapseProps
  extends Pick<CommonType, 'className' | 'style'>,
    Pick<CollapseItemProps, 'expandIcon'>,
    Pick<BaseCollapseItemContext, 'triggerRegion'>,
    BaseCollapseProps {
  jssStyle?: {
    collapse: CollapseClasses;
  };
  /**
   * @en Whether to show the border
   * @cn 是否显示边框
   * @default true
   */
  border?: boolean;
  /**
   * @en The position of the expand icon
   * @cn 折叠图标位置
   * @default 'left'
   */
  expandIconPosition?: 'left' | 'right';
  /**
   * @en The position of the extra content
   * @cn 扩展内容位置
   * @default 'right'
   */
  extraPosition?: 'left' | 'right';
  /**
   * @en The content inside the collapse
   * @cn 折叠面板内的内容
   */
  children?: ReactNode;
  /**
   * @en Whether to enable collapse animation
   * @cn 是否开启折叠动画
   * @default true
   * @version 3.6.0
   */
  animation?: boolean;
}
