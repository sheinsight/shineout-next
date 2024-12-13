const api = JSON.parse('[{"title":"Button","properties":[{"name":"style","tag":{"cn":"自定义样式","en":"Custom style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"className","tag":{"cn":"自定义类名","en":"Custom class name","default":"","version":""},"required":false,"type":"string "},{"name":"onClick","tag":{"cn":"按钮点击回调","en":"Button click callback","default":"","version":""},"required":false,"type":"MouseEventHandler<Element> "},{"name":"disabled","tag":{"cn":"禁用","en":"Specifies the button should be disabled","default":"false","version":""},"required":false,"type":"boolean "},{"name":"children","tag":{"cn":"按钮里面的内容, 可以是文字图标等","en":"The content inside the button, can be a text icon, etc","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"renderLoading","tag":{"cn":"自定义loading","en":"Customize loading","default":"","version":""},"required":false,"type":"((buttonEl: ReactNode) => ReactElement) "},{"name":"loading","tag":{"cn":"loading 状态","en":"Loading","default":"false","version":""},"required":false,"type":"boolean "},{"name":"mode","tag":{"cn":"按钮风格","en":"The mode of the button","default":"","version":""},"required":false,"type":"\\\"text\\\" | \\\"outline\\\" | \\\"dashed\\\" "},{"name":"type","tag":{"cn":"按钮类型","en":"The type of the button","default":"\\\"default\\\"","version":""},"required":false,"type":"| \\\"default\\\"  | \\\"primary\\\"  | \\\"secondary\\\"  | \\\"danger\\\"  | \\\"warning\\\"  | \\\"success\\\"  | \\\"link\\\" "},{"name":"size","tag":{"cn":"按钮尺寸","en":"The size of the button","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"default\\\" | \\\"small\\\" | \\\"large\\\" "},{"name":"space","tag":{"cn":"仅有2个汉字的按钮，是否在2个汉字中间插入空格","en":"For Button with only 2 Chinese characters, whether to insert a space between the two Chinese characters","default":"false","version":""},"required":false,"type":"boolean "},{"name":"href","tag":{"cn":"如果设置了 href 属性，将会用 <a> 代替 <button>","en":"If the href attribute is set, <a> will be used instead of <button>","default":"","version":""},"required":false,"type":"string "},{"name":"target","tag":{"cn":"当设置了 href 属性时，target 会被设置到 <a> 元素上","en":"If present, target will be set onto <a> element.(Effective only when href is been set)","default":"","version":""},"required":false,"type":"string "},{"name":"shape","tag":{"cn":"设置按钮形状","en":"Can be set button shape","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"circle\\\" | \\\"round\\\" | \\\"square\\\" "},{"name":"htmlType","tag":{"cn":"按钮原生type属性","en":"Type of button original","default":"\\\"button\\\"","version":""},"required":false,"type":"\\\"button\\\" | \\\"submit\\\" | \\\"reset\\\" "}],"cn":"","en":"","sort":"0"},{"title":"Button.Group","properties":[{"name":"style","tag":{"cn":"自定义样式","en":"Custom style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"className","tag":{"cn":"自定义类名","en":"Custom class name","default":"","version":""},"required":false,"type":"string "},{"name":"size","tag":{"cn":"不同尺寸","en":"There are three built-in size: small、default、large.","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"large\\\" | \\\"default\\\""},{"name":"shape","tag":{"cn":"设置按钮形状","en":"Can be set button shape","default":"","version":""},"required":false,"type":"\\\"round\\\" "},{"name":"mode","tag":{"cn":"按钮风格;如果Button和Group同时设置mode,以Group为准","en":"The mode of the button","default":"","version":""},"required":false,"type":"\\\"text\\\" | \\\"outline\\\" | \\\"dashed\\\" "},{"name":"type","tag":{"cn":"按钮类型;如果Button和Group同时设置type,以Button为准","en":"The type of the button","default":"\\\"default\\\"","version":""},"required":false,"type":"| \\\"default\\\"  | \\\"primary\\\"  | \\\"secondary\\\"  | \\\"danger\\\"  | \\\"warning\\\"  | \\\"success\\\"  | \\\"link\\\" "},{"name":"children","tag":{"cn":"由 Button 组成的 array","en":"Array of Button","default":"index","version":""},"required":true,"type":"ReactNode"},{"name":"id","tag":{"cn":"按钮组id","en":"The id of the button group","default":"","version":""},"required":false,"type":"string "}],"cn":"","en":"","sort":"0"}]');
export default api;
