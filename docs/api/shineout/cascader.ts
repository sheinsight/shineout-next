const api = JSON.parse('[{"title":"Cascader","properties":[{"name":"className","tag":{"cn":"自定义类名","en":"Custom class name","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"自定义样式","en":"Custom style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"size","tag":{"cn":"不同尺寸","en":"There are three built-in size: small、default、large.","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"large\\\" | \\\"default\\\""},{"name":"status","tag":{"cn":"组件状态","en":"The status of the component","default":"","version":""},"required":false,"type":"\\\"error\\\" "},{"name":"innerTitle","tag":{"cn":"内嵌标题","en":"inner title","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"filterSameChange","tag":{"cn":"当两次选择的值相同时不触发 onChange","en":"onChange is not triggered when two selected values are the same","default":"false","version":""},"required":false,"type":"boolean "},{"name":"absolute","tag":{"cn":"为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器","en":"When it is true, the pop-up layer of option append into document.body; When it is a function, the return value is used as the popup layer container","default":"false","version":""},"required":false,"type":"boolean | (() => HTMLElement | null) "},{"name":"zIndex","tag":{"cn":"选项列表 z-index 值, 需要配合 absolute","en":"options z-index should use with absolute","default":"1000","version":""},"required":false,"type":"number "},{"name":"multiple","tag":{"cn":"开启多选","en":"Open multiple selection","default":"false","version":""},"required":false,"type":"boolean "},{"name":"mode","tag":{"cn":"选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得","en":"Mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get","default":"","version":""},"required":false,"type":"0 | 1 | 2 | 3 | 4 "},{"name":"width","tag":{"cn":"输入框宽度","en":"Input width","default":"","version":""},"required":false,"type":"string | number "},{"name":"open","tag":{"cn":"控制浮层显隐","en":"Set visible of cascader popup","default":"","version":""},"required":false,"type":"boolean "},{"name":"value","tag":{"cn":"选中的 key （受控)","en":"Selected key (controlled)","default":"","version":""},"required":false,"type":"Value "},{"name":"defaultValue","tag":{"cn":"默认选中的 key","en":"Selected key","default":"","version":""},"required":false,"type":"Value "},{"name":"data","tag":{"cn":"数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点","en":"data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node","default":"","version":""},"required":false,"type":"any[]"},{"name":"childrenKey","tag":{"cn":"指定子数据的属性名","en":"the key of the children data name","default":"\\\"children\\\"","version":""},"required":false,"type":"ObjectKey<DataItem> "},{"name":"final","tag":{"cn":"单选只支持选末级节点","en":"Only the last node can be selected","default":"","version":""},"required":false,"type":"boolean "},{"name":"filterDelay","tag":{"cn":"用户输入触发 fitler 事件的延时，单位为毫秒。","en":"The delay in milliseconds before the filter event is triggered by user input.","default":"\\\"children\\\"","version":""},"required":false,"type":"number "},{"name":"renderOptionList","tag":{"cn":"自定义渲染下拉列表","en":"Custom render dropdown","default":"","version":""},"required":false,"type":"((list: ReactElement, info: { loading: boolean; }) => ReactElement) "},{"name":"renderUnmatched","tag":{"cn":"渲染未匹配值的方式","en":"Custom rendering unmatched values","default":"","version":""},"required":false,"type":"((data: any) => ReactNode) "},{"name":"height","tag":{"cn":"下拉列表高度","en":"height of dropdown options","default":"300","version":""},"required":false,"type":"number "},{"name":"unmatch","tag":{"cn":"是否展示data中不存在的值","en":"render unmatch value","default":"true","version":""},"required":false,"type":"boolean "},{"name":"clearable","tag":{"cn":"是否显示清除数据图标","en":"If clearable is true, show clear value icon","default":"true","version":""},"required":false,"type":"boolean "},{"name":"wideMatch","tag":{"cn":"开启 wideMatch 后，将筛选出所有可能的匹配项目","en":"Allows all possible matching options to be choosed","default":"false","version":""},"required":false,"type":"boolean "},{"name":"showArrow","tag":{"cn":"是否显示下拉箭头，仅针对单选情况","en":"show dropdown arrow, only single select","default":"true","version":""},"required":false,"type":"boolean "},{"name":"finalDismiss","tag":{"cn":"选择末级节点后是否关闭选项列表","en":"close options after chose the final node","default":"false","version":""},"required":false,"type":"boolean "},{"name":"singleRemove","tag":{"cn":"支持单个节点删除","en":"Support single node deletion","default":"","version":""},"required":false,"type":"boolean "},{"name":"compressedBound","tag":{"cn":"开启多选后，指定允许展示标签数量，超过后将折叠","en":"when compressed is True,the comptessedBound can limit the numbers of multiple selected item\\\"s label","default":"","version":""},"required":false,"type":"number "},{"name":"loading","tag":{"cn":"下拉列表加载状态","en":"dropdown list loading state","default":"","version":""},"required":false,"type":"boolean | ReactNode"},{"name":"compressed","tag":{"cn":"将选中值合并。为\\\"no-repeat\\\"时弹出框中不重复展示值","en":"Merges selected values; the repeat value will not appear in the Popover when it is\\\"no-repeat\\\"","default":"false","version":""},"required":false,"type":"boolean | \\\"no-repeat\\\" "},{"name":"onCollapse","tag":{"cn":"下拉列表展开/收起回调","en":"options collapse callback","default":"","version":""},"required":false,"type":"((collapse: boolean) => void) "},{"name":"loader","tag":{"cn":"设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader 事件，children 为 null 或者长度为 0 视为叶子节点","en":"If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node.","default":"","version":""},"required":false,"type":"((key: string | number, data: DataItem) => void) "},{"name":"disabled","tag":{"cn":"当 disabled 为 true 时，禁用整个选择框。如果 disabled 为函数，根据函数反回结果禁用选项","en":"When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.","default":"false","version":""},"required":false,"type":"boolean | ((data: DataItem) => boolean) "},{"name":"expandTrigger","tag":{"cn":"节点展开触发方式","en":"Expand mode","default":"\\\"click\\\"","version":""},"required":false,"type":"\\\"click\\\" | \\\"hover\\\" | \\\"hover-only\\\" "},{"name":"onChange","tag":{"cn":"设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关","en":"When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property.","default":"","version":""},"required":false,"type":"((value: Value, selected?: DataItem ) => void) "},{"name":"onFilter","tag":{"cn":"onFilter 不为空时，可以输入过滤数据;onFilter 如果返回一个函数，使用这个函数做前端过滤;如果不返回，可以自行做后端过滤;单选状态下支持","en":"When the onFilter is not empty, you can filter data by input.If the onFilter returns a function, use this function as a front-end filter.If return undefined, you can do your own backend filtering.support in single selection state.","default":"","version":""},"required":false,"type":"((text: string) => void | ((data: DataItem) => boolean) ) "},{"name":"keygen","tag":{"cn":"生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 \\\"id\\\"，相当于 (d) => d.id","en":"Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, \\\"id\\\" is the same thing as (d) => d.id.","default":"index","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, parentKey?: string | number ) => string | number)"},{"name":"renderItem","tag":{"cn":"当 renderItem 为 string 时，返回 DataItem\\\\[string]。 若为函数时，则返回函数结果","en":"When \\\"renderItem\\\" is a string, it returns DataItem[string]. If it\\\"s a function, it returns the result of the function.","default":"d => d","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, active?: boolean , id?: string | number ) => ReactNode)"},{"name":"renderResult","tag":{"cn":"选中后在结果中显示的内容，默认和 renderItem 相同","en":"The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected","default":"renderItem","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem, row: DataItem[]) => ReactNode) "},{"name":"onBlur","tag":{"cn":"失焦事件","en":"blur event","default":"","version":""},"required":false,"type":"((e?: KeyboardEvent<HTMLDivElement> ) => void) "},{"name":"onFocus","tag":{"cn":"聚焦事件","en":"focus event","default":"","version":""},"required":false,"type":"((e?: KeyboardEvent<HTMLDivElement> ) => void) "},{"name":"placeholder","tag":{"cn":"占位符","en":"placeholder","default":"","version":""},"required":false,"type":"string "},{"name":"emptyAfterSelect","tag":{"cn":"选中后是否清空输入框内容","en":"empty input after select value","default":"true","version":""},"required":false,"type":"boolean "},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"true","version":""},"required":false,"type":"boolean "},{"name":"underline","tag":{"cn":"是否只展示下边框","en":"Only display border bottom","default":"","version":""},"required":false,"type":"boolean "},{"name":"maxLength","tag":{"cn":"Select 输入框输入字符串最大长度","en":"The maximum length of the input string in the Select input box","default":"","version":""},"required":false,"type":"number "},{"name":"resultClassName","tag":{"cn":"选中结果内容容器的className","en":"The className of the selected result content container","default":"","version":""},"required":false,"type":"string | ((value: DataItem) => string) "},{"name":"compressedClassName","tag":{"cn":"多选合并展示弹出框的类名","en":"Compressed popover classname","default":"","version":""},"required":false,"type":"string "},{"name":"focusSelected","tag":{"cn":"onCreate 或 onFilter 在单选情况下单击值后是否选中值","en":"Selected value while click under onCreate or onFilter","default":"true","version":""},"required":false,"type":"boolean "},{"name":"hideTag","tag":{"cn":"隐藏标签样式，默认情况下展示结果以标签模式分割，隐藏标签样式后可通过自定义 renderResult 渲染分割结果","en":"Hide tag style, by default, the result is displayed in tag mode. After hiding the tag style, the result can be rendered by custom renderResult","default":"false","version":""},"required":false,"type":"boolean "},{"name":"popover","tag":{"cn":"校验信息弹出位置","en":"The position where the validation info pop up","default":"","version":""},"required":false,"type":"PopoverProps[\\\"position\\\"]"},{"name":"popoverProps","tag":{"cn":"校验或者tip弹框接受的属性","en":"Vilidate popup properties","default":"","version":""},"required":false,"type":"PopoverProps "},{"name":"name","tag":{"cn":"Form 内存取数据的 key","en":"The key access data in the Form","default":"","version":""},"required":false,"type":"Name "},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"((value: T) => void | T ) "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((error?: Error ) => void) "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "}],"cn":"","en":"","sort":"0"}]');
export default api;
