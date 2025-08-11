# Form 组件 3.5.4 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.4
- 包含 Beta 版本: 3.5.4-beta.1 ~ 3.5.4-beta.17
- 发布日期: 2024-12-12

## 变更概要

本版本修复了两个重要问题：Form.FieldSet 使用 set 方法后的光标失焦问题（3.5.3 引入的回归），以及 Form 嵌套 Form 的提交和重置行为。

## 详细变更

### Bug 修复

#### 3.5.4-beta.3
- **修复问题**: Form.FieldSet 使用 set 方法设置后，输入文本后光标失焦的问题 (Regression: since v3.5.3)
- **PR**: [#851](https://github.com/sheinsight/shineout-next/pull/851)
- **影响组件**: Form.FieldSet
- **问题原因**: 3.5.3 的改动导致使用 formRef.set 更新 FieldSet 数据后，输入框会失去焦点

#### 3.5.4-beta.2
- **修复问题**: Form 嵌套 Form 的提交和重置行为
- **PR**: [#849](https://github.com/sheinsight/shineout-next/pull/849)
- **影响组件**: Form
- **问题原因**: 嵌套表单的事件冒泡处理不当，导致内层表单的提交/重置会影响外层表单

## 代码变更分析

### 关键改动

1. **FieldSet 光标失焦修复**：
   - 问题源于 3.5.3 中对 FieldSet 更新逻辑的优化
   - 修复了 set 方法触发的重新渲染导致的焦点丢失

2. **嵌套表单事件处理**：
   - 改进了表单事件的冒泡控制
   - 确保内层表单的操作不会意外触发外层表单

## 受影响的使用场景

### 场景 1: Form.Field/FieldSet 中自定义组件使用 onChange 更新表单值（核心问题）

**Bug 特征**（基于实际复现代码）：
- 使用 `Form.Field` 或 `Form.FieldSet` 包装自定义输入组件
- 自定义组件内部通过 `onChange` 属性更新表单值
- 每次输入触发 onChange 时，组件重新渲染导致输入框失焦
- 3.5.3 版本引入的回归问题

**实际问题代码模式**：
```jsx
// 复现代码的核心模式
const NameInput = (props) => {
  const { value, onChange } = props;
  const { name } = value || {};
  
  const handleChange = (v) => {
    onChange({ name: v });  // 每次调用会导致重渲染和失焦
  };
  
  return <Input value={name} onChange={handleChange} />;
};

<Form value={initValue}>
  <Form.Field name="user">
    <NameInput />  // 自定义组件在 onChange 时失焦
  </Form.Field>
</Form>
```

**检查点**：
- 搜索 `Form.Field` 或 `Form.FieldSet` 包装的自定义组件
- 检查自定义组件是否在 onChange 中调用 props.onChange 更新值
- 重点关注嵌套对象的更新模式（如 `onChange({ field: value })`）
- 验证输入时是否有失焦问题（需要重新点击才能继续输入）

### 场景 2: 使用 formRef.set 动态更新表单数据

**Bug 特征**：
- 使用 `formRef.set` 更新 Form.FieldSet 管理的数据
- 在输入过程中（onChange 事件）调用 set 方法
- 导致正在编辑的输入框失去焦点

**检查点**：
- 搜索 `formRef.set` 或 `form.set` 在 onChange 事件中的使用
- 检查是否在输入过程中更新 FieldSet 的整体数据
- 重点关注实时联动更新的场景（输入一个字段影响其他字段）

### 场景 3: Form 嵌套 Form

**Bug 特征**：
- 一个 Form 组件内部包含另一个 Form 组件
- 内层表单的提交/重置事件会冒泡到外层表单
- 导致外层表单意外被触发提交或重置

**检查点**：
- 搜索 `<Form` 标签内部是否还有 `<Form` 标签
- 检查 Modal、Drawer 等弹出层中是否有独立表单
- 验证内层表单操作是否会影响外层表单
- 关注表单分步、表单嵌套等复杂场景

### 场景 4: Modal/Drawer 中的嵌套表单

**Bug 特征**：
- 主表单中包含 Modal 或 Drawer
- Modal/Drawer 内部有独立的 Form 组件
- 弹出层中的表单操作可能影响主表单

**检查点**：
- 搜索 Modal、Drawer 组件内部的 Form 使用
- 验证弹出层表单提交是否会触发主表单提交
- 检查弹出层关闭时的表单数据处理

## Breaking Changes

无破坏性变更，但修复了 3.5.3 引入的回归问题

## 风险等级

**中风险** - 特别是对于从 3.5.3 升级的用户：

1. **高优先级修复**（3.5.3 的回归）：
   - Form.FieldSet 输入失焦问题严重影响用户体验
   - 如果你的项目在 3.5.3 中遇到此问题，强烈建议升级

2. **中优先级修复**：
   - 嵌套表单的事件处理改进
   - 影响特定的表单嵌套场景