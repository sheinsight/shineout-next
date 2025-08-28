# Form 组件 3.5.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.0
- 包含 Beta 版本: 3.5.0-beta.1 ~ 3.5.0-beta.13
- 发布日期: 2024-11-11

## 详细变更

### 3.5.0-beta.1
- **变更类型**: 新增功能
- **变更标签**: 功能/传参
- **复现示例**: 无
- **变更描述**: `Form` 的formRef的set方法支持嵌套对象值
- **PR**: [#711](https://github.com/sheinsight/shineout-next/pull/711)
- **影响组件**: Form
- **功能说明**: 增强了 Form 组件的 formRef.set() 方法，支持设置嵌套对象结构的值，允许用户通过路径方式设置深层对象属性

### 3.5.0-beta.3
- **变更类型**: 修复问题
- **变更标签**: 功能/逻辑
- **复现示例**: 无
- **变更描述**: 修复 `Form.Field` 在设置默认值情况下 value 改变后可能失效的问题
- **PR**: [#730](https://github.com/sheinsight/shineout-next/pull/730)
- **影响组件**: Form.Field
- **问题原因**: Form.Field 的默认值处理逻辑与 1.x/2.x 版本不一致，当 Form 的 value 变化后，defaultValue 不能正确干预 value

#### Bug 特征
- Form.Field 设置了 defaultValue，但在 Form 的 value 变化后，defaultValue 失效
- 3.x 版本与 1.x/2.x 版本在 defaultValue 处理逻辑上的不一致性
- 当 value 不包含该字段时，defaultValue 应该作为默认值，但实际未生效

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form value={formValue}>
  <Form.Field
    name="field1"
    defaultValue="defaultVal"  // 当formValue不包含field1时应使用此默认值
  >
    <Input />
  </Form.Field>
</Form>
```

#### 排查规则
- 搜索使用了 `defaultValue` 属性的 Form.Field 组件
- 搜索 Form 组件中依赖 defaultValue 进行初始化的表单项

### 3.5.0-beta.4
- **变更类型**: 修复问题
- **变更标签**: 时机/行为
- **复现示例**: 无
- **变更描述**: 修复`Form` 的onSubmit时间可能比onChange早的问题
- **PR**: [#731](https://github.com/sheinsight/shineout-next/pull/731)
- **影响组件**: Form
- **问题原因**: 在使用条形码扫描仪等快速输入场景下，Form 的 onSubmit 事件触发时机可能早于 onChange 事件，导致提交的数据不是最新的

#### Bug 特征
- 在条形码扫描仪快速输入场景下，表单提交时数据可能不是最新的
- onSubmit 事件触发早于 onChange 事件，导致数据同步问题
- 影响快速输入和自动提交的业务场景

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form
  onSubmit={handleSubmit}  // 可能在onChange之前触发
  onChange={handleChange}
>
  <Form.Field name="barcode">
    <Input 
      onPressEnter={triggerSubmit}  // 快速输入+回车提交场景
    />
  </Form.Field>
</Form>
```

#### 排查规则
- 可忽略排查
- 搜索同时使用 onSubmit 和 onChange 的 Form 组件
- 搜索在输入框中使用 onPressEnter 触发提交的表单

### 3.5.0-beta.5
- **变更类型**: 修复问题
- **变更标签**: 功能/传参
- **复现示例**: 无
- **变更描述**: 修复 Form.Field defaultValue 在部分场景下失效的问题
- **PR**: [#742](https://github.com/sheinsight/shineout-next/pull/742)
- **影响组件**: Form.Field
- **问题原因**: 当 Form.Field 的 name 为数组格式（如 ["a","b"]），defaultValue 也为数组且只有一个初始值时，如果接口数据不包含对应字段，会导致 defaultValue 不生效

#### Bug 特征
- Form.Field 的 name 为数组格式，如 ["a", "b"]
- defaultValue 为数组格式，且只有一个初始值，如 [{name:'xxx',title:'xxx'}]
- 接口数据不包含对应的数组字段时，defaultValue 失效
- 主要影响复杂的嵌套表单结构

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form value={formValue}>  {/* 如 formValue = {c: 'xxx'} */}
  <Form.Field
    name={["a", "b"]}  // 数组形式的name
    defaultValue={[{name:'xxx',title:'xxx'}]}  // 数组形式的defaultValue
  >
    <Select />
  </Form.Field>
</Form>
```

#### 排查规则
- 搜索 name 属性为数组格式的 Form.Field 组件
- 搜索同时使用数组格式 name 和 defaultValue 的表单项

### 3.5.0-beta.6
- **变更类型**: 新增功能
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 新增 `Form.useForm` 用法，获取的form实例方法与formRef相同，但是可以在任何地方使用，不受组件渲染影响
- **PR**: 无独立PR
- **影响组件**: Form
- **功能说明**: 新增 Form.useForm Hook，提供与 formRef 相同的方法，但不依赖组件渲染，可在组件外部使用

### 3.5.0-beta.7
- **变更类型**: 新增功能
- **变更标签**: 功能/传参
- **复现示例**: 无
- **变更描述**: `Form` 新增 `reserveAble` 属性，用于控制表单项是否保留
- **PR**: 无独立PR
- **影响组件**: Form
- **功能说明**: 新增 reserveAble 属性，控制表单项在某些情况下是否保留其状态和数据

### 3.5.0-beta.12
- **变更类型**: 新增功能
- **变更标签**: 功能/传参
- **复现示例**: 无
- **变更描述**: `Form.Item` 的 `label` 支持对象配置用法，可设置文案旁增加tooltip提示信息
- **PR**: [#789](https://github.com/sheinsight/shineout-next/pull/789)
- **影响组件**: Form.Item
- **功能说明**: Form.Item 的 label 属性从简单字符串扩展为支持对象配置，允许在标签旁添加 tooltip 提示说明

## Breaking Changes

无

## 风险等级

**中**：
- 包含多个回归问题修复，特别是 defaultValue 相关的逻辑修复
- 新增的 Form.useForm 和 reserveAble 功能可能改变现有的使用模式
- onSubmit 时机修复可能影响依赖事件触发顺序的业务逻辑
- Form.Item label 属性的扩展虽然向后兼容，但增加了复杂度