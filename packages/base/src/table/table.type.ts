import React from 'react';
import { CommonType } from '../common/type';
import type {
  KeygenResult,
  StructKeygenType,
  ObjectType,
  TableColumnItem,
  BaseTableProps,
} from '@sheinx/hooks';

export interface TableClasses {
  wrapper: string;
  scrollY: string;
  floatLeft: string;
  floatRight: string;
  bordered: string;

  thead: string;
  tbody: string;
  tfoot: string;

  cellFixedLeft: string;
  cellFixedRight: string;
  cellFixedLast: string;

  hasSorter: string;
  sorterContainer: string;
  sorterActive: string;
  sorterAsc: string;
  sorterDesc: string;

  resizeSpanner: string;
  cellIgnoreBorder: string;
}

export interface TableRef {
  scrollToIndex: (index: number, cb?: () => void) => void;
  [key: string]: any;
}

export interface TableProps<DataItem, Value>
  extends Pick<CommonType, 'className' | 'style'>,
    BaseTableProps<DataItem> {
  jssStyle?: {
    table: () => TableClasses;
  };
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
   * @en controlled expand rows
   * @cn 展开行受控
   */
  expandKeys?: KeygenResult[];
  /**
   * @cn 生成每一项key的辅助方法
   * 为函数时，使用此函数返回值
   * 为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   * @en Generate a auxiliary method for each key
   * If not filled, index will be used (not recommended, in some cases there may be problems)
   * When it is a function, use its return value.
   * When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id .
   */
  keygen: StructKeygenType<DataItem>;
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
   *  todo sticky
   */
  // sticky?: boolean | StickyProps
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
