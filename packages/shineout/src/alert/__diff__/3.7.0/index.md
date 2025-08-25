# Alert 组件 3.7.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.0
- 包含 Beta 版本: 3.7.0-beta.35
- 发布日期: 2025-06-05

## 详细变更

### 3.7.0-beta.35
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 Alert 只有 title 没有 children 的样式问题
- **PR**: [#1133](https://github.com/sheinsight/shineout-next/pull/1133)
- **影响组件**: Alert
- **问题原因**: 当 Alert 组件只设置了 title 属性而没有 children 内容时，在 confirmwarning 类型下会出现不必要的底边距，导致样式异常

#### Bug 特征
- Alert 组件设置了 title 但没有 children 时，confirmwarning 类型会显示多余的底边距
- 视觉上表现为 Alert 底部有不必要的空白区域
- 仅影响 confirmwarning 类型的 Alert 组件

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Alert
  type="confirmwarning"  // 或 type="error" (会转换为 confirmwarning)
  title="警告标题"
  // 没有 children 内容
/>

<Alert
  type="error"
  title="错误信息"
  // 没有 children
/>
```

#### 排查规则
- 搜索 type="confirmwarning" 且只有 title 没有 children 的 Alert 组件
- 搜索 type="error" 且只有 title 没有 children 的 Alert 组件
- 搜索使用了 title 属性但内容为空的 Alert 组件

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复样式问题，不影响功能
- 只影响特定类型（confirmwarning）的边缘使用场景
- 修复后样式更加符合设计预期

## 版本修复历史

1. **3.7.0-beta.35**：修复 Alert 只有 title 没有 children 的样式问题，通过添加 noChildren 样式类，针对 confirmwarning 类型移除不必要的 marginBottom