import React from 'react';
import { KeygenResult, ObjectKey, StructKeygenType } from '../../common/type';

export type TableColumnOrder = 'asc' | 'desc';
export type TableColumnFix = 'left' | 'right';
export type TableColumnType = 'expand' | 'row-expand' | 'checkbox';

export interface SortItem {
  order: 'desc' | 'asc';
  weight?: number;
  key: KeygenResult;
  manual: boolean;
}
export interface BaseTableProps<Item> {
  /**
   * @en check children data while select all
   * @cn 全选时是否将子孙数据选中
   * @default false
   */
  treeCheckAll?: boolean;
  /**
   * @en Default expanded row keys
   * @cn 默认展开行(非受控)
   */
  defaultTreeExpandKeys?: KeygenResult[];
  /**
   * @en When treeExpandKeys is set, the callback is triggered when the row is expanded. Keys is expanded row key
   * @cn 当设置 treeExpandKeys 后，展开行时会触发该回调，keys 为展开的行
   */
  onTreeExpand?: (openKeys: KeygenResult[], data: Item, expand: boolean, index: number) => void;
  /**
   * @en Tree Table expanded row keys
   * @cn 树形数据展开行，受控
   */
  treeExpandKeys?: KeygenResult[];

  /**
   * @en Tree Table expand icon
   * @cn 树形数据展开图标，函数返回 null 时隐藏展开图标
   * @version 3.5.0
   */
  treeExpandIcon?: (data: Item, index: number, isExpanded: boolean) => React.ReactNode;

  /**
   * @en Table expand icon
   * @cn 自定义渲染可展开行的图标内容，其中 data 为当前行的数据，index 为数据下标，isExpanded 为当前行的展开状态，expandInstance 为原始展开行图标实例，clickEvent 为展开事件。展开事件 clickEvent 仅在列类型为 `expand` 时返回
   * @version 3.5.4
   */
  expandIcon?: (
    data: Item,
    index: number,
    isExpanded: boolean,
    expandInstance: React.ReactNode,
    clickEvent?: () => void,
  ) => React.ReactNode;

  /**
   * @en Tree Table data loader
   * @cn 树形数据加载函数
   * @version 3.5.0
   */
  loader?: (data: Item, index: number) => Promise<void>;

  /**
   * @en data
   * @cn 数据
   * @override object[]
   */
  data?: Item[];
  /**
   * @en the method of table sort，args are Column.sorter and order
   * Multi-column sorting is supported. The sorter passes in the object {rule: string | function, weight: number}, where rule is a sorting rule, which refers to the use of single-column sorting when it is a string, weight is the weight, indicating the priority of the order
   * When sorting on multiple columns, sortedList returns information about all fields involved in sorting
   *
   * @cn 表格统一排序函数，参数分别为 Column.sorter 和 排序方式;
   * 支持多列排序，sorter传入对象{ rule: string | function, weight: number }, rule为排序规则，为字符串时参考单列排序的用法, weight 为权重，指明排序的优先级。
   * 多列排序时，sortedList 返回所有参与排序的字段信息
   *
   * @default alphaSort(Column.sorter, sorter)
   */
  sorter?: (
    sortName: string,
    sorter: 'asc' | 'desc',
    sortedList: Array<TableSorterInfo>,
  ) => undefined | void | ((a: Item, b: Item) => number);
  /**
   * @en sort cancel event
   * @cn 排序取消事件
   */
  onSortCancel?: (
    preType: 'asc' | 'desc',
    key: KeygenResult,
    orders: SortItem[],
    sorter: string,
  ) => void;

  /**
   * @en sort directions
   * @cn 排序方向
   * @default ['asc', 'desc']
   * @version 3.5.0
   */
  sortDirections?: ('asc' | 'desc')[];

  /**
   * @en Set columnResizable to true to make all columns scalable
   * @cn 设置 columnResizable 为 true，使所有列可伸缩
   */
  columnResizable?: boolean;
  /**
   * @en columns resize callback
   * @cn 列宽伸缩后的回调
   * @override  (columns: TableColumn[]) => void
   */
  onColumnResize?: (columns: TableColumnItem<Item>[]) => void;
  /**
   * @en Recalculate columns width while data change
   * @cn 数据发生变化后是否重新计算列宽
   * @default false
   */
  dataChangeResize?: boolean;
  /**
   * @en TThe total width of the table, which defaults to the container width, must not be less than the sum of width set in columns
   * @cn 表格总宽度，默认为容器宽度，不可小于 columns 中设置的 width 之和
   */
  width?: number | string;
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
  keygen: StructKeygenType<Item>;
  /**
   * @en The function to determine whether a cell needs to be updated. The return value should be a boolean indicating whether the cell should re-render.
   * @cn 控制单元格是否需要更新的函数。返回值应为布尔值，指示单元格是否需要重新渲染
   * @version 3.7.0
   */
  shouldCellUpdate?: shouldCellUpdate<Item>;
}
export interface TableSorterInfo {
  order: TableColumnOrder;
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
export interface TableColumnSorter {
  rule: string | ((sorter: TableSorterInfo[]) => void);
  weight: number;
}
export interface ColumnRenderFunc<DataItem> {
  (data: DataItem, index: number, checkInstance?: React.ReactComponentElement<any>):
    | React.ReactNode
    | (() => React.ReactNode);
}

export interface TableColumnFilterBase<DataItem> {
  /**
   * @cn 筛选模式: search 搜索模式, select 选择模式
   * @en Filter mode: search search mode, select select mode
   */
  mode: 'search' | 'select';

  /**
   * @cn 筛选数据的函数
   * @en Filter data function
   * @param value 筛选值
   * @param row 行数据
   * @returns 是否通过筛选
   */
  onFilter: (value: any, row: DataItem) => boolean;

  /**
   * @cn 自定义的筛选项图标
   * @en Custom filter icon
   */
  icon?: React.ReactNode;
}

export type TableFilterData = {
  label: string;
  value: any;
  icon?: React.ReactNode;
  [key: string]: any;
  children?: TableFilterData[];
};
export interface SelectModeColumnFilter<DataItem> extends TableColumnFilterBase<DataItem> {
  /**
   * @cn 筛选模式为 select 时
   * @en Filter mode is select
   */
  mode: 'select';

  /**
   * 必填的 `config` 字段
   */
  config: {
    /**
     * @cn 筛选项数据
     * @en Filter item data
     */
    data: Array<TableFilterData>;

    /**
     * @cn 自定义渲染筛选项
     * @en Custom rendering filter options
     * @default (data) => data.label
     */
    renderItem?: ((item: TableFilterData) => React.ReactNode) | ObjectKey<TableFilterData>;

    /**
     * @cn 是否多选
     * @en Whether to multiple select
     */
    multiple?: boolean;

    /**
     * @cn 是否开启顶部的搜索框
     * @en Whether to open the top search box
     */
    search?: boolean;

    /**
     * @cn 是否高亮命中的关键词，仅当 search 为 true 时有效
     * @en Whether to highlight the hit keywords
     */
    highlight?: boolean;
  };

  /**
   * @cn 筛选数据的函数
   * @en Filter data function
   * @param value 筛选值，单选时为单个值，多选时为数组
   * @param row 行数据
   * @returns 是否通过筛选
   */
  onFilter: (value: any, row: DataItem) => boolean;
}

export interface SearchModeColumnFilter<DataItem> extends TableColumnFilterBase<DataItem> {
  /**
   * 筛选模式为 search 时
   */
  mode: 'search';

  /**
   * 此时不允许传 `config`
   */
  config?: never;
}

/**
 * 最终的联合类型
 */
export type TableColumnFilter<DataItem> =
  | SelectModeColumnFilter<DataItem>
  | SearchModeColumnFilter<DataItem>;

/**
 * @title TableColumn
 */
export interface TableColumnItem<DataItem> {
  /**
   * @en cell align
   * @cn 单元格内容排布方式
   * @default 'left'
   * @override union
   */
  align?: 'left' | 'center' | 'right';

  /**
   * @en The function for controlling to merge columns. The return value is an integer indicating the number of columns that need to be merged。
   * @cn 合并列控制函数，row为单行数据，返回值一个整数，标明需要合并的列数
   */
  colSpan?: (row: DataItem, index: number) => number;

  /**
   * @en default sort
   * @cn 默认排序规则
   */
  defaultOrder?: TableColumnOrder;

  /**
   * @en Fixed columns. If multiple adjacent columns need to be locked, specify only the outermost column
   * @cn 固定列,如果相邻的多列需要锁定，只需指定最外侧的 column 即可
   */
  fixed?: TableColumnFix;

  /**
   * @en The group of header column.
   * @cn 表头分组，相邻的相同 group 会生成一个新的表头
   */
  group?: string | React.ReactNode | Array<string | React.ReactNode>;

  /**
   * @en hide the column, only work on row-expand column
   * @cn 只针对行展开列有效，表示是否隐藏该列
   */
  hide?: boolean;

  /**
   * @en The key of the column
   * @cn 列的key，默认使用 index
   */
  key?: string | number;

  /**
   * @en min width
   * @cn 最小列宽
   */
  minWidth?: number;

  /**
   * @en max width
   * @cn 最大可拖动列宽
   */
  maxWidth?: number;

  /**
   * @en Select All to screen data. Valid only if type="checkbox"
   * @cn 全选时用来筛除数据，仅当 type="checkbox" 时有效
   */
  filterAll?: (data: DataItem[]) => DataItem[];

  /**
   * @en The generation function for Table content.d: the data of the current row. i: the index of the current row .For ease of use, you can pass in the key of a data, such as 'id', which is equivalent to (d) => { return d.id }
   * @cn 表格内容生成函数，返回渲染的内容,  data 当前行的数据，index 当前索引，instance 当 type="checkbox" 时会传入 Checkbox 实例
   * 为了使用方便，可以传入一个数据的key，如 'id'，相当于 (d) => { return d.id }
   * @override ObjectKey<DataItem> | function(d, id, instance)
   */
  render?: ObjectKey<DataItem> | ColumnRenderFunc<DataItem>;

  /**
   * @en According to the result (boolean) returned by the function to determine whether to merge rows, a and b are two adjacent rows of data
   * @cn 根据函数返回的结果（boolean）判断是否合并行，a、b为相邻的两行数据。
   */
  rowSpan?: (prevRowData: DataItem, nextRowData: DataItem) => boolean;

  /**
   * @en When the sorter is not empty, the sort icon appears in this column. the value of order: ['asc', 'desc']
   * Indicate the sort key string, will pass to table sorter method.
   * Front-end sorting returns a sort function, refer to Array.sort.
   * Server-side sorting, do not return values and handle it itself.
   *
   * @cn sorter 不为空时，这一列会出现排序 icon。order的值为['asc', 'desc']
   * 字符串表示排序依据字段，作为第一个参数传入Table.sorter
   * 为 Sorter 对象
   * 前端排序，返回一个排序函数，参考 Array.sort。(旧用法)
   * 服务端排序，不要返回值，自行处理即可。(旧用法)
   */
  sorter?:
    | ((
        order: TableColumnOrder,
      ) => ((prevRowData: DataItem, nextRowData: DataItem) => number) | void)
    | string
    | TableColumnSorter;

  /**
   * @en sort directions
   * @cn 排序方向
   * @default ['asc', 'desc']
   * @version 3.5.0
   */
  sortDirections?: ('asc' | 'desc')[];

  /**
   * @cn 列的筛选配置
   * @en Column filter configuration
   * @version 3.6.0
   */
  filter?: TableColumnFilter<DataItem>;

  /**
   * @en The content of the header
   * @cn 表头显示内容
   */
  title?: string | React.ReactNode | ((rowData: DataItem[]) => React.ReactNode);

  /**
   * @en tree table children-data name
   * @cn 树形表格子数据字段名
   */
  treeColumnsName?: ObjectKey<DataItem>;

  /**
   * @en indent of each level
   * @cn 每一层缩进宽度
   * @default 25
   */
  treeIndent?: number;

  /**
   * @en Special column
   * expand: Expand the column. When the render function returns a function, it means that the row can be expanded and the content  is the result returned by this function.
   * row-expand: Similar to expand. The difference is that clicking on the entire row triggers the expand event.
   * checkbox: Select column for scenes with only fixed selection columns
   *
   * @cn 特殊用途列
   * expand: 行展开列，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果。
   * row-expand: 同 expand。不同为点击行内空白区域也可以折叠/展开行。
   * checkbox: 选择列，仅用于固定选择列的场景
   */
  type?: TableColumnType;

  /**
   * @en width
   * @cn 列宽
   */
  width?: number | string;

  /**
   * @cn 列对应的类名
   * @en classname of column
   */
  className?: string;

  /**
   * @cn td 样式
   * @en style of td
   */
  style?: React.CSSProperties;

  /**
   * @cn 可展开元素点击事件仅当（仅该列为行展开列，并且传入 expandKeys 的时候生效）
   * @en Click event of expandable element only when (only this column is row-expand column and expandKeys is passed in)
   */
  onClick?: (d: DataItem, isExpand: boolean) => void;

  /**
   * @cn 单独设置某一列不可拖动
   * @en Separately set a column not to be draggable
   */
  columnResizable?: false;

  /**
   * @cn 是否需要更新单元格，dependencies是外部更新依赖项
   * @en Whether the cell needs to be updated, the third parameter is the external dependency
   * @version 3.7.0
   */
  shouldCellUpdate?: shouldCellUpdate<DataItem>;
}

export type shouldCellUpdate<T> =
  | ((prev: T, next: T) => boolean) // 第一种格式：函数类型
  | {
      update: (prev: T, next: T) => boolean; // 第二种格式：对象中的 update 方法
      dependencies: any[]; // 第二种格式：对象中的 dependencies
    };

export interface TableFormatColumn<DataItem> extends TableColumnItem<DataItem> {
  index: number;
  key: string | number;
  lastFixed?: boolean;
  firstFixed?: boolean;
}

export interface TableGroupColumn {
  name: React.ReactNode;
  key: string | number;
  colSpan: number;
  level: number;
  fixed?: TableColumnFix;
  firstFixed?: boolean;
  columns: TableHeadColumn[];
  lastFixed?: boolean;
  index: number;
}

export type TableHeadColumn = TableGroupColumn | TableFormatColumn<any>;
