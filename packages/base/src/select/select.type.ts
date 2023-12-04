// import React from 'react';
import { BaseSelectProps, KeygenType, useListSelect } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';
import { TagClasses } from '../tag/tag.type';
import { SelectClasses } from '@sheinx/shineout-style';
import { InnerTitleClasses } from '../common/use-inner-title';
import { VirtualScrollClasses } from '../virtual-scroll/virtual-scroll-list.type';
import { PopoverClasses } from '../popover/popover.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { RadioClasses } from '../radio/radio.type';

export type JssStyleType = {
  tag: () => TagClasses;
  select: () => SelectClasses;
  innerTitle?: () => InnerTitleClasses;
  virtualScroll: () => VirtualScrollClasses;
  popover?: () => PopoverClasses;
  checkbox?: () => CheckboxClasses;
  radio?: () => RadioClasses;
};

export type DatumType<DataItem, Value> = ReturnType<typeof useListSelect<DataItem, Value>>;
export type OptionListRefType = {
  hoverMove: (index: number) => void;
};

export interface BaseListProps<DataItem, Value>
  extends Pick<
    SelectProps<DataItem, Value>,
    | 'jssStyle'
    | 'size'
    | 'value'
    | 'data'
    | 'width'
    | 'optionWidth'
    | 'header'
    | 'keygen'
    | 'loading'
    | 'lineHeight'
    | 'itemsInView'
    | 'renderItem'
    | 'multiple'
    | 'columns'
    | 'columnWidth'
    | 'columnsTitle'
    | 'hideCreateOption'
  > {
  customHeader?: React.ReactNode;
  height: number | string;
  datum: DatumType<DataItem, Value>;
  closePop: () => void;
  originalData: DataItem[];
  groupKey?: string;
  controlType?: 'mouse' | 'keyboard';
}

export interface SelectProps<DataItem, Value>
  extends Omit<BaseSelectProps<DataItem, Value>, 'control'>,
    Pick<CommonType, 'className' | 'style' | 'size' | 'status' | 'innerTitle'>,
    Pick<AbsoluteListProps, 'absolute' | 'zIndex'> {
  jssStyle: JssStyleType;
  data: DataItem[];
  keygen: KeygenType<DataItem>;
  treeData?: DataItem[];
  value?: Value;

  /**
   * @en Allow enter something into DatePicker
   * @cn 可输入
   * @default false
   */
  inputable?: boolean;

  /**
   * @en If clearable is true, show clear value icon
   * @cn  是否显示清除数据图标
   * @default true
   */
  clearable?: boolean;

  /**
   * @en placeholder text
   * @cn 占位文字
   */
  placeholder?: string;

  /**
   * @en When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
   * @cn 数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替
   * @override boolean | ReactNode
   * @default false
   */
  loading?: boolean | React.ReactNode;

  /**
   * @en Custom render option list header
   * @cn 自定义渲染列表头部内容
   */
  header?: React.ReactNode;

  /**
   * @deprecated
   */
  border?: boolean;

  /**
   * @en only display border bottom
   * @cn 是否只展示下边框
   * @default false
   */
  underline?: boolean;

  /**
   * @en Set visible of datepicker popup
   * @cn 控制浮层显隐
   */
  open?: boolean;

  /**
   * @cn 选择框的宽度
   * @en custom width
   */
  width?: number | string;

  /**
   * @cn 下拉列表的高度
   * @en custom width
   */
  height?: number | string;

  /**
   * @cn 下拉列表的宽度
   * @en custom width
   * @default 100%
   */
  optionWidth?: number | string;

  /**
   * @en The maximum number of rows for a single render. Select uses lazy render to optimize performance under large amounts of data. If your table displays more than 10 rows, you can change the value of itemsInView.
   * @cn 单次 render 的最大行数。Select 采用了lazy render 的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了 10 条，可以调整 itemsInView
   * @default 10
   */
  itemsInView?: number;

  /**
   * @en Option height. List items are rendered using virtual lists, and when the option height changes, the correct height should be specified via lineHeight
   * @cn 选项高度。列表项使用虚拟列表渲染，当选项高度改变时，应该通过 lineHeight 来指定正确高度
   * @default 32
   */
  lineHeight?: number;

  /**
   * @en Set Position can control the different position of DatePicker
   * @cn 弹出框位置
   */
  // position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  position?: 'auto' | 'bottom-left' | 'top-left';

  /**
   * @en Option columns.
   * @cn columns 大于 1 时，选项展示为多列布局模式
   * @default 1
   */
  columns?: number;
  columnsTitle?: React.ReactNode;
  noCache?: boolean;
  focusSelected?: boolean;
  trim?: boolean;
  columnWidth?: number;
  maxLength?: number;
  separator?: string;
  autoAdapt?: boolean;
  compressed?: boolean;
  compressedBound?: number;
  compressedClassName?: string;
  hideCreateOption?: boolean;
  resultClassName?: ((value: DataItem) => string) | string;
  renderItem: (data: DataItem, index?: number) => React.ReactNode;
  renderResult?: (data: DataItem, index?: number) => React.ReactNode;
  renderUnmatched?: (value: Value extends (infer U)[] ? U : Value) => React.ReactNode;

  /**
   * @en blur event callback
   * @cn blur 事件回调
   */
  onBlur?: (e: any) => void;

  /**
   * @en focus event callback
   * @cn focus 事件回调
   */
  onFocus?: (e: any) => void;

  /**
   * @en When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering.
   * @cn onFilter 不为空时，可以输入过滤数据。onFilter 如果返回一个函数，使用这个函数做前端过滤。如果不返回，可以自行做后端过滤
   */
  onFilter?: (text: string, from?: string) => ((data: DataItem) => boolean) | void | undefined;
  onCreate?: boolean | ((input: Value) => Value);
  onEnterExpand?: (e: React.KeyboardEvent<HTMLDivElement>) => boolean;
}
