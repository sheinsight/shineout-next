// import React from 'react';
import { BaseSelectProps, KeygenType, useListSelect, KeygenResult, ObjectKey } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';
import { TagClasses } from '../tag/tag.type';
import { SelectClasses, VirtualScrollClasses } from '@sheinx/shineout-style';
import { InnerTitleClasses } from '../common/use-inner-title';
import { PopoverClasses } from '../popover/popover.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { TreeClasses } from '@sheinx/shineout-style';
import { RadioClasses } from '../radio/radio.type';
import { SpinClasses } from '../spin/spin.type';
import { InputClasses } from '../input/input.type';

export type JssStyleType = {
  tag?: () => TagClasses;
  select?: () => SelectClasses;
  innerTitle?: () => InnerTitleClasses;
  virtualScroll?: () => VirtualScrollClasses;
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
  jssStyle?: JssStyleType;

  /**
   * @en Options data
   * @cn 选项数据
   * @override Item[]
   */
  // data treeData 的类型交给重载去实现
  data?: DataItem[];

  /**
   * @en Tree data, [{children: []}]
   * @cn 树形结构数据项，[{children: []}]
   * @override Object[]
   */
  treeData?: DataItem[];

  /**
   * @en specify the name of the subdata
   * @cn 指定子数据的属性名
   * @default 'children'
   */
  childrenKey?: ObjectKey<DataItem>;

  /**
   * @en Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, "id" is the same thing as (d) => d.id
   * @cn 生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 "id"，相当于 (d) => d.id
   * @default index
   */
  keygen: KeygenType<DataItem>;

  /**
   * @en In the Form, the value will be taken over by the form and the value will be invalid
   * @cn 在 Form 中，value 会被表单接管，value 无效
   * @override any
   */
  value?: Value;

  /**
   * @en Allow enter something into DatePicker
   * @cn 可输入
   * @default false
   */
  inputable?: boolean;

  /**
   * @en If clearable is true, show clear value icon
   * @cn 是否显示清除数据图标
   * @default true
   */
  clearable?: boolean;

  /**
   * @en Placeholder text
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
   * @deprecated 已弃用
   */
  border?: boolean;

  /**
   * @en Only display border bottom
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
   * @en Custom width
   */
  width?: number | string;

  /**
   * @cn 下拉列表的高度
   * @en Custom width
   */
  height?: number | string;

  /**
   * @cn 下拉列表的宽度
   * @en Custom width
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

  /**
   * @en Title of columns multiple select
   * @cn 多列选项多选时的标题文字
   */
  columnsTitle?: React.ReactNode;

  /**
   * @en Data cache, if data change asynchronously, better set true
   * @cn 是否开启数据缓存，如果数据存在动态更新的情况建议开启
   * @default false
   */
  noCache?: boolean;

  /**
   * @en Show dropdown arrow, only single select
   * @cn 是否显示下拉箭头，仅针对单选情况
   * @default true
   */
  showArrow?: boolean;

  /**
   * @en Selected value while click under onCreate or onFilter
   * @cn onCreate 或 onFilter 在单选情况下单击值后是否选中值
   * @default true
   */
  focusSelected?: boolean;

  /**
   * @en When trim is true, blank characters are automatically deleted when lose focus
   * @cn trim 为 true 时，失去焦点时会自动删除空白字符
   * @default false
   */
  trim?: boolean;

  /**
   * @en Option column width, only effective when columns > 1
   * @cn columns 大于 1 时，选项展示为多列布局模式
   * @default 160
   */
  columnWidth?: number;

  /**
   * @en The maximum length of the input string in the Select input box
   * @cn Select 输入框输入字符串最大长度
   */
  maxLength?: number;

  /**
   * @en Set with multiple, value will separator by this
   * @cn 多选情况下设置后，value 会处理为 separator 分隔的字符串
   */
  separator?: string;

   /**
   * @en Option list is auto adapt
   * @cn 下拉列表宽度根据内容自由展开
   * @default false
   */
  autoAdapt?: boolean;

  /**
   * @en Merges selected values, valid only in multiselect mode；When it is "no-repeat", the value is not repeated in the pop-up box
   * @cn 将选中值合并，只在多选模式下有效; 为 "no-repeat" 时弹出框中不重复展示值
   * @default false
   */
  compressed?: boolean | 'no-repeat';

  /**
   * @en When compressed is True,the comptessedBound can limit the numbers of multiple selected item"s label
   * @cn 开启多选后，指定允许展示标签数量，超过后将折叠
   */
  compressedBound?: number;

  /**
   * @en Compressed popover classname
   * @cn 多选合并展示弹出框的类名
   */
  compressedClassName?: string;

  /**
   * @en Hide the creat option while set onCreate
   * @cn 在使用创建选项时，在选项列表中隐藏该选项，回车后直接选中
   * @default false
   */
  hideCreateOption?: boolean;

  /**
   * @en Blur to select the data when filter data has only single. only work in filter
   * @cn 当筛选数据仅为一条时，失焦后直接选中该条数据。仅在 Filter 下有效
   * @default false
   */
  filterSingleSelect?: boolean;

  /**
   * @en default expanded nodes
   * @cn 默认展开的节点 key（非受控）
   * @override (string | number)[]
   */
  // Tree 组件同款属性
  defaultExpanded?: KeygenResult[];

  /**
   * @en Expand all node, only in can be use in treeData
   * @cn 默认展开全部子节点, 仅树形数据下有效
   * @default false
   */
  defaultExpandAll?: boolean;

  /**
   * @en Expanded node
   * @cn 展开的节点 key(受控)
   * @override (string | number)[]
   */
  expanded?: KeygenResult[];

  /**
   * @en Whether to show the descendant nodes of the hit node after filtering
   * @cn 筛选后是否展示命中节点的后代节点
   * @default false
   */
  showHitDescendants?: boolean;

  /**
   * @en The className of the selected result content container
   * @cn 选中结果内容容器的className
   */
  resultClassName?: ((value: DataItem) => string) | string;

  /**
   * @en When it is a string, return d[string]. When it is a function, return the result of the function
   * @cn 为 string 时，返回 d[string]。 为 function 时，返回函数结果
   * @default d => d
   */
  renderItem: ((data: DataItem, index?: number) => React.ReactNode) | ObjectKey<DataItem>;

  /**
   * @en The content displayed in the result after selecting, if not set, use renderItem
   * @cn 为 选中后在结果中显示的内容，默认和 renderItem 相同
   * @default renderItem
   */
  renderResult?: (data: DataItem, index?: number) => React.ReactNode;

  /**
   * @en The way to render not matched data value
   * @cn 渲染未匹配值的方式
   */
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
   * @en When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering
   * @cn onFilter 不为空时，可以输入过滤数据。onFilter 如果返回一个函数，使用这个函数做前端过滤。如果不返回，可以自行做后端过滤
   */
  onFilter?: (text: string, from?: string) => ((data: DataItem) => boolean) | void | undefined;

  /**
   * @en If the onCreate event is set, the component is inputable. When onCreate is a function, the return value of this function is diaplay at the top as a new option. When onCreate is true, use the built-in functuon text => text
   * @cn 如果设置了 onCreate 事件，组件为可输入状态。onCreate 为函数时，将此函数返回值作为新的选项拆入最上方。onCreate 为 true 时，使用默认函数 text => text
   */
  onCreate?: ((input: string | DataItem) => DataItem | string) | boolean;

  /**
   * @en Expand option list while enter press
   * @cn 回车触发下拉框展开的时候调用
   */
  onEnterExpand?: (e: React.KeyboardEvent<HTMLDivElement>) => boolean;

  /**
   * @en Option list collapse callback
   * @cn 下拉列表展开/收起回调
   */
  onCollapse?: (collapse: boolean) => void;

  /**
   * @en Expand event
   * @cn 节点展开回调，参数为当前展开节点 key 数组
   */
  onExpand?: (value: KeygenResult[]) => void;

  /**
   * @en Added a new API, which is used to compare whether the same data already exists when onFilter and onCreate are turned on. By default, the input value is compared with the keygen value
   * @cn 新增 api ，开启 onFilter 和 onCreate 时，用于比对是否已经存在相同的数据，默认用输入的值和 keygen 值比对
   */
  onFilterWidthCreate?: (data: DataItem, createdData: DataItem, key: string | number) => boolean;
}

export interface SelectPropsA<DataItem, Value>
  extends Omit<SelectPropsBase<DataItem, Value>, 'treeData' | 'childrenKey'> {
  /**
   * @en Options data
   * @cn 选项数据
   * @override Item[]
   */
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
  childrenKey?: ObjectKey<DataItem>;
}

export type SelectProps<DataItem, Value> =
  | SelectPropsA<DataItem, Value>
  | SelectPropsB<DataItem, Value>;
