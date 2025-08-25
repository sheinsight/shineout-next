# List 组件 3.7.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.0
- 包含 Beta 版本: 3.7.0-beta.1 ~ 3.7.0-beta.44
- 发布日期: 2025-06-05

## 详细变更

### 3.7.0-beta.35
- **变更类型**: 新增功能
- **变更标签**: 传参
- **复现示例**: 无
- **变更描述**: List 组件新增 `loadingPosition` 属性，支持在列表底部显示加载图标
- **PR**: [#1134](https://github.com/sheinsight/shineout-next/pull/1134)
- **影响组件**: List
- **问题原因**: 无

#### 功能特征
- 新增 `loadingPosition` 属性，支持 `'center'`（默认）和 `'bottom'` 两个值
- 当设置为 `'bottom'` 时，加载图标将显示在列表底部
- 主要用于滚动加载场景，提供更好的用户体验
- 当 `fixed=true`（虚拟列表模式）时，`'bottom'` 位置无效

**代码模式**：
```jsx
// 新功能使用示例
<List
  bordered
  data={data}
  loading={loading}
  loadingPosition="bottom"  // 新增属性
  scrollLoading={scrollLoading}
  renderItem={renderItem}
/>
```

## Breaking Changes

无

## 风险等级

**低**：
- 新增可选属性，完全向后兼容
- 默认行为保持不变，现有代码无需修改
- 仅增强了加载状态的显示灵活性