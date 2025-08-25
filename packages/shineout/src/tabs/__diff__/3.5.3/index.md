# Tabs 组件 3.5.3 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.3
- 包含 Beta 版本: 3.5.3-beta.1 ~ 3.5.3-beta.9
- 发布日期: 2024-12-04

## 详细变更

### 3.5.3 正式版本
- **变更类型**: 新增功能
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: Tabs 新增 `allowNonPanel` 属性，开启后支持渲染非 Tabs.Panel 子组件，例如 Form.FieldSet
- **PR**: [#812](https://github.com/sheinsight/shineout-next/pull/812)
- **影响组件**: Tabs
- **问题原因**: 扩展组件功能，支持更灵活的子组件渲染

#### 新增特性
- 新增 `allowNonPanel` 布尔类型属性
- 支持在 Tabs 中渲染非 Tabs.Panel 的子组件
- 重构数据管理方式，从静态遍历改为动态注册
- 为动态 Tab 功能提供基础支持

**代码模式**：
```tsx
// 新功能使用示例
<Tabs allowNonPanel>
  <Tabs.Panel title="标签1">内容1</Tabs.Panel>
  <Form.FieldSet>
    {/* 现在可以在 Tabs 中直接使用 Form.FieldSet */}
  </Form.FieldSet>
  <div>其他自定义内容</div>
</Tabs>
```

## Breaking Changes

无

## 风险等级

**中**：
- 新增重要功能，扩展了组件的使用场景
- 内部重构了数据管理方式，可能影响现有复杂用法
- 完全向后兼容，但为后续版本的问题修复奠定基础
- 建议充分测试动态 Tab 相关场景