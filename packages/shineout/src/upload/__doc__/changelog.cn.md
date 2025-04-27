## 3.6.5-beta.4
2025-04-27

### 🐞 BugFix

- 修复 `Upload` 多选文件并发上传时偶现的结果丢失问题  ([#1082](https://github.com/sheinsight/shineout-next/pull/1082))

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
