# Dropdown 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.30
- 发布日期: 2025-03-21

## 详细变更

### 3.6.0-beta.6
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `Dropdown` 组件新增 `shape` 属性，与 `Button` 组件的 shape 属性保持一致，支持设置占位按钮的形状样式
- **PR**: [#925](https://github.com/sheinsight/shineout-next/pull/925)
- **影响组件**: Dropdown
- **实现说明**: 
  - 新增 `shape` 属性，类型为 `ButtonShape`，支持 `circle`、`round` 等 Button 组件支持的形状
  - 该属性通过 `Pick<ButtonProps, 'shape'>` 直接继承自 Button 组件
  - 内部实现中将 `shape` 属性传递给 Button 组件的 `shape` 属性
  - 配合 `hideArrow` 属性使用时，可以创建无箭头的圆形按钮等样式

**代码模式**：
```jsx
// 新增功能示例 - 圆形下拉按钮
<Dropdown 
  data={data} 
  placeholder={<Icon />} 
  shape="circle" 
  hideArrow 
/>

// 新增功能示例 - 圆角下拉按钮
<Dropdown 
  data={data} 
  placeholder="选择项目" 
  shape="round" 
/>
```

## Breaking Changes

无

## 风险等级

**低**：
- 新增可选属性，不影响现有代码的正常运行
- 向后兼容，现有 Dropdown 组件使用不受影响
- 仅在主动使用新增的 `shape` 属性时才会应用新样式

## 版本修复历史

1. **3.6.0-beta.6**：新增 `shape` 属性功能，支持设置占位按钮的形状样式，与 Button 组件保持一致
2. **后续版本**：无相关修复或调整