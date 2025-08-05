# Form 组件 3.6.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.2
- 包含 Beta 版本: 3.6.2-beta.1 ~ 3.6.2-beta.6
- 发布日期: 2025-04-01

## 变更概要

本版本主要修复了 Form.Field 组件在使用数组 name 时的错误信息清理问题，确保组件卸载时相关的校验错误能够正确清除。

## 详细变更

### 3.6.2-beta.5
- **修复问题**: Form.Field 在 name 为数组情况下组件卸载时错误信息无法清空的问题
- **PR**: [#1033](https://github.com/sheinsight/shineout-next/pull/1033)
- **影响组件**: Form.Field
- **问题原因**: 组件卸载时，数组形式的 name 对应的错误信息没有正确清理

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-form/use-form-control/use-form-control.ts`

### 关键改动
```javascript
// 修改前：分别清理每个 name 的错误
name.forEach((n) => {
  controlFunc.unbind(n, reserveAble, validateField, update);
- updateError(n, undefined);
});

// 修改后：使用组合的 key 清理错误
name.forEach((n) => {
  controlFunc.unbind(n, reserveAble, validateField, update);
});
+ updateError(isArray(name) ? name.join('|') : name, undefined);
```

## 受影响的使用场景

### 核心问题分析
这个问题涉及 Form.Field 组件在使用数组 name 时的生命周期管理。当组件卸载时，之前的错误信息没有被正确清理，导致错误信息残留。这会影响动态表单、条件渲染等场景。

### 场景 1: Form.Field 使用数组 name 的动态渲染
**检查点**: 查 Form.Field 组件使用数组 name 且存在动态挂载/卸载的场景
```jsx
// 需要检查的代码模式
const rules = Rule();
const [showField, setShowField] = useState(true);

<Form>
  {showField && (
    <Form.Field 
      name={['user', 'info']} 
      rules={[rules.required]}
    >
      <CustomInput />
    </Form.Field>
  )}
</Form>
```

### 场景 2: 条件切换不同的 Form.Field
**检查点**: 查根据条件渲染不同 Form.Field 且使用数组 name 的场景
```jsx
// 需要检查的代码模式
const rules = Rule();

<Form>
  {type === 'range' ? (
    <Form.Field name={['start', 'end']} rules={[rules.required]}>
      <RangeInput />
    </Form.Field>
  ) : (
    <Form.Field name={['single']} rules={[rules.required]}>
      <SingleInput />
    </Form.Field>
  )}
</Form>
```

### 场景 3: Form.FieldSet 中动态增删带数组 name 的 Field
**检查点**: 查 Form.FieldSet 中动态操作包含数组 name 的 Form.Field
```jsx
// 需要检查的代码模式
<Form.FieldSet name="items">
  {({ onRemove }) => (
    <>
      <Form.Field name={['price', 'amount']} rules={[rules.required]}>
        <PriceInput />
      </Form.Field>
      <Button onClick={onRemove}>删除</Button>
    </>
  )}
</Form.FieldSet>
```

### 场景 4: 路由切换导致的表单组件卸载
**检查点**: 查路由切换或标签页切换时包含数组 name Form.Field 的表单
```jsx
// 需要检查的代码模式
// 在路由组件或标签页中
<Route path="/form">
  <Form>
    <Form.Field name={['address', 'city', 'district']}>
      <AddressSelect />
    </Form.Field>
  </Form>
</Route>
```

### 场景 5: Modal/Drawer 中的表单
**检查点**: 查 Modal、Drawer 等弹出层组件中使用数组 name 的 Form.Field
```jsx
// 需要检查的代码模式
<Modal visible={visible} onClose={handleClose}>
  <Form>
    <Form.Field 
      name={['config', 'options']} 
      rules={[rules.required]}
    >
      <OptionsEditor />
    </Form.Field>
  </Form>
</Modal>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了错误信息清理的问题，不会影响正常功能，反而会改善用户体验
