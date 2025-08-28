# Form 组件 3.5.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.2
- 包含 Beta 版本: 3.5.2-beta.1 ~ 3.5.2-beta.11
- 发布日期: 2024-11-29

## 详细变更

### 3.5.2-beta.3
- **变更类型**: 修复问题
- **变更标签**: 功能/逻辑/时机
- **复现示例**: https://shineout-playground.sheincorp.cn/#/playground?code=2e2a100c-9d90-4612-841f-8d7f3d503168
- **变更描述**: 修复 `Form.FieldSet` 设置默认值覆盖前者初始化值的问题
- **PR**: [#808](https://github.com/sheinsight/shineout-next/pull/808)
- **影响组件**: Form.FieldSet
- **问题原因**: 表单里多个子组件初始化时，当第一个子组件在 useEffect 里更改了表单值，后面的子组件有 defaultValue 时，第一个表单的更改会被后面子组件的默认值覆盖，bind 方法中 defaultValue 的同步时机不正确

#### Bug 特征
- 使用 Form.FieldSet 且包含多个子组件，其中一个组件设置了 defaultValue
- 第一个子组件通过 useEffect 动态更改表单值
- 后续组件的 defaultValue 会覆盖之前组件的动态设置值
- 影响复杂表单的初始化逻辑和值的设置顺序

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form>
  <Form.FieldSet name="rules">
    <ComponentA
      // 在 useEffect 中动态设置值
      onChange={(value) => {
        // 动态更新表单值逻辑
      }}
    />
    <ComponentB
      defaultValue={someDefaultValue}  // 会覆盖前面组件的设置
    />
  </Form.FieldSet>
</Form>
```

#### 排查规则
- 搜索包含多个子组件且部分子组件设置了 defaultValue 的 Form.FieldSet
- 搜索在 useEffect 中动态设置表单值同时其他组件有 defaultValue 的表单

### 3.5.2-beta.7
- **变更类型**: 修复问题
- **变更标签**: 功能/逻辑/时机
- **复现示例**: 无
- **变更描述**: 修复 `Form.FieldSet` 初始化默认值后更新内部值异常的问题
- **PR**: [#816](https://github.com/sheinsight/shineout-next/pull/816)
- **影响组件**: Form.FieldSet
- **问题原因**: 在 bind 方法中，update(n) 调用时机不正确，导致默认值设置后内部状态更新异常

#### Bug 特征
- 使用 Form.FieldSet 组件设置默认值
- 初始化默认值后，后续内部值更新出现异常
- bind 方法中的状态同步时机错误
- 影响表单字段的状态管理和更新逻辑

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form>
  <Form.FieldSet
    name="fieldArray"
    defaultValue={[{ field1: 'value1' }]}  // 设置默认值后更新异常
  >
    {/* 内部表单控件 */}
  </Form.FieldSet>
</Form>
```

#### 排查规则
- 搜索设置了 defaultValue 的 Form.FieldSet 组件
- 搜索依赖初始化默认值后进行值更新的表单逻辑
- 搜索 Form.FieldSet 内部状态管理相关的使用场景

### 3.5.2-beta.8
- **变更类型**: 修复问题
- **变更标签**: 功能/逻辑/数据
- **复现示例**: https://shineout-playground.sheincorp.cn/#/playground?code=aa84b721-a5b4-4ef9-89f4-00c6a5419437
- **变更描述**: 修复 `Form` 初始化表单后 value 异步更新导致 defaultValue 无法再次同步的问题
- **PR**: [#817](https://github.com/sheinsight/shineout-next/pull/817)
- **影响组件**: Form, Form.FieldSet
- **问题原因**: Form 表单中 Form.FieldSet 给一个 defaultValue，初始化时 defaultValue 会触发 onChange 并同步修改外部的 value。如果用户调用接口异步地将带有 defaultValue 的字段设置为 undefined 或直接去除了并设置给了 Form，此时 defaultValue 不会再次补位，与老版本行为不一致

#### Bug 特征
- Form.FieldSet 设置了 defaultValue 属性
- 表单初始化后通过异步操作（如接口调用）更新表单 value
- 异步更新的值将 defaultValue 对应的字段设置为 undefined 或移除
- defaultValue 无法重新补位，与 1.x、2.x 版本行为不一致
- 影响表单的 defaultValue 重置和同步逻辑

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form value={formValue}>
  <Form.FieldSet
    name="fieldWithDefault"
    defaultValue="defaultVal"  // 异步更新后无法重新补位
  >
    {/* 表单控件 */}
  </Form.FieldSet>
</Form>

// 异步更新逻辑
useEffect(() => {
  fetchData().then(data => {
    setFormValue({
      // fieldWithDefault 字段被设置为 undefined 或移除
      ...data
    });
  });
}, []);
```

#### 排查规则
- 搜索同时使用 defaultValue 和异步更新表单值的 Form.FieldSet 组件
- 搜索依赖 defaultValue 重置行为的表单逻辑
- 搜索在异步数据加载后可能导致 defaultValue 字段为 undefined 的表单

## Breaking Changes

无

## 风险等级

**中**：
- 包含 3 个与 Form 核心功能相关的回归问题修复
- 涉及 Form.FieldSet 的默认值设置、状态更新和异步同步逻辑
- 修复了与历史版本行为不一致的问题，可能影响依赖旧行为的代码
- 虽然都是Bug修复，但涉及表单的初始化和状态管理核心逻辑，建议重点测试包含 defaultValue 的表单场景