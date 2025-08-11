# Form 组件 3.5.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.2
- 包含 Beta 版本: 3.5.2-beta.1 ~ 3.5.2-beta.11（缺少 beta.5）
- 发布日期: 2024-11-28

## 变更概要

本版本修复了表单初始化和 defaultValue 相关的三个关键问题，主要影响异步数据加载和 FieldSet 默认值处理。

## 详细变更

### Bug 修复

#### 3.5.2-beta.3
- **修复问题**: Form.FieldSet 设置默认值覆盖前者初始化值的问题
- **PR**: [#808](https://github.com/sheinsight/shineout-next/pull/808)
- **影响组件**: Form.FieldSet
- **问题原因**: FieldSet 的默认值处理时机不当

#### 3.5.2-beta.9
- **修复问题**: Form.FieldSet 初始化默认值后更新内部值异常的问题
- **PR**: [#816](https://github.com/sheinsight/shineout-next/pull/816)
- **影响组件**: Form.FieldSet
- **问题原因**: FieldSet 内部值更新逻辑有误

#### 3.5.2-beta.10
- **修复问题**: Form 初始化表单后 value 异步更新导致 defaultValue 无法再次同步的问题
- **PR**: [#817](https://github.com/sheinsight/shineout-next/pull/817)
- **影响组件**: Form
- **问题原因**: 异步更新时 defaultValue 的同步时机问题

## 代码变更分析

### 关键改动

1. 修正了 FieldSet defaultValue 的初始化时序
2. 改进了异步数据更新与 defaultValue 的协调机制
3. 修复了 FieldSet 内部值更新的处理逻辑

## 受影响的使用场景

### 场景 1: 异步加载数据覆盖 FieldSet defaultValue（核心问题）

**Bug 特征**：
- Form 初始 value 为空对象或 null
- 使用 useEffect 异步加载数据并更新 Form value
- Form.FieldSet 设置了 defaultValue
- 异步数据未包含 FieldSet 字段，导致 defaultValue 被清空

**检查点**：
- 搜索 `useState({})` 或 `useState(null)` 初始化表单
- 查找 `useEffect` 中的异步数据加载（setTimeout、fetch、axios）
- 检查 Form.FieldSet 是否使用 defaultValue
- 验证异步数据结构是否完整包含所有表单字段

### 场景 2: 组件初始化顺序导致值覆盖

**Bug 特征**：
- 多个 Form.FieldSet 按顺序初始化
- 先初始化的组件通过 onAppend 等方法设置值
- 后初始化的组件的 defaultValue 覆盖前面的设置
- 组件渲染顺序影响最终表单值

**检查点**：
- 搜索同一表单中多个 Form.FieldSet 的使用
- 查找 useEffect 中调用 onAppend、setValue 的模式
- 检查是否有组件同时使用程序设置值和 defaultValue
- 验证组件加载顺序对表单数据的影响

### 场景 3: FieldSet 初始化后内部更新异常

**Bug 特征**：
- Form.FieldSet 管理对象类型数据
- 使用 render props 模式的 onChange 更新值
- defaultValue 初始化后，内部更新可能失效
- 涉及字段联动更新的场景

**检查点**：
- 搜索 Form.FieldSet 的 defaultValue 为对象的场景
- 查找使用 `{({ value, onChange }) =>` 的 render props 模式
- 检查 onChange 中的字段联动逻辑
- 验证初始化后的数据更新是否正常

### 场景 4: 编辑模式表单初始化

**Bug 特征**：
- 根据 ID 或模式判断是新建还是编辑
- 编辑模式下异步加载数据
- 新建模式使用 defaultValue
- 模式切换时数据初始化异常

**检查点**：
- 搜索条件判断加载数据的模式（if(id) 或 if(mode)）
- 查找编辑表单的异步数据加载逻辑
- 检查 defaultValue 在不同模式下的处理
- 验证新建/编辑模式切换时的数据正确性

### 场景 5: 嵌套 FieldSet 的默认值处理

**Bug 特征**：
- 多层嵌套的 Form.FieldSet
- 每层都设置了 defaultValue
- 内层 FieldSet 的默认值可能被外层影响
- 深度嵌套结构的初始化问题

**检查点**：
- 搜索嵌套使用 Form.FieldSet 的场景
- 查找多层 defaultValue 的设置
- 检查嵌套结构的数据初始化顺序
- 验证深层数据的默认值是否正确生效

## Breaking Changes

无破坏性变更

## 风险等级

**中风险** - 修复了多个初始化相关的问题，可能影响依赖原有初始化行为的代码