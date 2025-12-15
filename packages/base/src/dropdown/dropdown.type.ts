import React from 'react';
import { CommonType } from '../common/type';
import { ButtonClasses, ButtonProps } from '../button/button.type';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';

export interface DropdownClasses {
  rootClass: string;
  wrapper: string;
  open: string;
  boxList: string;
  list: string;
  listHasChildren: string;
  listSmall: string;
  listLarge: string;
  caret: string;
  content: string;
  button: string;
  item: string;
  itemDisabled: string;
  itemActive: string;
  splitButton: string;
  optionGroup: string;
  optionDivider: string;
  itemWrapper: string;
}

export type MenuPosition =
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom';

export type TriggerType = 'click' | 'hover';

export type DropdownItem = DropdownNode | React.ReactNode;

/**
 * @title DropdownData
 * @cn data 选项有三种情况：\n  为 ReactElement 时，直接显示此元素；\n  为 object 且设置了 renderItem，显示 renderItem 返回的内容；\n  为 object 且未设置 renderItem，按以下数据结构处理。
 * @en If data item is a ReactElement, render the item;\nIf data item is an object and renderItem is set, render the renderItem's result;\nif data item is an object and renderItem is not set, handle the parameters as follows;
 */
export interface DropdownNode {
  /**
   * @cn 分组
   * @en Group
   */
  group?: string;
  /**
   * @cn 分割线
   * @en Divider
   */
  divider?: boolean;
  /**
   * @en When the url is not empty, a url will be rendered.
   * @cn url属性不为空时，render为一个链接
   */
  url?: string;

  /**
   * @en It is valid when the url is not empty.
   * @cn url 不为空时有效
   */
  target?: string;

  /**
   * @en Disabled
   * @cn 禁用
   */
  disabled?: boolean;

  /**
   * @en element
   * @cn 默认从content获取内容
   */
  content?: React.ReactNode;
  /**
   * @en childNode
   * @cn 子节点
   */
  children?: DropdownNode[];
  /**
   * @en click event
   * @cn 点击事件
   */
  onClick?: (data: DropdownNode) => void;
  [key: string]: any;
}

export interface ItemProps {
  data: DropdownItem;
  itemClassName: string;
  width: DropdownProps['width'];
  onClick: DropdownProps['onClick'];
  columns: DropdownProps['columns'];
  renderItem: ((data: any) => React.ReactNode) | string;
  handleBlur: () => void;
  direction: 'ltr' | 'rtl';
}

export interface SimpleDropdownProps
  extends Pick<CommonType, 'className' | 'style' | 'size'>,
    Pick<AbsoluteListProps, 'absolute'>,
    Pick<ButtonProps, 'type' | 'size' | 'text' | 'outline' | 'mode' | 'shape'> {
  jssStyle?: {
    dropdown?: () => DropdownClasses;
    button?: () => ButtonClasses;
  };
  /**
   * @private 内部属性
   */
  isSub?: boolean;
  /**
   * @en Whether to adjust the position of the panel automatically. When the panel is blocked by the window, the position is adjusted automatically
   * @cn 是否开启自动调整面板位置功能。当面板被窗口遮挡时，自动调整位置
   * @default true
   */
  adjust?: boolean;
  /**
   * @private 内部属性
   */
  closePop?: () => void;
  /**
   * @en Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately.
   * @cn 页面多元素展示,此属性需要依赖width属性,请合理的设置列数和宽度
   */
  columns?: number;

  /**
   * @en Specifies the dropdown should be disabled
   * @cn 禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * @en Specifies the dropdown should be disabled
   * @cn 是否开启动画
   * @default true
   */
  animation?: boolean;

  /**
   * @en data of dropdown; See the detail in the DropdownNode
   * @cn 下拉数据 详见 DropdownData
   * @default []
   * @override object[]
   */
  data: DropdownItem[];

  /**
   * @en Toggle mode
   * @cn 触发方式
   * @default 'click'
   */
  trigger?: TriggerType;

  /**
   * @en Displayed content of the button
   * @cn 按钮显示内容
   */
  placeholder?: React.ReactNode;

  /**
   * @en The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called.
   * @cn 点击事件。参数为渲染的数据,注: 如果数据内设置了onClick，会忽略此方法，调用data.onClick
   */
  onClick?: (data: any) => void;

  /**
   * @en The width of the pop-up option layer
   * @cn 弹出选项层的宽度
   */
  width?: number;

  /**
   * @en Set position property can control the direction and position of the drop-down menu
   * @cn 弹出的方向和位置
   * @default 'bottom-left'
   */
  position?: MenuPosition | 'auto';

  /**
   * @en Set the displayed content. If it is a string,  the corresponding value will be displayed. \n If it is a function, the return value will be displayed and its parameter is the current data.
   * @cn 设置显示的内容,如果是字符串,则为对应的值。如果是函数,则返回值为显示的内容,参数为当条数据
   */
  renderItem?: ((data: any) => React.ReactNode) | string;

  /**
   * @en Set visible of cascader popup
   * @cn 控制浮层显隐
   */
  open?: boolean;

  /**
   * @en options collapse callback
   * @cn 下拉列表展开/收起回调
   */
  onCollapse?: (collapse: boolean) => void;

  /**
   * @en hide arrow
   * @cn 隐藏箭头
   */
  hideArrow?: boolean;

  /**
   * @en The z-index value of the panel, the default value is 1051
   * @cn 面板的 zIndex 值，默认为 1051
   * @version 3.4.0
   */
  zIndex?: number;

  /**
   * @en CSS class name for the dropdown popover
   * @cn 下拉框弹出框的 CSS 类名
   * @version 3.9.4
   */
  popupClassName?: string;
}

/**
 * @title DropDown
 */
export type DropdownProps = Omit<SimpleDropdownProps, 'isSub' | 'closePop'>;

export declare class DropdownComp extends React.Component<DropdownProps> {
  render(): JSX.Element;
}

export type DropdownType = typeof DropdownComp;
