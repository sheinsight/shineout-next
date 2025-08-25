# Textarea 组件 3.7.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.6
- 包含 Beta 版本: 3.7.6-beta.1 ~ 3.7.6-beta.4
- 发布日期: 2025-07-23

## 详细变更

### 3.7.6-beta.1
- **变更类型**: 修复问题
- **变更标签**: 布局
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=e1a4957e-39dd-4b60-b1f0-3b112fce8d6a](https://shineout-playground.sheincorp.cn/#/playground?code=e1a4957e-39dd-4b60-b1f0-3b112fce8d6a)
- **变更描述**: 修复 Textarea 在 flex 容器中使用时，可能存在的内部 textarea 元素与外部容器高度不一致的问题
- **PR**: [#1229](https://github.com/sheinsight/shineout-next/pull/1229)
- **影响组件**: Textarea
- **问题原因**: 内部 textarea 元素缺少 `height: 100%` 样式，在 flex 容器中无法正确填充父容器高度

#### Bug 特征
- Textarea 组件在 flex 容器中使用时，内部输入区域高度异常
- 外部容器与内部 textarea 元素高度不匹配
- 特别是在 flex 布局中设置了 `flex: 1` 或固定高度时问题更明显
- 影响现代 CSS 布局的兼容性

**代码模式**：
```tsx
// 容易出现问题的代码结构
<div style={{ display: 'flex', flexDirection: 'column', height: '300px' }}>
  <div>标题</div>
  <Textarea style={{ flex: 1 }} />
  {/* 修复前：内部 textarea 元素无法填满父容器高度 */}
</div>

// 固定高度的 flex 容器
<div style={{ display: 'flex', height: '200px' }}>
  <Textarea style={{ width: '100%' }} />
  {/* 修复前：高度可能不匹配 */}
</div>
```

#### 排查规则
- 搜索在 flex 容器中使用的 Textarea 组件
- 搜索设置了 `flex: 1` 或固定高度的 Textarea

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复样式显示问题，无功能变更
- 完全向后兼容，现有代码无需修改