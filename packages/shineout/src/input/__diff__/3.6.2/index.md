# Input 组件 3.6.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.2
- 包含 Beta 版本: 3.6.2-beta.1 ~ 3.6.2-beta.6
- 发布日期: 2025-04-08

## 详细变更

### 3.6.2-beta.2
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 修复 `Input.Group` 属性 `seperate` 默认不生效的问题
- **PR**: [#1029](https://github.com/sheinsight/shineout-next/pull/1029)
- **影响组件**: Input.Group
- **问题原因**: `seperate` 属性的默认值逻辑存在问题，导致默认行为不符合预期

#### Bug 特征
- Input.Group 组件的 `seperate` 属性默认值行为异常
- 默认情况下边框分离状态与预期不符
- 影响依赖默认行为的 Input.Group 使用场景

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Input.Group>
  <Input />
  <Input />
  // seperate 默认行为可能不符合预期
</Input.Group>
```

#### 排查规则
- 可忽略排查
- 搜索使用了 `Input.Group` 且未显式设置 `seperate` 属性的代码
- 搜索依赖 Input.Group 默认边框行为的场景

### 3.6.2-beta.6
- **变更类型**: 修复问题
- **变更标签**: 样式
- **复现示例**: 无
- **变更描述**: 修复 `Input.Group` 的 `seperate` 在一些组合场景下的样式问题
- **PR**: 无
- **影响组件**: Input.Group
- **问题原因**: 在特定的组合场景下（如与 Button、Select 等组件混合使用时），`seperate` 样式渲染不正确

#### Bug 特征
- Input.Group 在复杂组合场景下边框样式异常
- 与其他组件（Button、Select等）混合使用时样式问题
- 影响 `seperate` 属性的视觉效果

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Input.Group seperate>
  <Input />
  <Button />  // 与其他组件组合时可能出现样式问题
</Input.Group>
```

#### 排查规则
- 搜索 `Input.Group` 中混合使用其他组件（Button、Select等）的代码
- 搜索设置了 `seperate` 属性的 Input.Group 组合

## Breaking Changes

**潜在破坏性变更**：
- `Input.Group` 的 `seperate` 属性默认值从 `true` 改为 `false`
- 如果代码依赖默认的边框分离行为，需要显式设置 `seperate={true}`

## 风险等级

**中**：
- 包含默认行为变更，可能影响依赖默认值的现有代码
- 修复了组合场景下的样式问题，提升视觉一致性
- 引入了 API 规范化（`separate` 替代 `seperate`），但保持向后兼容