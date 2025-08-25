# Popover 组件 3.7.7 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.7
- 包含 Beta 版本: 3.7.7-beta.1 ~ 3.7.7-beta.9
- 发布日期: 2025-07-18

## 详细变更

### 3.7.7-beta.4
- **变更类型**: 修复问题
- **变更标签**: 样式
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=a663da29-7da7-4147-b3f8-12167af6d2f4](https://shineout-playground.sheincorp.cn/#/playground?code=a663da29-7da7-4147-b3f8-12167af6d2f4)
- **变更描述**: 修复 `Popover` 嵌套使用时子元素箭头位置不正确的问题
- **PR**: [#1247](https://github.com/sheinsight/shineout-next/pull/1247)
- **影响组件**: Popover
- **问题原因**: CSS 选择器使用后代选择器 `& $arrow`，导致父级 Popover 的样式规则错误地应用到嵌套的子级 Popover 的箭头上

#### Bug 特征
- Popover 组件嵌套使用时，子级 Popover 的箭头位置受到父级 Popover position 样式影响
- 当父子 Popover 的 position 属性不同时（如父级为 'top'，子级为 'right'），箭头位置显示错误
- 影响复杂嵌套组件场景中的视觉一致性

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Popover position="top" content="父级内容">
  <div>
    <Popover position="right" content="子级内容">
      <button>嵌套触发器</button>
    </Popover>
  </div>
</Popover>
```

#### 排查规则
- 搜索嵌套使用的 Popover 组件
- 搜索在 Popover 内部使用其他包含 Popover 的组件

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复嵌套场景下的样式问题
- 完全向后兼容，无 API 变更
- 提升了嵌套使用时箭头位置的准确性