# Carousel 组件 3.7.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.0
- 包含 Beta 版本: 3.7.0-beta.1 ~ 3.7.0-beta.46
- 发布日期: 2025-06-12

## 详细变更

### 3.7.0-beta.37
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: Carousel 新增 `showIndicator` 属性支持隐藏指示器，新增 `itemClassName` 属性支持设置轮播项 className
- **PR**: [#1136](https://github.com/sheinsight/shineout-next/pull/1136)
- **影响组件**: Carousel

### 3.7.0-beta.38
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 Carousel 自定义指示器时，轮播数量为1条时不渲染的问题
- **PR**: [#1139](https://github.com/sheinsight/shineout-next/pull/1139)
- **影响组件**: Carousel
- **问题原因**: 原逻辑在轮播数量为1条时，无论指示器类型如何都不会渲染指示器，导致自定义指示器函数无法正常工作

#### Bug 特征
- 当轮播数量为1条且使用自定义指示器函数时，指示器不显示
- 影响使用函数类型 `indicatorType` 的场景

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Carousel
  indicatorType={(current, moveTo) => <CustomIndicator />}
>
  <div>单个轮播项</div>
</Carousel>
```

#### 排查规则
- 搜索使用自定义 `indicatorType` 函数的 Carousel 组件
- 搜索只有单个子元素的 Carousel 组件
- 搜索 `indicatorType={function}` 模式

## Breaking Changes

无

## 风险等级

**低**：
- 新增功能完全向后兼容
- Bug 修复仅影响特定边缘场景
- 不会破坏现有代码

## 版本修复历史

1. **3.7.0-beta.37**：新增 `showIndicator` 和 `itemClassName` 属性
2. **3.7.0-beta.38**：修复自定义指示器在单项轮播时的渲染问题