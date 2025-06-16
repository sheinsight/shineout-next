import { CommonClasses, CommonType } from '../common/type';
import { BaseTransferProps, ObjectKey, KeygenResult, useListSelectMultiple } from '@sheinx/hooks';
import { ButtonClasses } from '../button/button.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { InputClasses } from '../input/input.type';
import { SpinClasses } from '../spin/spin.type';
import { EmptyClasses } from '../empty/empty.type';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ListDatum<DataItem, Value extends KeygenResult[]> = ReturnType<
  typeof useListSelectMultiple<DataItem, Value>
>;

export interface TransferClasses {
  rootClass: string;
  transfer: string;
  small: string;
  large: string;
  simple: string;
  view: string;
  source: string;
  target: string;
  close: string;
  removeAll: string;
  simpleTarget: string;
  operations: string;
  input: string;
  inputWrapper: string;
  left: string;
  right: string;
  header: string;
  spinContainer: string;
  title: string;
  count: string;
  list: string;
  footer: string;
  item: string;
  disabled: string;
  itemWrapper: string;
  checkbox: string;
  empty: string;
  equalPanelWidth: string;
}

export type JssStyleType = {
  transfer: () => TransferClasses;
  button: () => ButtonClasses;
  checkbox: () => CheckboxClasses;
  input: () => InputClasses;
  spin: () => SpinClasses;
  empty: () => EmptyClasses;
  common: () => CommonClasses;
};

export interface FilterProps {
  text?: string;
  disabled: boolean;
  onFilter?: (text: string) => void;
  placeholder?: string;
  isSource?: boolean;
}

export interface CustomRenderProps<Value extends KeygenResult[]> {
  onSelected: (selectedKeys: KeygenResult[]) => void;
  /**
   * @deprecated 请使用 listType 属性判断是否为源或目标列表
   */
  direction: 'left' | 'right';
  listType: 'source' | 'target';
  selectedKeys: KeygenResult[];
  value: Value;
  filterText?: string;
}

export interface TransferProps<DataItem, Value extends KeygenResult[]>
  extends Omit<BaseTransferProps<DataItem, Value>, 'valueControl' | 'selectControl'>,
    Pick<CommonType, 'size' | 'style' | 'className'> {
  jssStyle: JssStyleType;
  /**
   * @en The checked list, the checked values ​​use the results of keygen
   * @cn 被勾选的列表, 勾选的值均使用的是 keygen 的结果
   */
  selectedKeys?: KeygenResult[];
  /**
   * @en List Height
   * @cn 列表高度
   * @default 186
   */
  listHeight?: number;
  /**
   * @en List row height
   * @cn 列表行高
   * @default 34
   */
  lineHeight?: number;
  /**
   * @en When it is a string, return d[string] When it is a function, return the result of the function
   * @cn 为 string 时，返回 d[string] 为 function 时，返回函数结果
   * @default d => d
   */
  renderItem?: ObjectKey<DataItem> | ((data: DataItem) => React.ReactNode);
  /**
   * @en Whether to enable simple mode
   * @cn 是否开启简单模式
   * @default false
   */
  simple?: boolean;
  /**
   * @en The class name of the item
   * @cn 选项 className
   */
  itemClass?: string;
  /**
   * @en ContentLess display
   * @cn 无内容的展示
   */
  empty?: React.ReactNode;
  /**
   * @en Number of data loaded at one time
   * @cn 一次加载的数据条数
   * @default 20
   */
  rowsInView?: number;
  /**
   * @en The class name of the list
   * @cn 列表扩展的 class
   */
  listClassName?: string;
  /**
   * @en The style of the list
   * @cn 列表扩展的样式
   */
  listStyle?: React.CSSProperties;
  /**
   * @en Title on both sides, order from left to right
   * @cn 两侧的标题, 顺序是从左到右
   */
  titles?: [React.ReactNode, React.ReactNode];
  /**
   * @en Bottom element, order from left to right
   * @cn 底部元素, 顺序是从左到右
   */
  footers?: [React.ReactNode, React.ReactNode];
  /**
   * @en Operational elements, the order is from top to bottom
   * @cn 操作元素, 顺序是从上到下
   */
  operations?: [React.ReactNode, React.ReactNode];
  /**
   * @en Whether to display the icon of the action button
   * @cn 是否显示操作按钮的图标
   * @default true
   */
  operationIcon?: boolean;
  /**
   * @en Loading, if you need the loading status to be inconsistent on both sides, you need to pass in an array
   * @cn 加载中, 如果需要两侧加载中状态不一致, 需要传入数组
   */
  loading?: boolean | [boolean, boolean];
  /**
   * @en The placeholder of the search box
   * @cn 搜索框占位
   */
  searchPlaceholder?: string | [string, string];
  /**
   * @en Custom filter rendering
   * @cn 自定义过滤器渲染
   */
  renderFilter?: (filterProps: FilterProps) => React.ReactNode;
  /**
   * @en Filter function, parameters are: input text, data, whether it is the data on the left
   * @cn 筛选函数, 参数为: 输入文本, 数据, 是否为左侧数据
   */
  onFilter?: (text: string, data: DataItem, isSource: boolean) => boolean;
  /**
   * @en Custom render content
   * @cn 自定义渲染内容
   * @override ((props: { onSelected: ((string | number)[]) => void; direction: "left" | "right"; selectedKeys: (string | number)[]; value: Value; filterText: string; }) => ReactNode)
   */
  children?: (props: CustomRenderProps<Value>) => React.ReactNode;
  /**
   * @en Panel equal distribution container width
   * @cn 面板均等分配容器宽度
   */
  equalPanelWidth?: boolean;

    /**
   * @cn 开启搜索关键字高亮功能
   * @en Whether to enable highlight feature
   * @version 3.8.0
   */
    highlight?: boolean;
}
