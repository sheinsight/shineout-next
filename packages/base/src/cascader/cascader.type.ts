import React from 'react';
import { KeygenResult, ObjectKey, TreeModeType, DisabledOption } from '@sheinx/hooks';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';
import { CommonClasses, CommonType } from '../common/type';
import { TagClasses } from '../tag/tag.type';
import { SelectClasses } from '../select/select.type';
import { InnerTitleClasses } from '../common/use-inner-title';
import { PopoverClasses } from '../popover/popover.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { RadioClasses } from '../radio/radio.type';
import { SpinClasses } from '../spin/spin.type';
import { InputClasses } from '../input/input.type';
import { BaseTipProps } from '../common/use-tip';

export interface CascaderClasses {
  rootClass: string;
  empty: string;
  wrapper: string;
  wrapperEmpty: string;
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
  resultItem: string;
  resultItemActive: string;
  resultAlignRight: string;
  resultAlignLeft: string;
  resultAlignCenter: string;
  resultText: string;
  resultTextActive: string;
  resultTextDisabled: string;
  resultTextWrapper: string;
  resultTextPadding: string;
  compressedWrapper: string;
  controlMouse: string;
  controlKeyboard: string;
  placeholder: string;
  pickerWrapper: string;
  pickerWrapperShow: string;
  clearable: string;
  iconWrapper: string;
  clearIcon: string;
  compressedIcon: string;
  arrowIconOpen: string;
  arrowIcon: string;
  ellipsis: string;
  multiple: string;
  loading: string;
  checkedIcon: string;
  listContent: string;
  filterList: string;
  list: string;
  listSimple: string;
  tag: string;
  tagOnly: string;
  space: string;
  inputMirror: string;
  inputPlaceholder: string;
  moreWrapper: string;
  virtual: string;
  virtualList: string;
  option: string;
  filterOption: string;
  filterOptionItem: string;
  filterDisabledOption: string;
  filterOptionSeparator: string;
  optionCheckbox: string;
  activeOption: string;
  optionIcon: string;
  optionSpin: string;
  optionInner: string;
  optionLeaf: string;
  optionHover: string;
  optionActive: string;
  optionDisabled: string;
  multipleResultWrapper: string;
  multipleCompressedWrapper: string;
  hideTag: string;
}

export type JssStyleType = {
  tag?: () => TagClasses;
  select?: () => SelectClasses;
  innerTitle?: () => InnerTitleClasses;
  popover?: () => PopoverClasses;
  checkbox?: () => CheckboxClasses;
  radio?: () => RadioClasses;
  spin?: () => SpinClasses;
  input?: () => InputClasses;
  cascader?: () => CascaderClasses;
  common?: () => CommonClasses;
};

export interface CascaderRef {
  /**
   * @en Close the drop-down box
   * @cn 关闭下拉框
   */
  close: (e?: MouseEvent) => void;
}

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

export interface CascaderProps<DataItem, Value extends KeygenResult[]>
  extends Pick<
      CommonType,
      'className' | 'style' | 'size' | 'status' | 'innerTitle' | 'filterSameChange'
    >,
    Pick<AbsoluteListProps, 'absolute' | 'zIndex'>,
    BaseTipProps {
  jssStyle?: JssStyleType;
  /**
   * @en Open multiple selection
   * @cn 开启多选
   * @default false
   */
  multiple?: boolean;
  /**
   * @en Mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get
   * @cn 选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得
   */
  mode?: TreeModeType;
  /**
   * @en Input width
   * @cn 输入框宽度
   */
  width?: number | string;
  /**
   * @en Set visible of cascader popup
   * @cn 控制浮层显隐
   */
  open?: boolean;
  /**
   * @en Selected key (controlled). Note: Do not use undefined and null as meaningful option values. When the value type is undefined and null, the component will not process data and rendering
   * @cn 选中的 key （受控)。注意，请勿将 undefined 和 null 作为有意义的选项值，当 value 类型为 undefined 和 null 时，组件将不处理数据和渲染
   */
  value?: Value;
  /**
   * @en Selected key
   * @cn 默认选中的 key
   */
  defaultValue?: Value;
  /**
   * @en data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node
   * @cn 数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点
   * @override any[]
   */
  data?: DataItem[];
  /**
   * @en the key of the children data name
   * @cn 指定子数据的属性名
   * @default 'children'
   */
  childrenKey?: ObjectKey<DataItem>;
  /**
   * @en Only the last node can be selected
   * @cn 单选只支持选末级节点
   */
  final?: boolean;
  /**
   * @en The delay in milliseconds before the filter event is triggered by user input.
   * @cn 用户输入触发 fitler 事件的延时，单位为毫秒。
   * @default 'children'
   */
  filterDelay?: number;
  /**
   * @en Custom render dropdown
   * @cn 自定义渲染下拉列表
   */
  renderOptionList?: (list: React.ReactElement, info: { loading: boolean }) => React.ReactElement;
  /**
   * @en Custom rendering unmatched values
   * @cn 渲染未匹配值的方式
   */
  renderUnmatched?: (data: any) => React.ReactNode;
  /**
   * @en height of dropdown options
   * @cn 下拉列表高度
   * @default 300
   */
  height?: number;
  /**
   * @en render unmatch value
   * @cn 是否展示data中不存在的值
   * @default true
   */
  unmatch?: boolean;
  /**
   * @en If clearable is true, show clear value icon
   * @cn 是否显示清除数据图标
   * @default true
   */
  clearable?: boolean;
  /**
   * @en Allows all possible matching options to be choosed
   * @cn 开启 wideMatch 后，将筛选出所有可能的匹配项目
   * @default false
   */
  wideMatch?: boolean;
  /**
   * @en show dropdown arrow, only single select
   * @cn 是否显示下拉箭头，仅针对单选情况
   * @default true
   */
  showArrow?: boolean;
  /**
   * @en close options after chose the final node
   * @cn 选择末级节点后是否关闭选项列表
   * @default false
   */
  finalDismiss?: boolean;
  /**
   * @en Support single node deletion
   * @cn 支持单个节点删除
   */
  singleRemove?: boolean;
  /**
   * @en when compressed is True,the comptessedBound can limit the numbers of multiple selected item's label
   * @cn 开启多选后，指定允许展示标签数量，超过后将折叠
   */
  compressedBound?: number;
  /**
   *  @en dropdown list loading state
   *  @cn 下拉列表加载状态
   *  @override boolean | ReactNode
   *
   */
  loading?: boolean | React.ReactNode;
  /**
   * @en Merges selected values; the repeat value will not appear in the Popover when it is'no-repeat'
   * @cn 将选中值合并。为'no-repeat'时弹出框中不重复展示值
   * @default false
   */
  compressed?: boolean | 'no-repeat' | 'hide-popover';
  /**
   * @en Custom render compressed content
   * @cn 自定义渲染折叠内容，其中 data 为选中的数据，onRemove 为删除事件
   * @version 3.5.0
   */
  renderCompressed?: (options: RenderCompressedOption<DataItem>) => React.ReactNode;
  /**
   * @en options collapse callback
   * @cn 下拉列表展开/收起回调
   */
  onCollapse?: (collapse: boolean) => void;
  /**
   * @en If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node.
   * @cn 设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader 事件，children 为 null 或者长度为 0 视为叶子节点
   */
  loader?: (key: KeygenResult, data: DataItem) => void;
  /**
   * @en When disabled is true, the entire selection box is disabled. If disabled is a function, the option is disabled according to the return result of the function. For performance reasons, by default, disabled
   * @cn 当 disabled 为 true 时，禁用整个选择框。如果 disabled 为函数，根据函数反回结果禁用选项。出于性能考虑，默认情况下 disabled 只会在初始化时调用一次，如果 disabled 为函数且内部依赖外部状态，可以使用配置模式，将 disabled 设置为对象，对象中包含 disabled 函数 和 isRealtime 属性，当 isRealtime 为 true 时，每次状态更新都会调用 disabled 函数重新计算禁用状态
   * @default false
   */
  disabled?: ((data: DataItem) => boolean) | boolean | DisabledOption<DataItem>;
  /**
   * @en Expand mode
   * @cn 节点展开触发方式
   * @default 'click'
   */
  expandTrigger?: 'click' | 'hover' | 'hover-only';
  /**
   * @en When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property.
   * @cn 设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关
   */
  onChange?: (value: Value, selected?: DataItem) => void;
  /**
   * @en When the onFilter is not empty, you can filter data by input.If the onFilter returns a function, use this function as a front-end filter.If return undefined, you can do your own backend filtering.support in single selection state.
   * @cn onFilter 不为空时，可以输入过滤数据;onFilter 如果返回一个函数，使用这个函数做前端过滤;如果不返回，可以自行做后端过滤;单选状态下支持
   */
  onFilter?: (text: string) => ((data: DataItem) => boolean) | undefined | void;
  /**
   * @en Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
   * @cn 生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 'id'，相当于 (d) => d.id
   * @default index
   */
  keygen: ((data: DataItem, parentKey?: KeygenResult) => KeygenResult) | ObjectKey<DataItem>;
  /**
   * @en When 'renderItem' is a string, it returns DataItem[string]. If it's a function, it returns the result of the function.
   * @cn 当 renderItem 为 string 时，返回 DataItem\\[string]。 若为函数时，则返回函数结果
   * @default d => d
   */
  renderItem:
    | ObjectKey<DataItem>
    | ((data: DataItem, active?: boolean, id?: KeygenResult) => React.ReactNode);

  /**
   * @en The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected
   * @cn 选中后在结果中显示的内容，默认和 renderItem 相同
   * @default renderItem
   */
  renderResult?: ObjectKey<DataItem> | ((data: DataItem, row: DataItem[]) => React.ReactNode);
  /**
   * @private 弹出位置
   */
  position?: 'drop-up' | 'drop-down';
  /**
   * @en blur event
   * @cn 失焦事件
   */
  onBlur?: (e?: React.KeyboardEvent<HTMLDivElement>) => void;
  /**
   * @en focus event
   * @cn 聚焦事件
   */
  onFocus?: (e?: React.KeyboardEvent<HTMLDivElement>) => void;
  /**
   * @en placeholder
   * @cn 占位符
   */
  placeholder?: string;

  /**
   * @en empty input after select value
   * @cn 选中后是否清空输入框内容
   * @default true
   */
  emptyAfterSelect?: boolean;
  /**
   * @en Whether to display border
   * @cn 是否展示边框
   * @default true
   */
  border?: boolean;
  /**
   * @en Only display border bottom
   * @cn 是否只展示下边框
   */
  underline?: boolean;
  /**
   * @en The className of the selected result content container
   * @cn 选中结果内容容器的className
   */
  resultClassName?: ((value: DataItem) => string) | string;
  /**
   * @en Compressed popover classname
   * @cn 多选合并展示弹出框的类名
   */
  compressedClassName?: string;
  /**
   * @en onFilter Whether to select filter text after clicking the option in multi-selection situation
   * @cn onFilter 在多选情况下点击选项后是否选中过滤文本
   * @default true
   */
  focusSelected?: boolean;

  /**
   * @en Hide tag style, by default, the result is displayed in tag mode. After hiding the tag style, the result can be rendered by custom renderResult
   * @cn 隐藏标签样式，默认情况下展示结果以标签模式分割，隐藏标签样式后可通过自定义 renderResult 渲染分割结果
   * @default false
   */
  hideTag?: boolean;
  /**
   *  @en A reference to the binding component, you can call some component methods
   *  @cn 绑定组件的引用, 可以调用某些组件的方法
   *
   */
  getComponentRef?: ((comp: CascaderRef) => void) | { current: CascaderRef | undefined };
  /**
   * @en Whether to adjust the position of the panel automatically. When the panel is blocked by the window, the position is adjusted automatically
   * @cn 是否开启自动调整面板位置功能。当面板被窗口遮挡时，自动调整位置
   * @default true
   */
  adjust?: boolean;
  /**
   * @en Whether to use virtual list
   * @cn 是否使用虚拟列表
   * @default false
   * @version 3.5.0
   */
  virtual?: boolean;
  /**
   * @en custom empty copy
   * @cn 自定义 empty 文案。与 renderOptionList 搭配使用时，emptyText 设置为 false 后将忽略该功能，如需渲染空内容可在 renderOptionList 中处理
   * @version 3.6.0
   */
  emptyText?: React.ReactNode | boolean;
  /**
   * @en The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component
   * @cn 值改变前的回调，当返回值不为空时将作为组件的新值
   */
  beforeChange?: (value: Value) => any;

  /**
   * @cn 开启搜索关键字高亮功能
   * @en Whether to enable highlight feature
   * @version 3.7.0
   */
  highlight?: boolean;

  /**
   * @en Whether to show parent node in the result
   * @cn 展示的结果是否包含父节点
   * @default false
   * @version 3.8.0
   */
  showParent?: boolean;
}
