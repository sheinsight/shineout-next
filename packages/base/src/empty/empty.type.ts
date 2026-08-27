import React from 'react';
import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';
// import { BaseEmptyProps } from '@sheinx/hooks';

/**
 * Empty Semantic DOM key 列表
 * - root:        最外层容器
 * - icon:        图标/图片容器
 * - description: 描述文字
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type EmptySemanticKey = 'root' | 'icon' | 'description';

export interface EmptyClasses {
  rootClass: string;
  empty: string;
  wrapper: string;
  image: string;
  description: string;
}

export interface EmptyProps
  extends Pick<CommonType, 'className' | 'style'>,
    React.HTMLAttributes<HTMLDivElement> {
  jssStyle?: {
    empty?: () => EmptyClasses;
  };

  /**
   * @en Semantic DOM classNames for internal nodes.
   * @cn 语义化 DOM 类名，用于定制内部节点样式。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<EmptySemanticKey>;

  /**
   * @en Semantic DOM styles for internal nodes.
   * @cn 语义化 DOM 行内样式，用于定制内部节点样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<EmptySemanticKey>;
  /**
   * @en Empty state image address, priority is higher than icon
   * @cn 空状态图片地址,优先级高于icon
   */
  imgSrc?: string;
  /**
   * @en Empty state icon. Enhanced in v3.8.0 to support global configuration via setConfig
   * @cn 空状态图标。3.8.0版本增强，支持通过setConfig进行全局配置
   */
  icon?: React.ReactNode;
  /**
   * @en Description, if false, the description will not be displayed. Enhanced in v3.8.0 to support global configuration via setConfig
   * @cn 描述，若为false则不显示描述。3.8.0版本增强，支持通过setConfig进行全局配置
   */
  description?: React.ReactNode | boolean;
}
