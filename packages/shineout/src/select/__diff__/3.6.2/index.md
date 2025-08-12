# Select 组件 3.6.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.2
- 包含 Beta 版本: 3.6.2-beta.1 ~ 3.6.2-beta.6
- 发布日期: 2025-04-01

## 详细变更

### 3.6.2-beta.4
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 多选模式下结果框最大高度限制失效的问题（默认 max-height 应为 78px）
- **PR**: [#1030](https://github.com/sheinsight/shineout-next/pull/1030)
- **影响组件**: Select
- **问题原因**: 多选模式下结果框容器缺少 maxHeight 样式限制，导致选中大量选项时结果框会无限向下扩展

#### Bug 特征
- Select 多选模式下，选中大量选项（通常超过 3-4 行）
- 结果框（显示已选择标签的区域）高度无限增长，超过预期的 78px
- 结果框没有出现滚动条，而是不断撑高组件
- 影响页面布局，可能将下方内容推移

**代码模式**：
```jsx
// 多选结果框高度失控
<Select
  multiple
  data={largeDataList}  // 大量数据
  defaultValue={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}  // 大量默认选中
  keygen="id"
  renderItem={(d) => d.name}
  // 结果框会无限向下扩展，没有高度限制
/>
```

#### 排查规则
- 搜索同时设置了 `multiple` 且 `defaultValue` 数组长度大于 10 的 Select 组件
- 搜索同时设置了 `multiple` 且 `value` 通过变量赋值且该变量来自接口数据的 Select
- 搜索同时设置了 `multiple` 且父容器设置了固定高度（height/maxHeight）的 Select
- 搜索同时设置了 `multiple` 且位于 Form.Item 内且表单字段超过 5 个的 Select

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复样式问题，恢复默认行为
- 不影响功能逻辑

## 版本修复历史

1. **3.6.2-beta.4**：修复最大高度限制失效的问题