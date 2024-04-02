import { DropdownProps as BaseStyleDropdownProps, DropdownNode } from '@sheinx/base';

export type { DropdownItem } from '@sheinx/base';

/**
 * @title Dropdown
 */
export type DropdownProps = Omit<
  BaseStyleDropdownProps,
  'jssStyle' | 'animationListJssStyle' | 'buttonJssStyle'
>;

/**
 * @title DropdownData
 * @cn data 选项有三种情况：\n  为 ReactElement 时，直接显示此元素；\n  为 object 且设置了 renderItem，显示 renderItem 返回的内容；\n  为 object 且未设置 renderItem，按以下数据结构处理。
 * @en If data item is a ReactElement, render the item;\nIf data item is an object and renderItem is set, render the renderItem's result;\nif data item is an object and renderItem is not set, handle the parameters as follows;
 */
type _DropdownData = DropdownNode;
