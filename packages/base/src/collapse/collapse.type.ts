import { ReactNode } from 'react';
import { CommonType } from '../common/type';
import type { BaseCollapseProps, BaseCollapseItemContext } from '@sheinx/hooks';
import { CollapseItemProps } from './collapse-item.type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

/**
 * Collapse Semantic DOM key 列表
 * - root:    最外层容器
 * - header:  面板头部区域
 * - title:   标题内容
 * - extra:   额外内容区
 * - content: 面板展开内容区
 * - icon:    展开/折叠图标
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type CollapseSemanticKey = 'root' | 'header' | 'title' | 'extra' | 'content' | 'icon';

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
   * @en Semantic DOM classNames for internal nodes.
   * @cn 语义化 DOM 类名，用于定制内部节点样式。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<CollapseSemanticKey>;

  /**
   * @en Semantic DOM styles for internal nodes.
   * @cn 语义化 DOM 行内样式，用于定制内部节点样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<CollapseSemanticKey>;
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
  /**
   * @en Simple mode for all items, remove content top/bottom padding and background color
   * @cn 所有子面板开启简洁模式，移除内容区域的上下内边距和背景色
   * @default false
   * @version 3.9.16
   */
  simple?: boolean;
}
