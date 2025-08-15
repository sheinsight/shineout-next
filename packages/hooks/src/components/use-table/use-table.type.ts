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
   * @whenCn 需要设置初始展开的树形行但不需要外部控制时使用
   * @whenEn Use to set initially expanded tree rows without external control
   */
  defaultTreeExpandKeys?: KeygenResult[];
  /**
   * @en When treeExpandKeys is set, the callback is triggered when the row is expanded. Keys is expanded row key
   * @cn 当设置 treeExpandKeys 后，展开行时会触发该回调，keys 为展开的行
   * @whenCn 需要响应树形行展开/折叠操作时使用
   * @whenEn Use to respond to tree row expand/collapse operations
   */
  onTreeExpand?: (openKeys: KeygenResult[], data: Item, expand: boolean, index: number) => void;
  /**
   * @en Tree Table expanded row keys
   * @cn 树形数据展开行，受控
   * @whenCn 需要外部控制树形行的展开状态时使用
   * @whenEn Use for external control of tree row expansion state
   */
  treeExpandKeys?: KeygenResult[];

  /**
   * @en Tree Table expand icon
   * @cn 树形数据展开图标，函数返回 null 时隐藏展开图标
   * @whenCn 需要自定义树形表格展开图标的样式或行为时使用
   * @whenEn Use to customize tree table expand icon style or behavior
   * @version 3.5.0
   */
  treeExpandIcon?: (data: Item, index: number, isExpanded: boolean) => React.ReactNode;

  /**
   * @en Table expand icon
   * @cn 自定义渲染可展开行的图标内容，其中 data 为当前行的数据，index 为数据下标，isExpanded 为当前行的展开状态，expandInstance 为原始展开行图标实例，clickEvent 为展开事件。展开事件 clickEvent 仅在列类型为 `expand` 时返回
   * @whenCn 需要自定义展开行图标的渲染逻辑或样式时使用
   * @whenEn Use to customize expand row icon rendering logic or style
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
   * @whenCn 需要动态加载树形子节点数据时使用
   * @whenEn Use for dynamic loading of tree child node data
   * @version 3.5.0
   */
  loader?: (data: Item, index: number) => Promise<void>;

  /**
   * @en data
   * @cn 数据
   * @whenCn 提供表格要显示的数据源
   * @whenEn Provide data source for table display
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
   * @whenCn 需要自定义排序逻辑或实现多列排序时使用
   * @whenEn Use for custom sorting logic or multi-column sorting
   * @default alphaSort(Column.sorter, sorter)
   */
  sorter?: (
    sortName: string,
    sorter: 'asc' | 'desc',
    sortedList: Array<TableSorterInfo>,
  ) => undefined | void | ((a: Item, b: Item) => number);
  /**
   * @en Sort cancel event callback. Triggered when clicking a sorted column to cancel sorting. Parameters: preType (previous sort direction), key (column key), orders (all current sort items), sorter (column sorter name)
   * @cn 排序取消事件回调。当点击已排序的列取消排序时触发。参数：preType（之前的排序方向），key（列的唯一标识），orders（当前所有排序项信息），sorter（列的排序器名称）
   * @whenCn 需要在取消排序时执行特定操作时使用
   * @whenEn Use to perform specific actions when sorting is cancelled
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
   * @whenCn 需要限制可用的排序方向（如只允许升序）时使用
   * @whenEn Use to limit available sort directions (e.g., ascending only)
   * @default ['asc', 'desc']
   * @version 3.5.0
   */
  sortDirections?: ('asc' | 'desc')[];

  /**
   * @en Set columnResizable to true to make all columns scalable
   * @cn 设置 columnResizable 为 true，使所有列可伸缩
   * @whenCn 需要用户能够手动调整列宽时使用
   * @whenEn Use when users need to manually adjust column widths
   */
  columnResizable?: boolean;
  /**
   * @en columns resize callback
   * @cn 列宽伸缩后的回调
   * @whenCn 需要响应列宽变化（如保存用户配置）时使用
   * @whenEn Use to respond to column width changes (e.g., save user preferences)
   * @override  (columns: TableColumn[]) => void
   */
  onColumnResize?: (columns: TableColumnItem<Item>[]) => void;
  /**
   * @en Recalculate columns width while data change
   * @cn 数据发生变化后是否重新计算列宽
   * @whenCn 数据内容长度变化较大时使用，保持列宽合理分配
   * @whenEn Use when data content length varies significantly to maintain proper column width distribution
   * @default false
   */
  dataChangeResize?: boolean;
  /**
   * @en TThe total width of the table, which defaults to the container width, must not be less than the sum of width set in columns
   * @cn 表格总宽度，默认为容器宽度，不可小于 columns 中设置的 width 之和
   * @whenCn 需要固定表格宽度或处理横向滚动时使用
   * @whenEn Use to set fixed table width or handle horizontal scrolling
   */
  width?: number | string;
  /**
   * @en controlled expand rows
   * @cn 展开行受控
   * @whenCn 需要外部控制行展开状态时使用
   * @whenEn Use for external control of row expansion state
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
   * @whenCn 为每行数据生成唯一标识，用于选择、展开等功能
   * @whenEn Generate unique identifier for each row, used for selection, expansion, etc.
   */
  keygen: StructKeygenType<Item>;
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
   * @en Filter mode. 'search': Text search mode. 'select': Select from predefined options
   * @cn 筛选模式。'search'：文本搜索模式。'select'：从预定义选项中选择
   * @whenCn 根据筛选需求选择合适的模式
   * @whenEn Choose appropriate mode based on filtering needs
   */
  mode: 'search' | 'select';

  /**
   * @en Filter function. Parameters: value (filter value), row (row data). Returns true if row passes filter
   * @cn 筛选函数。参数：value（筛选值）、row（行数据）。返回 true 表示通过筛选
   * @whenCn 实现自定义筛选逻辑时使用
   * @whenEn Use to implement custom filtering logic
   */
  onFilter: (value: any, row: DataItem) => boolean;

  /**
   * @en Custom icon for filter button
   * @cn 自定义筛选按钮图标
   * @whenCn 需要自定义筛选图标样式时使用
   * @whenEn Use to customize filter icon style
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
   * @en Filter mode is 'select'
   * @cn 筛选模式为 'select'
   * @whenCn 需要从预定义选项中筛选时使用
   * @whenEn Use when filtering from predefined options
   */
  mode: 'select';

  /**
   * 必填的 `config` 字段
   */
  config: {
    /**
     * @en Filter options data array
     * @cn 筛选选项数据数组
     * @whenCn 提供筛选选项列表
     * @whenEn Provide list of filter options
     */
    data: Array<TableFilterData>;

    /**
     * @en Custom render for filter options. Can be function or property key
     * @cn 自定义渲染筛选选项。可以是函数或属性名
     * @whenCn 需要自定义筛选选项显示格式时使用
     * @whenEn Use to customize filter option display format
     * @default (data) => data.label
     */
    renderItem?: ((item: TableFilterData) => React.ReactNode) | ObjectKey<TableFilterData>;

    /**
     * @en Enable multiple selection
     * @cn 启用多选
     * @whenCn 需要同时筛选多个条件时使用
     * @whenEn Use when filtering by multiple criteria simultaneously
     */
    multiple?: boolean;

    /**
     * @en Show search box in filter dropdown
     * @cn 在筛选下拉框中显示搜索框
     * @whenCn 筛选选项较多时使用，方便快速查找
     * @whenEn Use when many filter options, for quick search
     */
    search?: boolean;
  };

  /**
   * @en Filter function. Parameters: value (single value or array for multiple), row (row data). Returns true if row passes filter
   * @cn 筛选函数。参数：value（单选时为单值，多选时为数组）、row（行数据）。返回 true 通过筛选
   * @whenCn 实现基于选项的筛选逻辑时使用
   * @whenEn Use to implement option-based filtering logic
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
 * @title Table columns 配置项 (CommonColumn)
 */
export interface TableColumnItem<DataItem> {
  /**
   * @en Horizontal alignment of cell content
   * @cn 单元格内容的水平对齐方式
   * @whenCn 根据内容类型调整对齐（如数字右对齐）
   * @whenEn Adjust alignment based on content type (e.g., right-align numbers)
   * @default 'left'
   * @override union
   */
  align?: 'left' | 'center' | 'right';

  /**
   * @en Column span control function. Parameters: row (current row data), index (row index). Returns number of columns to merge
   * @cn 列合并控制函数。参数：row（当前行数据），index（行索引）。返回要合并的列数
   * @whenCn 需要动态合并单元格（如汇总行）时使用
   * @whenEn Use for dynamic cell merging (e.g., summary rows)
   */
  colSpan?: (row: DataItem, index: number) => number;

  /**
   * @en Default sort order for this column
   * @cn 该列的默认排序方向
   * @whenCn 需要初始加载时按该列排序时使用
   * @whenEn Use when initial sorting by this column is needed
   */
  defaultOrder?: TableColumnOrder;

  /**
   * @en Fix column to left or right. For multiple adjacent fixed columns, only specify the outermost one
   * @cn 固定列在左侧或右侧。若多个相邻列需要固定，只需指定最外侧的列
   * @whenCn 需要保持某些列始终可见（如操作列）时使用
   * @whenEn Use to keep columns always visible (e.g., action columns)
   */
  fixed?: TableColumnFix;

  /**
   * @en Header group name. Adjacent columns with the same group will be merged into one header
   * @cn 表头分组名称。相邻的相同分组会合并为一个表头
   * @whenCn 需要将相关列组织在一起显示时使用
   * @whenEn Use to organize related columns together
   */
  group?: string | React.ReactNode | Array<string | React.ReactNode>;

  /**
   * @en Additional props for header group (className, style)
   * @cn 表头分组的额外属性（类名、样式）
   * @whenCn 需要自定义分组表头样式时使用
   * @whenEn Use to customize group header styling
   * @version 3.7.0
   */
  groupProps?: {
    className?: string;
    style?: React.CSSProperties;
  }

  /**
   * @en Hide column (only works for row-expand type columns)
   * @cn 隐藏列（仅对 row-expand 类型的列有效）
   * @whenCn 仅需要展开功能但不显示展开列时使用
   * @whenEn Use when expand functionality is needed without showing expand column
   */
  hide?: boolean;

  /**
   * @en Unique key for column. Defaults to column index if not provided
   * @cn 列的唯一标识。未提供时默认使用列索引
   * @whenCn 需要明确标识列（用于排序、筛选等）时使用
   * @whenEn Use to explicitly identify columns (for sorting, filtering, etc.)
   */
  key?: string | number;

  /**
   * @en Minimum column width
   * @cn 列的最小宽度
   * @whenCn 限制列宽调整的最小值，保证内容可读性
   * @whenEn Limit minimum column width to ensure content readability
   */
  minWidth?: number;

  /**
   * @en Maximum column width (when resizing)
   * @cn 列的最大宽度（拖动调整时的限制）
   * @whenCn 限制列宽调整的最大值，避免过宽
   * @whenEn Limit maximum column width to prevent excessive width
   */
  maxWidth?: number;

  /**
   * @en Filter function for select all. Only works when type="checkbox". Parameter: data array. Returns filtered data
   * @cn 全选时的数据过滤函数。仅在 type="checkbox" 时有效。参数：数据数组。返回过滤后的数据
   * @whenCn 需要在全选时排除某些行（如禁用行）时使用
   * @whenEn Use to exclude certain rows (e.g., disabled rows) when selecting all
   */
  filterAll?: (data: DataItem[]) => DataItem[];

  /**
   * @en Render cell content. Can be property key string (e.g., 'name' renders row.name) or function with parameters: data (row data), index (row index), checkboxInstance (when type="checkbox")
   * @cn 渲染单元格内容。可以是属性名字符串（如 'name' 渲染 row.name）或函数，函数参数：data（行数据）、index（行索引）、checkboxInstance（当 type="checkbox" 时）
   * @whenCn 定义如何显示单元格内容
   * @whenEn Define how to display cell content
   * @override ObjectKey<DataItem> | function(d, id, instance)
   */
  render?: ObjectKey<DataItem> | ColumnRenderFunc<DataItem>;

  /**
   * @en Row merge control function. Parameters: prevRowData, nextRowData (adjacent rows). Returns true to merge rows
   * @cn 行合并控制函数。参数：prevRowData、nextRowData（相邻两行数据）。返回 true 合并行
   * @whenCn 需要合并相同值的相邻单元格时使用
   * @whenEn Use to merge adjacent cells with identical values
   */
  rowSpan?: (prevRowData: DataItem, nextRowData: DataItem) => boolean;

  /**
   * @en Sort configuration. Can be string (sort field name), sort function, or Sorter object with rule and weight. When provided, sort icon appears in column header
   * @cn 排序配置。可以是字符串（排序字段名）、排序函数或包含 rule 和 weight 的 Sorter 对象。提供后列头会显示排序图标
   * @whenCn 让该列支持排序功能时使用
   * @whenEn Use to enable sorting for this column
   */
  sorter?:
    | ((
        order: TableColumnOrder,
      ) => ((prevRowData: DataItem, nextRowData: DataItem) => number) | void)
    | string
    | TableColumnSorter;

  /**
   * @en Available sort directions for this column
   * @cn 该列可用的排序方向
   * @whenCn 限制该列的排序方向选项时使用
   * @whenEn Use to limit sort direction options for this column
   * @default ['asc', 'desc']
   * @version 3.5.0
   */
  sortDirections?: ('asc' | 'desc')[];

  /**
   * @en Column filter configuration. Supports search and select modes
   * @cn 列筛选配置。支持搜索和选择两种模式
   * @whenCn 为该列添加筛选功能时使用
   * @whenEn Use to add filtering capability to this column
   * @version 3.6.0
   */
  filter?: TableColumnFilter<DataItem>;

  /**
   * @en Column header content. Can be string, ReactNode, or function that receives all data
   * @cn 列头内容。可以是字符串、ReactNode 或接收所有数据的函数
   * @whenCn 定义列头显示内容
   * @whenEn Define column header display content
   */
  title?: string | React.ReactNode | ((rowData: DataItem[]) => React.ReactNode);

  /**
   * @en Property name for tree children data
   * @cn 树形表格中子节点数据的属性名
   * @whenCn 指定树形数据的子节点字段时使用
   * @whenEn Use to specify the field for tree child nodes
   */
  treeColumnsName?: ObjectKey<DataItem>;

  /**
   * @en Indentation width for each tree level (in pixels)
   * @cn 树形表格每一层的缩进宽度（像素）
   * @whenCn 调整树形表格的层级缩进距离时使用
   * @whenEn Use to adjust tree table level indentation distance
   * @default 25
   */
  treeIndent?: number;

  /**
   * @en Special column type. 'expand': Row expand column, render returns function for expandable content. 'row-expand': Like expand but clicking anywhere in row triggers expand. 'checkbox': Selection column
   * @cn 特殊列类型。'expand'：行展开列，render 返回函数时可展开。'row-expand'：与 expand 相似，但点击整行触发展开。'checkbox'：选择列
   * @whenCn 需要特殊功能列（展开、选择）时使用
   * @whenEn Use for special function columns (expand, selection)
   */
  type?: TableColumnType;

  /**
   * @en Column width
   * @cn 列宽度
   * @whenCn 设置固定列宽或比例宽度时使用
   * @whenEn Use to set fixed or proportional column width
   */
  width?: number | string;

  /**
   * @en CSS class name for this column
   * @cn 该列的 CSS 类名
   * @whenCn 为特定列添加自定义样式时使用
   * @whenEn Use to add custom styles to specific column
   */
  className?: string;

  /**
   * @en Inline styles for table cells in this column
   * @cn 该列单元格的内联样式
   * @whenCn 直接设置列的样式属性时使用
   * @whenEn Use to directly set column style properties
   */
  style?: React.CSSProperties;

  /**
   * @en Click event for expandable element. Only works when column type is 'expand' or 'row-expand' and expandKeys prop is provided. Parameters: data (row data), isExpand (expand state)
   * @cn 可展开元素的点击事件。仅在列类型为 'expand' 或 'row-expand' 且提供 expandKeys 属性时有效。参数：data（行数据）、isExpand（展开状态）
   * @whenCn 需要响应展开/折叠操作时使用
   * @whenEn Use to respond to expand/collapse operations
   */
  onClick?: (d: DataItem, isExpand: boolean) => void;

  /**
   * @en Disable column resizing for this specific column
   * @cn 禁用该列的宽度调整功能
   * @whenCn 某些列需要固定宽度不允许调整时使用
   * @whenEn Use when certain columns need fixed width without adjustment
   */
  columnResizable?: false;
}

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
  groupProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
}

export type TableHeadColumn = TableGroupColumn | TableFormatColumn<any>;
