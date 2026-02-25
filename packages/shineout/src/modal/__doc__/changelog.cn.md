## 3.9.10-beta.1
2026-02-25
### 🆕 Feature
- `Modal` 新增 `mask` 属性支持设置为 `{ blur: true }` 来启用模糊遮罩效果 ([#1631](https://github.com/sheinsight/shineout-next/pull/1631))

## 3.9.8-beta.11
2026-01-21
### 🐞 BugFix
- 修复 `Modal` 在 `Popover` 内部使用时，点击 Modal 会触发 Popover 的 clickAway 导致 Popover 意外关闭的问题  ([#1597](https://github.com/sheinsight/shineout-next/pull/1597))


## 3.9.2-beta.2
2025-12-01
### 🐞 BugFix
- 修复 `Modal` 函数式调用在特定销毁时序下可能报错的问题  ([#1493](https://github.com/sheinsight/shineout-next/pull/1493))


## 3.9.0-beta.14
2025-10-27

### 🆕 Feature
- `Modal` 新增 `headerStyle` 和 `footerStyle` 用于自定义头部和脚部样式 ([#1428](https://github.com/sheinsight/shineout-next/pull/1428))


## 3.8.6-beta.6
2025-10-11

### 🐞 BugFix
- 修复 `Modal` 方法形式调用时在低性能设备上可能出现的关闭时闪烁一下的问题 ([#1406](https://github.com/sheinsight/shineout-next/pull/1406))


## 3.8.5-beta.1
2025-09-26

### 🐞 BugFix
- 修复 `Modal` 组件在多层嵌套使用且设置了 `destroy` 属性时，关闭后body滚动条不可见的问题 ([#1389](https://github.com/sheinsight/shineout-next/pull/1389))


## 3.8.2-beta.11
2025-09-12

### 🐞 BugFix
- 修复 `Modal` 设置了 `fullScreen` 属性后 `footer` 可能被遮挡的样式问题 ([#1335](https://github.com/sheinsight/shineout-next/pull/1335))


## 3.8.0-beta.44
2025-08-21

### 🐞 BugFix
- 修复 `Modal` 组件在多层嵌套使用时，重复两次打开关闭后出现的body滚动条不可见的问题 ([#1321](https://github.com/sheinsight/shineout-next/pull/1321))


## 3.8.0-beta.41
2025-08-19

### 🆕 Feature
- `Modal` 新增 `containerClassName`，设置挂载容器的className ([#1318](https://github.com/sheinsight/shineout-next/pull/1318))


## 3.8.0-beta.38
2025-08-18

### 🐞 BugFix
- 修复 `Modal` 方法调用方式时，点击 OK 按钮后触发了 `onClose` 事件的问题 ([#1315](https://github.com/sheinsight/shineout-next/pull/1315))


## 3.8.0-beta.26
2025-08-12

### 🐞 BugFix
- 修复 `Modal` 的 panel 面板的 margin 样式问题 ([#1298](https://github.com/sheinsight/shineout-next/pull/1298))


## 3.8.0-beta.23
2025-08-04

### 🐞 BugFix
- 修复 `Modal` 关闭后，外部意外的移除了组件样式后，弹出层暴露出来的问题 ([#1289](https://github.com/sheinsight/shineout-next/pull/1289))


## 3.7.5-beta.3
2025-07-02

### 🐞 BugFix

- 修复 `Dropdown` 组件在开启 `hover` 模式时，鼠标移入非 dom 包含关系元素（如在 Dropdown 列表里打开一个 Modal）导致意外打开列表的问题 ([#1218](https://github.com/sheinsight/shineout-next/pull/1218))


## 3.7.2-beta.3
2025-06-12

### 🐞 BugFix

- 修复 `Modal` 被外部通过 ReactDOM.unmountComponentAtNode 卸载后，无法重置html元素的样式的问题 ([#1170](https://github.com/sheinsight/shineout-next/pull/1170))


## 3.7.0-beta.20
2025-05-07

### 🐞 BugFix

- 修复 `Modal` 组件初始化时样式延迟注入导致其他组件测绘不准确的问题 ([#1101](https://github.com/sheinsight/shineout-next/pull/1101))


## 3.6.6-beta.7
2025-05-12

### 🐞 BugFix

- 修复 `Modal` 开启 `destory` 属性关闭后多次执行渲染函数的问题 ([#1109](https://github.com/sheinsight/shineout-next/pull/1109))


## 3.6.5-beta.12
2025-04-29

### 🐞 BugFix

- 修复 `Modal.Submit` 的onClick事件比 `onSubmit` 先执行的问题 ([#1090](https://github.com/sheinsight/shineout-next/pull/1090))


## 3.6.4-beta.1
2025-04-15

### 🐞 BugFix

- 修复 `Modal` 全屏模式下内容超出窗口高度时的滚动条样式异常问题 ([#1062](https://github.com/sheinsight/shineout-next/pull/1062))


## 3.6.3-beta.4
2025-04-14

### 🐞 BugFix

- 修复 `Modal` 多层嵌套使用时，关闭子Modal但未关闭父Modal时body的滚动条出现的问题 ([#1054](https://github.com/sheinsight/shineout-next/pull/1054))


## 3.5.0
2024-11-11

### 🐞 BugFix

- 修复 `Modal` 开启全屏和可拖拽时的交互异常问题 ([#739](https://github.com/sheinsight/shineout-next/pull/739))


## 3.4.5
2024-10-31

### 🐞 BugFix

- 修复 `Modal` 的 confirm 模式下确认按钮 loading 交互失效的问题 ([#774](https://github.com/sheinsight/shineout-next/pull/774))


## 3.4.0
2024-09-19

### 🐞 BugFix

- 修复 `Modal` 方法调用方式时，点击确定或取消按钮没有关闭动画 ([#675](https://github.com/sheinsight/shineout-next/pull/675))


2024-08-29

### 🐞 BugFix

- 修复 `Modal` 下存在多个`Form`时，`Modal.Submit`提交无效的问题 ([#625](https://github.com/sheinsight/shineout-next/pull/625))


## 3.3.2
2024-07-29

### 🐞 BugFix

- 修复 `Modal` 的onClick事件冒泡至父节点的问题 ([#591](https://github.com/sheinsight/shineout-next/pull/591))
- 修复 `Modal` 的maskCloseAble和hideClose同时设置时, hideClose不生效的问题 ([#591](https://github.com/sheinsight/shineout-next/pull/591))


## 3.2.3
2024-06-25

### 🐞 BugFix

- 修复 `Modal` 组件在method使用方式下mask有延迟出现的问题 ([#541](https://github.com/sheinsight/shineout-next/pull/541))


## 3.2.2
2024-06-21

### 🐞 BugFix

- 修复 `Modal` 组件在React `StrictMode` 模式下不显示遮罩层的问题 ([#536](https://github.com/sheinsight/shineout-next/pull/536))


## 3.1.26
2024-06-05

### 🐞 BugFix

- 修复 `Modal.Confirm` 点击取消和确认时不应该触发 `onClose` 的问题 ([#503](https://github.com/sheinsight/shineout-next/pull/503))


## 3.1.25
2024-06-03

### 🐞 BugFix

- 修复 `ModalMethod` 没有返回关闭方法的问题 ([#501](https://github.com/sheinsight/shineout-next/pull/501))


## 3.1.18
2024-05-27

### 🐞 BugFix

- 修复 `Modal.Submit` 加载中样式问题 ([#501](https://github.com/sheinsight/shineout-next/pull/501))


## 3.1.11
2024-05-16

### 🐞 BugFix

- 修复 `Modal` 当 `visible = false` 时会创建容器的问题 ([#452](https://github.com/sheinsight/shineout-next/pull/452))

- 修复 `Modal` 当 `destroy = true` 时关闭弹窗没有卸载容器 ([#452](https://github.com/sheinsight/shineout-next/pull/452))


### 💅 Style

- 调整  `Modal` 的 `modal-wrapper` 增加 `overflow: 'auto'`([#452](https://github.com/sheinsight/shineout-next/pull/452))

- 调整 `Modal` 当 `title 为空` 时 `modal-header` 的样式 ([#453](https://github.com/sheinsight/shineout-next/pull/453))







