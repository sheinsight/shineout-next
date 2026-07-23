import React from 'react';
import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

/**
 * Divider Semantic DOM key 列表
 * - root:    分割线容器
 * - content: 文字内容区域
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type DividerSemanticKey = 'root' | 'content';

export interface DividerClasses {
  rootClass: string;
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperDashed: string;
  vertical: string;
  horizontal: string;
  withText: string;
  withTextCenter: string;
  withTextLeft: string;
  withTextRight: string;
  innerText: string;
}

export interface DividerProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    divider: () => DividerClasses;
  };

  /**
   * @en Semantic DOM classNames for internal nodes (root / content).
   * @cn Semantic DOM 类名，可按 key 定制内部各节点（root / content）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<DividerSemanticKey>;

  /**
   * @en Semantic DOM inline styles for internal nodes (root / content).
   * @cn Semantic DOM 内联样式，按 key 定制内部各节点。
   * @version 3.10.0
   */
  styles?: SemanticStyles<DividerSemanticKey>;
  /**
   * @en Content, text or react component
   * @cn 分割线中文字内容
   */
  children?: React.ReactNode;

  /**
   * @en mode of divider
   * @cn 分割线排布模式
   * @default "horizontal"
   */
  mode?: 'horizontal' | 'vertical';

  /**
   * @en The position of title inside divider
   * @cn 水平分割线的文字排布位置
   * @default "center"
   */
  orientation?: 'center' | 'left' | 'right';

  /**
   * @en border type
   * @cn 线段类型
   * @default "solid"
   */
  type?: 'solid' | 'dashed';
}
