# Form 组件 3.6.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.2
- 包含 Beta 版本: 3.6.2-beta.1 ~ 3.6.2-beta.6
- 发布日期: 2025-04-01

## 变更概要

本版本包含两个主要变更：
1. **3.6.2-beta.5**：修复了 Form.Field 组件在使用数组 name 时的错误信息清理问题
2. **3.6.2-beta.6**：回退了 3.6.1-beta.4 的修复，恢复 `updateValue()` 的原始执行位置

## 详细变更

### 3.6.2-beta.5
- **修复问题**: Form.Field 在 name 为数组情况下组件卸载时错误信息无法清空的问题
- **PR**: [#1033](https://github.com/sheinsight/shineout-next/pull/1033)
- **影响组件**: Form.Field
- **问题原因**: 组件卸载时，数组形式的 name 对应的错误信息没有正确清理

### 3.6.2-beta.6
- **修复问题**: 修正 Form 内部 update 行为 (Regression: since v3.6.1-beta.4)
- **PR**: [#1034](https://github.com/sheinsight/shineout-next/pull/1034)
- **影响组件**: Form
- **问题原因**: 回退 3.6.1-beta.4 的修复，团队认为使用 `reserveAble` 属性更符合组件设计原则

## 代码变更分析

### 3.6.2-beta.5 的修改
**文件**: `packages/hooks/src/components/use-form/use-form-control/use-form-control.ts`
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

### 3.6.2-beta.6 的回退
**文件**: `packages/hooks/src/components/use-form/use-form.ts`
```javascript
// 回退 3.6.1-beta.4 的修复，恢复原始逻辑
- React.useEffect(() => {
-   updateValue();
    // ...
- })

+ updateValue();  // 直接在组件渲染时执行
+ React.useEffect(() => {
    // ...
+ })
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

**重要提示**：3.6.2-beta.6 回退了 3.6.1-beta.4 的修复，可能影响依赖该修复的代码

## 风险等级

**影响范围说明**：
- **无风险**：如果从 3.6.0 或更早版本直接升级到 3.6.2 或更高版本
- **中风险**：仅当从 3.6.1-beta.4 ~ 3.6.2-beta.5 这个区间升级时

对于绝大多数用户（使用正式版本），这个变更可以忽略。只有使用了特定 beta 版本的用户需要注意：
1. 如果项目从 3.6.1-beta.4 ~ 3.6.2-beta.5 升级到 3.6.2 正式版，需要注意并发渲染问题可能重现
2. 建议为受影响的组件添加 `reserveAble` 属性来解决问题

## 关联问题说明

### Form.Flow 中 datum.set 的正确用法

当需要在 Form.Flow 中通过 datum.set 设置多个字段时，特别是涉及到使用数组 name 的组件（如 DatePicker range），应该：

```jsx
// 推荐做法：为数组 name 组件添加 reserveAble
<DatePicker 
  range
  name={['effectiveTimeBegin', 'effectiveTimeEnd']}
  reserveAble  // 重要：添加此属性
/>
```

这样可以避免在并发渲染场景下出现值被覆盖的问题。
