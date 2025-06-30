// import React from 'react';
import { BaseSelectProps, KeygenResult, KeygenType, ObjectKey, useListSelect } from '@sheinx/hooks';
import { CommonType, CommonClasses } from '../common/type';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';
import { TagClasses } from '../tag/tag.type';
import { InnerTitleClasses } from '../common/use-inner-title';
import { PopoverClasses } from '../popover/popover.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { TreeClasses } from '../tree/tree.type';
import { RadioClasses } from '../radio/radio.type';
import { SpinClasses } from '../spin/spin.type';
import { InputClasses } from '../input/input.type';
import { BaseTipProps } from '../common/use-tip';

export type SelectClasses = {
  rootClass: string;
  wrapper: string;
  wrapperEmpty: string;
  wrapperOpen: string;
  wrapperDisabled: string;
  wrapperSmall: string;
  wrapperLarge: string;
  wrapperFocus: string;
  wrapperError: string;
  wrapperNoBorder: string;
  wrapperUnderline: string;
  wrapperInnerTitle: string;
  wrapperInnerTitleTop: string;
  wrapperInnerTitleBottom: string;
  wrapperPaddingBox: string;
  resultWrapper: string;
  result: string;
  resultAlignRight: string;
  resultAlignLeft: string;
  resultAlignCenter: string;
  resultText: string;
  resultTextActive: string;
  resultTextDisabled: string;
  resultTextWrapper: string;
  multipleResultWrapper: string;
  triggerHover: string;
  resultTextPadding: string;
  compressedWrapper: string;
  multipleCompressedWrapper: string;
  controlMouse: string;
  controlKeyboard: string;
  placeholder: string;
  pickerWrapper: string;
  pickerSmall: string;
  pickerLarge: string;
  clearable: string;
  clearIcon: string;
  arrowIconOpen: string;
  arrowIcon: string;
  ellipsis: string;
  multiple: string;
  multipleList: string;
  dynamicList: string;
  loading: string;
  checkedIcon: string;
  list: string;
  tree: string;
  treeOption: string;
  tag: string;
  tagOnly: string;
  space: string;
  inputMirror: string;
  inputPlaceholder: string;
  moreWrapper: string;
  virtualList: string;
  option: string;
  optionInner: string;
  optionHover: string;
  optionActive: string;
  optionDisabled: string;
  optionGroup: string;
  optionGroupTitle: string;
  header: string;
  customHeader: string;
  columnsTitle: string;
  columns: string;
  columnsOption: string;
  columnsRadio: string;
  columnsCheckbox: string;
  footer: string;
  iconWrapper: string;
  moreIcon: string;
  hideTag: string;
  empty: string;
  popover: string;
  loadingSpin: string;
};
export type JssStyleType = {
  tag?: () => TagClasses;
  select?: () => SelectClasses;
  innerTitle?: () => InnerTitleClasses;
  popover?: () => PopoverClasses;
  checkbox?: () => CheckboxClasses;
  radio?: () => RadioClasses;
  tree?: () => TreeClasses;
  spin?: () => SpinClasses;
  input?: () => InputClasses;
  common?: () => CommonClasses;
};

export type DatumType<DataItem, Value> = ReturnType<typeof useListSelect<DataItem, Value>>;
export type OptionListRefType = {
  hoverMove: (index: number, force?: boolean) => void;
  hoverHover: (index: number) => void;
  getHoverIndex: () => number;
};

export interface RenderCompressedOption<DataItem> {
  /**
   * @en The current selected data
   * @cn 当前选中的数据
   */
  data: DataItem[];
  /**
   * @en Method to remove the option
   * @cn 删除选项的方法
   */
  onRemove: (item: DataItem) => void;
}

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
    | 'onLoadMore'
  > {
  customHeader?: React.ReactNode;
  height?: number | string;
  data: DataItem[];
  datum: any;
  renderItem: (data: DataItem, index?: number) => React.ReactNode;
  closePop: () => void;
  threshold: number;
  originalData: any;
  groupKey?: string;
  dynamicVirtual?: boolean;
  controlType?: 'mouse' | 'keyboard';
  optionListRef: React.MutableRefObject<OptionListRefType | undefined>;
  isAnimationFinish: boolean;
  onControlTypeChange: React.Dispatch<React.SetStateAction<'mouse' | 'keyboard'>>;
  onOptionClick: (data: DataItem, index: number) => void;
}

export interface SelectPropsBase<DataItem, Value>
  extends Omit<BaseSelectProps<DataItem, Value>, 'control' | 'filterSameChange'>,
    Pick<CommonType, 'className' | 'style' | 'size' | 'status' | 'innerTitle' | 'filterSameChange'>,
    Pick<AbsoluteListProps, 'absolute' | 'zIndex'>,
    BaseTipProps {
  jssStyle?: JssStyleType;
  /**
   * @en custom empty copy
   * @cn 自定义 empty 文案。与 renderOptionList 搭配使用时，emptyText 设置为 false 后将忽略该功能，如需渲染空内容可在 renderOptionList 中处理
   */
  emptyText?: React.ReactNode;

  /**
   * @en Options data
   * @cn 选项数据
   * @override DataItem[]
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
   * @en In the Form, the value will be taken over by the form, and the value is invalid. Note: Do not use undefined and null as meaningful option values. When the value type is undefined and null, the component will not process data and rendering
   * @cn 在 Form 中，value 会被表单接管，value 无效。注意，请勿将 undefined 和 null 作为有意义的选项值，当 value 类型为 undefined 和 null 时，组件将不处理数据和渲染
   * @override any
   */
  value?: Value;

  /**
   * @en If clearable is true, show clear value icon
   * @cn 是否显示清除数据图标
   * @default false
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
   * @cn 是否展示边框
   * @en Whether to display border
   * @default true
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
   * @en The height of each option. For performance reasons, Select uses a virtual list to render the options. If the option is a fixed height content, such as a fixed size ReactNode, you can adjust the lineHeight to redistribute the height of each item. When lineHeight is set to auto, dynamic virtual list will be enabled, and the actual height will be adaptive according to the content, and each item will be given a minimum height, which will follow the option height corresponding to the size property. This mode will have a certain performance overhead, please choose different modes according to the actual situation.
   * @cn 每一条选项的高度。出于默认性能考虑，Select 采用了虚拟列表的方式渲染列表项，如果选项为高度固定内容，比如一个固定尺寸的 ReactNode，可以通过调整 lineHeight 来重新分配每一项的高度。当 lineHeight 设置为 auto 时，将开启动态虚拟列表，实际高度将根据内容自适应，并赋予每一项最小高度，最小高度跟随 size 属性对应的选项高度，该模式将有一定的性能开销，请根据实际情况选择不同的模式。
   * @default 32
   * @version 3.4.0 新增 auto 模式
   */
  lineHeight?: number | 'auto';

  /**
   * @en Set Position can control the different position of DatePicker
   * @cn 弹出框位置
   * @default auto
   */
  position?: 'auto' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

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
   * @en onFilter Whether to select filter text after clicking the option in multi-selection situation
   * @cn onFilter 在多选情况下点击选项后是否选中过滤文本
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
  compressed?: boolean | 'no-repeat' | 'hide-popover';

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
   * @en Custom render compressed content
   * @cn 自定义渲染折叠内容
   * @version 3.5.0
   */
  renderCompressed?: (options: RenderCompressedOption<DataItem>) => React.ReactNode;

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
   * @cn 用来转化粘贴文本中的换行
   * @en Used to convert line breaks in pasted text
   * @default " "
   */
  convertBr?: string | ((text: string) => string);

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
  renderItem?: ((data: DataItem, index?: number) => React.ReactNode) | ObjectKey<DataItem>;

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
   * @en When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering
   * @cn 设置 `onCreate` 属性，即可创建选项中不存在的条目；当 `onCreate` 为 true 时，使用默认函数 text => text；当 `onCreate` 为函数时，将此函数返回值作为新的选项插入最上方。
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
  // onFilterWidthCreate?: (data: DataItem, createdData: DataItem, key: string | number) => boolean;

  /**
   * @en empty input after select value
   * @cn 选中后是否清空输入框内容
   * @default false
   */
  emptyAfterSelect?: boolean;
  /**
   * @en ms. The delay of user input triggering filter events
   * @cn 毫秒。用户输入触发 fitler 事件的延时
   * @default 400
   */
  filterDelay?: number;
  /**
   * @en Dynamically load nodes
   * @cn 设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点
   */
  loader?: (key: KeygenResult, data: DataItem) => void;
  /**
   * @en In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button
   * @cn 高级筛选模式，可针对当前层级在筛选结果和原始数据间切换
   */
  onAdvancedFilter?: (text: string) => (data: DataItem) => boolean;
  /**
   * @en There are onFilter and onCreate, select Option, automatically focus Input
   * @cn 存在 onFilter 和 onCreate，选中 Option，自动 focus Input
   * @default false
   */
  reFocus?: boolean;

  /**
   * @en Whether to adjust the position of the panel automatically. When the panel is blocked by the window, the position is adjusted automatically
   * @cn 是否开启自动调整面板位置功能。当面板被窗口遮挡时，自动调整位置
   * @default true
   */
  adjust?: boolean;

  /**
   * @en Whether to adjust the position of the panel automatically. When the panel is blocked by the window, the position is adjusted automatically
   * @cn 滚动加载回的调函数。当配置该属性后，下拉列表滚动到底部时触发该函数
   * @version 3.4.0
   */
  onLoadMore?: () => void | Promise<any>;

  /**
   * @en The threshold for triggering the callback function of the scroll load. When the current scroll progress reaches this value, the callback is triggered, and the maximum value is 1, that is, the scroll progress is 100%
   * @cn 触发滚动加载回的调函数的阈值。当前滚动进度达到该值时触发，最大值为 1，即滚动进度 100%
   * @default 1
   * @version 3.4.0
   */
  threshold?: number;

  /**
   * @cn 触发打开选择面板的方式，默认为点击打开
   * @en Trigger the way to open the selection panel, default is click to open
   * @default 'click'
   * @version 3.4.0
   */
  trigger?: 'click' | 'hover';

  /**
   * @cn 开启搜索关键字高亮功能
   * @en Whether to enable highlight feature
   * @version 3.7.0
   */
  highlight?: boolean;

  /**
   * @en Whether to prevent selecting existing options when pressing Enter while onCreate is enabled
   * @cn 开启 onCreate 时，是否阻止回车选中已有选项，仅创建选项
   * @default false
   * @version 3.8.0
   */
  preventEnterSelect?: boolean;
}

export interface SelectPropsA<DataItem, Value>
  extends Omit<SelectPropsBase<DataItem, Value>, 'treeData' | 'childrenKey'> {
  /**
   * @en Options data
   * @cn 选项数据
   * @override DataItem[]
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
