import React from 'react';
import { CommonType } from '../common/type';
import type { ObjectType, TableColumnItem, BaseTableProps, ObjectKey } from '@sheinx/hooks';
import { useListSelect, useTableTree } from '@sheinx/hooks';
import { SpinClasses } from '../spin/spin.type';
import { PaginationProps } from '../pagination/pagination.type';
import { PaginationClasses } from '../pagination/pagination.type';
import { ButtonClasses } from '../button/button.type';
import { EmptyClasses } from '../empty/empty.type';
import { InputClasses } from '../input/input.type';
import { CascaderClasses } from '../cascader/cascader.type';
import { SelectClasses } from '../select/select.type';
import { TreeSelectClasses } from '../tree-select/tree-select.type';
import { DatePickerClasses } from '../date-picker/date-picker.type';
import { SwitchClasses } from '../switch/switch.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { RadioClasses } from '../radio/radio.type';
import { PopoverClasses } from '../popover/popover.type';
import { TreeClasses } from '../tree/tree.type';
import { KeygenResult } from '@sheinx/hooks';
import { StickyProps } from '../sticky';

export type ListDatum = ReturnType<typeof useListSelect<any, any>>;
export type UseTreeResult = ReturnType<typeof useTableTree>;

export interface TableClasses {
  rootClass: string;
  wrapper: string;
  small: string;
  large: string;
  default: string;
  floatLeft: string;
  floatRight: string;
  bordered: string;
  sticky: string;
  verticalAlignTop: string;
  verticalAlignMiddle: string;

  simple: string;
  striped: string;

  loading: string;

  mirrorScroller: string;
  headWrapper: string;
  bodyWrapper: string;
  footWrapper: string;
  emptyWrapper: string;
  emptyNoBorder: string;
  emptyHeader: string;
  scrollY: string;
  scrollX: string;

  cellAlignLeft: string;
  cellAlignRight: string;
  cellAlignCenter: string;
  cellFixedLeft: string;
  cellFixedRight: string;
  cellFixedLast: string;
  cellGroup: string;
  cellHover: string;
  cellCheckbox: string;

  rowHover: string;

  rowStriped: string;
  rowChecked: string;
  rowExpand: string;

  hasSorter: string;
  sorterContainer: string;
  sorterActive: string;
  sorterAsc: string;
  sorterDesc: string;

  hasFilter: string;
  filterContainer: string;
  filterActive: string;
  filterInput: string;
  filterInputIcon: string;
  filterIcon: string;
  filterIconContainer: string;
  filterRadio: string;

  filterHeader: string;
  filterBody: string;
  filterFooter: string;

  resizeSpanner: string;
  resizeSpannerActive: string;
  resizeSpannerInactive: string;

  cellIgnoreBorder: string;

  expandIcon: string;
  iconWrapper: string;

  expandWrapper: string;
  expandIconWrapper: string;

  pagination: string;
}
export interface TableRef {
  scrollToIndex: (index: number, cb?: () => void) => void;
  getRenderIndexByData: (data: any) => number;
  scrollColumnIntoView: (colKey: string | number) => void;
  scrollColumnByLeft: (left: number) => void;
  sortByColumn: (params: {columnKey: KeygenResult, direction: 'desc' | 'asc' | null, columnSorter: TableColumnItem<any>['sorter']}) => void;
  [key: string]: any;
}

export interface TableSelectProps<DataItem, Value> {
  /**
   * @en The current selected value.
   * @cn 当前选中的数据值，数据格式与 onRowSelect 回调返回的格式保持一致
   * @whenCn 需要受控的行选择功能时使用，用于外部管理选中状态
   * @whenEn Use for controlled row selection to manage selected state externally
   * @override any
   */
  value?: Value;
  /**
   * @en Select row. Rows is the selected data.
   * @cn 行选择事件的回调函数。rows 参数为当前选中的行数据。如需格式化选中的数据，请配合使用 format 和 prediction 属性
   * @whenCn 当需要行选择功能时使用，用于批量操作、数据导出等场景
   * @whenEn Use when row selection is needed for batch operations, data export, etc.
   */
  onRowSelect?: (rows: Value) => void;
  /**
   * @en Format selected value. When string: extracts value using key (e.g., 'id' extracts d.id). When function: parameter is row data, returns formatted value
   * @cn 格式化选中值。字符串时：作为属性名提取值（如 'id' 提取 d.id）。函数时：参数为行数据，返回格式化后的值
   * @whenCn 当选中值需要特定格式（如仅保存 ID）时使用
   * @whenEn Use when selected values need specific format (e.g., storing only IDs)
   * @default d => d
   */
  format?: ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value);
  /**
   * @en Custom value matching function. Parameters: value (selected value), data (row data). Returns true if matched. Used when default comparison fails (e.g., different object references)
   * @cn 自定义值匹配函数。参数：value（选中值），data（行数据）。返回 true 表示匹配。用于默认比较失效时（如对象引用不同）
   * @whenCn 当数据对象引用变化（如从服务器重新获取）但需保持选中状态时使用
   * @whenEn Use when data object references change (e.g., refetched from server) but selection state needs to persist
   * @default (val, d) => val===format(d)
   */
  prediction?: (value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean;
  disabled?: boolean | ((d: DataItem) => boolean);
}

export interface TableProps<DataItem, Value>
  extends Pick<CommonType, 'className' | 'style'>,
    BaseTableProps<DataItem>,
    TableSelectProps<DataItem, Value> {
  jssStyle?: {
    table?: () => TableClasses;
    checkbox?: () => CheckboxClasses;
    radio?: () => RadioClasses;
    spin?: () => SpinClasses;
    pagination?: () => PaginationClasses;
    button?: () => ButtonClasses;
    input?: () => InputClasses;
    empty?: () => EmptyClasses;
    select?: () => SelectClasses;
    cascader?: () => CascaderClasses;
    treeSelect?: () => TreeSelectClasses;
    datePicker?: () => DatePickerClasses;
    switch?: () => SwitchClasses;
    popover?: () => PopoverClasses
    tree?: () => TreeClasses;
  };
  /**
   * @en Cell click event handler. Parameters: data (row data), info.rowIndex (row index), info.columnIndex (column index), info.columnKey (column key)
   * @cn 单元格点击事件的回调函数。参数：data（行数据），info.rowIndex（行索引），info.columnIndex（列索引），info.columnKey（列的唯一标识）
   * @whenCn 需要单元格级别的交互（如单元格编辑、详情查看）时使用
   * @whenEn Use when cell-level interaction is needed (e.g., cell editing, detail viewing)
   */
  onCellClick?: (
    data: DataItem,
    info: {
      rowIndex: number;
      columnIndex: number;
      columnKey: string | number;
    },
  ) => void;
  /**
   * @en Horizontal scroll position (only works with virtual scrolling)
   * @cn 横向滚动位置（仅在虚拟滚动模式下生效）
   * @whenCn 需要程序化控制横向滚动位置时使用
   * @whenEn Use to programmatically control horizontal scroll position
   */
  scrollLeft?: number;
  /**
   * @en Expected height of a single row. Used for virtual scrolling calculations and scrollbar display.
   * @cn 单行的预估高度。用于虚拟滚动的计算和滚动条显示
   * @whenCn 当行高与默认值差异较大时调整，以优化虚拟滚动性能
   * @whenEn Adjust when row height differs significantly from default to optimize virtual scrolling performance
   * @default 40
   */
  rowHeight?: number;
  /**
   * @en Enable row hover highlighting effect
   * @cn 是否启用行的鼠标悬浮高亮效果
   * @whenCn 设为 false 可在复杂表格或特殊设计需求时禁用悬浮效果
   * @whenEn Set to false to disable hover effect for complex tables or special design requirements
   * @default true
   */
  hover?: boolean;
  /**
   * @en Content to display when table has no data
   * @cn 表格无数据时显示的内容
   * @whenCn 自定义空数据提示，如添加操作按钮或个性化提示信息
   * @whenEn Customize empty state message, e.g., add action buttons or personalized hints
   * @default getLocale("Data not found")
   */
  empty?: React.ReactNode;
  /**
   * @en Enable cell selection with Ctrl/Cmd + click
   * @cn 是否启用 Ctrl/Cmd + 点击来选中单元格
   * @whenCn 需要单元格选择功能（如复制单元格内容）时使用
   * @whenEn Use when cell selection is needed (e.g., copying cell content)
   * @default false
   */
  cellSelectable?: boolean;
  /**
   * @en Table height (same as style.height)
   * @cn 表格高度（与 style.height 作用相同）
   * @whenCn 需要固定表格高度或启用纵向滚动时使用
   * @whenEn Use to set fixed table height or enable vertical scrolling
   */
  height?: number | string;
  /**
   * @en Scroll event callback. Parameters: x (horizontal scroll ratio 0-1), y (vertical scroll ratio 0-1), left (horizontal scroll pixels), top (vertical scroll pixels)
   * @cn 滚动事件回调函数。参数：x（横向滚动比例 0-1），y（纵向滚动比例 0-1），left（横向滚动像素值），top（纵向滚动像素值）
   * @whenCn 需要监听滚动位置（如同步滚动、懒加载）时使用
   * @whenEn Use to monitor scroll position (e.g., synchronized scrolling, lazy loading)
   */
  onScroll?: (x: number, y: number, left: number, top: number) => void;
  /**
   * @en Pagination configuration. See [Pagination](/components/Pagination) for details
   * @cn 分页配置项。详见 [Pagination](/components/Pagination) 组件文档
   * @whenCn 数据量较大需要分页显示时使用
   * @whenEn Use when large datasets need paginated display
   */
  pagination?: PaginationProps;
  /**
   * @en Loading state. Shows default [Spin](/components/Spin) when true, or custom loading component when provided
   * @cn 加载状态。为 true 时显示默认的 [Spin](/components/Spin) 组件，也可传入自定义的加载组件
   * @whenCn 数据加载中或异步操作时显示加载状态
   * @whenEn Show loading state during data fetching or async operations
   * @default false
   */
  loading?: boolean | React.ReactNode;
  /**
   * @deprecated 虚拟列表使用 virutal 属性替代
   */
  fixed?: TableFix | 'auto';
  /**
   *  @en Enable virtual scrolling. Set to 'lazy' to prevent re-rendering during scroll
   *  @cn 启用虚拟滚动。设置为 'lazy' 可在滚动时避免重新渲染，提升性能
   *  @whenCn 大数据量表格（超过 100 行）时使用以优化性能
   *  @whenEn Use for large datasets (over 100 rows) to optimize performance
   */
  virtual?: boolean | 'lazy';
  /**
   * @en Maximum rows rendered at once. Uses lazy rendering for performance with large datasets. Adjust if displaying more than 20 rows. Set to 0 to render all data.
   * @cn 单次渲染的最大行数。使用懒加载优化大数据量性能。若表格超过 20 行，可调整此值。设为 0 渲染全部数据
   * @whenCn 根据可视区域行数调整以平衡性能和用户体验
   * @whenEn Adjust based on visible rows to balance performance and user experience
   * @default 20
   */
  rowsInView?: number;
  /**
   * @en Table size
   * @cn 表格尺寸大小
   * @whenCn 根据内容密度和设计需求选择合适的尺寸
   * @whenEn Choose appropriate size based on content density and design requirements
   * @default 'default'
   */
  size?: CommonType['size'];
  /**
   * @en Enable single row selection (radio mode)
   * @cn 启用单选模式（只能选中一行）
   * @whenCn 需要单选功能（如选择主记录、默认项）时使用
   * @whenEn Use when single selection is needed (e.g., selecting primary record, default item)
   * @default false
   */
  radio?: boolean;
  /**
   * @en Vertical alignment of cell content
   * @cn 单元格内容的垂直对齐方式
   * @whenCn 当单元格内容高度不一致时调整对齐方式
   * @whenEn Adjust alignment when cell content heights vary
   * @default 'top'
   */
  verticalAlign?: 'top' | 'middle';
  /**
   * @en Native tr/td elements (only applies styles, no functionality)
   * @cn 原生 tr/td 元素（仅应用样式，不提供功能）
   * @whenCn 需要使用原生 HTML 表格元素但保留样式时使用
   * @whenEn Use when native HTML table elements are needed but want to keep styling
   */
  children?: React.ReactNode;
  /**
   * @en Total table width. Defaults to container width. Must not be less than sum of column widths
   * @cn 表格总宽度。默认为容器宽度，不能小于各列宽度之和
   * @whenCn 需要固定表格宽度或处理横向滚动时使用
   * @whenEn Use to set fixed table width or handle horizontal scrolling
   */
  width?: number | string;
  /**
   * @en Column configuration array. See Table columns 配置 (CommonColumn) for details
   * @cn 列配置数组。详见 Table columns 配置
   * @whenCn 定义表格的列结构、渲染方式和行为
   * @whenEn Define table column structure, rendering and behavior
   * @override CommonColumn[]
   * @default []
   */
  columns?: ColumnItem<DataItem>[];
  /**
   * @en Disable rows. When true, disables all rows. When function: parameter d is row data, returns true to disable that row
   * @cn 禁用行选择。为 true 时禁用所有行。为函数时：参数 d 为行数据，返回 true 禁用该行
   * @whenCn 需要根据条件禁用某些行的选择功能时使用
   * @whenEn Use to disable row selection based on conditions
   */
  disabled?: boolean | ((d: DataItem) => boolean);
  /**
   * @en Show expand button even when tree node has no children
   * @cn 树形表格中，即使节点没有子数据也显示展开按钮
   * @whenCn 在树形表格中需要动态加载子节点时使用
   * @whenEn Use in tree tables when child nodes are loaded dynamically
   * @default false
   */
  treeEmptyExpand?: boolean;
  /**
   * @en Specify which elements can trigger row click. Use '*' to allow any element, or specify attribute names
   * @cn 指定哪些元素可以触发行点击。'*' 表示任何元素都可触发，也可指定特定的属性名
   * @whenCn 需要精确控制行点击触发区域时使用
   * @whenEn Use to precisely control which areas trigger row clicks
   * @default ['*']
   */
  rowClickAttr?: string[] | string | boolean;
  /**
   * @en Row click event handler. Parameters: rowData (current row data), index (row index), fireAttr (triggered element attribute)
   * @cn 行点击事件回调。参数：rowData（当前行数据），index（行索引），fireAttr（触发点击的元素属性）
   * @whenCn 需要响应整行点击（如展开详情、导航）时使用
   * @whenEn Use when responding to full row clicks (e.g., expand details, navigation)
   */
  onRowClick?: (rowData: DataItem, index: number, fireAttr?: string | boolean) => void;
  /**
   * @en Enable alternating row colors (zebra striping)
   * @cn 启用交替行颜色（斑马纹效果）
   * @whenCn 需要通过视觉区分提高表格可读性时使用
   * @whenEn Use to improve table readability through visual distinction
   */
  striped?: boolean;
  /**
   * @en Custom CSS class for each row. Parameters: rowData (row data), index (row index). Returns class name string
   * @cn 为每一行设置自定义 CSS 类名。参数：rowData（行数据），index（行索引）。返回类名字符串
   * @whenCn 需要根据数据状态（如高亮、警告）自定义行样式时使用
   * @whenEn Use to customize row styles based on data state (e.g., highlight, warning)
   * @override (rowData: DataItem, index: number) => string | undefined
   */
  rowClassName?: (rowData: DataItem, index: number) => string | undefined;
  /**
   * @en Event handlers for tr elements
   * @cn 表格行 (tr) 元素的事件处理器集合
   * @whenCn 需要监听行级别的 DOM 事件（如鼠标悬停、右键菜单）时使用
   * @whenEn Use to listen to row-level DOM events (e.g., hover, context menu)
   * @override object
   */
  rowEvents?: ObjectType;
  /**
   * @en Table data array
   * @cn 表格数据数组
   * @whenCn 提供表格要显示的数据源
   * @whenEn Provide data source for table display
   * @override object[]
   */
  data?: DataItem[];
  /**
   * @en Show select all checkbox in header
   * @cn 是否在表头显示全选复选框
   * @whenCn 需要隐藏全选功能（如分页场景下避免误操作）时设为 false
   * @whenEn Set to false to hide select-all (e.g., avoid mistakes in paginated scenarios)
   * @default true
   */
  showSelectAll?: boolean;
  /**
   * @en Display table border
   * @cn 显示表格边框
   * @whenCn 需要清晰的表格边界或符合特定设计规范时使用
   * @whenEn Use when clear table boundaries are needed or to meet design requirements
   * @default false
   */
  bordered?: boolean;
  /**
   * @en Include all descendant nodes when selecting all (tree mode)
   * @cn 全选时是否包含所有子孙节点（树形模式）
   * @whenCn 树形表格中需要级联选择所有子节点时使用
   * @whenEn Use in tree tables when cascading selection of all child nodes is needed
   * @default false
   */
  treeCheckAll?: boolean;
  /**
   * @en Custom render function for sort icons. params.status: current sort state ('asc'|'desc'|null), params.triggerAsc: trigger ascending sort, params.triggerDesc: trigger descending sort
   * @cn 自定义渲染排序图标的函数。参数：status 当前排序状态（'asc'|'desc'|null），triggerAsc 触发升序排序，triggerDesc 触发降序排序
   * @whenCn 需要自定义排序图标样式或交互方式时使用
   * @whenEn Use to customize sort icon style or interaction
   */
  renderSorter?: (params: RenderSorterParam) => React.ReactNode;
  /**
   * @en Hide table header
   * @cn 隐藏表格头部
   * @whenCn 特殊场景下不需要表头（如纯数据展示）时使用
   * @whenEn Use in special cases when header is not needed (e.g., pure data display)
   * @default false
   */
  hideHeader?: boolean;
  /**
   * @en Table footer for summary rows
   * @cn 表格底部，用于显示汇总行
   * @whenCn 需要显示数据汇总、统计信息或总计时使用
   * @whenEn Use to display data summaries, statistics or totals
   */
  summary?: SummaryItem[][] | SummaryItem[];
  /**
   * @en Sticky table header. When true, sticks to top with 0 offset. Can also pass object with top offset and CSS mode options
   * @cn 固定表头。为 true 时固定在顶部（偏移量为 0）。也可传入对象配置 top 偏移量和 CSS 模式等选项
   * @whenCn 长表格需要保持表头可见以便理解数据含义时使用
   * @whenEn Use for long tables to keep header visible for data context
   */
  sticky?: boolean | { top?: number; css?: boolean, target?: Element | null };

  /**
   * @en Show horizontal scrollbar at table top
   * @cn 在表格顶部显示横向滚动条
   * @whenCn 宽表格且表头需要滚动控制时使用，避免滚动到底部才能横向滚动
   * @whenEn Use for wide tables when header needs scroll control without scrolling to bottom
   * @default false
   * @version 3.4.0
   */
  showTopScrollbar?: boolean;

  /**
   * @en Show sticky horizontal scrollbar at table bottom. Can pass boolean or object with bottom offset and zIndex
   * @cn 在表格底部显示固定的横向滚动条。可传入布尔值或包含 bottom 偏移量和 zIndex 的对象
   * @whenCn 长表格需要始终可见的横向滚动控制时使用
   * @whenEn Use for long tables needing always-visible horizontal scroll control
   * @default false
   * @version 3.7.0
   */
  showBottomScrollbar?: boolean | BottomScrollbarOption;

  /**
   * @en Get table instance reference. Provides methods: scrollToIndex, getRenderIndexByData, scrollColumnIntoView, scrollColumnByLeft, sortByColumn. Use with caution, only supported in virtual mode
   * @cn 获取表格实例引用。提供方法：scrollToIndex 滚动到指定行，getRenderIndexByData 获取数据的渲染索引，scrollColumnIntoView 滚动到指定列，scrollColumnByLeft 按像素横向滚动，sortByColumn 程序化排序。请谨慎使用，仅在虚拟模式下支持
   * @whenCn 需要程序化控制表格滚动或排序行为时使用
   * @whenEn Use for programmatic control of table scrolling or sorting behavior
   */
  tableRef?: (table: TableRef) => void;
  /**
   * @en Row selection callback. Parameter rows contains selected data. Use format and prediction for data formatting
   * @cn 行选择回调函数。参数 rows 包含选中的数据。如需数据格式化，请配合使用 format 和 prediction
   * @whenCn 需要响应行选择变化进行后续操作时使用
   * @whenEn Use to respond to row selection changes for subsequent operations
   */
  onRowSelect?: (rows: Value) => void;
}

interface BottomScrollbarOption extends Pick<StickyProps, 'bottom'> {
  zIndex?: number;
}

export interface SorterInfo {
  order?: ColumnOrder;
  /**
   * @cn 如果是 defaultOrder 触发的排序, manual 为 false
   */
  manual: boolean;
  /**
   * @cn 列 key
   */
  key: string | number;
  /**
   * @cn 设置的权重
   */
  weight?: number;
}

export interface Sorter {
  rule: string | ((sorter: SorterInfo[]) => void);
  weight: number;
}

export type ColumnOrder = 'asc' | 'desc';

export type ColumnFix = 'left' | 'right';

export type TableFix = 'x' | 'y' | 'both';

export type ColumnType = 'expand' | 'row-expand' | 'checkbox';

export interface RenderSorterParam {
  status?: 'asc' | 'desc' | null;
  triggerAsc: () => void;
  triggerDesc: () => void;
}

export interface SummaryItem {
  render: () => React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
}

/**
 * @title Table columns 配置项 (CommonColumn)
 * @en Column configuration for Table component. The TypeScript type is CommonColumn
 * @cn Table 组件的列配置项。TypeScript 类型为 CommonColumn
 */
export type ColumnItem<DataItem> = TableColumnItem<DataItem>;
