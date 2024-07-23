const api = JSON.parse('[{"title":"Tooltip","properties":[{"name":"trigger","tag":{"cn":"弹出方式","en":"Pop-up type","default":"\\\"hover\\\"","version":""},"required":false,"type":"\\\"hover\\\" | \\\"click\\\" | \\\"focus\\\" "},{"name":"position","tag":{"cn":"弹出层位置","en":"The position of the pop-up layer","default":"\\\"auto\\\"","version":""},"required":false,"type":"| \\\"left-top\\\"  | \\\"left-bottom\\\"  | \\\"right-top\\\"  | \\\"right-bottom\\\"  | \\\"top-right\\\"  | \\\"top-left\\\"  | \\\"bottom-right\\\"  | \\\"bottom-left\\\"  | \\\"left\\\"  | \\\"right\\\"  | \\\"top\\\"  | \\\"bottom\\\" | \\\"auto\\\" "},{"name":"priorityDirection","tag":{"cn":"弹出位置优先级, 默认为上下优先, 只在未设置 position 时生效","en":"Popup location priority, default is left and right priority, only valid when position is not set","default":"\\\"vertical\\\"","version":""},"required":false,"type":"\\\"auto\\\" | \\\"vertical\\\" | \\\"horizontal\\\" "},{"name":"className","tag":{"cn":"自定义类名","en":"Custom class name","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"自定义样式","en":"Custom style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"mouseEnterDelay","tag":{"cn":"弹出延迟，默认为 0 不延迟，单位为毫秒。","en":"Pop-up delay, default is 0 no delay, unit is milliseconds.","default":"0","version":""},"required":false,"type":"number "},{"name":"children","tag":{"cn":"子元素只能为一个 ReactElement","en":"The child element can only be a ReactElement.","default":"","version":""},"required":true,"type":"ReactNode"},{"name":"animation","tag":{"cn":"弹出是否使用动画","en":"use animation","default":"true","version":""},"required":false,"type":"boolean "},{"name":"disabledChild","tag":{"cn":"使被禁用的元素正常显示提示","en":"make disabled element work","default":"false","version":""},"required":false,"type":"boolean "},{"name":"tip","tag":{"cn":"弹出文字","en":"Pop up texts","default":"","version":""},"required":true,"type":"ReactNode"},{"name":"type","tag":{"cn":"样式","en":"style","default":"default","version":""},"required":false,"type":"\\\"default\\\" | \\\"light\\\" | \\\"primary\\\" | \\\"success\\\" | \\\"warning\\\" | \\\"danger\\\" "},{"name":"zIndex","tag":{"cn":"tooltip 层级","en":"Z-index of popover","default":"1051","version":""},"required":false,"type":"number "}],"cn":"","en":"","sort":"0"}]');
export default api;
