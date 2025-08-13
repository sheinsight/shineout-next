# Cascader 组件 3.6.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.6
- 包含 Beta 版本: 3.6.6-beta.1 ~ 3.6.6-beta.6
- 发布日期: 2025-05-13

## 详细变更

### 3.6.6-beta.4
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select`、`TreeSelect`、`Cascader` 结果框高度不继承的问题
- **PR**: [#1105](https://github.com/sheinsight/shineout-next/pull/1105)
- **影响组件**: Cascader, TreeSelect, Select
- **问题原因**: 组件内部结果框的高度样式未正确继承外部容器设置的高度，导致自定义高度失效

#### Bug 特征
- 通过 style 或 className 设置组件高度
- 结果框（显示选中值的区域）高度未随之改变
- 组件整体高度与预期不符

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  style={{ height: '50px' }}  // 或通过 className 设置高度
  data={data}
  value={value}
/>
```

#### 排查规则
- 搜索通过 `style` 属性设置高度的 Cascader 组件
- 搜索通过自定义 className 控制高度的 Cascader
- 搜索需要特定高度的 Select、TreeSelect、Cascader 组件

## Breaking Changes

无

## 风险等级

**低**：
- 修复了高度继承问题，使组件高度行为更符合预期
- 可能影响依赖原有高度计算的布局

## 版本修复历史

1. **3.6.6-beta.4**：修复结果框高度不继承的问题