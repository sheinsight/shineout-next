import React from 'react';
import { CommonType } from '../common/type';
import type { ObjectType, TableColumnItem, BaseTableProps, ObjectKey } from '@sheinx/hooks';
import { useListSelect, useTableTree } from '@sheinx/hooks';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { RadioClasses } from '../radio/radio.type';
import { SpinClasses } from '../spin/spin.type';

export type ListDatum = ReturnType<typeof useListSelect<any, any>>;
export type UseTreeResult = ReturnType<typeof useTableTree>;

export interface TableClasses {
  wrapper: string;
  small: string;
  large: string;
  default: string;
  scrollY: string;
  floatLeft: string;
  floatRight: string;
  bordered: string;
  sticky: string;
  verticalAlignTop: string;
  verticalAlignMiddle: string;

  loading: string;

  headWrapper: string;
  bodyWrapper: string;
  footWrapper: string;

  cellFixedLeft: string;
  cellFixedRight: string;
  cellFixedLast: string;
  cellCenter: string;

  rowStriped: string;

  hasSorter: string;
  sorterContainer: string;
  sorterActive: string;
  sorterAsc: string;
  sorterDesc: string;

  resizeSpanner: string;
  resizeSpannerActive: string;
  resizeSpannerInactive: string;

  cellIgnoreBorder: string;

  expandIcon: string;
  iconWrapper: string;

  expandWrapper: string;
}

export interface TableRef {
  scrollToIndex: (index: number, cb?: () => void) => void;
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
  };
  /**
   * @en When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
   * @cn 数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替
   * @default false
   */
  loading?: boolean | React.ReactNode;
  /**
   * @depressed 虚拟列表使用 virutal 属性替代
   */
  fixed?: boolean | TableFix;
  /**
   *  @en Whether to use virtual list
   *  @cn 是否使用虚拟列表
   */
  virtual?: boolean;
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
  width?: number;
  columns: ColumnItem<DataItem>[];
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
  data: DataItem[];
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
   * @en sticky header, When it is true, the distance from the top is 0. When it is an object, the attribute value reference [Sticky component](/components/Sticky)
   * @cn 表头是否附着顶部，为 true 时距离顶部为0，为对象时属性值参考 [Sticky](/components/Sticky) 组件
   */
  sticky?: boolean | { top: number };
  /**
   * @en Table instance (please use with caution: only fixed Table)
   * @cn Table 实例（请谨慎使用：仅固定表格）
   */
  tableRef?: (table: TableRef) => void;
  /**
   * Select row. Rows is the selected data.
   *
   * 选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议配置 format 和 prediction
   *
   * default: none
   */
  onRowSelect?: (rows: Value) => void;
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
  status?: 'asc' | 'desc';
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
