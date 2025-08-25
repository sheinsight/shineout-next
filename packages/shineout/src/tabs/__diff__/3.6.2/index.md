# Tabs 组件 3.6.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.2
- 包含 Beta 版本: 3.6.2-beta.1 ~ 3.6.2-beta.6
- 发布日期: 2025-03-31

## 详细变更

### 3.6.2-beta.1
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 修复 Tabs.Panel 设置 `background` 属性失效的问题
- **PR**: [#1028](https://github.com/sheinsight/shineout-next/pull/1028)
- **影响组件**: Tabs
- **问题原因**: 组件缺少对 `background` 属性的支持和处理逻辑

#### Bug 特征
- Tabs.Panel 组件无法正确应用 `background` 属性
- 设置背景色不生效，影响样式定制能力
- 缺少相关类型定义和实现逻辑

**代码模式**：
```tsx
// 修复前无法正常工作的代码结构
<Tabs>
  <Tabs.Panel title="标签1" background="#f0f0f0">
    {/* background 属性不生效 */}
    内容1
  </Tabs.Panel>
  <Tabs.Panel title="标签2" background="#e0e0e0">
    内容2
  </Tabs.Panel>
</Tabs>
```

#### 排查规则
- 搜索使用了 `background` 属性的 Tabs.Panel 组件

## Breaking Changes

无

## 风险等级

**低**：
- 现有代码无需修改