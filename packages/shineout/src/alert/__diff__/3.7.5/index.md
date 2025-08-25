# Alert 组件 3.7.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.5
- 包含 Beta 版本: 3.7.5-beta.1 ~ 3.7.5-beta.11
- 发布日期: 2025-07-04

## 详细变更

### 3.7.5-beta.10
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 Alert 传入空字符串 title 属性也能渲染结构的问题
- **PR**: [#1225](https://github.com/sheinsight/shineout-next/pull/1225)
- **影响组件**: Alert
- **问题原因**: 组件在判断是否渲染 title 结构时，使用了 `'title' in props && title !== undefined` 的条件，这导致当 title 为空字符串 `""` 时仍会被认为是有效值而渲染相应的 DOM 结构，但实际上空字符串应该被视为无内容不渲染

#### Bug 特征
- Alert 组件传入空字符串 `title=""` 时，仍然会渲染包含 title 的 DOM 结构
- 渲染的结构中 title 部分显示为空白，但仍占用空间和样式
- 影响组件的布局和样式表现，可能导致不必要的间距或结构

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Alert
  title=""  // 空字符串 title 导致渲染问题
  type="warning"
>
  Alert content
</Alert>

// 或者动态传入可能为空字符串的 title
<Alert
  title={someVariable}  // someVariable 可能为 ""
  type="info"
>
  Alert message
</Alert>
```

#### 排查规则
- 搜索 Alert 组件中传入空字符串 title 的使用
- 搜索动态传入 title 属性且值可能为空字符串的 Alert 组件
- 搜索代码模式: `<Alert.*title\s*=\s*["']["']` (直接传入空字符串)
- 搜索代码模式: `<Alert.*title\s*=\s*\{[^}]*\}` (动态传入需检查变量值)

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复特定边缘场景问题（传入空字符串 title）
- 不影响正常使用场景的功能
- 修复后行为更符合预期（空字符串不渲染结构）
- 对于之前依赖空字符串渲染结构的代码可能有轻微影响，但这种依赖本身不合理

## 版本修复历史

1. **3.7.5-beta.10**：修复 Alert 传入空字符串 title 属性也能渲染结构的问题，将判断条件从 `'title' in props && title !== undefined` 改为简单的 `title` 真值判断