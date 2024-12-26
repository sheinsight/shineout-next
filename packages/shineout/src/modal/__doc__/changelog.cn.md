## 3.5.5
2024-12-24

### 🐞 BugFix

- 修复 `Modal.Submit` 在存在多个Form组件切换时，点击触发的onSubmit的value不正确的问题 ([#885](https://github.com/sheinsight/shineout-next/pull/885))


## 3.5.0
2024-11-11

### 🐞 BugFix

- 修复 `Modal` 开启全屏和可拖拽时的交互异常问题 ([#739](https://github.com/sheinsight/shineout-next/pull/739))


## 3.4.5
2024-10-31

### 🐞 BugFix

- 修复 `Modal` 组件 confirm 模式下确认按钮 loading 交互失效的问题 ([#774](https://github.com/sheinsight/shineout-next/pull/774))

## 3.4.0
2024-09-19

### 🐞 BugFix

- 修复 `Modal` 方法调用方式时，点击确定或取消按钮没有关闭动画 ([#675](https://github.com/sheinsight/shineout-next/pull/675))


2024-08-29

### 🐞 BugFix

- 修复 `Modal` 组件下存在多个`Form`组件时，`Modal.Submit`提交无效的问题 ([#625](https://github.com/sheinsight/shineout-next/pull/625))

## 3.3.2
2024-07-29

### 🐞 BugFix

- 修复 `Modal` 组件的onClick事件冒泡至父节点的问题 ([#591](https://github.com/sheinsight/shineout-next/pull/591))
- 修复 `Modal` 组件的maskCloseAble和hideClose同时设置时, hideClose不生效的问题 ([#591](https://github.com/sheinsight/shineout-next/pull/591))

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







