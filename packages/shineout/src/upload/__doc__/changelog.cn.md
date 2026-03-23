## 3.9.12-beta.3
2026-03-23

### 💅 Style

- 优化 `Upload` 删除图标样式，从镂空改为实心，提升视觉辨识度 ([#1661](https://github.com/sheinsight/shineout-next/pull/1661))


## 3.8.4-beta.9
2025-09-26

### 🐞 BugFix

- 修复 `Upload.Button` 在限制上传数量为1时，上传一个文件后按钮消失不见的问题 ([#1387](https://github.com/sheinsight/shineout-next/pull/1387))


## 3.8.4-beta.1
2025-09-22

### 🐞 BugFix

- 修复 `Upload` 上传结果的图标在Safari浏览器中不可见的问题 ([#1378](https://github.com/sheinsight/shineout-next/pull/1378))


## 3.8.0-beta.42
2025-08-20

### 🐞 BugFix
- 修复 `Upload` 自定义的 `request` 没有处理 onProgress 事件时，没有加载状态的问题 ([#1319](https://github.com/sheinsight/shineout-next/pull/1319))


## 3.7.7-beta.9
2025-07-18

### 🐞 BugFix
- 修复 `Upload` 的父容器点击事件触发两次的问题 ([#1253](https://github.com/sheinsight/shineout-next/pull/1253))


## 3.7.7-beta.1
2025-07-15

### 🐞 BugFix
- 修复 `Upload.Image` 不限制 `accept` 时选择非图片格式文件内部校验不通过后，报错信息无内容的问题 ([#1242](https://github.com/sheinsight/shineout-next/pull/1242))


## 3.7.2-beta.6
2025-06-16

### 💅 Style
- 调整 Upload 在鼠标移入上传触发区域时的样式优先级 ([#1175](https://github.com/sheinsight/shineout-next/pull/1175))


## 3.7.2-beta.2
2025-06-12

### 💎 Enhancement

- 优化 `Upload` 上传结果的样式，移除了成功和失败状态的图标 ([#1168](https://github.com/sheinsight/shineout-next/pull/1168))


## 3.7.0-beta.22
2025-05-08

### 🆕 Feature

- `Upload` 新增 `beforeDrop` 属性，支持自行处理拖拽释放事件以及读取文件列表处理返回文件 ([#1104](https://github.com/sheinsight/shineout-next/pull/1104))


## 3.6.5-beta.6
2025-04-29

### 🐞 BugFix

- 修复 `Upload` 同时上传多个文件时偶现的99%进度不消失问题  ([#1084](https://github.com/sheinsight/shineout-next/pull/1084))


### 🆕 Feature

- `Upload` 新增 `functionalOnChange` 属性，开启后onChange的回调值将变为函数  ([#1084](https://github.com/sheinsight/shineout-next/pull/1084))


## 3.6.0
2025-03-14

### 🐞 BugFix

- 修复 `Upload.Dragger` 子组件缺失的问题  ([#996](https://github.com/sheinsight/shineout-next/pull/996))
- 修复 `Upload` 的 `webkitdirectory` 属性失效的问题 ([#978](https://github.com/sheinsight/shineout-next/pull/978))


### 🆕 Feature

- `Upload` 新增 `hideHandler` 属性，支持隐藏默认触发器 ([#993](https://github.com/sheinsight/shineout-next/pull/993))


### 💎 Enhancement
- `Upload` 增强 `customResult` 返回内容，新增返回“触发器的dom实例”和“原文件（成功文件）实例” ([#995](https://github.com/sheinsight/shineout-next/pull/995), [#993](https://github.com/sheinsight/shineout-next/pull/993))


## 3.5.7
2025-01-14

### 🐞 BugFix

- 修复 `Upload.Button` 不支持mode=outline的问题 ([#918](https://github.com/sheinsight/shineout-next/pull/918))


### 💎 Enhancement

- `Upload` 设置 customResult 时，增加回调方法的参数: `recoverValue` 和 `onValueRecover` ([#915](https://github.com/sheinsight/shineout-next/pull/915))


## 3.1.16
2024-05-24

### 🐞 BugFix

- 修复 `Upload` 同时上传多个文件的时候会丢失上传结果 ([#474](https://github.com/sheinsight/shineout-next/pull/474))
