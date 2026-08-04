import React from 'react';
import type { CommonType } from '../common/type';
import type { ReactNode } from 'react';
import type { KeygenType } from '@sheinx/hooks';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

import type { PopoverJssStyle } from '../popover/popover.type';
import type { TooltipClasses } from '../tooltip/tooltip.type';

/**
 * Breadcrumb Semantic DOM key 列表
 * - root:         最外层容器
 * - item:         每个面包屑项的容器
 * - separator:    分隔符节点
 * - content:      文本/链接内容节点
 * - dropdown:     溢出下拉面板
 * - dropdownItem: 下拉面板内每一项
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type BreadcrumbSemanticKey = 'root' | 'item' | 'separator' | 'content' | 'dropdown' | 'dropdownItem';

export type StructureArray<T> = Array<T | T[]>;

export interface BreadcrumbClasses {
  rootClass: string;
  wrapper: string;
  wrapperPopover: string;
  down: string;
  downOpen: string;
  dropdownItem: string;
  separator: string;
  content: string;
  contentMaxWidth: string;
  item: string;
  itemWithDrop: string;
  dropdown: string;
  ellipsis: string;
  itemWrapper: string;
}

export interface BreadcrumbJssStyle extends PopoverJssStyle {
  breadcrumb?: () => BreadcrumbClasses;
  tooltip?: () => TooltipClasses;
}

export interface BreadcrumbProps<Item = BreadcrumbDataType>
  extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: BreadcrumbJssStyle;

  /**
   * @en Semantic DOM classNames for internal nodes.
   * @cn 语义化 DOM 类名，用于定制内部节点样式。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<BreadcrumbSemanticKey>;

  /**
   * @en Semantic DOM styles for internal nodes.
   * @cn 语义化 DOM 行内样式，用于定制内部节点样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<BreadcrumbSemanticKey>;

  /**
   * @en The array of breadcrumb objects, see data
   * @cn 面包屑对象数组,见 data
   * @default []
   * @override any[]
   */
  data?: StructureArray<Item>;

  /**
   * @en A breadcrumb separator which can be strings or custom elements
   * @cn 面包屑分隔符,可以是字符串或自定义的元素
   * @default "/"
   */
  separator?: string | ReactNode;

  /**
   * @en Key generator.When it is true, the data itself is used as the key equivalent to (d => d);When it is a function, use its return value;When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id.
   * @cn 生成每一项key的辅助方法。为 true 时，以数据项本身作为key，相当于 (d => d)；为函数时，使用此函数返回值；为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   * @override union
   */
  keygen?: KeygenType<Item>;

  /**
   * @en Custom render
   * @cn 自定义渲染
   */
  renderItem?: (value: Item) => ReactNode;
  /**
   * @cn 最大显示个数
   * @en Maximum number of displays
   */
  max?: number;
  /**
   * @en The maximum height of the drop-down box. It can be scrolled if it exceeds the height.
   * @cn 下拉框最大高度，超出可以内滚
   * @default 50vh
   */
  maxHeight?: string | number;
}

/**
 * @title BreadcrumbData
 *
 */
export interface BreadcrumbDataType {
  /**
   * @en The click event
   * @cn 点击事件
   *
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;

  /**
   * @en Displayed content
   * @cn 显示内容
   */
  title?: string | ReactNode;

  /**
   * @en Link address
   * @cn 链接地址，onClick 属性二选一
   */
  url?: string;

  /**
   * @en Custom icon
   * @cn 自定义图标
   */
  icon?: ReactNode;
}
