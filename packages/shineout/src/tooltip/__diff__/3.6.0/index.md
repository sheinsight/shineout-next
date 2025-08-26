# Tooltip 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.30
- 发布日期: 2025-02-25

## 详细变更

### 3.6.0-beta.26
- **变更类型**: 修复问题
- **变更标签**: 布局
- **复现示例**: 无
- **变更描述**: 修复 Tooltip 在滚动容器中的水平用法下，且不给定宽度时，在靠近窗口右侧弹出层宽度被非预期挤压导致内容换行的问题
- **PR**: [#997](https://github.com/sheinsight/shineout-next/pull/997)
- **影响组件**: Tooltip, Popover
- **问题原因**: 在滚动容器的水平布局中，当提示框接近窗口边缘时宽度计算逻辑存在缺陷

#### Bug 特征
- Tooltip 在滚动容器中使用水平定位时宽度异常
- 特别是在靠近窗口右侧时，提示框宽度被意外压缩
- 导致原本单行显示的内容被强制换行
- 影响用户体验和内容可读性

**代码模式**：
```tsx
// 容易出现问题的代码结构
<div style={{ overflow: 'auto', width: '100%' }}>
  <div style={{ width: '2000px', display: 'flex' }}>
    <Tooltip tip="这是一个很长的提示内容，应该保持在一行显示" position="top">
      <Button style={{ marginLeft: '1800px' }}>靠近右边的按钮</Button>
    </Tooltip>
  </div>
</div>
```

#### 排查规则
- 搜索在滚动容器中使用的 Tooltip 组件
- 搜索使用了水平定位（left/right）的 Tooltip

### 3.6.0-beta.27
- **变更类型**: 新增功能
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: Tooltip 新增 `showArrow` 属性，用于控制是否显示箭头
- **PR**: [#998](https://github.com/sheinsight/shineout-next/pull/998)
- **影响组件**: Tooltip
- **问题原因**: 扩展组件功能，满足不同视觉设计需求

#### 新增特性
- 新增 `showArrow` 布尔类型属性，默认为 `true`
- 支持隐藏提示框的箭头指示器
- 适用于需要简洁视觉效果的场景
- 保持与现有设计的向后兼容性

**代码模式**：
```tsx
// 隐藏箭头的简洁样式
<Tooltip tip="无箭头的提示" showArrow={false}>
  <Button>简洁提示</Button>
</Tooltip>

// 默认显示箭头（现有行为）
<Tooltip tip="有箭头的提示">
  <Button>标准提示</Button>
</Tooltip>

// 显式控制箭头显示
<Tooltip tip="明确显示箭头" showArrow={true}>
  <Button>明确提示</Button>
</Tooltip>
```

## Breaking Changes

无

## 风险等级

**低**：
- 修复了布局兼容性问题，改善了滚动容器中的显示效果
- 新增功能属性，完全向后兼容
- 现有代码无需修改，可选择性使用新功能
- 提升了组件在复杂布局场景下的稳定性