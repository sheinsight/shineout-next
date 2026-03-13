## 3.9.11-beta.8
2026-03-13
### 🐞 BugFix
- 修复 `Pagination` 在 `Form` 内使用时，页码选择器受表单上下文影响导致行为异常的问题 ([#1652](https://github.com/sheinsight/shineout-next/pull/1652))


## 3.9.5-beta.6
2025-12-25
### 🐞 BugFix
- 修复 `Pagination` 重复点击相同页码时不触发 `onChange` 的问题 (Regression: since v3.2.3)([#1550](https://github.com/sheinsight/shineout-next/pull/1550))


## 3.9.5-beta.1
2025-12-22
### 🐞 BugFix
- 修复 `Pagination` 在非受控模式下切换 pageSize 后点击页码会导致 pageSize 重置的问题 ([#1544](https://github.com/sheinsight/shineout-next/pull/1544))


## 3.9.2-beta.9
2025-12-05

### 🐞 BugFix
- 修复 `Pagination` 传入负数 `total` 时不隐藏的问题 ([#1503](https://github.com/sheinsight/shineout-next/pull/1503))


## 3.8.0-beta.39
2025-08-18

### 🆕 Feature
- `Pagination` 新增 `sizeListProps` 属性，兼容旧版本 ([#1316](https://github.com/sheinsight/shineout-next/pull/1316))


## 3.7.8-beta.10
2025-07-28

### 🐞 BugFix
- 修复 `Pagination` 的 `select` 下拉框在限制了高度的html或body滚动容器中第一次点击不出现的问题 ([#1270](https://github.com/sheinsight/shineout-next/pull/1270))


## 3.7.5-beta.7
2025-07-03

### 🐞 BugFix
- 修复 `Pagination` 受控模式下外部 value 和内部状态不同步的问题 (Regression: since v3.2.6) ([#1222](https://github.com/sheinsight/shineout-next/pull/1222))


## 3.7.4-beta.3
2025-06-24

### 🐞 BugFix
- 修复 `Pagination` 的分页器弹出层在滚动容器中的极限边界场景下可能出现的不可见问题 ([#1201](https://github.com/sheinsight/shineout-next/pull/1201))


## 3.6.1-beta.2
2025-03-25

### 🐞 BugFix
- 修复 `Pagination` 的 `simple` 模式输入框不展示当前页的问题（Regression： since v3.6.0） ([#1010](https://github.com/sheinsight/shineout-next/pull/1010))


## 3.4.4
2024-10-28

### 🆕 Feature
- `Pagination` 新增 `select` 属性支持配置弹窗部分信息 ([#753](https://github.com/sheinsight/shineout-next/pull/753))


## 3.2.3
2024-06-25

### 💎 Enhancement

- 优化 `Pagination` 数字按钮点击逻辑，当分页数不变的时候不触发 `onChange` ([#546](https://github.com/sheinsight/shineout-next/pull/546))


### 🐞 BugFix

- 修复 `Pagination` 属性 `onChange` 的参数 `sizeChange` 计算错误的问题  ([#546](https://github.com/sheinsight/shineout-next/pull/546))







