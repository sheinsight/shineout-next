# Spin 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.30
- 发布日期: 2025-02-25

## 详细变更

### 3.6.0-beta.1
- **变更类型**: 文档优化
- **变更标签**: 文档
- **变更描述**: 修改 Spin 组件基本用法示例，将 `chasing-dots` 类型改为 `ring` 类型
- **PR**: [#874](https://github.com/sheinsight/shineout-next/pull/874)
- **影响组件**: Spin
- **问题原因**: 优化默认示例的展示效果

### 3.6.0-beta.9
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=example-spin-classname](https://shineout-playground.sheincorp.cn/#/playground?code=example-spin-classname)
- **变更描述**: 修复 Spin 组件的 `className` 重复设置到 content DOM 节点上的问题
- **PR**: [#970](https://github.com/sheinsight/shineout-next/pull/970)
- **影响组件**: Spin
- **问题原因**: 组件内部逻辑中 `className` 被错误地同时应用到多个 DOM 节点，导致样式类名重复

#### Bug 特征
- Spin 组件的 `className` 属性会被重复设置到多个 DOM 节点上
- 可能导致样式冲突或不期望的样式应用
- 影响组件样式的可控性和预期行为

**代码模式**：
```tsx
// 容易出现问题的代码结构
<Spin className="custom-spin" tip="Loading...">
  <div>内容</div>
</Spin>
```

#### 排查规则
- 搜索为 Spin 组件设置了自定义 `className` 的代码
- 搜索同时使用了 `className` 和 `tip` 属性的 Spin 组件

### 继承变更 (来自 3.5.6-beta.5)
- **变更类型**: 修复问题
- **变更标签**: 样式
- **变更描述**: 修复 Spin 组件的 ring 样式在微前端框架下颜色不继承的问题
- **PR**: [#898](https://github.com/sheinsight/shineout-next/pull/898)
- **影响组件**: Spin
- **问题原因**: `borderColor` 和 `borderTopColor` 分离设置导致在微前端框架下样式继承出现问题

#### Bug 特征
- Spin 组件的 ring 样式在微前端框架下颜色显示异常
- 边框颜色无法正确继承主题色彩
- 影响组件在微前端环境中的视觉表现

#### 排查规则
- 可忽略排查
- 搜索在微前端框架中使用 Spin 组件的代码
- 搜索设置了 `name="ring"` 属性的 Spin 组件

## Breaking Changes

无

## 风险等级

**低**：
- 修复了样式和功能上的缺陷，提升了组件的稳定性
- 完全向后兼容，现有代码无需修改
- 主要改善用户体验和组件的可维护性