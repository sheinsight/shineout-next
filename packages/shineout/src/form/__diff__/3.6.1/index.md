# Form 组件 3.6.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.1
- 包含 Beta 版本: 3.6.1-beta.1 ~ 3.6.1-beta.7
- 发布日期: 2025-03-25

## 变更概要

本版本主要修复了一个并发渲染场景下的数据设置问题，涉及 Form 组件与 DatePicker 组件配合使用时的特定场景。

## 详细变更

### 3.6.1-beta.4
- **修复问题**: Form 同时设置 value 和 names 为数组的 DatePicker 并发渲染时，value 未按照预期设置进去的问题
- **PR**: [#1013](https://github.com/sheinsight/shineout-next/pull/1013)
- **影响组件**: Form + DatePicker
- **问题原因**: 在 useForm hook 中，updateValue() 函数的调用时机导致在并发渲染场景下，value 更新可能被覆盖

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-form/use-form.ts`

### 关键改动
```javascript
// 修改前：updateValue() 在组件初始化时立即执行
- updateValue();

// 修改后：updateValue() 移动到 useEffect 中执行
React.useEffect(() => {
+  updateValue();
   context.removeLock = false;
   // ...
})
```

## 受影响的使用场景

### 核心问题分析
这个问题的本质是：在并发渲染场景下，当表单组件使用数组形式的 name 属性时，初始值可能无法正确设置。虽然 changelog 中提到了 DatePicker，但实际上所有支持数组 name 的表单组件都可能受影响。

### 场景 1: 任何使用数组 name 的表单组件
**检查点**: 查 Form 中所有使用数组 name 的组件
```jsx
// 需要检查的代码模式 - 不限于 DatePicker
<Form value={value} onChange={onChange}>
  {/* DatePicker 数组 name */}
  <DatePicker name={['startDate', 'endDate']} range />
  
  {/* Form.Field 包裹的自定义组件 */}
  <Form.Field name={['firstName', 'lastName']}>
    <CustomInput />
  </Form.Field>
  
  {/* 其他组件使用 JSON path 字符串格式 */}
  <Input name="user.info.name" />
  <Select name="config.options" data={options} />
</Form>
```

### 场景 2: 受控表单中的条件渲染
**检查点**: 查 Form 受控模式下根据条件切换渲染使用数组 name 的组件
```jsx
// 需要检查的代码模式
const [formValue, setFormValue] = useState({...});
const [showRange, setShowRange] = useState(false);

<Form value={formValue} onChange={setFormValue}>
  {showRange ? (
    <DatePicker name={['start', 'end']} range />
  ) : (
    <DatePicker name="singleDate" />
  )}
</Form>
```

### 场景 3: 动态设置表单值的场景
**检查点**: 查在组件 onChange 回调中直接修改 formValue 并立即设置的场景
```jsx
// 需要检查的代码模式
<Select
  onChange={(v) => {
    const newValue = {
      ...formValue,
      field1: '',
      field2: v === 1 ? 'default' : ''
    };
    setFormValue(newValue); // 立即设置新值
  }}
/>
```

### 场景 4: Form.FieldSet 中的数组字段
**检查点**: 查 Form.FieldSet 内部使用数组 name 的场景
```jsx
// 需要检查的代码模式
<Form.FieldSet name="items">
  {() => (
    <Form.Field name={['price', 'discount']}>
      <PriceInput />
    </Form.Field>
  )}
</Form.FieldSet>
```

### 场景 5: 并发渲染环境
**检查点**: 查以下并发渲染相关的使用场景
- React.StrictMode 包裹的 Form 组件
- 使用 React 18 并发特性（startTransition、useDeferredValue）
- 快速切换路由导致的组件快速挂载/卸载
- 使用 Suspense 包裹的表单组件

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了并发渲染场景下的初始值设置问题，不会影响现有功能的正常使用
