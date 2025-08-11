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

**Bug 特征**：
- Input 组件设置了 `trim` 属性
- 表单支持回车键提交（有 `onSubmit` 处理函数）
- trim 逻辑依赖 onBlur 事件，但回车提交时 Input 保持焦点不触发 onBlur
- 导致提交的数据包含前后空格，影响数据质量

**检查点**：
- 查找所有使用 `trim` 属性的 Input 组件：`<Input[^>]*\btrim\b`
- 重点排查单字段表单、搜索框、登录表单等常用回车提交的场景
- 检查提交数据的后续处理是否依赖去除空格后的值（如唯一性校验、数据匹配）

### 场景 2: 多字段表单的 trim 失效

**Bug 特征**：
- 表单中多个 Input 字段都使用 `trim` 属性
- 用户在任意输入框按回车提交，所有字段的 trim 都失效
- 数据库可能存储了带空格的数据，影响后续数据匹配和唯一性校验

**检查点**：
- 查找同一表单内多个 Input 使用 trim 的情况
- 重点检查用户信息表单、注册表单、配置表单等需要精确数据的场景
- 关注数据唯一性要求高的字段（如用户名、邮箱、手机号）

### 场景 3: 搜索框场景（最常见）

**Bug 特征**：
- 搜索输入框使用 `trim` 属性
- 用户习惯按回车键搜索（而非点击搜索按钮）
- 搜索词前后空格导致搜索结果不准确或触发重复请求
- 可能同时设置了 `onEnterPress` 处理函数

**检查点**：
- 查找文件名或函数名包含 search、filter 的组件
- 查找 placeholder 包含"搜索"、"查询"、"关键词"的 Input
- 检查搜索请求的去重逻辑是否考虑了空格问题
- 验证搜索历史记录是否会保存带空格的关键词

## Breaking Changes

无破坏性变更

## 风险等级

**低风险** - 修复了特定场景下的功能缺陷，不会影响现有正常功能