const api = JSON.parse('[{"title":"Table","properties":[{"name":"className","tag":{"cn":"自定义类名","en":"Custom class name","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"自定义样式","en":"Custom style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"onCellClick","tag":{"cn":"单元格点击事件","en":"Cell click event","default":"","version":""},"required":false,"type":"((data: DataItem, info: { rowIndex: number; columnIndex: number; columnKey: string | number; }) => void) "},{"name":"scrollLeft","tag":{"cn":"当开启虚拟列表时生效","en":"which takes effect when the virtual list is enabled","default":"","version":""},"required":false,"type":"number "},{"name":"rowHeight","tag":{"cn":"单行表格的预期高度，只是一个大概的估值，用来展示滚动条","en":"The expected height of a one-line table is just a rough estimate to show the scroll bar.","default":"40","version":""},"required":false,"type":"number "},{"name":"hover","tag":{"cn":"数据行鼠标悬浮高亮效果","en":"row hover highlight","default":"true","version":""},"required":false,"type":"boolean "},{"name":"empty","tag":{"cn":"空数据文案","en":"empty text","default":"getLocale(\\\"Data not found\\\")","version":""},"required":false,"type":"ReactNode"},{"name":"cellSelectable","tag":{"cn":"是否启用 ctrl/cmd + click 选中单元格","en":"whether to enable ctrl/cmd + click check","default":"false","version":""},"required":false,"type":"boolean "},{"name":"height","tag":{"cn":"表格高度，与 style.height 作用相同","en":"height of table, same with style.height","default":"","version":""},"required":false,"type":"string | number "},{"name":"onScroll","tag":{"cn":"滚动条滚动后回调函数；\\nx: 横向滚动比(0 <= x <= 1)\\ny: 纵向滚动比(0 <= y <= 1)","en":"The callback function after scrolling.\\nx: Horizontal rolling ratio(0 <= x <= 1)\\ny: Vertical scroll ratio(0 <= y <= 1)","default":"","version":""},"required":false,"type":"((x: number, y: number, left: number, top: number) => void) "},{"name":"pagination","tag":{"cn":"展示分页 详见 [Pagination](/components/Pagination)","en":"Show pagination See [Pagination](/components/Pagination) for details","default":"","version":""},"required":false,"type":"PaginationProps "},{"name":"loading","tag":{"cn":"数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替","en":"When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.","default":"false","version":""},"required":false,"type":"ReactNode"},{"name":"virtual","tag":{"cn":"是否使用虚拟列表","en":"Whether to use virtual list","default":"","version":""},"required":false,"type":"boolean "},{"name":"rowsInView","tag":{"cn":"单次 render的 最大行数。Table 采用了 lazy render 的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整 rowsInView 的值。为 0 表示单次 render 所有数据。","en":"The maximum number of rows for a single render. Table uses lazy render to optimize performance under large amounts of data. If your table displays more than 20 rows, you can change the value of rowsInView. Value of 0 render all data.","default":"20","version":""},"required":false,"type":"number "},{"name":"size","tag":{"cn":"表格尺寸","en":"size of table","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"large\\\" | \\\"default\\\" "},{"name":"radio","tag":{"cn":"是否为单选","en":"is Radio","default":"false","version":""},"required":false,"type":"boolean "},{"name":"verticalAlign","tag":{"cn":"单元格内容垂直对齐方式","en":"vertical align with content","default":"\\\"top\\\"","version":""},"required":false,"type":"\\\"top\\\" | \\\"middle\\\" "},{"name":"children","tag":{"cn":"传入原生 tr td, 只使用样式","en":"Pass in the native tr td, using styles only","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"width","tag":{"cn":"表格总宽度，默认为容器宽度，不可小于 columns 中设置的 width 之和","en":"TThe total width of the table, which defaults to the container width, must not be less than the sum of width set in columns","default":"","version":""},"required":false,"type":"string | number "},{"name":"columns","tag":{"cn":"数组，见 TableColumn","en":"array，see TableColumn","default":"[]","version":""},"required":false,"type":"TableColumn[]"},{"name":"disabled","tag":{"cn":"如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项","en":"When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.","default":"","version":""},"required":false,"type":"boolean | ((d: DataItem) => boolean) "},{"name":"treeEmptyExpand","tag":{"cn":"树形表格子数据为空时依然展示展开按钮","en":"show expand button while children data is empty","default":"false","version":""},"required":false,"type":"boolean "},{"name":"rowClickAttr","tag":{"cn":"设置行内元素的 attribute 来按需触发 onRowClick, \\\"*\\\"表示接受行点击触发","en":"Sets the attribute of inner element to trigger onRowClick as needed, and \\\"*\\\" to accept the row click","default":"[\\\"*\\\"]","version":""},"required":false,"type":"string | boolean | string[] "},{"name":"onRowClick","tag":{"cn":"行点击事件; data: 当前行数据; index: 当前行索引","en":"Callback when row click. data: current row data; index: current row index","default":"","version":""},"required":false,"type":"((rowData: DataItem, index: number, fireAttr?: string | boolean ) => void) "},{"name":"striped","tag":{"cn":"是否显示交错斑马底纹","en":"Whether to display zebra shading.","default":"","version":""},"required":false,"type":"boolean "},{"name":"rowClassName","tag":{"cn":"指定单行className","en":"Specify row className","default":"","version":""},"required":false,"type":"(rowData: DataItem, index: number) => string | undefined"},{"name":"rowEvents","tag":{"cn":"tr 事件监听器集合","en":"tr events","default":"","version":""},"required":false,"type":"object"},{"name":"data","tag":{"cn":"数据","en":"data","default":"","version":""},"required":false,"type":"object[]"},{"name":"showSelectAll","tag":{"cn":"是否显示全选","en":"Whether to show being fully selected.","default":"true","version":""},"required":false,"type":"boolean "},{"name":"bordered","tag":{"cn":"是否显示外边框","en":"Whether to display the border","default":"false","version":""},"required":false,"type":"boolean "},{"name":"treeCheckAll","tag":{"cn":"全选时是否将子孙数据选中","en":"check children data while select all","default":"false","version":""},"required":false,"type":"boolean "},{"name":"renderSorter","tag":{"cn":"自定义排序图标","en":"customize sort icons","default":"","version":""},"required":false,"type":"((params: {  status?: \\\"asc\\\" | \\\"desc\\\" | null , triggerAsc: () => void, triggerDesc: () => void }) => ReactNode) "},{"name":"hideHeader","tag":{"cn":"是否隐藏表头","en":"whether hide thead","default":"false","version":""},"required":false,"type":"boolean "},{"name":"summary","tag":{"cn":"底部信息可用于总结","en":"Footer information can be used to summarize","default":"","version":""},"required":false,"type":"({  render: () => ReactNode, colSpan?: number , rowSpan?: number  })[] | ({  render: () => ReactNode, colSpan?: number , rowSpan?: number  })[][] "},{"name":"sticky","tag":{"cn":"表头是否附着顶部，为 true 时距离顶部为0","en":"sticky header, When it is true, the distance from the top is 0","default":"","version":""},"required":false,"type":"boolean | { top?: number ; css?: boolean ; } "},{"name":"showTopScrollbar","tag":{"cn":"是否开启顶部滚动条","en":"Whether to show the top scroller","default":"false","version":"3.4.0"},"required":false,"type":"boolean "},{"name":"tableRef","tag":{"cn":"Table 实例（请谨慎使用：仅虚拟列表支持）","en":"Table instance (please use with caution: only fixed Table)","default":"","version":""},"required":false,"type":"((table: TableRef) => void) "},{"name":"onRowSelect","tag":{"cn":"选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议配置 format 和 prediction","en":"Select row. Rows is the selected data.","default":"","version":""},"required":false,"type":"((rows: Value) => void) "},{"name":"defaultTreeExpandKeys","tag":{"cn":"默认展开行(非受控)","en":"Default expanded row keys","default":"","version":""},"required":false,"type":"(string | number)[] "},{"name":"onTreeExpand","tag":{"cn":"当设置 treeExpandKeys 后，展开行时会触发该回调，keys 为展开的行","en":"When treeExpandKeys is set, the callback is triggered when the row is expanded. Keys is expanded row key","default":"","version":""},"required":false,"type":"((openKeys: (string | number)[], data: Item, expand: boolean, index: number) => void) "},{"name":"treeExpandKeys","tag":{"cn":"树形数据展开行，受控","en":"Tree Table expanded row keys","default":"","version":""},"required":false,"type":"(string | number)[] "},{"name":"treeExpandIcon","tag":{"cn":"树形数据展开图标，函数返回 null 时隐藏展开图标","en":"Tree Table expand icon","default":"","version":"3.5.0"},"required":false,"type":"((data: Item, index: number, isExpanded: boolean) => ReactNode) "},{"name":"expandIcon","tag":{"cn":"自定义渲染可展开行的图标内容，其中 data 为当前行的数据，index 为数据下标，isExpanded 为当前行的展开状态，expandInstance 为原始展开行图标实例，clickEvent 为展开事件。展开事件 clickEvent 仅在列类型为 `expand` 时返回","en":"Table expand icon","default":"","version":"3.5.4"},"required":false,"type":"((data: Item, index: number, isExpanded: boolean, expandInstance: ReactNode, clickEvent?: (() => void) ) => ReactNode) "},{"name":"loader","tag":{"cn":"树形数据加载函数","en":"Tree Table data loader","default":"","version":"3.5.0"},"required":false,"type":"((data: Item, index: number) => Promise<void>) "},{"name":"sorter","tag":{"cn":"表格统一排序函数，参数分别为 Column.sorter 和 排序方式;\\n支持多列排序，sorter传入对象{ rule: string | function, weight: number }, rule为排序规则，为字符串时参考单列排序的用法, weight 为权重，指明排序的优先级。\\n多列排序时，sortedList 返回所有参与排序的字段信息","en":"the method of table sort，args are Column.sorter and order\\nMulti-column sorting is supported. The sorter passes in the object {rule: string | function, weight: number}, where rule is a sorting rule, which refers to the use of single-column sorting when it is a string, weight is the weight, indicating the priority of the order\\nWhen sorting on multiple columns, sortedList returns information about all fields involved in sorting","default":"alphaSort(Column.sorter, sorter)","version":""},"required":false,"type":"((sortName: string, sorter: \\\"asc\\\" | \\\"desc\\\", sortedList: ({  order: \\\"asc\\\" | \\\"desc\\\", manual: boolean, key: string | number, weight?: number  })[]) => void | ((a: Item, b: Item) => number) ) "},{"name":"onSortCancel","tag":{"cn":"排序取消事件","en":"sort cancel event","default":"","version":""},"required":false,"type":"((preType: \\\"asc\\\" | \\\"desc\\\", key: string | number, orders: ({  order: \\\"asc\\\" | \\\"desc\\\", weight?: number , key: string | number, manual: boolean })[], sorter: string) => void) "},{"name":"sortDirections","tag":{"cn":"排序方向","en":"sort directions","default":"[\\\"asc\\\", \\\"desc\\\"]","version":"3.5.0"},"required":false,"type":"(\\\"asc\\\" | \\\"desc\\\")[] "},{"name":"columnResizable","tag":{"cn":"设置 columnResizable 为 true，使所有列可伸缩","en":"Set columnResizable to true to make all columns scalable","default":"","version":""},"required":false,"type":"boolean "},{"name":"onColumnResize","tag":{"cn":"列宽伸缩后的回调","en":"columns resize callback","default":"","version":""},"required":false,"type":"(columns: TableColumn[]) => void"},{"name":"dataChangeResize","tag":{"cn":"数据发生变化后是否重新计算列宽","en":"Recalculate columns width while data change","default":"false","version":""},"required":false,"type":"boolean "},{"name":"expandKeys","tag":{"cn":"展开行受控","en":"controlled expand rows","default":"","version":""},"required":false,"type":"(string | number)[] "},{"name":"keygen","tag":{"cn":"生成每一项key的辅助方法\\n为函数时，使用此函数返回值\\n为string时，使用这个string对应的数据值。如 \\\"id\\\"，相当于 (d => d.id)","en":"Generate a auxiliary method for each key\\nIf not filled, index will be used (not recommended, in some cases there may be problems)\\nWhen it is a function, use its return value.\\nWhen it is a string，ues the value of the string.For example, \\\"id\\\" is the same thing as (d) => d.id .","default":"","version":""},"required":true,"type":"| ObjectKey<DataItem>  | ((data: DataItem, index?: number) => string | number)"},{"name":"shouldCellUpdate","tag":{"cn":"控制单元格是否需要更新的函数。返回值应为布尔值，指示单元格是否需要重新渲染","en":"The function to determine whether a cell needs to be updated. The return value should be a boolean indicating whether the cell should re-render.","default":"","version":"3.7.0"},"required":false,"type":"| ((prev: T, next: T) => boolean) // 第一种格式：函数类型  | {      update: (prev: T, next: T) => boolean; // 第二种格式：对象中的 update 方法      dependencies: any[]; // 第二种格式：对象中的 dependencies    } "},{"name":"value","tag":{"cn":"当前选中值，格式和 onRowSelect 返回值一致","en":"The current selected value.","default":"","version":""},"required":false,"type":"any"},{"name":"format","tag":{"cn":"格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d\\\\[format]; 为函数时，以函数返回结果作为 value。","en":"Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\\\\[format] When it is a function, use its return value.","default":"d => d","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value) "},{"name":"prediction","tag":{"cn":"默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配","en":"By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match","default":"(val, d) => val===format(d)","version":""},"required":false,"type":"((value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean) "}],"cn":"","en":"","sort":"0"},{"title":"columns","properties":[{"name":"align","tag":{"cn":"单元格内容排布方式","en":"cell align","default":"\\\"left\\\"","version":""},"required":false,"type":"\\\"left\\\" | \\\"center\\\" | \\\"right\\\""},{"name":"colSpan","tag":{"cn":"合并列控制函数，row为单行数据，返回值一个整数，标明需要合并的列数","en":"The function for controlling to merge columns. The return value is an integer indicating the number of columns that need to be merged。","default":"","version":""},"required":false,"type":"((row: DataItem, index: number) => number) "},{"name":"defaultOrder","tag":{"cn":"默认排序规则","en":"default sort","default":"","version":""},"required":false,"type":"\\\"asc\\\" | \\\"desc\\\" "},{"name":"fixed","tag":{"cn":"固定列,如果相邻的多列需要锁定，只需指定最外侧的 column 即可","en":"Fixed columns. If multiple adjacent columns need to be locked, specify only the outermost column","default":"","version":""},"required":false,"type":"\\\"left\\\" | \\\"right\\\" "},{"name":"group","tag":{"cn":"表头分组，相邻的相同 group 会生成一个新的表头","en":"The group of header column.","default":"","version":""},"required":false,"type":"ReactNode | ReactNode[]"},{"name":"hide","tag":{"cn":"只针对行展开列有效，表示是否隐藏该列","en":"hide the column, only work on row-expand column","default":"","version":""},"required":false,"type":"boolean "},{"name":"key","tag":{"cn":"列的key，默认使用 index","en":"The key of the column","default":"","version":""},"required":false,"type":"string | number "},{"name":"minWidth","tag":{"cn":"最小列宽","en":"min width","default":"","version":""},"required":false,"type":"number "},{"name":"maxWidth","tag":{"cn":"最大可拖动列宽","en":"max width","default":"","version":""},"required":false,"type":"number "},{"name":"filterAll","tag":{"cn":"全选时用来筛除数据，仅当 type=\\\"checkbox\\\" 时有效","en":"Select All to screen data. Valid only if type=\\\"checkbox\\\"","default":"","version":""},"required":false,"type":"((data: DataItem[]) => DataItem[]) "},{"name":"render","tag":{"cn":"表格内容生成函数，返回渲染的内容,  data 当前行的数据，index 当前索引，instance 当 type=\\\"checkbox\\\" 时会传入 Checkbox 实例\\n为了使用方便，可以传入一个数据的key，如 \\\"id\\\"，相当于 (d) => { return d.id }","en":"The generation function for Table content.d: the data of the current row. i: the index of the current row .For ease of use, you can pass in the key of a data, such as \\\"id\\\", which is equivalent to (d) => { return d.id }","default":"","version":""},"required":false,"type":"ObjectKey<DataItem> | function(d, id, instance)"},{"name":"rowSpan","tag":{"cn":"根据函数返回的结果（boolean）判断是否合并行，a、b为相邻的两行数据。","en":"According to the result (boolean) returned by the function to determine whether to merge rows, a and b are two adjacent rows of data","default":"","version":""},"required":false,"type":"((prevRowData: DataItem, nextRowData: DataItem) => boolean) "},{"name":"sorter","tag":{"cn":"sorter 不为空时，这一列会出现排序 icon。order的值为[\\\"asc\\\", \\\"desc\\\"]\\n字符串表示排序依据字段，作为第一个参数传入Table.sorter\\n为 Sorter 对象\\n前端排序，返回一个排序函数，参考 Array.sort。(旧用法)\\n服务端排序，不要返回值，自行处理即可。(旧用法)","en":"When the sorter is not empty, the sort icon appears in this column. the value of order: [\\\"asc\\\", \\\"desc\\\"]\\nIndicate the sort key string, will pass to table sorter method.\\nFront-end sorting returns a sort function, refer to Array.sort.\\nServer-side sorting, do not return values and handle it itself.","default":"","version":""},"required":false,"type":"string | ((order: \\\"asc\\\" | \\\"desc\\\") => void | ((prevRowData: DataItem, nextRowData: DataItem) => number)) | {  rule: string | ((sorter: ({  order: \\\"asc\\\" | \\\"desc\\\", manual: boolean, key: string | number, weight?: number  })[]) => void), weight: number } "},{"name":"sortDirections","tag":{"cn":"排序方向","en":"sort directions","default":"[\\\"asc\\\", \\\"desc\\\"]","version":"3.5.0"},"required":false,"type":"(\\\"asc\\\" | \\\"desc\\\")[] "},{"name":"filter","tag":{"cn":"列的筛选配置","en":"Column filter configuration","default":"","version":"3.6.0"},"required":false,"type":"| SelectModeColumnFilter<DataItem>  | SearchModeColumnFilter<DataItem> "},{"name":"title","tag":{"cn":"表头显示内容","en":"The content of the header","default":"","version":""},"required":false,"type":"ReactNode | ((rowData: DataItem[]) => ReactNode)"},{"name":"treeColumnsName","tag":{"cn":"树形表格子数据字段名","en":"tree table children-data name","default":"","version":""},"required":false,"type":"ObjectKey<DataItem> "},{"name":"treeIndent","tag":{"cn":"每一层缩进宽度","en":"indent of each level","default":"25","version":""},"required":false,"type":"number "},{"name":"type","tag":{"cn":"特殊用途列\\nexpand: 行展开列，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果。\\nrow-expand: 同 expand。不同为点击行内空白区域也可以折叠/展开行。\\ncheckbox: 选择列，仅用于固定选择列的场景","en":"Special column\\nexpand: Expand the column. When the render function returns a function, it means that the row can be expanded and the content  is the result returned by this function.\\nrow-expand: Similar to expand. The difference is that clicking on the entire row triggers the expand event.\\ncheckbox: Select column for scenes with only fixed selection columns","default":"","version":""},"required":false,"type":"\\\"expand\\\" | \\\"row-expand\\\" | \\\"checkbox\\\" "},{"name":"width","tag":{"cn":"列宽","en":"width","default":"","version":""},"required":false,"type":"string | number "},{"name":"className","tag":{"cn":"列对应的类名","en":"classname of column","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"td 样式","en":"style of td","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"onClick","tag":{"cn":"可展开元素点击事件仅当（仅该列为行展开列，并且传入 expandKeys 的时候生效）","en":"Click event of expandable element only when (only this column is row-expand column and expandKeys is passed in)","default":"","version":""},"required":false,"type":"((d: DataItem, isExpand: boolean) => void) "},{"name":"columnResizable","tag":{"cn":"单独设置某一列不可拖动","en":"Separately set a column not to be draggable","default":"","version":""},"required":false,"type":"false "},{"name":"shouldCellUpdate","tag":{"cn":"是否需要更新单元格，dependencies是外部更新依赖项","en":"Whether the cell needs to be updated, the third parameter is the external dependency","default":"","version":"3.7.0"},"required":false,"type":"| ((prev: T, next: T) => boolean) // 第一种格式：函数类型  | {      update: (prev: T, next: T) => boolean; // 第二种格式：对象中的 update 方法      dependencies: any[]; // 第二种格式：对象中的 dependencies    } "}],"cn":"","en":"","sort":"0"}]');
export default api;
