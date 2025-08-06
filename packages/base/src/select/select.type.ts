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
  compressedBoundWrapper: string;
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
  keepScrollTop?: boolean;
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
   * @en Custom empty state content. When used with renderOptionList, setting emptyText to false will disable this feature. You can render custom empty content in renderOptionList
   * @cn 自定义空状态内容。与 renderOptionList 搭配使用时，将 emptyText 设置为 false 可禁用此功能，需要自定义空内容时可在 renderOptionList 中处理
   * @when When no options match the filter or data array is empty
   */
  emptyText?: React.ReactNode;

  /**
   * @en Array of option items to display in the dropdown list
   * @cn 下拉列表的选项数据数组
   * @override DataItem[]
   * @when Use for flat list data structure
   */
  data?: DataItem[];

  /**
   * @en Tree-structured data with nested children. Format: [{children: [...]}]
   * @cn 树形结构数据，包含嵌套的子节点。格式：[{children: [...]}]
   * @override Object[]
   * @when Use for hierarchical/nested data structure instead of flat data
   */
  treeData?: DataItem[];

  /**
   * @en Specifies the property name for child nodes in tree data
   * @cn 指定树形数据中子节点的属性名称
   * @default 'children'
   * @when When using treeData with a different property name for children
   */
  childrenKey?: ObjectKey<DataItem>;

  /**
   * @en Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, "id" is the same thing as (d) => d.id. The default value is the array index. For simple arrays (strings/numbers), this works fine. However, for object arrays, you MUST specify a proper keygen to avoid errors. Without a proper keygen, the component will use the entire object as the key, which can cause React rendering errors when renderItem defaults to (d) => d.
   * @cn 生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 "id"，相当于 (d) => d.id。默认值为数组索引。对于简单数组（字符串/数字），可以使用默认值。但对于对象数组，必须指定合适的 keygen 以避免错误。如果不指定 keygen，组件会将整个对象作为 key，当 renderItem 默认为 (d) => d 时，会导致将对象直接渲染到 DOM 中，引发 React 渲染错误。
   * @default index
   * @when Always required for object arrays; optional for primitive arrays
   */
  keygen: KeygenType<DataItem>;

  /**
   * @en The selected value(s). In Form context, this prop is managed by Form. Note: Do not use undefined or null as meaningful option values - the component will skip processing when value is undefined/null
   * @cn 选中的值。在表单中使用时，此属性由表单管理。注意：请勿使用 undefined 或 null 作为有效选项值，当 value 为 undefined/null 时组件将跳过处理
   * @override any
   * @when For controlled component usage; omit when used inside Form
   */
  value?: Value;

  /**
   * @en Shows a clear icon to remove all selected values when enabled
   * @cn 启用时显示清除图标，可一键清空所有选中值
   * @default false
   * @when When users need ability to quickly clear selection
   */
  clearable?: boolean;

  /**
   * @en Placeholder text displayed when no option is selected
   * @cn 未选择任何选项时显示的占位文本
   * @when To provide hint text when select is empty
   */
  placeholder?: string;

  /**
   * @en Loading state indicator. Shows default Spin component when true, or accepts custom loading component
   * @cn 加载状态指示器。为 true 时显示默认的 Spin 组件，也可传入自定义加载组件
   * @override boolean | ReactNode
   * @default false
   * @when When fetching data asynchronously or during search operations
   */
  loading?: boolean | React.ReactNode;

  /**
   * @en Custom content rendered at the top of the dropdown list
   * @cn 自定义下拉列表顶部内容
   * @when To display instructions, filters, or actions above options
   */
  header?: React.ReactNode;

  /**
   * @en Custom content rendered at the bottom of the dropdown list
   * @cn 自定义下拉列表底部内容
   * @when To display summary, actions, or load more button below options
   */
  footer?: React.ReactNode;

  /**
   * @en Custom render function for the entire dropdown list content. The first parameter `list` contains the pre-rendered option list (including virtual scrolling, columns layout if configured). The second parameter `info` contains: `loading` - current loading state, which can be boolean (shows default spinner when true) or custom ReactNode. Note: When using this prop with emptyText, set emptyText to false to fully control empty state rendering
   * @cn 自定义渲染整个下拉列表内容。第一个参数 `list` 包含预渲染的选项列表（包括虚拟滚动、多列布局等）。第二个参数 `info` 包含：`loading` - 当前加载状态，可为 boolean（true 时显示默认加载动画）或自定义 ReactNode。注意：与 emptyText 配合使用时，将 emptyText 设为 false 可完全控制空状态渲染
   * @when For complete control over dropdown content (e.g., custom wrapper, animations, additional UI elements around the option list)
   */
  renderOptionList?: (
    list: React.ReactNode,
    info: { loading?: boolean | React.ReactNode },
  ) => React.ReactNode;

  /**
   * @en Controls whether to display the select box border
   * @cn 控制是否显示选择框边框
   * @default true
   * @when Set to false for borderless design or custom styling
   */
  border?: boolean;

  /**
   * @en Shows only the bottom border for a minimal underline style
   * @cn 仅显示底部边框，呈现下划线样式
   * @default false
   * @when For minimal UI design or form-like appearance
   */
  underline?: boolean;

  /**
   * @en Controls the visibility of the dropdown list programmatically
   * @cn 程序化控制下拉列表的显示/隐藏状态
   * @when For controlled dropdown state or custom trigger logic
   */
  open?: boolean;

  /**
   * @en Width of the select input box. Accepts number (px) or string with units
   * @cn 选择框的宽度。可接受数字（像素）或带单位的字符串
   * @when To set fixed width instead of default auto-sizing
   */
  width?: number | string;

  /**
   * @en Maximum height of the dropdown list. Accepts number (px) or string with units
   * @cn 下拉列表的最大高度。可接受数字（像素）或带单位的字符串
   * @when To limit dropdown height when many options exist
   */
  height?: number | string;

  /**
   * @en Width of the dropdown list. Accepts number (px) or string with units
   * @cn 下拉列表的宽度。可接受数字（像素）或带单位的字符串
   * @default 100%
   * @when When dropdown needs different width than select input
   */
  optionWidth?: number | string;

  /**
   * @en Maximum number of options rendered at once. Uses virtual scrolling for performance with large datasets. Increase if you need to display more than 10 visible items
   * @cn 一次渲染的最大选项数。使用虚拟滚动优化大数据集性能。如需显示超过 10 个可见项，请调整此值
   * @default 10
   * @when Increase when dropdown height shows more than 10 items
   */
  itemsInView?: number;

  /**
   * @en Height of each option item. For fixed-height content, set a number. Use 'auto' for dynamic heights based on content (may impact performance with large datasets)
   * @cn 每个选项的高度。固定高度内容请设置数字；设为 'auto' 则根据内容自适应高度（大数据集时可能影响性能）
   * @default 32
   * @version 3.4.0 added 'auto' mode
   * @when Set number for consistent height items; 'auto' for variable content
   */
  lineHeight?: number | 'auto';

  /**
   * @en Dropdown list placement position. 'auto' adjusts based on available space
   * @cn 下拉列表弹出位置。'auto' 会根据可用空间自动调整
   * @default auto
   * @when Override auto positioning for specific layout requirements
   */
  position?: 'auto' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

  /**
   * @en Number of columns to display options. Values > 1 enable multi-column layout
   * @cn 选项显示的列数。大于 1 时启用多列布局模式
   * @default 1
   * @when When many short options need better space utilization
   */
  columns?: number;

  /**
   * @en Title displayed above columns in multi-column multi-select mode
   * @cn 多列多选模式下，列顶部显示的标题
   * @when Using multi-column layout with multiple selection
   */
  columnsTitle?: React.ReactNode;

  /**
   * @en Disables value-to-data caching. By default, Select caches the mapping between values and data items for performance. When data changes frequently, set this to true to ensure the component always uses the latest data
   * @cn 禁用值与数据项的缓存。默认情况下，Select 会缓存 value 对应的 data 项以优化性能。当 data 频繁变化时，建议设为 true 以确保组件始终使用最新数据
   * @default false
   * @when When data updates frequently or dynamically
   */
  noCache?: boolean;

  /**
   * @en Shows dropdown arrow icon (single select only)
   * @cn 显示下拉箭头图标（仅单选模式）
   * @default true
   * @when Set to false for cleaner appearance or custom icon
   */
  showArrow?: boolean;

  /**
   * @en In multi-select with filter, whether to select the filter text after clicking an option
   * @cn 多选模式下启用过滤时，点击选项后是否选中过滤输入框中的文本
   * @default true
   * @when Set to false to preserve filter text after selection
   */
  focusSelected?: boolean;

  /**
   * @en Automatically removes leading/trailing whitespace from input on blur
   * @cn 失去焦点时自动删除输入内容的首尾空白字符
   * @default false
   * @when For cleaner data when users may accidentally input spaces
   */
  trim?: boolean;

  /**
   * @en Width of each column in multi-column layout (only when columns > 1)
   * @cn 多列布局中每列的宽度（仅在 columns > 1 时生效）
   * @default 160
   * @when Adjust based on option content length in multi-column mode
   */
  columnWidth?: number;

  /**
   * @en Maximum character length allowed in the filter input
   * @cn 过滤输入框允许输入的最大字符数
   * @when To limit filter/create input length
   */
  maxLength?: number;

  /**
   * @en In multi-select mode, joins selected values into a string using this separator
   * @cn 多选模式下，使用此分隔符将选中值连接成字符串
   * @when When backend expects comma-separated or other delimited string
   */
  separator?: string;

  /**
   * @en Auto-adjusts dropdown width based on content
   * @cn 下拉列表宽度根据内容自动调整
   * @default false
   * @when When option content varies significantly in width
   */
  autoAdapt?: boolean;

  /**
   * @en Compresses multiple selected items display. true: dynamically calculates and shows '+N' based on container width; 'no-repeat': same as true but hides already selected items from popover; 'hide-popover': shows '+N' without popover
   * @cn 压缩多选项显示。true: 根据容器宽度动态计算并显示 '+N'；'no-repeat': 与 true 相同但弹出框中不重复显示已选项；'hide-popover': 仅显示 '+N' 不显示弹出框
   * @default false
   * @when When multiple selections may exceed container width
   */
  compressed?: boolean | 'no-repeat' | 'hide-popover';

  /**
   * @en Fixed number of tags to display before showing '+N'. When set, always shows this many tags regardless of container width. This provides better performance for large datasets as it avoids expensive DOM calculations
   * @cn 固定显示的标签数量，超出部分显示 '+N'。设置后将始终显示指定数量的标签，不再根据容器宽度动态计算。对于大数据集，推荐设置此属性以避免昂贵的 DOM 计算，提升性能
   * @when With compressed mode and many selections for better performance
   */
  compressedBound?: number;

  /**
   * @en CSS class name for the compressed items popover
   * @cn 压缩项弹出框的 CSS 类名
   * @when To style the compressed items popover
   */
  compressedClassName?: string;

  /**
   * @en Custom render function for compressed items display
   * @cn 自定义渲染压缩/折叠项的显示内容
   * @version 3.5.0
   * @when To customize the '+N' display or compressed content
   */
  renderCompressed?: (options: RenderCompressedOption<DataItem>) => React.ReactNode;

  /**
   * @en Hides the create option from the dropdown list. Press Enter to select the created value directly
   * @cn 从下拉列表中隐藏创建选项。按回车键直接选中创建的值
   * @default false
   * @when With onCreate for cleaner UI when creating is primary action
   */
  hideCreateOption?: boolean;

  /**
   * @en Auto-selects the only matching option on blur when filtering returns single result
   * @cn 过滤结果仅剩一个选项时，失焦自动选中该选项（仅在启用过滤时有效）
   * @default false
   * @when For better UX when users expect single match to be selected
   */
  filterSingleSelect?: boolean;

  /**
   * @en Initially expanded node keys for tree data (uncontrolled)
   * @cn 树形数据中默认展开的节点 key 值（非受控）
   * @override (string | number)[]
   * @when With treeData to show specific nodes expanded initially
   */
  defaultExpanded?: KeygenResult[];

  /**
   * @en Initially expands all tree nodes (tree data only)
   * @cn 初始展开所有树节点（仅树形数据有效）
   * @default false
   * @when For small tree datasets where all nodes should be visible
   */
  defaultExpandAll?: boolean;

  /**
   * @en Controlled expanded node keys for tree data
   * @cn 树形数据中展开的节点 key 值（受控）
   * @override (string | number)[]
   * @when For controlled tree expansion state
   */
  expanded?: KeygenResult[];

  /**
   * @en Shows descendant nodes of matched items when filtering tree data
   * @cn 过滤树形数据时，显示匹配项的所有子节点
   * @default false
   * @when To keep parent-child context visible during search
   */
  showHitDescendants?: boolean;

  /**
   * @en Converts line breaks when pasting text. String replaces breaks; function transforms the text
   * @cn 粘贴文本时转换换行符。字符串用于替换换行；函数用于转换文本
   * @default " "
   * @when When pasting multi-line content with onCreate
   */
  convertBr?: string | ((text: string) => string);

  /**
   * @en CSS class name for selected item display. Can be string or function returning class based on value
   * @cn 选中项显示容器的 CSS 类名。可为字符串或基于值返回类名的函数
   * @when To style selected items differently based on value
   */
  resultClassName?: ((value: DataItem) => string) | string;

  /**
   * @en Renders each option in dropdown. String uses property value; function customizes display
   * @cn 渲染下拉列表中的每个选项。字符串使用属性值；函数自定义显示
   * @default d => d
   * @when To display complex option content or specific property
   */
  renderItem?: ((data: DataItem, index?: number) => React.ReactNode) | ObjectKey<DataItem>;

  /**
   * @en Renders selected items display. Falls back to renderItem if not specified
   * @cn 渲染选中项的显示内容。未指定时使用 renderItem
   * @default renderItem
   * @when When selected display differs from dropdown display
   */
  renderResult?: (data: DataItem, index?: number) => React.ReactNode;

  /**
   * @en Custom render for values that don't match any option in data
   * @cn 自定义渲染数据中不存在的值
   * @when When value might not exist in current data (e.g., async loading)
   */
  renderUnmatched?: (value: Value extends (infer U)[] ? U : Value) => React.ReactNode;

  /**
   * @en Triggered when the select loses focus
   * @cn 选择框失去焦点时触发
   * @when For form validation or saving draft selections
   */
  onBlur?: (e: any) => void;

  /**
   * @en Triggered when the select receives focus
   * @cn 选择框获得焦点时触发
   * @when To load data, show hints, or track analytics
   */
  onFocus?: (e: any) => void;

  /**
   * @en Enables filtering. Return a function for client-side filtering, or undefined for server-side filtering
   * @cn 启用过滤功能。返回函数用于前端过滤，返回 undefined 用于后端过滤
   * @when For searchable select or large datasets
   */
  onFilter?: (text: string, from?: string) => ((data: DataItem) => boolean) | void | undefined;

  /**
   * @en Creates new options from input. true uses input as-is; function transforms input into option
   * @cn 从输入创建新选项。true 直接使用输入值；函数将输入转换为选项
   * @when For tags input or allowing custom values
   */
  onCreate?: ((input: string | DataItem) => DataItem | string) | boolean;

  /**
   * @en Called when Enter key is pressed to expand dropdown. Return false to prevent expansion
   * @cn 按回车键展开下拉框时调用。返回 false 阻止展开
   * @when To customize Enter key behavior
   */
  onEnterExpand?: (e: React.KeyboardEvent<HTMLDivElement>) => boolean;

  /**
   * @en Triggered when dropdown opens or closes. Parameter indicates collapsed state
   * @cn 下拉框打开/关闭时触发。参数表示是否收起状态
   * @when To sync UI state or load data on open
   */
  onCollapse?: (collapse: boolean) => void;

  /**
   * @en Triggered when tree nodes expand/collapse. Receives array of expanded node keys
   * @cn 树节点展开/收起时触发。接收展开节点的 key 数组
   * @when For controlled tree expansion or tracking state
   */
  onExpand?: (value: KeygenResult[]) => void;

  /**
   * @en Added a new API, which is used to compare whether the same data already exists when onFilter and onCreate are turned on. By default, the input value is compared with the keygen value
   * @cn 新增 api ，开启 onFilter 和 onCreate 时，用于比对是否已经存在相同的数据，默认用输入的值和 keygen 值比对
   */
  // onFilterWidthCreate?: (data: DataItem, createdData: DataItem, key: string | number) => boolean;

  /**
   * @en Clears filter input after selecting an option
   * @cn 选中选项后清空过滤输入框
   * @default false
   * @when For better UX in searchable multi-select
   */
  emptyAfterSelect?: boolean;
  /**
   * @en Debounce delay (ms) for filter input
   * @cn 过滤输入的防抖延迟（毫秒）
   * @default 400
   * @when Adjust for server-side filtering or performance
   */
  filterDelay?: number;
  /**
   * @en Loads children dynamically for tree nodes. Nodes without children trigger loader on expand
   * @cn 动态加载树节点子级。无 children 的节点展开时触发加载
   * @when For lazy-loading large tree structures
   */
  loader?: (key: KeygenResult, data: DataItem) => void;
  /**
   * @en Advanced filter mode allowing toggle between filtered results and original data at current level
   * @cn 高级过滤模式，允许在当前层级的过滤结果和原始数据间切换
   * @when For complex filtering scenarios with toggle capability
   */
  onAdvancedFilter?: (text: string) => (data: DataItem) => boolean;
  /**
   * @en Auto-focuses filter input after selecting when filter and create are enabled
   * @cn 启用过滤和创建功能时，选中选项后自动聚焦输入框
   * @default false
   * @when For continuous input in filter+create mode
   */
  reFocus?: boolean;

  /**
   * @en Auto-adjusts dropdown position when blocked by viewport edges
   * @cn 下拉框被视口边缘遮挡时自动调整位置
   * @default true
   * @when Set to false for fixed positioning requirements
   */
  adjust?: boolean;

  /**
   * @en Triggered when scrolling to bottom of dropdown list for infinite scrolling
   * @cn 滚动到下拉列表底部时触发，用于无限滚动加载
   * @version 3.4.0
   * @when For pagination or lazy-loading large datasets
   */
  onLoadMore?: () => void | Promise<any>;

  /**
   * @en Scroll threshold (0-1) for triggering onLoadMore. 1 means bottom of list
   * @cn 触发 onLoadMore 的滚动阈值（0-1）。1 表示列表底部
   * @default 1
   * @version 3.4.0
   * @when Set lower to preload before reaching bottom
   */
  threshold?: number;

  /**
   * @en Trigger mode for opening dropdown
   * @cn 打开下拉框的触发方式
   * @default 'click'
   * @version 3.4.0
   * @when Use 'hover' for quick preview scenarios
   */
  trigger?: 'click' | 'hover';

  /**
   * @en Highlights matching text when filtering
   * @cn 过滤时高亮匹配的文本
   * @version 3.7.0
   * @when To visually indicate search matches
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
