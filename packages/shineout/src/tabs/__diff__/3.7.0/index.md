# Tabs 组件 3.7.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.0
- 包含 Beta 版本: 3.7.0-beta.1 ~ 3.7.0-beta.44
- 发布日期: 2025-06-05

## 详细变更

### 3.7.0-beta.8
- **变更类型**: 新增功能
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: Tabs 新增 `renderTabsHeader` 属性，支持自定义渲染头部内容
- **PR**: [#1075](https://github.com/sheinsight/shineout-next/pull/1075)
- **影响组件**: Tabs
- **问题原因**: 扩展组件功能，满足更复杂的头部区域定制需求

#### 新增特性
- 新增 `renderTabsHeader` 函数类型属性
- 支持完全自定义头部区域的渲染逻辑
- 同时支持 sticky 和非 sticky 模式的自定义渲染
- 提供原始头部节点和组件属性作为回调参数

**代码模式**：
```tsx
// 新功能使用示例
<Tabs 
  renderTabsHeader={(header, props) => (
    <div className="custom-header-wrapper">
      {header}
      <div className="extra-actions">
        <button>添加标签</button>
        <button>设置</button>
      </div>
    </div>
  )}
>
  <Tabs.Panel title="标签1">内容1</Tabs.Panel>
  <Tabs.Panel title="标签2">内容2</Tabs.Panel>
</Tabs>

// 支持 sticky 模式
<Tabs 
  sticky
  renderTabsHeader={(header, props) => (
    <div className="sticky-custom-header">
      {header}
      <span className="page-title">页面标题</span>
    </div>
  )}
>
  <Tabs.Panel title="标签1">内容1</Tabs.Panel>
</Tabs>
```

## Breaking Changes

无

## 风险等级

**低**：
- 新增功能属性，完全向后兼容
- 现有代码无需修改，提供了更强大的定制能力
- 为复杂的头部布局需求提供了完整的解决方案