const api = JSON.parse('[{"title":"Badge","properties":[{"name":"className","tag":{"cn":"自定义类名","en":"Custom class name","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"自定义样式","en":"Custom style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"children","tag":{"cn":"内容","en":"Content","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"color","tag":{"cn":"自定义徽标颜色","en":"Custom badge color","default":"","version":""},"required":false,"type":"string "},{"name":"count","tag":{"cn":"展示的数字，大于 overflowCount 时显示 ${overflowCount}+，为 0 时隐藏","en":"Number to show, show ${overflowCount}+ when it is greater than overflowCount, hide when it is 0","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"dot","tag":{"cn":"小点模式，开启后不展示数字","en":"Dot mode","default":"false","version":""},"required":false,"type":"boolean "},{"name":"offset","tag":{"cn":"偏移量","en":"Offset of the badge","default":"","version":""},"required":false,"type":"[number, number] "},{"name":"overflowCount","tag":{"cn":"封顶数值","en":"Offset of the badge","default":"","version":""},"required":false,"type":"number "},{"name":"showZero","tag":{"cn":"当数值为 0 时，是否展示 Badge","en":"Whether to show Badge when the number is 0","default":"","version":""},"required":false,"type":"boolean "},{"name":"status","tag":{"cn":"徽标状态","en":"Whether to show Badge when the number is 0","default":"","version":""},"required":false,"type":"\\\"default\\\" | \\\"processing\\\" | \\\"error\\\" | \\\"warning\\\" | \\\"success\\\" "},{"name":"text","tag":{"cn":"状态点文本，仅在配置了 status 属性后生效","en":"Status point text, only valid after configuring the status property","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"size","tag":{"cn":"尺寸，仅在非 dot 模式下生效，支持 small 和 default 两种尺寸","en":"Size, only valid in non-dot mode, supports two sizes: small and default","default":"","version":""},"required":false,"type":"\\\"default\\\" | \\\"small\\\" "}],"cn":"","en":"","sort":"0"}]');
export default api;
