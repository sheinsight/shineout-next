import React from 'react';
import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

/**
 * Gap Semantic DOM key 列表
 * - root: 外层 flex 容器
 * - item: 子元素包裹层
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type GapSemanticKey = 'root' | 'item';

export interface GapClasses {
  rootClass: string;
  wrapper: string;
  item: string;
}

/**
 * @title Gap
 */
export interface GapProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    gap?: () => GapClasses;
  };

  /**
   * @en Semantic DOM classNames for internal nodes (root / item).
   * @cn Semantic DOM 类名，可按 key 定制内部各节点（root / item）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<GapSemanticKey>;

  /**
   * @en Semantic DOM inline styles for internal nodes (root / item).
   * @cn Semantic DOM 内联样式，按 key 定制内部各节点。
   * @version 3.10.0
   */
  styles?: SemanticStyles<GapSemanticKey>;
  /**
   * @en column spacing in the horizontal direction
   * @cn 水平方向的列间距
   * @default 8
   */
  column?: number | string;

  /**
   * @en vertical line spacing
   * @cn 垂直方向的行间距
   * @default 8
   */
  row?: number | string;

  /**
   * @en the styles of child elements
   * @cn 子元素自定义样式
   */
  itemStyle?: React.CSSProperties;

  /**
   * @en children
   * @cn 子元素
   */
  children?: React.ReactNode;
}
