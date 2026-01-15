## 3.9.8-beta.2
2026-01-15
### 🐞 BugFix
- 修复 `Input.Group` 未能正确传递 `name` 和 `rules` 属性给子组件的问题 ([#1584](https://github.com/sheinsight/shineout-next/pull/1584))


## 3.9.7-beta.8
2026-01-13
### 🐞 BugFix
- 修复 `Input.Number` 无法输入负数小数的问题，输入 `-0` 后负号被错误删除 ([#1577](https://github.com/sheinsight/shineout-next/pull/1577))


## 3.9.5-beta.7
2025-12-26
### 🐞 BugFix
- 修复 `Input` 在 `Form` 中按回车提交时 `onEnterPress` 事件触发两次的问题 ([#1550](https://github.com/sheinsight/shineout-next/pull/1550))


## 3.9.5-beta.5
2025-12-24
### 🐞 BugFix
- 修复 `Input.Group` 的 `innerTitle` 和 `placeTitle` 属性未能传递给子 Input 组件的问题 ([#1548](https://github.com/sheinsight/shineout-next/pull/1548))

## 3.9.1-beta.4
2025-11-26

### 🐞 BugFix
- 修复 `Input` 设置了 `delay` 为0后，失焦时触发了 `onChange` 的问题 ([#1487](https://github.com/sheinsight/shineout-next/pull/1487))


## 3.9.0-beta.4
2025-10-14

### 💎 Enhancement

- 优化 `Input.Group` 下存在任意表单项的校验错误时，边框颜色能自动变为相应的错误颜色  ([#1412](https://github.com/sheinsight/shineout-next/pull/1412))


## 3.9.0-beta.2
2025-10-15

### 🆕 Feature
- `Input.Group` 新增 `seamless` 属性：隐藏表单项之间的边框 ([#1408](https://github.com/sheinsight/shineout-next/pull/1408))


## 3.8.7-beta.1
2025-10-14

### 🐞 BugFix
- 修复 `Input.Number` 在有值时未设置 `showClear` 但常驻显示了清除图标的问题  ([#1413](https://github.com/sheinsight/shineout-next/pull/1413))


## 3.8.5-beta.4
2025-09-29

### 🐞 BugFix
- 修复 `Input` 的 `onEnterPress` 事件的第二参数ts类型错误问题 ([#1396](https://github.com/sheinsight/shineout-next/pull/1396))


## 3.8.3-beta.8
2025-09-19

### 🐞 BugFix

- 修复 `Input` 初始化时 value 为数字 0 的时候可清除按钮显示不正确的问题 （Regression: since v3.8.0） ([#1374](https://github.com/sheinsight/shineout-next/pull/1374))


## 3.8.0-beta.7
2025-06-23

### 🆕 Feature

- `Input` 新增 `showClear` 属性，支持有值时，是否常驻显示清除按钮，优先级高于 `clearable` ([#1197](https://github.com/sheinsight/shineout-next/pull/1197))


## 3.8.0-beta.6
2025-06-18

### 💎 Enhancement

- 增强 `Input` 的 `info` 属性，支持配置提示信息的位置和挂载点 ([#1189](https://github.com/sheinsight/shineout-next/pull/1189))


## 3.7.11-beta.1
2025-08-25

### 🐞 BugFix

- 修复 `Input.Number` 的 `coin` 属性不生效，与 v1 v2 表现不一致的问题 ([#1324](https://github.com/sheinsight/shineout-next/pull/1324))


## 3.7.7-beta.3
2025-07-16

### 🐞 BugFix

- 修复 `Input` 的 `autoSelect` 属性在某些场景下无法自动选中所有文本的问题 ([#1245](https://github.com/sheinsight/shineout-next/pull/1245))


## 3.7.3-beta.4
2025-06-17

### 🐞 BugFix
- 修复 `Input` 的 `onEnterPress` 事件在开启了 Form 的 scrollToError 后偶现的无法触发的问题 ([#1182](https://github.com/sheinsight/shineout-next/pull/1182))


## 3.7.3-beta.1
2025-06-16

### 🐞 BugFix

- 修复 `Input` 设置了 `digits` 和 `autoFix` 属性时，偶现的精度丢失问题 ([#1178](https://github.com/sheinsight/shineout-next/pull/1178))


## 3.7.1-beta.7
2025-06-11

### 🐞 BugFix

- 修复 `Input` 的 `onBlur` 和 `onFocus` 事件的参数类型错误问题 ([#1161](https://github.com/sheinsight/shineout-next/pull/1161))


## 3.7.1-beta.4
2025-06-09

### 🐞 BugFix

- 修复 `Input.Group` 的 `seperate` 在hover时层级高过了Table固定列的问题 ([#1158](https://github.com/sheinsight/shineout-next/pull/1158))
- 修复 `Input.Group` 的 `seperate` 属性名称拼写错误问题，修正为 `separate`，原 `seperate` 属性仍保留但标记为废弃 ([#1158](https://github.com/sheinsight/shineout-next/pull/1158))


## 3.6.2-beta.6
2025-04-03

### 🐞 BugFix

- 修复 `Input.Group` 的 `seperate` 在一些组合场景下的样式问题 ([#1038](https://github.com/sheinsight/shineout-next/pull/1038))


## 3.6.1-beta.7
2025-03-27

### 🐞 BugFix

- 修复 `Input.Number` 输入“0.0”这种格式时小数点丢失的问题 ([#1014](https://github.com/sheinsight/shineout-next/pull/1014))


## 3.6.1-beta.4
2025-03-25

### 🐞 BugFix

- 修复 `Input.Group` 下面的 `Input` 的 `onBlur` 和 `onFocus` 回调函数的参数格式不正确的问题 ([#1014](https://github.com/sheinsight/shineout-next/pull/1014))


## 3.6.0
2025-03-13

### 🆕 Feature

- `Input.Group` 新增 `seperate`属性：组合到一起的组件有独立的边框 ([#992](https://github.com/sheinsight/shineout-next/pull/992))


### 🐞 BugFix

- 修复 `Input.Number` 在输入小数点情况下，退格至小数点前时会将小数点删除的问题（Regression: since v3.4.0） ([#989](https://github.com/sheinsight/shineout-next/pull/989))


## 3.5.8
2025-02-13

### 🐞 BugFix

- 修复 `Input` 开启 `digits` 是值为 0 的情况下依然可以输入小数的问题（Regression: since v3.5.7） ([#935](https://github.com/sheinsight/shineout-next/pull/935))


## 3.5.7
2025-01-14

### 🐞 BugFix

- 修复 `Input` 开启 `coin` 情况下初始化数据不展示千分号的问题 ([#919](https://github.com/sheinsight/shineout-next/pull/919))
- 修复 `Input` 设置 `type='number'` 且开启 `coin` 属性后值为数字 0 时展示异常的问题 ([#916](https://github.com/sheinsight/shineout-next/pull/916))


### 💎 Enhancement

- 优化 `Input` 在 `type='number'` 开启 `coin` 下输入溢出内容时的交互逻辑 ([#919](https://github.com/sheinsight/shineout-next/pull/919))


## 3.4.6
2024-11-05

### 🐞 BugFix

- `Input.Number` 输入框删完最后一个数字时不触发onChange的问题（此时返回null或undefined） ([#780](https://github.com/sheinsight/shineout-next/pull/780))


## 3.4.3
2024-10-14

### 🐞 BugFix

- `Input.Group` 同步支持 `onBlur` 事件 ([#701](https://github.com/sheinsight/shineout-next/pull/701))


## 3.4.2
2024-09-29

### 🐞 BugFix

- 修复`Input.Group`的border在微前端框架下的异常表现  ([#685](https://github.com/sheinsight/shineout-next/pull/685))


## 3.3.7
2024-09-09

### 🐞 BugFix

- 修复`Input.Number` 输入过程中的字符串格式(例如1.)触发onChange的问题 ([#655](https://github.com/sheinsight/shineout-next/pull/655))


## 3.3.2
2024-07-29

### 🐞 BugFix

- 修复`Input.Group` size不往下传递的问题 ([#591](https://github.com/sheinsight/shineout-next/pull/591))


## 3.2.3
2024-06-25



### 💅 Style

- 优化  `Input.Group`  聚焦状态的样式 ([#544](https://github.com/sheinsight/shineout-next/pull/544))


## 3.2.2
2024-06-21



### 🐞 BugFix

- 修复  `Input.Number`  属性 `hideArrow` 被透传到 input 元素的问题 ([#540](https://github.com/sheinsight/shineout-next/pull/540))


## 3.1.18
2024-05-27

### 🐞 BugFix

- `Input` 兼容 `value = 0` 的场景 ([#480](https://github.com/sheinsight/shineout-next/pull/480))


## 3.1.16
2024-05-24

### 🐞 BugFix

- 修复 `Input.Group` 缺失 `status` 属性  ([#475](https://github.com/sheinsight/shineout-next/pull/475))


## 3.1.11
2024-05-16

### 🐞 BugFix

- 修复 `Input.Number` 的 tip 提示样式问题 ([#450](https://github.com/sheinsight/shineout-next/pull/450))

- 修复 `Input` 的 info 的样式问题 ([#450](https://github.com/sheinsight/shineout-next/pull/450))


### 💅 Style

- 调整 `Input` 的垂直对齐方式 ([#450](https://github.com/sheinsight/shineout-next/pull/450))


## 3.0.6
2024-04-15

### 🐞 BugFix

- 修复 `Input.Nummber` 内嵌标题当 `value` 有值时没有打开的问题 ([#395](https://github.com/sheinsight/shineout-next/pull/395))


## 3.0.1
2024-04-16

### 🐞 BugFix

- 修复 `Input.Nummber` 的 `min = 0` 不生效的问题 ([#364](https://github.com/sheinsight/shineout-next/pull/364))
- 修复 `Input.Nummber` 缺失 `hideArrow` 属性的问题 ([#362](https://github.com/sheinsight/shineout-next/pull/362))






