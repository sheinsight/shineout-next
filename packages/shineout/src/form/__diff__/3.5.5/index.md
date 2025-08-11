# Form 组件 3.5.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.5
- 包含 Beta 版本: 3.5.5-beta.1 ~ 3.5.5-beta.2
- 发布日期: 2024-12-24

## 变更概要

本版本修复了一个 Form 中 Input 组件的 trim 功能在回车提交时失效的问题。

## 详细变更

### Bug 修复

#### 3.5.5-beta.2
- **修复问题**: Form 在按回车提交表单时表单中 Input 的 trim 功能失效的问题
- **PR**: [#871](https://github.com/sheinsight/shineout-next/pull/871)
- **影响组件**: Form / Input
- **问题原因**: 回车提交时的事件处理顺序导致 trim 没有正确执行

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-form/use-form.ts`

### 关键改动

在表单提交处理函数中添加了 blur/focus 逻辑：
```javascript
// 修改前：直接进行表单校验和提交
const handleSubmit = async () => {
  // ... 直接校验和提交
}

// 修改后：提交前先触发 blur，提交后恢复 focus
const handleSubmit = async () => {
  const activeEl = document.activeElement as HTMLElement;
  if (activeEl) activeEl.blur();  // 触发 Input 的 onBlur，执行 trim
  
  // ... 校验和提交
  
  if (activeEl) activeEl.focus(); // 提交后恢复焦点
}
```

**问题原因**：
- Input 的 trim 逻辑在 onBlur 事件中执行
- 点击提交按钮时，Input 自然失焦，触发 onBlur，trim 正常执行
- 按回车键提交时，Input 保持焦点，不触发 onBlur，trim 未执行
- 修复方案：在提交前主动触发 blur，确保 trim 执行

## 受影响的使用场景

### 场景 1: 使用回车键提交带 trim 的 Input（核心问题）
**检查点**: 查 Form 中使用了 trim 属性的 Input，并通过回车键提交的场景

**实际复现代码**：
```jsx
// 用户报告的问题代码
<Form onSubmit={(v) => console.log(v)}>
  <Input name='name' trim />
  <Form.Submit>Submit</Form.Submit>
  <Form.Reset>Reset</Form.Reset>
</Form>

// 复现步骤：
// 1. 在 Input 中输入 "  test  "（前后有空格）
// 2. 按回车键提交（不是点击 Submit 按钮）
// 3. 问题：提交的值是 "  test  "，而不是期望的 "test"
// 4. 注意：点击 Submit 按钮提交是正常的

```

**问题特征**：
- 必须同时满足：使用 trim 属性 + 回车键提交
- 点击提交按钮不受影响

### 场景 2: 多个 Input 都使用 trim
**检查点**: 查多个 Input 字段都需要 trim 的表单
```jsx
// 需要检查的代码模式
<Form onSubmit={handleSubmit}>
  <Input name="firstName" trim placeholder="名" />
  <Input name="lastName" trim placeholder="姓" />
  <Input name="email" trim placeholder="邮箱" />
  <Form.Submit>提交</Form.Submit>
</Form>

// 3.5.5 之前：任意输入框按回车提交，所有 trim 都不生效
```

### 场景 3: 搜索框场景
**检查点**: 查单个搜索输入框使用 trim 的场景
```jsx
// 需要检查的代码模式
<Form onSubmit={handleSearch}>
  <Input 
    name="keyword" 
    trim
    placeholder="输入关键词搜索..."
  />
  {/* 用户习惯按回车搜索，而不是点击按钮 */}
  <Form.Submit>搜索</Form.Submit>
</Form>
```

## Breaking Changes

无破坏性变更

## 风险等级

**低风险** - 修复了特定场景下的功能缺陷，不会影响现有正常功能