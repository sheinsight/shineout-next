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
   * @cn 当前选中值，格式和 onRowSelect 返回值一致
   * @override any
   */
  value?: Value;
  /**
   * @en Select row. Rows is the selected data.
   * @cn 选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议配置 format 和 prediction
   */
  onRowSelect?: (rows: Value) => void;
  /**
   * @en Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\\[format] When it is a function, use its return value.
   * @cn 格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d\\[format]; 为函数时，以函数返回结果作为 value。
   * @default d => d
   */
  format?: ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value);
  /**
   * @en By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match
   * @cn 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
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
   *
   * @cn 单元格点击事件
   * @en Cell click event
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
   * @en which takes effect when the virtual list is enabled
   * @cn 当开启虚拟列表时生效
   */
  scrollLeft?: number;
  /**
   * @en The expected height of a one-line table is just a rough estimate to show the scroll bar.
   * @cn 单行表格的预期高度，只是一个大概的估值，用来展示滚动条
   * @default 40
   */
  rowHeight?: number;
  /**
   * @en row hover highlight
   * @cn 数据行鼠标悬浮高亮效果
   * @default true
   */
  hover?: boolean;
  /**
   * @en empty text
   * @cn 空数据文案
   * @default getLocale("Data not found")
   */
  empty?: React.ReactNode;
  /**
   * @en whether to enable ctrl/cmd + click check
   * @cn 是否启用 ctrl/cmd + click 选中单元格
   * @default false
   */
  cellSelectable?: boolean;
  /**
   * @en height of table, same with style.height
   * @cn 表格高度，与 style.height 作用相同
   */
  height?: number | string;
  /**
   * @en The callback function after scrolling.\nx: Horizontal rolling ratio(0 <= x <= 1)\ny: Vertical scroll ratio(0 <= y <= 1)
   * @cn 滚动条滚动后回调函数；\nx: 横向滚动比(0 <= x <= 1)\ny: 纵向滚动比(0 <= y <= 1)
   */
  onScroll?: (x: number, y: number, left: number, top: number) => void;
  /**
   * @en Show pagination See [Pagination](/components/Pagination) for details
   * @cn 展示分页 详见 [Pagination](/components/Pagination)
   */
  pagination?: PaginationProps;
  /**
   * @en When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
   * @cn 数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替
   * @default false
   */
  loading?: boolean | React.ReactNode;
  /**
   * @deprecated 虚拟列表使用 virutal 属性替代
   */
  fixed?: TableFix | 'auto';
  /**
   *  @en Whether to use virtual list
   *  @cn 是否使用虚拟列表，设置为 lazy 时，表示在滚动时不触发 rerender
   */
  virtual?: boolean | 'lazy';
  /**
   * @en The maximum number of rows for a single render. Table uses lazy render to optimize performance under large amounts of data. If your table displays more than 20 rows, you can change the value of rowsInView. Value of 0 render all data.
   * @cn 单次 render的 最大行数。Table 采用了 lazy render 的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整 rowsInView 的值。为 0 表示单次 render 所有数据。
   * @default 20
   */
  rowsInView?: number;
  /**
   * @en size of table
   * @cn 表格尺寸
   * @default 'default'
   */
  size?: CommonType['size'];
  /**
   * @en is Radio
   * @cn 是否为单选
   * @default false
   */
  radio?: boolean;
  /**
   * @en vertical align with content
   * @cn 单元格内容垂直对齐方式
   * @default 'top'
   */
  verticalAlign?: 'top' | 'middle';
  /**
   * @en Pass in the native tr td, using styles only
   * @cn 传入原生 tr td, 只使用样式
   */
  children?: React.ReactNode;
  /**
   * @en TThe total width of the table, which defaults to the container width, must not be less than the sum of width set in columns
   * @cn 表格总宽度，默认为容器宽度，不可小于 columns 中设置的 width 之和
   */
  width?: number | string;
  /**
   * @en array，see TableColumn
   * @cn 数组，见 TableColumn
   * @override TableColumn[]
   * @default []
   */
  columns?: ColumnItem<DataItem>[];
  /**
   * @en When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   */
  disabled?: boolean | ((d: DataItem) => boolean);
  /**
   * @en show expand button while children data is empty
   * @cn 树形表格子数据为空时依然展示展开按钮
   * @default false
   */
  treeEmptyExpand?: boolean;
  /**
   * @en Sets the attribute of inner element to trigger onRowClick as needed, and '*' to accept the row click
   * @cn 设置行内元素的 attribute 来按需触发 onRowClick, '*'表示接受行点击触发
   * @default ['*']
   */
  rowClickAttr?: string[] | string | boolean;
  /**
   * @en Callback when row click. data: current row data; index: current row index
   * @cn 行点击事件; data: 当前行数据; index: 当前行索引
   */
  onRowClick?: (rowData: DataItem, index: number, fireAttr?: string | boolean) => void;
  /**
   * @en Whether to display zebra shading.
   * @cn 是否显示交错斑马底纹
   */
  striped?: boolean;
  /**
   * @en Specify row className
   * @cn 指定单行className
   * @override (rowData: DataItem, index: number) => string | undefined
   */
  rowClassName?: (rowData: DataItem, index: number) => string | undefined;
  /**
   * @en tr events
   * @cn tr 事件监听器集合
   * @override object
   */
  rowEvents?: ObjectType;
  /**
   * @en data
   * @cn 数据
   * @override object[]
   */
  data?: DataItem[];
  /**
   * @en Whether to show being fully selected.
   * @cn 是否显示全选
   * @default true
   */
  showSelectAll?: boolean;
  /**
   * @en Whether to display the border
   * @cn 是否显示外边框
   * @default false
   */
  bordered?: boolean;
  /**
   * @en check children data while select all
   * @cn 全选时是否将子孙数据选中
   * @default false
   */
  treeCheckAll?: boolean;
  /**
   * @en customize sort icons
   * @cn 自定义排序图标
   */
  renderSorter?: (params: RenderSorterParam) => React.ReactNode;
  /**
   * @en whether hide thead
   * @cn 是否隐藏表头
   * @default false
   */
  hideHeader?: boolean;
  /**
   * @en Footer information can be used to summarize
   * @cn 底部信息可用于总结
   */
  summary?: SummaryItem[][] | SummaryItem[];
  /**
   * @en sticky header, When it is true, the distance from the top is 0
   * @cn 表头是否附着顶部，为 true 时距离顶部为0
   *
   */
  sticky?: boolean | { top?: number; css?: boolean, target?: Element | null };

  /**
   * @en Whether to show the top scroller
   * @cn 是否开启顶部滚动条
   * @default false
   * @version 3.4.0
   */
  showTopScrollbar?: boolean;

  /**
   * @en Whether to show the bottom scroller
   * @cn 是否开启底部自定吸附的滚动条
   * @default false
   * @version 3.7.0
   */
  showBottomScrollbar?: boolean | BottomScrollbarOption;

  /**
   * @en Table instance (please use with caution: only fixed Table)
   * @cn Table 实例（请谨慎使用：仅虚拟列表支持）
   */
  tableRef?: (table: TableRef) => void;
  /**
   * @en Select row. Rows is the selected data.
   * @cn 选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议配置 format 和 prediction
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
 * @title TableColumn
 */
export type ColumnItem<DataItem> = TableColumnItem<DataItem>;
