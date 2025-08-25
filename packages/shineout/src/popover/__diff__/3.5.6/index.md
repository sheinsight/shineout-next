# Popover 组件 3.5.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.6
- 包含 Beta 版本: 3.5.6-beta.1 ~ 3.5.6-beta.12
- 发布日期: 2025-01-06

## 详细变更

### 3.5.6-beta.11
- **变更类型**: 修复问题
- **变更标签**: 交互
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=65d9ed78-1686-4eef-bceb-af687c5b5e88](https://shineout-playground.sheincorp.cn/#/playground?code=65d9ed78-1686-4eef-bceb-af687c5b5e88)
- **变更描述**: 修复 `Popover` 组件在 `position='left'` 模式下三角箭头和 trigger 元素之间的垫片元素不生效的问题
- **PR**: [#906](https://github.com/sheinsight/shineout-next/pull/906)
- **影响组件**: Popover
- **问题原因**: CSS 样式中使用了错误的定位属性，导致垫片元素定位不正确，无法防止鼠标移出时意外关闭弹层

#### Bug 特征
- Popover 设置 `position='left'` 时，鼠标从触发器移向弹层过程中弹层可能意外关闭
- 垫片元素定位错误，无法覆盖触发器和弹层之间的空隙区域
- 仅影响 `position='left'` 模式，其他位置模式正常

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Popover
  position="left"  // 左侧位置时垫片元素可能不生效
  trigger="hover"
  content="弹出内容"
>
  <button>触发元素</button>
</Popover>
```

#### 排查规则
- 搜索设置了 `position="left"` 的 Popover 组件
- 搜索使用 `trigger="hover"` 且 `position="left"` 的 Popover

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复特定位置模式下的交互问题
- 完全向后兼容，无 API 变更
- 提升了左侧位置 Popover 的用户体验