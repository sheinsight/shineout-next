# Cascader 组件 3.6.3 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.3
- 包含 Beta 版本: 3.6.3-beta.1 ~ 3.6.3-beta.8
- 发布日期: 2025-04-11

## 详细变更

### 3.6.3-beta.5
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Cascader`、`TreeSelect` 最大高度限制失效的问题（默认 max-height 应为 80px）
- **PR**: [#1051](https://github.com/sheinsight/shineout-next/pull/1051)
- **影响组件**: Cascader, TreeSelect
- **问题原因**: 多选模式下组件容器的最大高度样式设置错误，导致选项过多时高度无限制增长

#### Bug 特征
- 多选模式下选择多个选项后，组件高度持续增长
- 超过预期的 80px 最大高度限制
- 影响页面布局，可能造成内容溢出

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  multiple
  data={largeDataSet}
  value={multipleValues} // 选中多个值时高度失控
/>
```

#### 排查规则
- 搜索设置了 `multiple` 属性的 Cascader 组件
- 搜索可能选中大量选项的多选 Cascader
- 搜索 TreeSelect 的多选使用场景

## Breaking Changes

无

## 风险等级

**中**：
- 修复了高度限制失效的问题，可能影响依赖原有高度行为的布局
- 多选场景下的显示高度会被限制在 80px

## 版本修复历史

1. **3.6.3-beta.5**：修复多选模式下最大高度限制失效的问题