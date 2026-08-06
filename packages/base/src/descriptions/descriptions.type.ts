import React from 'react';
import type { CommonType } from '../common/type';
import type { BaseDescriptionsProps, DescriptionsItemProps } from '@sheinx/hooks';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

/**
 * Descriptions Semantic DOM key 列表
 * - root:   最外层容器
 * - header: 标题区域
 * - title:  标题
 * - extra:  额外内容
 * - table:  表格元素
 * - label:  描述项标签
 * - value:  描述项值
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type DescriptionsSemanticKey = 'root' | 'header' | 'title' | 'extra' | 'table' | 'label' | 'value';

export interface DescriptionsClasses {
  rootClass: string;
  /**
   * 最外层class
   */
  wrapper: string;
  header: string;
  title: string;
  extra: string;
  body: string;
  table: string;
  row: string;
  label: string;
  value: string;
  border: string;
  tableLayoutFixed: string;
  item: string;
  labelInline: string;
  valueInline: string;
  inlineHorizontal: string;
  horizontal: string;
  vertical: string;
  cell: string;
  small: string;
  large: string;
}

export interface DescriptionsProps
  extends Pick<CommonType, 'className' | 'style' | 'size'>,
    BaseDescriptionsProps {
  jssStyle?: {
    descriptions: () => DescriptionsClasses;
  };

  /**
   * @en Semantic DOM classNames for internal nodes.
   * @cn 语义化 DOM 类名，用于定制内部节点样式。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<DescriptionsSemanticKey>;

  /**
   * @en Semantic DOM styles for internal nodes.
   * @cn 语义化 DOM 行内样式，用于定制内部节点样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<DescriptionsSemanticKey>;
  /**
   * @en Whether to show the border
   * @cn 是否显示边框
   * @default false
   */
  border?: boolean;
  /**
   * @en Extended content
   * @cn 扩展内容
   */
  extra?: React.ReactNode;
  /**
   * @en The title of the description
   * @cn 描述标题
   */
  title?: React.ReactNode;
  /**
   * @en The layout of the description
   * @cn 排列方式
   * @default 'inlineHorizontal'
   */
  layout?: 'horizontal' | 'vertical' | 'inlineHorizontal' | 'inlineVertical';
  /**
   * @en The colon after the label
   * @cn 标签后面的内容
   */
  colon?: React.ReactNode;
  /**
   * @en The content inside the description
   * @cn 表格样式的layout-fixed,当设置为fixed时,宽度会被均分
   * @default 'auto'
   */
  tableLayout?: 'auto' | 'fixed';
}

export type ItemType = DescriptionsItemProps
