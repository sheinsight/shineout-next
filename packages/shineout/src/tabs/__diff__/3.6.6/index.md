# Tabs 组件 3.6.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.6
- 包含 Beta 版本: 3.6.6-beta.1 ~ 3.6.6-beta.7
- 发布日期: 2025-04-30

## 详细变更

### 3.6.6-beta.1
- **变更类型**: 修复问题
- **变更标签**: 样式
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=e021155e-4c3f-4aef-97ff-815a888a74e3](https://shineout-playground.sheincorp.cn/#/playground?code=e021155e-4c3f-4aef-97ff-815a888a74e3)
- **变更描述**: 修复 Tabs.Panel 设置 `background` 非预期影响 button 和 fill 形状样式的问题 (Regression: since 3.6.2)
- **PR**: [#1094](https://github.com/sheinsight/shineout-next/pull/1094)
- **影响组件**: Tabs
- **问题原因**: 3.6.2 版本新增 `background` 属性支持时，未考虑不同 `shape` 模式下的适用性，导致按钮和填充形状的样式受到非预期影响

#### Bug 特征
- 当 Tabs 的 `shape` 为 `button` 或 `fill` 时，设置 `background` 属性会影响预期的按钮样式
- 背景色与按钮形状的默认样式产生冲突
- 影响 button 和 fill 形状 Tabs 的视觉设计一致性

**代码模式**：
```tsx
// 容易出现问题的代码结构
<Tabs shape="button">
  <Tabs.Panel title="按钮1" background="#f0f0f0">
    {/* background 会意外影响按钮形状的样式 */}
    内容1
  </Tabs.Panel>
</Tabs>

<Tabs shape="fill">
  <Tabs.Panel title="填充1" background="#e0e0e0">
    {/* background 会意外影响填充形状的样式 */}
    内容2
  </Tabs.Panel>
</Tabs>
```

#### 排查规则
- 搜索同时使用了 `shape="button"` 或 `shape="fill"` 和 `background` 属性的 Tabs 组件

## Breaking Changes

无

## 风险等级

**低**：
- 修复了回归问题，恢复了预期的样式行为
- 完全向后兼容，现有代码无需修改