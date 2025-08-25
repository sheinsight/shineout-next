# Card 组件 3.6.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.1
- 包含 Beta 版本: 3.6.1-beta.1 ~ 3.6.1-beta.7 
- 发布日期: 2025-03-31

## 详细变更

### 3.6.1-beta.8
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Card.Header` 和 `Card.Footer` 在未开启 `moveable` 属性时不可选中文本的问题
- **PR**: [#1022](https://github.com/sheinsight/shineout-next/pull/1022)
- **影响组件**: Card.Header, Card.Footer
- **问题原因**: 当 Card 未开启 `moveable` 属性时，Header 和 Footer 组件仍然绑定了 `handleDragMouseDown` 事件处理器，该事件处理器会阻止默认的文本选择行为，导致用户无法选中 Header 和 Footer 区域内的文本内容

#### Bug 特征
- Card.Header 和 Card.Footer 区域内的文本无法被鼠标选中
- 问题仅在未设置 `moveable={true}` 属性时出现
- 影响所有包含文本内容的 Header 和 Footer 场景

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Card>
  <Card.Header>这里的文本无法选中</Card.Header>
  <Card.Body>正常内容</Card.Body>
  <Card.Footer>这里的文本也无法选中</Card.Footer>
</Card>

// 或者显式未开启moveable
<Card moveable={false}>
  <Card.Header>无法选中的标题文本</Card.Header>
  <Card.Body>正常内容</Card.Body>
</Card>
```

#### 排查规则
- 搜索未设置 `moveable` 属性或 `moveable={false}` 的 Card 组件
- 搜索包含 Card.Header 或 Card.Footer 且其中包含文本内容的组件
- 搜索用户反馈文本无法选中的 Card 相关问题

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复文本选择的交互问题，不影响组件核心功能
- 修复范围仅限于未开启 moveable 属性的场景
- 不会对现有代码逻辑产生破坏性影响

## 版本修复历史

1. **3.6.1-beta.8**：修复 Card.Header 和 Card.Footer 在未开启 moveable 属性时不可选中文本的问题