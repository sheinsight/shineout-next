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
  filterOpened: string;
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
  cellSortable: string;

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
   * @override any
   */
  value?: Value;
  /**
   * @en Select row. Rows is the selected data.
   * @cn 行选择事件的回调函数。rows 参数为当前选中的行数据。如需格式化选中的数据，请配合使用 format 和 prediction 属性
   */
  onRowSelect?: (rows: Value) => void;
  /**
   * @en Format selected value. When string: extracts value using key (e.g., 'id' extracts d.id). When function: parameter is row data, returns formatted value
   * @cn 格式化选中值。字符串时：作为属性名提取值（如 'id' 提取 d.id）。函数时：参数为行数据，返回格式化后的值
   * @default d => d
   */
  format?: ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value);
  /**
   * @en Custom value matching function. Parameters: value (selected value), data (row data). Returns true if matched. Used when default comparison fails (e.g., different object references)
   * @cn 自定义值匹配函数。参数：value（选中值），data（行数据）。返回 true 表示匹配。用于默认比较失效时（如对象引用不同）
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
   */
  scrollLeft?: number;
  /**
   * @en Expected height of a single row. Used for virtual scrolling calculations and scrollbar display.
   * @cn 单行的预估高度。用于虚拟滚动的计算和滚动条显示
   * @default 40
   */
  rowHeight?: number;
  /**
   * @en Enable row hover highlighting effect
   * @cn 是否启用行的鼠标悬浮高亮效果
   * @default true
   */
  hover?: boolean;
  /**
   * @en Content to display when table has no data
   * @cn 表格无数据时显示的内容
   * @default getLocale("Data not found")
   */
  empty?: React.ReactNode;
  /**
   * @en Enable cell selection with Ctrl/Cmd + click
   * @cn 是否启用 Ctrl/Cmd + 点击来选中单元格
   * @default false
   */
  cellSelectable?: boolean;
  /**
   * @en Table height (same as style.height)
   * @cn 表格高度（与 style.height 作用相同）
   */
  height?: number | string;
  /**
   * @en Scroll event callback. Parameters: x (horizontal scroll ratio 0-1), y (vertical scroll ratio 0-1), left (horizontal scroll pixels), top (vertical scroll pixels)
   * @cn 滚动事件回调函数。参数：x（横向滚动比例 0-1），y（纵向滚动比例 0-1），left（横向滚动像素值），top（纵向滚动像素值）
   */
  onScroll?: (x: number, y: number, left: number, top: number) => void;
  /**
   * @en Pagination configuration. See [Pagination](/components/Pagination) for details
   * @cn 分页配置项。详见 [Pagination](/components/Pagination) 组件文档
   */
  pagination?: PaginationProps;
  /**
   * @en Loading state. Shows default [Spin](/components/Spin) when true, or custom loading component when provided
   * @cn 加载状态。为 true 时显示默认的 [Spin](/components/Spin) 组件，也可传入自定义的加载组件
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
   */
  virtual?: boolean | 'lazy';
  /**
   * @en Maximum rows rendered at once. Uses lazy rendering for performance with large datasets. Adjust if displaying more than 20 rows. Set to 0 to render all data.
   * @cn 单次渲染的最大行数。使用懒加载优化大数据量性能。若表格超过 20 行，可调整此值。设为 0 渲染全部数据
   * @default 20
   */
  rowsInView?: number;
  /**
   * @en Table size
   * @cn 表格尺寸大小
   * @default 'default'
   */
  size?: CommonType['size'];
  /**
   * @en Enable single row selection (radio mode)
   * @cn 启用单选模式（只能选中一行）
   * @default false
   */
  radio?: boolean;
  /**
   * @en Vertical alignment of cell content
   * @cn 单元格内容的垂直对齐方式
   * @default 'top'
   */
  verticalAlign?: 'top' | 'middle';
  /**
   * @en Native tr/td elements (only applies styles, no functionality)
   * @cn 原生 tr/td 元素（仅应用样式，不提供功能）
   */
  children?: React.ReactNode;
  /**
   * @en Total table width. Defaults to container width. Must not be less than sum of column widths
   * @cn 表格总宽度。默认为容器宽度，不能小于各列宽度之和
   */
  width?: number | string;
  /**
   * @en Column configuration array. See TableColumn for details
   * @cn 列配置数组。详见 TableColumn 文档
   * @override TableColumn[]
   * @default []
   */
  columns?: ColumnItem<DataItem>[];
  /**
   * @en Disable rows. When true, disables all rows. When function: parameter d is row data, returns true to disable that row
   * @cn 禁用行选择。为 true 时禁用所有行。为函数时：参数 d 为行数据，返回 true 禁用该行
   */
  disabled?: boolean | ((d: DataItem) => boolean);
  /**
   * @en Show expand button even when tree node has no children
   * @cn 树形表格中，即使节点没有子数据也显示展开按钮
   * @default false
   */
  treeEmptyExpand?: boolean;
  /**
   * @en Specify which elements can trigger row click. Use '*' to allow any element, or specify attribute names
   * @cn 指定哪些元素可以触发行点击。'*' 表示任何元素都可触发，也可指定特定的属性名
   * @default ['*']
   */
  rowClickAttr?: string[] | string | boolean;
  /**
   * @en Row click event handler. Parameters: rowData (current row data), index (row index), fireAttr (triggered element attribute)
   * @cn 行点击事件回调。参数：rowData（当前行数据），index（行索引），fireAttr（触发点击的元素属性）
   */
  onRowClick?: (rowData: DataItem, index: number, fireAttr?: string | boolean) => void;
  /**
   * @en Enable alternating row colors (zebra striping)
   * @cn 启用交替行颜色（斑马纹效果）
   */
  striped?: boolean;
  /**
   * @en Custom CSS class for each row. Parameters: rowData (row data), index (row index). Returns class name string
   * @cn 为每一行设置自定义 CSS 类名。参数：rowData（行数据），index（行索引）。返回类名字符串
   * @override (rowData: DataItem, index: number) => string | undefined
   */
  rowClassName?: (rowData: DataItem, index: number) => string | undefined;
  /**
   * @en Event handlers for tr elements
   * @cn 表格行 (tr) 元素的事件处理器集合
   * @override object
   */
  rowEvents?: ObjectType;
  /**
   * @en Table data array
   * @cn 表格数据数组
   * @override object[]
   */
  data?: DataItem[];
  /**
   * @en Show select all checkbox in header
   * @cn 是否在表头显示全选复选框
   * @default true
   */
  showSelectAll?: boolean;
  /**
   * @en Display table border
   * @cn 显示表格边框
   * @default false
   */
  bordered?: boolean;
  /**
   * @en Include all descendant nodes when selecting all (tree mode)
   * @cn 全选时是否包含所有子孙节点（树形模式）
   * @default false
   */
  treeCheckAll?: boolean;
  /**
   * @en Custom render function for sort icons. params.status: current sort state ('asc'|'desc'|null), params.triggerAsc: trigger ascending sort, params.triggerDesc: trigger descending sort
   * @cn 自定义渲染排序图标的函数。参数：status 当前排序状态（'asc'|'desc'|null），triggerAsc 触发升序排序，triggerDesc 触发降序排序
   */
  renderSorter?: (params: RenderSorterParam) => React.ReactNode;
  /**
   * @en Hide table header
   * @cn 隐藏表格头部
   * @default false
   */
  hideHeader?: boolean;
  /**
   * @en Table footer for summary rows
   * @cn 表格底部，用于显示汇总行
   */
  summary?: SummaryItem[][] | SummaryItem[];
  /**
   * @en Sticky table header. When true, sticks to top with 0 offset. Can also pass object with top offset and CSS mode options
   * @cn 固定表头。为 true 时固定在顶部（偏移量为 0）。也可传入对象配置 top 偏移量和 CSS 模式等选项
   */
  sticky?: boolean | { top?: number; css?: boolean, target?: Element | null };

  /**
   * @en Show horizontal scrollbar at table top
   * @cn 在表格顶部显示横向滚动条
   * @default false
   * @version 3.4.0
   */
  showTopScrollbar?: boolean;

  /**
   * @en Show sticky horizontal scrollbar at table bottom. Can pass boolean or object with bottom offset and zIndex
   * @cn 在表格底部显示固定的横向滚动条。可传入布尔值或包含 bottom 偏移量和 zIndex 的对象
   * @default false
   * @version 3.7.0
   */
  showBottomScrollbar?: boolean | BottomScrollbarOption;

  /**
   * @en Get table instance reference. Provides methods: scrollToIndex, getRenderIndexByData, scrollColumnIntoView, scrollColumnByLeft, sortByColumn. Use with caution, only supported in virtual mode
   * @cn 获取表格实例引用。提供方法：scrollToIndex 滚动到指定行，getRenderIndexByData 获取数据的渲染索引，scrollColumnIntoView 滚动到指定列，scrollColumnByLeft 按像素横向滚动，sortByColumn 程序化排序。请谨慎使用，仅在虚拟模式下支持
   */
  tableRef?: (table: TableRef) => void;
  /**
   * @en Row selection callback. Parameter rows contains selected data. Use format and prediction for data formatting
   * @cn 行选择回调函数。参数 rows 包含选中的数据。如需数据格式化，请配合使用 format 和 prediction
   */
  onRowSelect?: (rows: Value) => void;

  /**
   * @en Click the cell to trigger sorting
   * @cn 点击单元格触发排序
   * @version 3.8.0
   */
  cellSortable?: boolean;
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
 * @title TableColumn
 */
export type ColumnItem<DataItem> = TableColumnItem<DataItem>;
