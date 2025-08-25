# Tabs 组件 3.5.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.5
- 包含 Beta 版本: 3.5.5-beta.1 ~ 3.5.5-beta.7
- 发布日期: 2024-12-24

## 详细变更

### 3.5.5-beta.1
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 修复 Tabs 动态删除末尾的 Tab 时，TabsHeader 没有正确删除的问题 (Regression: since 3.5.3)
- **PR**: [#870](https://github.com/sheinsight/shineout-next/pull/870)
- **影响组件**: Tabs
- **问题原因**: 3.5.3 版本重构后，Panel 卸载时未通知父组件销毁对应的 TabsHeader

#### Bug 特征
- 动态删除 Tab 时，对应的 TabsHeader 仍然显示
- 特别是删除末尾 Tab 时问题更明显
- 导致 Tab 数量与实际 Panel 数量不匹配

**代码模式**：
```tsx
// 容易出现问题的代码结构
const [tabs, setTabs] = useState([...]);

const removeTab = (index) => {
  setTabs(prev => prev.filter((_, i) => i !== index));
};

<Tabs>
  {tabs.map((tab, index) => (
    <Tabs.Panel key={tab.id} title={tab.title}>
      {tab.content}
    </Tabs.Panel>
  ))}
</Tabs>
```

#### 排查规则
- 搜索动态删除 Tab 的代码场景
- 搜索使用数组 map 渲染 Tabs.Panel 的代码

### 3.5.5-beta.6
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 修复 Tabs.Panel 设置动态属性后可能导致的 Tabs.Header 渲染顺序不正确的问题 (Regression: since 3.5.3)
- **PR**: [#882](https://github.com/sheinsight/shineout-next/pull/882)
- **影响组件**: Tabs
- **问题原因**: 3.5.3 版本重构后，动态属性变更时 Panel 插入顺序计算错误

#### Bug 特征
- Tabs.Panel 动态改变属性时，TabsHeader 显示顺序可能错乱
- 影响有条件渲染或动态属性的 Tab 场景
- 导致点击 Header 与实际 Panel 内容不匹配

**代码模式**：
```tsx
// 容易出现问题的代码结构
<Tabs>
  <Tabs.Panel title={dynamicTitle} disabled={dynamicDisabled}>
    内容1
  </Tabs.Panel>
  <Tabs.Panel title="固定标题">
    内容2
  </Tabs.Panel>
</Tabs>
```

#### 排查规则
- 搜索 Tabs.Panel 有动态属性的代码
- 搜索 Panel 属性依赖状态变化的场景

## Breaking Changes

无

## 风险等级

**中**：
- 修复了 3.5.3 版本重构引入的两个重要回归问题
- 完全向后兼容，现有代码无需修改
- 提升了动态 Tab 场景的稳定性和正确性
- 建议使用动态 Tab 的项目尽快升级