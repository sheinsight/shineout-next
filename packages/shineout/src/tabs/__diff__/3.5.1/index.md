# Tabs 组件 3.5.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.1
- 包含 Beta 版本: 3.5.1-beta.1 ~ 3.5.1-beta.6
- 发布日期: 2024-11-14

## 详细变更

### 3.5.1-beta.1
- **变更类型**: 修复问题
- **变更标签**: 样式
- **复现示例**: 无
- **变更描述**: 修复 Tabs 折叠用法下，折叠面板后 Tabs.Panel 内容溢出展示的问题
- **PR**: [#794](https://github.com/sheinsight/shineout-next/pull/794)
- **影响组件**: Tabs
- **问题原因**: 折叠动画过程中缺少 `overflow: 'hidden'` 样式，导致内容在折叠期间溢出显示

#### Bug 特征
- Tabs 折叠动画时，Panel 内容会在折叠过程中溢出显示
- 影响折叠动画的视觉效果和用户体验
- 主要在使用折叠功能的 Tabs 组件中出现

**代码模式**：
```tsx
// 容易出现问题的代码结构
<Tabs collapsible>
  <Tabs.Panel title="标签1">
    <div>内容会在折叠时溢出显示</div>
  </Tabs.Panel>
</Tabs>
```

#### 排查规则
- 搜索使用了 `collapsible` 属性的 Tabs 组件

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复样式显示问题，不影响功能逻辑
- 完全向后兼容，现有代码无需修改
- 改善了折叠动画的视觉表现