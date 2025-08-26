# Transfer 组件 3.6.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.1
- 包含 Beta 版本: 3.6.1-beta.1 ~ 3.6.1-beta.7
- 发布日期: 2025-03-24

## 详细变更

### 3.6.1-beta.1
- **变更类型**: 修复问题
- **变更标签**: 布局
- **复现示例**: https://shineout-playground.sheincorp.cn/#/playground?code=d321839d-6d07-4023-adc3-540ff4f1be0d
- **变更描述**: 修复 renderFilter 导致左右面板高度不一致问题
- **PR**: [#1008](https://github.com/sheinsight/shineout-next/pull/1008)
- **影响组件**: Transfer
- **问题原因**: 原代码使用一次性的 useLayoutEffect 来设置面板高度，在自定义过滤器导致布局变化时无法动态响应容器尺寸变化

#### Bug 特征
- 当 Transfer 组件设置了 renderFilter 属性时，左右两个面板的高度可能不一致
- 主要影响使用了自定义过滤器渲染函数的 Transfer 组件
- 在容器尺寸动态变化的场景下，面板高度计算不准确
- 可能导致视觉上的不对称和用户体验问题

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Transfer
  data={data}
  renderFilter={(props) => {
    return <CustomFilter {...props} />;
  }}
/>
```

#### 排查规则
- 搜索使用了 renderFilter 属性的 Transfer 组件
- 搜索在弹窗、抽屉或可调整大小容器中使用的 Transfer 组件
- 搜索涉及动态布局或响应式设计的 Transfer 使用场景

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复布局计算问题，不涉及 API 变更
- 完全向后兼容，现有代码无需修改
- 主要提升用户体验和视觉一致性