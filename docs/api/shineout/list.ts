const api = JSON.parse('[{"title":"List","properties":[{"name":"className","tag":{"cn":"自定义类名","en":"Custom class name","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"自定义样式","en":"Custom style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"striped","tag":{"cn":"是否显示交错斑马底纹","en":"Whether to display zebra shading.","default":"","version":""},"required":false,"type":"boolean "},{"name":"pagination","tag":{"cn":"分页展示, 详见 Pagination","en":"pagination","default":"PaginationProps","version":""},"required":false,"type":"PaginationProps "},{"name":"itemStyle","tag":{"cn":"列表容器样式","en":"item containter style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"colNum","tag":{"cn":"多列展示","en":"Multi-column display","default":"1","version":""},"required":false,"type":"number "},{"name":"data","tag":{"cn":"渲染数据","en":"render data","default":"","version":""},"required":true,"type":"any[]"},{"name":"keygen","tag":{"cn":"生成每一项key的辅助方法\\n为 true 时，以数据项本身作为 key，相当于 (d => d)\\n为函数时，使用此函数返回值\\n为 string 时，使用这个 string 对应的数据值。如 \\\"id\\\"，相当于 (d => d.id)","en":"Generate a auxiliary method for each key\\nIf not filled, index will be used (not recommended, in some cases there may be problems)\\nWhen it is a function, use its return value.\\nWhen it is a string，ues the value of the string.For example, \\\"id\\\" is the same thing as (d) => d.id .","default":"","version":""},"required":true,"type":"| ObjectKey<DataItem>  | ((data: DataItem, index?: number) => string | number)  | true"},{"name":"renderItem","tag":{"cn":"需要渲染成列表的数据","en":"render item","default":"","version":""},"required":false,"type":"ObjectKey<DataItem> | ((d: DataItem, index: number) => ReactNode) "},{"name":"fixed","tag":{"cn":"是否启用虚拟列表","en":"virtualized list","default":"false","version":""},"required":false,"type":"boolean "},{"name":"height","tag":{"cn":"列表高度","en":"list height","default":"","version":""},"required":false,"type":"number "},{"name":"bordered","tag":{"cn":"是否显示边框","en":"show border","default":"false","version":""},"required":false,"type":"boolean "},{"name":"lineHeight","tag":{"cn":"列表项高度","en":"height of item","default":"32","version":""},"required":false,"type":"number "},{"name":"rowsInView","tag":{"cn":"同时展示的列表项数量","en":"Number of list items displayed at the same time","default":"10","version":""},"required":false,"type":"number "},{"name":"empty","tag":{"cn":"无数据时展示的内容","en":"What to display when no data","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"scrollLoading","tag":{"cn":"滚动到底部时触发","en":"Triggered when scrolling to the bottom","default":"","version":""},"required":false,"type":"(() => void) "},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"large\\\" | \\\"default\\\""},{"name":"loading","tag":{"cn":"加载中","en":"loading","default":"false","version":""},"required":false,"type":"ReactNode"},{"name":"footer","tag":{"cn":"底部内容","en":"The content at the bottom","default":"","version":""},"required":false,"type":"ReactNode | (() => ReactNode)"},{"name":"rowClassName","tag":{"cn":"自定义行 className","en":"custom row className","default":"","version":""},"required":false,"type":"string | ((rowData: DataItem, index: number) => string ) "},{"name":"value","tag":{"cn":"当前选中值，格式和 onChange 返回值一致","en":"The current selected value.","default":"","version":""},"required":false,"type":"any[]"},{"name":"onChange","tag":{"cn":"选择行。rowData 为选中的数据，rowIndex 为选中行号。如果需要数据需要格式化的处理，建议配置 format。","en":"Select the row ,rowData is the selected data, rowIndex is the selected row number. If the data needs to be formatted, it is recommended to configure format","default":"","version":""},"required":false,"type":"((value: Value, data: DataItem, checked: boolean) => void) "},{"name":"prediction","tag":{"cn":"默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配","en":"By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match","default":"(val, d) => val===format(d)","version":""},"required":false,"type":"((value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean) "},{"name":"disabled","tag":{"cn":"如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项","en":"When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.","default":"false","version":""},"required":false,"type":"((data: Item) => boolean) | boolean"},{"name":"format","tag":{"cn":"格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d\\\\[format]; 为函数时，以函数返回结果作为 value。","en":"Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\\\\[format] When it is a function, use its return value.","default":"d => d","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value) "}],"cn":"","en":"","sort":"0"}]');
export default api;
