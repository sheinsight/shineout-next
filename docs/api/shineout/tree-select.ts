const api = JSON.parse('[{"title":"TreeSelect","properties":[{"name":"className","tag":{"cn":"自定义类名","en":"Custom class name","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"自定义样式","en":"Custom style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"size","tag":{"cn":"不同尺寸","en":"There are three built-in size: small、default、large.","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"large\\\" | \\\"default\\\""},{"name":"status","tag":{"cn":"组件状态","en":"The status of the component","default":"","version":""},"required":false,"type":"\\\"error\\\" "},{"name":"innerTitle","tag":{"cn":"内嵌标题","en":"inner title","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"filterSameChange","tag":{"cn":"当两次选择的值相同时不触发 onChange","en":"onChange is not triggered when two selected values are the same","default":"false","version":""},"required":false,"type":"boolean "},{"name":"absolute","tag":{"cn":"为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器","en":"When it is true, the pop-up layer of option append into document.body; When it is a function, the return value is used as the popup layer container","default":"false","version":""},"required":false,"type":"boolean | (() => HTMLElement | null) "},{"name":"zIndex","tag":{"cn":"选项列表 z-index 值, 需要配合 absolute","en":"options z-index should use with absolute","default":"1000","version":""},"required":false,"type":"number "},{"name":"noCache","tag":{"cn":"是否开启数据缓存，如果数据存在动态更新的情况建议开启","en":"Data cache, if data change asynchronously, better set true","default":"false","version":""},"required":false,"type":"boolean "},{"name":"emptyText","tag":{"cn":"自定义 empty 文案","en":"custom empty copy","default":"","version":""},"required":false,"type":"string "},{"name":"loading","tag":{"cn":"数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替","en":"When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.","default":"false","version":""},"required":false,"type":"boolean | ReactNode"},{"name":"placeholder","tag":{"cn":"value 为空时的占位符","en":"placeholder when value is empty","default":"","version":""},"required":false,"type":"string "},{"name":"compressedBound","tag":{"cn":"开启多选后，指定允许展示标签数量，超过后将折叠","en":"when compressed is True,the comptessedBound can limit the numbers of multiple selected item\\\"s label","default":"","version":""},"required":false,"type":"number "},{"name":"compressedClassName","tag":{"cn":"多选合并展示弹出框的类名","en":"Compressed popover classname","default":"","version":""},"required":false,"type":"string "},{"name":"clearable","tag":{"cn":"是否可清除值","en":"If clearable is true, show clear value icon","default":"false","version":""},"required":false,"type":"boolean "},{"name":"renderUnmatched","tag":{"cn":"渲染未匹配值的方式","en":"ender unmatched value","default":"","version":""},"required":false,"type":"((data: Value extends (infer U)[] ? U : Value) => ReactNode) "},{"name":"data","tag":{"cn":"数据源","en":"data source","default":"[]","version":""},"required":false,"type":"DataItem[] "},{"name":"keygen","tag":{"cn":"生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 \\\"id\\\"，相当于 (d) => d.id","en":"Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, \\\"id\\\" is the same thing as (d) => d.id","default":"","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, parentKey: string | number) => string | number)"},{"name":"getComponentRef","tag":{"cn":"获取组件的一些方法 目前只支持 getDataByValues","en":"Some methods of getting components Currently only support getDataByValue","default":"","version":""},"required":false,"type":"((ref: ComponentRef<DataItem, Value>) => void) | { current?: ComponentRef<DataItem, Value> ; } "},{"name":"onFilter","tag":{"cn":"onFilter 不为空时，可以输入过滤数据。 onFilter 如果返回一个函数，使用这个函数做前端过滤。 如果不返回，可以自行做后端过滤","en":"When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering","default":"","version":""},"required":false,"type":"((text: string) => void) "},{"name":"empty","tag":{"cn":"无数据时的占位内容","en":"Placeholder content when there is no data","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"multiple","tag":{"cn":"是否是多选","en":"if it is true, it will be multiple selection","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onBlur","tag":{"cn":"blur 事件回调函数","en":"callback function of blur event","default":"","version":""},"required":false,"type":"((e?: any) => void) "},{"name":"onFocus","tag":{"cn":"focus 事件回调函数","en":"callback function of focus event","default":"","version":""},"required":false,"type":"((e?: any) => void) "},{"name":"disabled","tag":{"cn":"为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用","en":"When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.","default":"false","version":""},"required":false,"type":"boolean | ((data: DataItem) => boolean) "},{"name":"renderResult","tag":{"cn":"选中后在结果中显示的内容，默认和 renderItem 相同","en":"The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected","default":"renderItem","version":""},"required":false,"type":"((data: DataItem) => ReactNode) "},{"name":"mode","tag":{"cn":"选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得","en":"mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get.","default":"1","version":""},"required":false,"type":"0 | 1 | 2 | 3 | 4 "},{"name":"height","tag":{"cn":"列表高度","en":"The height of list","default":"300","version":""},"required":false,"type":"number "},{"name":"onCollapse","tag":{"cn":"下拉列表展开/收起回调","en":"option collapse callback","default":"","version":""},"required":false,"type":"((collapse: boolean) => void) "},{"name":"showHitDescendants","tag":{"cn":"筛选后是否展示命中节点的后代节点","en":"Whether to show the descendant nodes of the hit node after filtering","default":"false","version":""},"required":false,"type":"boolean "},{"name":"position","tag":{"cn":"弹出位置","en":"Popup Position","default":"","version":""},"required":false,"type":"\\\"auto\\\" | \\\"bottom-left\\\" | \\\"top-left\\\" "},{"name":"onEnterExpand","tag":{"cn":"回车触发下拉框展开的时候调用","en":"Expand option list while enter press","default":"","version":""},"required":false,"type":"((e: KeyboardEvent<HTMLDivElement>) => boolean) "},{"name":"onChange","tag":{"cn":"参数 为 当前选中值","en":"value is your picker now","default":"","version":""},"required":false,"type":"((value: Value, selected?: DataItem | {  IS_NOT_MATCHED_VALUE: boolean, value: any } , path?: (string | number)[] ) => void) "},{"name":"onChangeAddition","tag":{"cn":"onChange 额外参数 (current 为点击的节点的数据， data 为当前选中的数据， checked 为多选状态下是选中还是取消)","en":"onChange additional parameters (current is the data of the clicked node, data is the currently selected data, checked is whether it is selected or canceled in the multi-select state)","default":"","version":""},"required":false,"type":"((params: { current?: DataItem | UnMatchedData | (DataItem | UnMatchedData)[] ; checked?: 0 | 1 | 2 ; data?: DataItem | UnMatchedData | (DataItem | UnMatchedData)[] | null ; }) => void) "},{"name":"value","tag":{"cn":"选中的 key （受控），多选时必须为array。注意，请勿将 undefined 和 null 作为有意义的选项值，当 value 类型为 undefined 和 null 时，组件将不处理数据和渲染","en":"Selected key (controlled), must be an array in multiple selection. Note: Do not use undefined and null as meaningful option values. When the value type is undefined and null, the component will not process data and rendering","default":"","version":""},"required":false,"type":"Value "},{"name":"defaultValue","tag":{"cn":"默认值  和 value 类型相同","en":"Initial value","default":"","version":""},"required":false,"type":"Value "},{"name":"compressed","tag":{"cn":"将选中值合并，只在多选模式下有效；为 \\\"no-repeat\\\" 时弹出框中不重复展示值","en":"Merges selected values; the repeat value will not appear in the Popover when it is\\\"no-repeat\\\".","default":"false","version":""},"required":false,"type":"boolean | \\\"no-repeat\\\" "},{"name":"open","tag":{"cn":"控制浮层显隐","en":"Set visible of datepicker popup","default":"","version":""},"required":false,"type":"boolean "},{"name":"line","tag":{"cn":"是否显示连接线","en":"Whether show line","default":"false","version":""},"required":false,"type":"boolean "},{"name":"width","tag":{"cn":"输入框宽度","en":"Input width","default":"","version":""},"required":false,"type":"string | number "},{"name":"underline","tag":{"cn":"是否只展示下边框","en":"Only display border bottom","default":"false","version":""},"required":false,"type":"boolean "},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"false","version":""},"required":false,"type":"boolean "},{"name":"showArrow","tag":{"cn":"是否展示箭头","en":"Whether to display arrow","default":"true","version":""},"required":false,"type":"boolean "},{"name":"childrenKey","tag":{"cn":"指定子数据的属性名","en":"specify the name of the subdata","default":"\\\"children\\\"","version":""},"required":false,"type":"ObjectKey<DataItem> "},{"name":"focusSelected","tag":{"cn":"onFilter 在多选情况下点击选项后是否选中过滤文本","en":"onFilter Whether to select filter text after clicking the option in multi-selection situation","default":"true","version":""},"required":false,"type":"boolean "},{"name":"resultClassName","tag":{"cn":"选中结果内容容器的className","en":"The className of the selected result content container","default":"","version":""},"required":false,"type":"string | ((value: DataItem) => string) "},{"name":"loader","tag":{"cn":"设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点","en":"Dynamically load nodes","default":"","version":""},"required":false,"type":"((key: string | number, data: DataItem) => void) "},{"name":"defaultExpanded","tag":{"cn":"默认展开的节点 key（非受控）","en":"default expanded nodes","default":"","version":""},"required":false,"type":"(string | number)[]"},{"name":"defaultExpandAll","tag":{"cn":"默认展开全部子节点, 仅树形数据下有效","en":"Expand all node, only in can be use in treeData","default":"false","version":""},"required":false,"type":"boolean "},{"name":"parentClickExpand","tag":{"cn":"点击父节点展开","en":"Expand by click parent node","default":"false","version":""},"required":false,"type":"boolean "},{"name":"expanded","tag":{"cn":"展开的节点 key(受控)","en":"Expanded node","default":"","version":""},"required":false,"type":"(string | number)[]"},{"name":"trim","tag":{"cn":"trim 为 true 时，失去焦点时会自动删除空白字符","en":"When trim is true, blank characters are automatically deleted when lose focus","default":"false","version":""},"required":false,"type":"boolean "},{"name":"unmatch","tag":{"cn":"是否展示data中不存在的值","en":"Render unmatch value","default":"true","version":""},"required":false,"type":"boolean "},{"name":"renderItem","tag":{"cn":"为 string 时，返回 d[string]。 为 function 时，返回函数结果","en":"When it is a string, return d[string]. When it is a function, return the result of the function","default":"index","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, expanded: boolean, active: boolean, id: string | number) => ReactNode)"},{"name":"onAdvancedFilter","tag":{"cn":"高级筛选模式，可针对当前层级在筛选结果和原始数据间切换","en":"In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button","default":"","version":""},"required":false,"type":"((text: string) => (data: DataItem) => boolean) "},{"name":"onExpand","tag":{"cn":"节点展开回调，参数为当前展开节点 key 数组","en":"Expand event","default":"","version":""},"required":false,"type":"((value: (string | number)[]) => void) "},{"name":"adjust","tag":{"cn":"是否开启自动调整面板位置功能。当面板被窗口遮挡时，自动调整位置","en":"Whether to adjust the position of the panel automatically. When the panel is blocked by the window, the position is adjusted automatically","default":"true","version":""},"required":false,"type":"boolean "},{"name":"popover","tag":{"cn":"校验信息弹出位置","en":"The position where the validation info pop up","default":"","version":""},"required":false,"type":"PopoverProps[\\\"position\\\"]"},{"name":"popoverProps","tag":{"cn":"校验或者tip弹框接受的属性","en":"Vilidate popup properties","default":"","version":""},"required":false,"type":"PopoverProps "},{"name":"name","tag":{"cn":"Form 内存取数据的 key","en":"The key access data in the Form","default":"","version":""},"required":false,"type":"Name "},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"((value: T) => void | T ) "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((error?: Error ) => void) "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "}],"cn":"","en":"","sort":"0"},{"title":"TreeSelectRef","properties":[{"name":"getDataByValues","tag":{"cn":"获取 value 对应的 data","en":"Get the data corresponding to the value","default":"","version":""},"required":true,"type":"(values: Value) => Value extends any[] ? (DataItem | UnMatchedData)[] : DataItem | UnMatchedData"}],"cn":"","en":"","sort":"0"}]');
export default api;
