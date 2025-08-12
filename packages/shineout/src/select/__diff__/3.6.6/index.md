# Select 组件 3.6.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.6
- 包含 Beta 版本: 3.6.6-beta.1 ~ 3.6.6-beta.7
- 发布日期: 2025-05-09

## 详细变更

### 3.6.6-beta.3
- **变更类型**: 功能增强
- **复现示例**: 无
- **变更描述**: `Select` 增强 `compressed` 属性，新增 `hide-popover` 模式隐藏合并后的选项，仅展示合并数量
- **PR**: [#1098](https://github.com/sheinsight/shineout-next/pull/1098)
- **影响组件**: Select
- **问题原因**: 原有的 compressed 只能显示合并弹出层，某些场景需要更简洁的展示

### 3.6.6-beta.4
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 结果框高度不继承的问题
- **PR**: [#1105](https://github.com/sheinsight/shineout-next/pull/1105)
- **影响组件**: Select
- **问题原因**: CSS 样式继承链断裂，导致设置的高度无法正确应用到结果框

#### Bug 特征
- 通过 style 或 className 设置了 Select 的高度
- 结果框（输入框部分）的高度没有跟随变化
- 导致视觉上的不一致

**代码模式**：
```jsx
// 高度继承问题
<Select
  style={{ height: 48 }}
  className="custom-height"
  data={data}
  // 期望结果框也是 48px 高，但实际可能是默认高度
/>
```

#### 排查规则
- 搜索设置了 `style.height` 且值不等于默认高度（32px）的 Select
- 搜索通过 `className` 设置高度且位于 Table.Column 或 List.Item 内的 Select
- 搜索同时设置了 `size` 和自定义 `style.height` 的 Select
- 搜索位于 Row/Col 栅格布局内且设置了 `style.height` 或 `className` 的 Select

## Breaking Changes

无

## 风险等级

**低**：
- compressed 增强为向后兼容的改进
- 高度继承修复恢复了预期行为
- 不影响现有功能

## 版本修复历史

1. **3.6.6-beta.3**：增强 compressed 属性，新增 hide-popover 模式
2. **3.6.6-beta.4**：修复结果框高度不继承的问题