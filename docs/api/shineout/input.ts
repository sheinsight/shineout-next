const api = JSON.parse('[{"title":"Input","properties":[{"name":"value","tag":{"cn":"输入值","en":"Value","default":"","version":""},"required":false,"type":"string "},{"name":"onChange","tag":{"cn":"值改变回调","en":"Value change callback","default":"","version":""},"required":false,"type":"(value: string) => void"},{"name":"defaultValue","tag":{"cn":"默认值","en":"Default value","default":"","version":""},"required":false,"type":"string"},{"name":"clearable","tag":{"cn":"可点击清空图标删除输入框内容，为函数式表示清空回调","en":"Remove content of the input when clicking the clear icon, clear event function","default":"false","version":""},"required":false,"type":"boolean | (() => void) "},{"name":"onBlur","tag":{"cn":"失去焦点后的回调","en":"The callback of blur","default":"","version":""},"required":false,"type":"FocusEventHandler<Element> "},{"name":"onFocus","tag":{"cn":"聚焦后的回调","en":"The callback when Textarea focus","default":"","version":""},"required":false,"type":"FocusEventHandler<Element> "},{"name":"onClick","tag":{"cn":"点击回调","en":"Click callback","default":"","version":""},"required":false,"type":"MouseEventHandler<Element> "},{"name":"disabled","tag":{"cn":"禁用组件","en":"Disable component","default":"false","version":""},"required":false,"type":"boolean "},{"name":"autoSelect","tag":{"cn":"是否自动获得焦点","en":"Automatically select all data after mouse click","default":"false","version":""},"required":false,"type":"boolean "},{"name":"size","tag":{"cn":"不同尺寸","en":"There are three built-in size: small、default、large.","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"large\\\" | \\\"default\\\""},{"name":"prefix","tag":{"cn":"前缀","en":"prefix","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"width","tag":{"cn":"宽度","en":"width","default":"","version":""},"required":false,"type":"string | number "},{"name":"className","tag":{"cn":"自定义类名","en":"Custom class name","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"自定义样式","en":"Custom style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"status","tag":{"cn":"组件状态","en":"The status of the component","default":"","version":""},"required":false,"type":"\\\"error\\\" "},{"name":"clearIcon","tag":{"cn":"自定义清除图标","en":"Custom clear icon","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"suffix","tag":{"cn":"后缀","en":"suffix","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"underline","tag":{"cn":"仅仅展示下边框","en":"Show border bottom","default":"false","version":""},"required":false,"type":"boolean "},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"true","version":""},"required":false,"type":"boolean "},{"name":"onEnterPress","tag":{"cn":"回车键回调函数","en":"The callback function for enter key","default":"","version":""},"required":false,"type":"((value: string, e: KeyboardEvent<Element>) => void) "},{"name":"trim","tag":{"cn":"是否去除前后空格","en":"Whether to remove leading and trailing spaces","default":"","version":""},"required":false,"type":"boolean "},{"name":"numType","tag":{"cn":"设置数字类型 支持 \\\"positive\\\" 和 \\\"non-negative\\\", 仅在 type = number 下生效","en":"Number type supports \\\"positive\\\" and \\\"non-negative\\\", only works when type = number","default":"","version":""},"required":false,"type":"\\\"non-negative\\\" | \\\"positive\\\" "},{"name":"coin","tag":{"cn":"以千位分隔符展示,仅当 type 为 number 时有效","en":"Show as thousands separator, valid only when type is \\\"number\\\"","default":"false","version":""},"required":false,"type":"boolean "},{"name":"integerLimit","tag":{"cn":"整数位数限制, 仅在 type = number 下生效","en":"Integer limit, only works when type = number","default":"","version":""},"required":false,"type":"number "},{"name":"digits","tag":{"cn":"小数位数限制, 仅在 type = number 下生效","en":"Decimal limit, only works when type = number","default":"","version":""},"required":false,"type":"number "},{"name":"autoFix","tag":{"cn":"是否自动补全小数位数, 仅在 type = number 下生效","en":"Whether to automatically complete the number of decimal places, only works when type = number","default":"","version":""},"required":false,"type":"boolean "},{"name":"tip","tag":{"cn":"提示信息","en":"Prompt information","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"forwardRef","tag":{"cn":"获取input dom元素","en":"get input dom element","default":"","version":""},"required":false,"type":"Ref<HTMLInputElement> "},{"name":"innerTitle","tag":{"cn":"内嵌标题","en":"Inner title","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"placeTitle","tag":{"cn":"占位标题，需要配合 innerTitle 一起使用","en":"Placeholder title, which needs to be used together with innerTitle","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"htmlName","tag":{"cn":"原生 html 属性","en":"The original property of html","default":"","version":""},"required":false,"type":"string "},{"name":"clearToUndefined","tag":{"cn":"点击清除按钮后数据变为 undefined","en":"After clicking the clear button, the data becomes undefined","default":"false","version":""},"required":false,"type":"boolean "},{"name":"info","tag":{"cn":"提示信息","en":"Infomation","default":"","version":""},"required":false,"type":"number | ((value: string | undefined) => string)"},{"name":"delay","tag":{"cn":"用户输入触发 onChange 和校验间隔时间，单位 毫秒","en":"User input triggers the onChange and to check interval, unit: ms","default":"","version":""},"required":false,"type":"number "},{"name":"popover","tag":{"cn":"校验信息弹出位置","en":"The position where the validation info pop up","default":"","version":""},"required":false,"type":"PopoverProps[\\\"position\\\"]"},{"name":"popoverProps","tag":{"cn":"校验或者tip弹框接受的属性","en":"Vilidate popup properties","default":"","version":""},"required":false,"type":"PopoverProps "},{"name":"name","tag":{"cn":"Form 内存取数据的 key","en":"The key access data in the Form","default":"","version":""},"required":false,"type":"Name "},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"((value: T) => void | T ) "},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((error?: Error ) => void) "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "}],"cn":"","en":"","sort":"0"},{"title":"Input.Number","properties":[{"name":"value","tag":{"cn":"输入值","en":"Value","default":"","version":""},"required":false,"type":"V "},{"name":"onChange","tag":{"cn":"值改变回调","en":"Value change callback","default":"","version":""},"required":false,"type":"(value: string) => void"},{"name":"defaultValue","tag":{"cn":"默认值","en":"Default value","default":"","version":""},"required":false,"type":"string"},{"name":"clearable","tag":{"cn":"可点击清空图标删除输入框内容，为函数式表示清空回调","en":"Remove content of the input when clicking the clear icon, clear event function","default":"false","version":""},"required":false,"type":"boolean | (() => void) "},{"name":"step","tag":{"cn":"改变数字跨度，可为小数","en":"Change the digital span. It can be decimal","default":"1","version":""},"required":false,"type":"number "},{"name":"min","tag":{"cn":"最小值","en":"Minimum value","default":"","version":""},"required":false,"type":"number "},{"name":"max","tag":{"cn":"最大值","en":"Maximum value","default":"","version":""},"required":false,"type":"number "},{"name":"onBlur","tag":{"cn":"失去焦点后的回调","en":"The callback of blur","default":"","version":""},"required":false,"type":"FocusEventHandler<Element> "},{"name":"onFocus","tag":{"cn":"聚焦后的回调","en":"The callback when Textarea focus","default":"","version":""},"required":false,"type":"FocusEventHandler<Element> "},{"name":"onClick","tag":{"cn":"点击回调","en":"Click callback","default":"","version":""},"required":false,"type":"MouseEventHandler<Element> "},{"name":"disabled","tag":{"cn":"禁用组件","en":"Disable component","default":"false","version":""},"required":false,"type":"boolean "},{"name":"autoSelect","tag":{"cn":"是否自动获得焦点","en":"Automatically select all data after mouse click","default":"false","version":""},"required":false,"type":"boolean "},{"name":"size","tag":{"cn":"不同尺寸","en":"There are three built-in size: small、default、large.","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"large\\\" | \\\"default\\\""},{"name":"prefix","tag":{"cn":"前缀","en":"prefix","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"width","tag":{"cn":"宽度","en":"width","default":"","version":""},"required":false,"type":"string | number "},{"name":"className","tag":{"cn":"自定义类名","en":"Custom class name","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"自定义样式","en":"Custom style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"status","tag":{"cn":"组件状态","en":"The status of the component","default":"","version":""},"required":false,"type":"\\\"error\\\" "},{"name":"clearIcon","tag":{"cn":"自定义清除图标","en":"Custom clear icon","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"suffix","tag":{"cn":"后缀","en":"suffix","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"underline","tag":{"cn":"仅仅展示下边框","en":"Show border bottom","default":"false","version":""},"required":false,"type":"boolean "},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"true","version":""},"required":false,"type":"boolean "},{"name":"onEnterPress","tag":{"cn":"回车键回调函数","en":"The callback function for enter key","default":"","version":""},"required":false,"type":"((value: string, e: KeyboardEvent<Element>) => void) "},{"name":"numType","tag":{"cn":"设置数字类型 支持 \\\"positive\\\" 和 \\\"non-negative\\\", 仅在 type = number 下生效","en":"Number type supports \\\"positive\\\" and \\\"non-negative\\\", only works when type = number","default":"","version":""},"required":false,"type":"\\\"non-negative\\\" | \\\"positive\\\" "},{"name":"integerLimit","tag":{"cn":"整数位数限制, 仅在 type = number 下生效","en":"Integer limit, only works when type = number","default":"","version":""},"required":false,"type":"number "},{"name":"digits","tag":{"cn":"小数位数限制, 仅在 type = number 下生效","en":"Decimal limit, only works when type = number","default":"","version":""},"required":false,"type":"number "},{"name":"cancelBlurChange","tag":{"cn":"取消 blur 触发 onChange,用于多层嵌套的格式化，只在最外层触发一次onChange","en":"Cancel blur trigger onChange, used for multi-layer nesting of formatting, only trigger onChange once at the outermost layer","default":"","version":""},"required":false,"type":"boolean "},{"name":"allowNull","tag":{"cn":"清空后值为 null","en":"Allow value is null","default":"","version":""},"required":false,"type":"boolean "},{"name":"tip","tag":{"cn":"提示信息","en":"Prompt information","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"forwardRef","tag":{"cn":"获取input dom元素","en":"get input dom element","default":"","version":""},"required":false,"type":"Ref<HTMLInputElement> "},{"name":"innerTitle","tag":{"cn":"内嵌标题","en":"Inner title","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"placeTitle","tag":{"cn":"占位标题，需要配合 innerTitle 一起使用","en":"Placeholder title, which needs to be used together with innerTitle","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"htmlName","tag":{"cn":"原生 html 属性","en":"The original property of html","default":"","version":""},"required":false,"type":"string "},{"name":"clearToUndefined","tag":{"cn":"点击清除按钮后数据变为 undefined","en":"After clicking the clear button, the data becomes undefined","default":"false","version":""},"required":false,"type":"boolean "},{"name":"info","tag":{"cn":"提示信息","en":"Infomation","default":"","version":""},"required":false,"type":"number | ((value: string | undefined) => string)"},{"name":"delay","tag":{"cn":"用户输入触发 onChange 和校验间隔时间，单位 毫秒","en":"User input triggers the onChange and to check interval, unit: ms","default":"","version":""},"required":false,"type":"number "},{"name":"popover","tag":{"cn":"校验信息弹出位置","en":"The position where the validation info pop up","default":"","version":""},"required":false,"type":"PopoverProps[\\\"position\\\"]"},{"name":"popoverProps","tag":{"cn":"校验或者tip弹框接受的属性","en":"Vilidate popup properties","default":"","version":""},"required":false,"type":"PopoverProps "},{"name":"name","tag":{"cn":"Form 内存取数据的 key","en":"The key access data in the Form","default":"","version":""},"required":false,"type":"Name "},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"((value: T) => void | T ) "},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((error?: Error ) => void) "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "}],"cn":"","en":"","sort":"0"},{"title":"Input.Password","properties":[{"name":"point","tag":{"cn":"密码符号","en":"Password symbol","default":"\\\"•\\\"","version":""},"required":false,"type":"string "},{"name":"visibilityToggle","tag":{"cn":"是否显示切换密码可见状态的按钮","en":"Whether to display the button to toggle the visibility of the password","default":"","version":""},"required":false,"type":"boolean "},{"name":"visibility","tag":{"cn":"是否显示密码","en":"Whether to display the password","default":"","version":""},"required":false,"type":"boolean "},{"name":"defaultVisibility","tag":{"cn":"初始状态是否显示密码","en":"Whether to display the password initially","default":"","version":""},"required":false,"type":"boolean "},{"name":"onVisibilityChange","tag":{"cn":"切换密码可见状态的按钮的图标","en":"The icon of the button to toggle the visibility of the password","default":"","version":""},"required":false,"type":"((visibility: boolean) => void) "}],"cn":"基本API 和 Input 一致，特定API如下","en":"The basic API is consistent with Input, and the specific API is as follows","sort":"0"}]');
export default api;
