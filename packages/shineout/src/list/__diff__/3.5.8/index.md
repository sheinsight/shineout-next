# List 组件 3.5.8 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.8
- 包含 Beta 版本: 3.5.8-beta.1 ~ 3.5.8-beta.17
- 发布日期: 2025-02-13

## 详细变更

### 3.5.8-beta.3
- **变更类型**: 修复问题
- **变更标签**: 样式
- **复现示例**: 无
- **变更描述**: 修复 `List` 组件设置 `size` 属性后选择行的 Checkbox 组件不跟随尺寸的问题
- **PR**: [#929](https://github.com/sheinsight/shineout-next/pull/929)
- **影响组件**: List
- **问题原因**: List 组件在渲染可选择行时，内部的 Checkbox 组件没有正确传递父组件的 `size` 属性，导致尺寸不一致

#### Bug 特征
- List 组件设置 `size` 属性后，内部选择 Checkbox 保持默认尺寸
- 造成组件内部元素尺寸不一致的视觉问题
- 影响设置了 `size="small"` 或 `size="large"` 的可选择 List

**代码模式**：
```jsx
// 容易出现问题的代码结构
<List
  size="small"  // 或 "large"
  data={data}
  keygen="id"
  // 任何有选择功能的 List，Checkbox 尺寸可能不跟随
/>
```

#### 排查规则
- 搜索设置了 `size` 属性且有选择功能的 List 组件

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复视觉一致性问题，不影响功能
- 完全向后兼容，无 API 变更
- 提升了组件内部元素尺寸的一致性