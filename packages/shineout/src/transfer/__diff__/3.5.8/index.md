# Transfer 组件 3.5.8 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.8
- 包含 Beta 版本: 3.5.8-beta.1 ~ 3.5.8-beta.17
- 发布日期: 2025-02-13

## 详细变更

### 3.5.8-beta.4
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 修复 renderFilter 内部获取不到外部数据的问题
- **PR**: [#932](https://github.com/sheinsight/shineout-next/pull/932)
- **影响组件**: Transfer
- **问题原因**: renderFilter 函数的依赖项缺失，导致内部无法获取到最新的外部状态数据

#### Bug 特征
- 当 Transfer 组件使用自定义 renderFilter 时，过滤器内部无法获取到组件的最新状态
- 特别是在外部数据变化时，过滤器仍使用旧的数据进行渲染
- 影响自定义过滤器的数据准确性和交互体验

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Transfer
  data={dynamicData}
  renderFilter={(filterProps) => {
    // 这里可能获取不到最新的 dynamicData
    return <CustomFilter {...filterProps} />;
  }}
/>
```

#### 排查规则
- 搜索使用了 renderFilter 自定义过滤器的 Transfer 组件
- 搜索依赖外部动态数据的 Transfer 过滤器实现

### 3.5.8-beta.4
- **变更类型**: 修复问题
- **变更标签**: 类型
- **复现示例**: 无
- **变更描述**: 修复 filterProps 中 isSrouce 错别字为 isSource
- **PR**: [#932](https://github.com/sheinsight/shineout-next/pull/932)
- **影响组件**: Transfer
- **问题原因**: 类型定义中存在拼写错误，isSrouce 应为 isSource

#### Bug 特征
- 在自定义 renderFilter 时，filterProps 中的属性名拼写错误
- 类型提示和实际使用不一致
- 影响 TypeScript 项目的类型检查

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Transfer
  renderFilter={(filterProps) => {
    const isSource = filterProps.isSrouce; // 拼写错误
    return <div>{isSource ? '源' : '目标'}</div>;
  }}
/>
```

#### 排查规则
- 搜索代码中使用了 isSrouce 属性的地方，需要修改为 isSource
- 搜索自定义过滤器实现中的属性名使用

## Breaking Changes

无

## 风险等级

**低**：
- 主要修复了自定义过滤器的功能问题和类型定义错误
- 错别字修正可能需要更新使用了旧属性名的代码
- 所有修复均向后兼容，提升组件稳定性