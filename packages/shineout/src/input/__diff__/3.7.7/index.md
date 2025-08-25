# Input 组件 3.7.7 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.7
- 包含 Beta 版本: 3.7.7-beta.1 ~ 3.7.7-beta.9
- 发布日期: 2025-07-18

## 详细变更

### 3.7.7-beta.3
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=79b3785a-66aa-4306-bd36-95963a9daa96](https://shineout-playground.sheincorp.cn/#/playground?code=79b3785a-66aa-4306-bd36-95963a9daa96)
- **变更描述**: 修复 `Input` 组件的 `autoSelect` 属性在某些场景下无法自动选中所有文本的问题
- **PR**: [#1245](https://github.com/sheinsight/shineout-next/pull/1245)
- **影响组件**: Input
- **问题原因**: 当用户在文字上悬停后立即点击输入框时，`select()` 方法与浏览器原生的光标定位逻辑产生竞争条件，导致只能选中部分文本而不是全部文本

#### Bug 特征
- Input 组件设置 `autoSelect` 属性后，在特定交互场景下无法选中所有文本
- 特别在鼠标悬停文字后立即点击的场景下更容易触发
- 只能选中部分文本而不是全部文本

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Input
  autoSelect
  defaultValue="一些文本内容"
  // 鼠标悬停文字后立即点击时可能无法完全选中
/>
```

#### 排查规则
- 搜索设置了 `autoSelect` 属性的 Input 组件

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复 `autoSelect` 属性的特定场景问题
- 完全向后兼容，不涉及 API 变更
- 提升了用户交互体验和组件可靠性