# Select 组件 3.7.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.5
- 包含 Beta 版本: 3.7.5-beta.1 ~ 3.7.5-beta.11
- 发布日期: 2025-06-25

## 详细变更

### 3.7.5-beta.11
- **变更类型**: 性能优化
- **复现示例**: 无
- **变更描述**: 优化 `Select` 组件在大数据场景下的初始化性能
- **PR**: [#1226](https://github.com/sheinsight/shineout-next/pull/1226)
- **影响组件**: Select
- **问题原因**: 大数据量下，compressed 功能的初始化计算耗时过长

#### 性能问题特征
- 待补充复现示例

**代码模式**：
```jsx
// 大数据量下的性能问题
<Select
  multiple
  compressed
  data={largeDataArray} // 数据量 > 1000
  value={multipleValues} // 选中项 > 100
  // 初始化时可能卡顿
/>
```

#### 排查规则
- 搜索同时设置了 `compressed` 且 `data` 数组长度大于 1000 的 Select
- 搜索同时设置了 `compressed` 且 `value` 数组长度大于 100 的多选 Select
- 搜索同时设置了 `compressed` 且数据源来自接口的大数据量 Select

## Breaking Changes

无

## 风险等级

**低**：
- 性能优化不影响功能逻辑
- 仅优化了初始化渲染性能

## 版本修复历史

1. **3.7.5-beta.11**：优化大数据场景下的初始化性能