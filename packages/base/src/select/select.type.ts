// import React from 'react';
import { BaseSelectProps, KeygenType, useListSelect, KeygenResult, ObjectKey } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';
import { TagClasses } from '../tag/tag.type';
import { SelectClasses, VirtualScrollClasses } from '@sheinx/shineout-style';
import { InnerTitleClasses } from '../common/use-inner-title';
import { PopoverClasses } from '../popover/popover.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { TreeClasses } from '../tree/tree.type';
import { RadioClasses } from '../radio/radio.type';
import { SpinClasses } from '../spin/spin.type';
import { InputClasses } from '../input/input.type';

export type JssStyleType = {
  tag: () => TagClasses;
  select: () => SelectClasses;
  innerTitle?: () => InnerTitleClasses;
  virtualScroll: () => VirtualScrollClasses;
  popover?: () => PopoverClasses;
  checkbox?: () => CheckboxClasses;
  radio?: () => RadioClasses;
  tree?: () => TreeClasses;
  spin?: () => SpinClasses;
  input?: () => InputClasses;
};

export type DatumType<DataItem, Value> = ReturnType<typeof useListSelect<DataItem, Value>>;
export type OptionListRefType = {
  hoverMove: (index: number, force?: boolean) => void;
  hoverHover: (index: number) => void;
  getHoverIndex: () => number;
};

export interface BaseListProps<DataItem, Value>
  extends Pick<
    SelectProps<DataItem, Value>,
    | 'jssStyle'
    | 'size'
    | 'value'
    | 'width'
    | 'optionWidth'
    | 'header'
    | 'keygen'
    | 'loading'
    | 'lineHeight'
    | 'itemsInView'
    | 'multiple'
    | 'columns'
    | 'columnWidth'
    | 'columnsTitle'
    | 'hideCreateOption'
  > {
  customHeader?: React.ReactNode;
  height: number | string;
  data: DataItem[];
  datum: any;
  renderItem: (data: DataItem, index?: number) => React.ReactNode;
  closePop: () => void;
  originalData: any;
  groupKey?: string;
  controlType?: 'mouse' | 'keyboard';
  optionListRef: React.MutableRefObject<OptionListRefType | undefined>;
  onControlTypeChange: React.Dispatch<React.SetStateAction<'mouse' | 'keyboard'>>;
  onOptionClick: (data: DataItem, index: number) => void;
}

export interface SelectPropsBase<DataItem, Value>
  extends Omit<BaseSelectProps<DataItem, Value>, 'control'>,
    Pick<CommonType, 'className' | 'style' | 'size' | 'status' | 'innerTitle'>,
    Pick<AbsoluteListProps, 'absolute' | 'zIndex'> {
  jssStyle: JssStyleType;

  // data treeData 的类型交给重载去实现
  data?: DataItem[];
  treeData?: DataItem[];
  childrenKey?: keyof DataItem & string;

  keygen: KeygenType<DataItem>;
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
   * @en Custom render option list header
   * @cn 自定义渲染列表底部内容
   */
  footer?: React.ReactNode;

  /**
   * @cn 自定义渲染下拉列表
   * @en Custom render dropdown
   */
  renderOptionList?: (
    list: React.ReactNode,
    info: { loading?: boolean | React.ReactNode },
  ) => React.ReactNode;

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
  showArrow?: boolean;
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
  filterSingleSelect?: boolean;

  // Tree 组件同款属性
  defaultExpanded?: KeygenResult[];
  defaultExpandAll?: boolean;
  expanded?: KeygenResult[];
  /**
   * @en Whether to show the descendant nodes of the hit node after filtering
   * @cn 筛选后是否展示命中节点的后代节点
   * @default false
   */
  showHitDescendants?: boolean;

  resultClassName?: ((value: DataItem) => string) | string;
  renderItem: ((data: DataItem, index?: number) => React.ReactNode) | ObjectKey<DataItem>;
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
  onCreate?: ((input: string | DataItem) => DataItem | string) | boolean;
  onEnterExpand?: (e: React.KeyboardEvent<HTMLDivElement>) => boolean;
  onCollapse?: (collapse: boolean) => void;
  onExpand?: (value: KeygenResult[]) => void;

  /**
   * 新增 api ，开启 onFilter 和 onCreate 时，用于比对是否已经存在相同的数据，默认用输入的值和 keygen 值比对
   */
  onFilterWidthCreate?: (data: DataItem, createdData: DataItem, key: string | number) => boolean;
}

export interface SelectPropsA<DataItem, Value>
  extends Omit<SelectPropsBase<DataItem, Value>, 'treeData' | 'childrenKey'> {
  data: DataItem[];
}

export interface SelectPropsB<DataItem, Value>
  extends Omit<SelectPropsBase<DataItem, Value>, 'data'> {
  /**
   * @en treeData
   * @cn 树形数据
   */
  treeData: DataItem[];
  /**
   * @en Children key
   * @cn 子节点的 key
   */
  childrenKey?: keyof DataItem & string;
}

export type SelectProps<DataItem, Value> =
  | SelectPropsA<DataItem, Value>
  | SelectPropsB<DataItem, Value>;
