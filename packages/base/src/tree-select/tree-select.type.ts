import React from 'react';
import { TreeClasses, TreeProps } from '../tree/tree.type';
import { KeygenResult, ObjectKey, UnMatchedData, ValueItem } from '@sheinx/hooks';
import { SelectClasses } from '../select/select.type';
import { TagClasses } from '../tag/tag.type';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';
import { CommonType } from '../common/type';
import { InnerTitleClasses } from '../common/use-inner-title';
import { BaseTipProps } from '../common/use-tip';
import { PopoverClasses } from '../popover/popover.type';
import { SpinClasses } from '../spin/spin.type';

export type TreeSelectClasses = {
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
  resultTextPadding: string;
  compressedWrapper: string;
  multipleCompressedWrapper: string;
  multipleResultWrapper: string;
  controlMouse: string;
  controlKeyboard: string;
  placeholder: string;
  pickerWrapper: string;
  clearable: string;
  clearIcon: string;
  arrowIconOpen: string;
  arrowIcon: string;
  ellipsis: string;
  multiple: string;
  loading: string;
  checkedIcon: string;
  iconWrapper: string;
  moreIcon: string;
  list: string;
  tree: string;
  treeWrapper: string;
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
  empty: string;
  hideTag: string;
};
export type JssStyleType = {
  tag?: () => TagClasses;
  treeSelect?: () => TreeSelectClasses;
  select?: () => SelectClasses;
  tree?: () => TreeClasses;
  innerTitle?: () => InnerTitleClasses;
  popover?: () => PopoverClasses;
  spin?: () => SpinClasses;
};

export type TreeModeType = 0 | 1 | 2 | 3 | 4;

export type TreeSelectValueType = KeygenResult | KeygenResult[];

export type ResultItem<DataItem> = DataItem | UnMatchedData;

export interface ComponentRef<DataItem, Value> {
  /**
   * @en Get the data corresponding to the value
   * @cn 获取 value 对应的 data
   */
  getDataByValues: (
    values: Value,
  ) => Value extends any[] ? ResultItem<DataItem>[] : ResultItem<DataItem>;
}

export interface TreeSelectProps<DataItem, Value>
  extends Pick<
      CommonType,
      'className' | 'style' | 'size' | 'status' | 'innerTitle' | 'filterSameChange'
    >,
    Pick<AbsoluteListProps, 'absolute' | 'zIndex'>,
    Pick<TreeProps<DataItem, any>, 'actionOnClick'>,
    BaseTipProps {
  /**
   * @en Data cache, if data change asynchronously, better set true
   * @cn 是否开启数据缓存，如果数据存在动态更新的情况建议开启
   * @default false
   */
  noCache?: boolean;
  /**
   * @en custom empty copy
   * @cn 自定义 empty 文案
   */
  emptyText?: string;
  /**
   * @en When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
   * @cn 数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替
   * @override boolean | ReactNode
   * @default false
   */
  loading?: boolean | React.ReactNode;
  jssStyle?: JssStyleType;
  /**
   * @en placeholder when value is empty
   * @cn value 为空时的占位符
   */
  placeholder?: string;
  /**
   * @en when compressed is True,the comptessedBound can limit the numbers of multiple selected item's label
   * @cn 开启多选后，指定允许展示标签数量，超过后将折叠
   */
  compressedBound?: number;
  /**
   * @en Compressed popover classname
   * @cn 多选合并展示弹出框的类名
   */
  compressedClassName?: string;
  /**
   * @en If clearable is true, show clear value icon
   * @cn 是否可清除值
   * @default false
   */
  clearable?: boolean;
  /**
   * @private 内部属性
   */
  filterText?: string;
  /**
   * @en ender unmatched value
   * @cn 渲染未匹配值的方式
   */
  renderUnmatched?: (data: ValueItem<Value>) => React.ReactNode;
  /**
   * @en data source
   * @cn 数据源
   * @default []
   */
  data?: DataItem[];
  /**
   * @en Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, "id" is the same thing as (d) => d.id
   * @cn 生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 "id"，相当于 (d) => d.id
   */
  keygen: ObjectKey<DataItem> | ((data: DataItem, parentKey: KeygenResult) => string | number);
  /**
   * @en Some methods of getting components Currently only support getDataByValue
   * @cn 获取组件的一些方法 目前只支持 getDataByValues
   */
  getComponentRef?:
    | ((ref: ComponentRef<DataItem, Value>) => void)
    | { current?: ComponentRef<DataItem, Value> };
  /**
   * @en When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering
   * @cn onFilter 不为空时，可以输入过滤数据。 onFilter 如果返回一个函数，使用这个函数做前端过滤。 如果不返回，可以自行做后端过滤
   */
  onFilter?: (text: string, from?: string) => ((data: DataItem) => boolean) | void | undefined;
  /**
   * @en Placeholder content when there is no data
   * @cn 无数据时的占位内容
   */
  empty?: React.ReactNode;
  /**
   * @en if it is true, it will be multiple selection
   * @cn 是否是多选
   * @default false
   */
  multiple?: boolean;
  /**
   * @en callback function of blur event
   * @cn blur 事件回调函数
   */
  onBlur?: (e?: any) => void;
  /**
   * @en callback function of focus event
   * @cn focus 事件回调函数
   */
  onFocus?: (e?: any) => void;
  /**
   * @en When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.
   * @cn 为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用
   * @default false
   */
  disabled?: ((data: DataItem) => boolean) | boolean;
  /**
   * @en The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected
   * @cn 选中后在结果中显示的内容，默认和 renderItem 相同
   * @default renderItem
   */
  renderResult?: (data: DataItem) => React.ReactNode;
  /**
   * @en mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get.
   * @cn 选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得
   * @default 1
   */
  mode?: TreeModeType;
  /**
   * @en The height of list
   * @cn 列表高度
   * @default 300
   */
  height?: number;
  /**
   * @en option collapse callback
   * @cn 下拉列表展开/收起回调
   */
  onCollapse?: (collapse: boolean) => void;
  /**
   * @en Whether to show the descendant nodes of the hit node after filtering
   * @cn 筛选后是否展示命中节点的后代节点
   * @default false
   */
  showHitDescendants?: boolean;
  /**
   * @en Popup Position
   * @cn 弹出位置
   */
  position?: 'auto' | 'bottom-left' | 'top-left';
  /**
   * @en Expand option list while enter press
   * @cn 回车触发下拉框展开的时候调用
   */
  onEnterExpand?: (e: React.KeyboardEvent<HTMLDivElement>) => boolean;
  /**
   * @en value is your picker now
   * @cn 参数 为 当前选中值
   */
  onChange?: (
    value: Value,
    selected?: DataItem | UnMatchedData,
    path?: (string | number)[],
  ) => void;

  /**
   * @en onChange additional parameters (current is the data of the clicked node, data is the currently selected data, checked is whether it is selected or canceled in the multi-select state)
   * @cn onChange 额外参数 (current 为点击的节点的数据， data 为当前选中的数据， checked 为多选状态下是选中还是取消)
   */
  onChangeAddition?: (params: {
    current?: ResultItem<DataItem>[] | ResultItem<DataItem>;
    checked?: 0 | 1 | 2;
    data?: ResultItem<DataItem>[] | ResultItem<DataItem> | null;
  }) => void;
  /**
   * @cn 选中的 key （受控），多选时必须为array。注意，请勿将 undefined 和 null 作为有意义的选项值，当 value 类型为 undefined 和 null 时，组件将不处理数据和渲染
   * @en Selected key (controlled), must be an array in multiple selection. Note: Do not use undefined and null as meaningful option values. When the value type is undefined and null, the component will not process data and rendering
   */
  value?: Value;
  /**
   * @en Initial value
   * @cn 默认值  和 value 类型相同
   */
  defaultValue?: Value;
  /**
   * @en Merges selected values; the repeat value will not appear in the Popover when it is'no-repeat'.
   * @cn 将选中值合并，只在多选模式下有效；为 'no-repeat' 时弹出框中不重复展示值
   * @default false
   */
  compressed?: boolean | 'no-repeat' | 'hide-popover';
  /**
   * @en Set visible of datepicker popup
   * @cn 控制浮层显隐
   */
  open?: boolean;
  /**
   * @en Whether show line
   * @cn 是否显示连接线
   * @default false
   */
  line?: boolean;
  /**
   * @en Input width
   * @cn 输入框宽度
   */
  width?: number | string;
  /**
   * @en Only display border bottom
   * @cn 是否只展示下边框
   * @default false
   */
  underline?: boolean;
  /**
   * @en Whether to display border
   * @cn 是否展示边框
   * @default false
   */
  border?: boolean;
  /**
   * @en Whether to display arrow
   * @cn 是否展示箭头
   * @default true
   */
  showArrow?: boolean;
  /**
   * @en specify the name of the subdata
   * @cn 指定子数据的属性名
   * @default 'children'
   */
  childrenKey?: ObjectKey<DataItem>;
  /**
   * @en onFilter Whether to select filter text after clicking the option in multi-selection situation
   * @cn onFilter 在多选情况下点击选项后是否选中过滤文本
   * @default true
   */
  focusSelected?: boolean;
  /**
   * @en The className of the selected result content container
   * @cn 选中结果内容容器的className
   */
  resultClassName?: ((value: DataItem) => string) | string;
  /**
   * @en Dynamically load nodes
   * @cn 设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点
   */
  loader?: (key: KeygenResult, data: DataItem) => void;
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
   * @en Expand by click parent node
   * @cn 点击父节点展开
   * @default false
   */
  parentClickExpand?: boolean;
  /**
   * @en Expanded node
   * @cn 展开的节点 key(受控)
   * @override (string | number)[]
   */
  expanded?: KeygenResult[];
  /**
   * @en When trim is true, blank characters are automatically deleted when lose focus
   * @cn trim 为 true 时，失去焦点时会自动删除空白字符
   * @default false
   */
  trim?: boolean;
  /**
   * @en Render unmatch value
   * @cn 是否展示data中不存在的值
   * @default true
   */
  unmatch?: boolean;
  /**
   * @en When it is a string, return d[string]. When it is a function, return the result of the function
   * @cn 为 string 时，返回 d[string]。 为 function 时，返回函数结果
   * @default index
   */
  renderItem:
    | ObjectKey<DataItem>
    | ((data: DataItem, expanded: boolean, active: boolean, id: KeygenResult) => React.ReactNode);
  /**
   * @en In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button
   * @cn 高级筛选模式，可针对当前层级在筛选结果和原始数据间切换
   */
  onAdvancedFilter?: (text: string) => (data: DataItem) => boolean;

  /**
   * @en Expand event
   * @cn 节点展开回调，参数为当前展开节点 key 数组
   */
  onExpand?: (value: KeygenResult[]) => void;

  /**
   * @en Whether to adjust the position of the panel automatically. When the panel is blocked by the window, the position is adjusted automatically
   * @cn 是否开启自动调整面板位置功能。当面板被窗口遮挡时，自动调整位置
   * @default true
   */
  adjust?: boolean;

  /**
   * @en ms. The delay of user input triggering filter events
   * @cn 毫秒。用户输入触发 fitler 事件的延时
   * @default 400
   */
  filterDelay?: number;
  /**
   * @en Virtual list
   * @cn 虚拟列表
   */
  virtual?: boolean;
  /**
   * @en There are onFilter and onCreate, select Option, automatically focus Input
   * @cn 存在 onFilter 和 onCreate，选中 Option，自动 focus Input
   * @default false
   */
  reFocus?: boolean;
  /**
   * @en Class name of content
   * @cn 内容样式
   */
  contentClass?: string | ((data: DataItem) => string);
}
