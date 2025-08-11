# Form 组件 3.5.3 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.3
- 包含 Beta 版本: 3.5.3-beta.1 ~ 3.5.3-beta.9
- 发布日期: 2024-12-04

## 变更概要

本版本修复了多个关键问题，包括 onChange 死循环、reserveAble 嵌套字段处理、formRef.set 数组更新等问题，并增强了 formRef 的功能。

## 详细变更

### Bug 修复

#### 3.5.3-beta.9
- **修复问题**: Form 的 onChange 执行多次且数组嵌套字段模式下死循环的问题 (Regression: since v3.4.4, v3.5.2)
- **PR**: [#842](https://github.com/sheinsight/shineout-next/pull/842)
- **影响组件**: Form / Form.Field
- **问题原因**: Form.Field 使用数组 name 时，内部使用 `current(draft)` 获取最新值传递给校验函数时会触发 immer 的追踪机制，导致 onChange 重复触发

#### 3.5.3-beta.6
- **修复问题**: Form 的 reserveAble 属性在处理嵌套字段时，无法保留值的问题
- **PR**: [#834](https://github.com/sheinsight/shineout-next/pull/834)
- **影响组件**: Form
- **问题原因**: reserveAble 对深度嵌套字段的处理逻辑不完整

#### 3.5.3-beta.5
- **修复问题**: Form 的 formRef.set 方法，为某个字段手动设置相同长度的数组值时，无法更新值的问题
- **PR**: [#835](https://github.com/sheinsight/shineout-next/pull/835)
- **影响组件**: Form / Form.FieldSet
- **问题原因**: 数组长度相同时的更新判断逻辑有误

#### 3.5.3-beta.3
- **修复问题**: Form 校验字段为嵌套字段时，自定义校验方法第二参数结构错误的问题
- **PR**: [#829](https://github.com/sheinsight/shineout-next/pull/829)
- **影响组件**: Form
- **问题原因**: 嵌套字段校验时，formData 参数传递不正确

### 功能增强

#### 3.5.3-beta.1
- **增强功能**: Form 的 formRef 新增 validateFieldsWithValue 方法，返回校验值
- **增强功能**: Form 的 formRef 新增 scrollToField 方法，支持根据 name 滚动至指定表单项
- **PR**: [#812](https://github.com/sheinsight/shineout-next/pull/812)

## 代码变更分析

### 关键改动

1. **onChange 死循环修复**：
   - 修改前：先创建 `nextDraft = current(draft)`，再对 nextDraft 进行操作
   - 修改后：直接对 draft 进行操作，仅在校验时使用 `current(draft)` 获取快照
   - 效果：避免了 immer 的追踪机制导致的重复触发

2. **reserveAble 增强**：完善了对嵌套对象字段的处理
3. **formRef.set 改进**：修复了数组值更新的判断逻辑
4. **校验参数修复**：确保嵌套字段校验时传递正确的 formData 结构

## 受影响的使用场景

### 场景 1: Form.Field 使用数组 name 导致 onChange 死循环（最严重问题）

**Bug 特征**：
- Form.Field 使用数组 name：`name={['field1', 'field2']}`
- 表单为受控组件（设置了 value 和 onChange）
- immer 的 `current(draft)` 处理数组 name 时触发追踪机制，导致 onChange 重复执行
- 如果 onChange 中有副作用（API 调用、存储操作），会造成严重性能问题

**检查点**：
- 搜索 `Form.Field` 配合数组 name 的使用：`Form\.Field[^>]*name=\{[`
- 检查 onChange 处理函数中是否有副作用操作（API 调用、localStorage、重计算）
- 重点关注映射到嵌套对象的数组 name（如 `['user.firstName', 'user.lastName']`）
- 验证是否有性能监控告警或用户反馈的卡顿问题

### 场景 2: reserveAble 与嵌套字段

**Bug 特征**：
- 使用 `reserveAble` 属性保留卸载组件的值
- 字段名包含多层嵌套（如 `user.profile.settings.theme`）
- 条件渲染的嵌套字段在隐藏后值丢失

**检查点**：
- 搜索使用 `reserveAble` 的表单
- 查找三层以上嵌套的字段名（包含两个以上的点号）
- 检查条件渲染（`{condition && <Input />}`）配合嵌套字段的场景
- 验证表单切换或步骤切换时数据是否正确保留

### 场景 3: formRef.set 更新相同长度数组失败

**Bug 特征**：
- 使用 `formRef.set` 或 `form.set` 更新数组字段
- 新数组与原数组长度相同但内容不同
- 更新操作不生效，数组内容未改变

**检查点**：
- 搜索 `formRef.set` 或 `form.set` 的使用
- 重点检查批量更新、状态同步、数据刷新等场景
- 验证列表编辑功能中的批量操作是否正常
- 关注 FieldSet 管理的数组数据更新

### 场景 4: 嵌套字段自定义校验的 formData 结构错误

**Bug 特征**：
- Input 的 name 包含点号（嵌套字段）：`name="a.b.c"`
- 自定义校验函数依赖 formData 参数
- formData 结构不正确，导致基于其他字段的联动校验失败

**检查点**：
- 搜索自定义校验函数中使用 formData 参数的场景
- 检查密码确认、条件必填等联动校验逻辑
- 验证嵌套字段的校验规则是否正常工作
- 重点关注跨字段依赖的业务规则校验

### 场景 5: 嵌套 FieldSet 与 onChange

**Bug 特征**：
- 多层嵌套的 Form.FieldSet
- 受控组件模式（value + onChange）
- 可能触发 onChange 死循环或重复执行

**检查点**：
- 搜索嵌套使用 Form.FieldSet 的场景
- 检查复杂表单结构中的性能问题
- 验证数据更新的正确性和触发次数

### 场景 6: 新增功能使用

**可用的新功能**：
1. **validateFieldsWithValue**：校验并返回表单值
2. **scrollToField**：滚动到指定字段

**使用建议**：
- 使用 `validateFieldsWithValue` 简化提交前的校验和取值逻辑
- 使用 `scrollToField` 改善长表单的错误定位体验
- 在表单校验失败时自动滚动到第一个错误字段

## Breaking Changes

无破坏性变更，但修复了一些之前的异常行为

## 风险等级

**中风险** - 包含多个重要修复：

1. **高优先级修复**：
   - onChange 多次执行/死循环问题（严重影响性能和稳定性）
   - formRef.set 数组更新失败（影响数据更新）

2. **中优先级修复**：
   - reserveAble 嵌套字段处理（影响条件渲染场景）
   - 嵌套字段校验参数错误（影响校验逻辑）

3. **功能增强**：
   - 新增的 formRef 方法可以改善用户体验