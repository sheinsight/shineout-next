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
**重要说明**：3.6.1-beta.4 的修复在 3.6.2-beta.6 中被回退了。团队认为使用 `reserveAble` 属性更符合组件的设计原则。

原始问题：在 Form.Flow 中直接通过 `datum.set` 设置表单值时，在并发渲染场景下可能出现值被覆盖的情况。这个问题的根本原因是 `updateValue()` 函数的执行时机与组件渲染周期的冲突。

### 场景 1: Form.Flow 中使用 datum.set 设置多个字段（主要风险点）
**检查点**: 查 Form.Flow 中使用 datum.set 同时设置多个字段的场景
```jsx
// 需要检查的代码模式 - 这是最典型的问题场景
<Form.Flow>
  {(datum) => {
    return (
      <Select 
        onChange={(v) => {
          // 同时设置多个字段值
          datum?.set({
            field1: value1,
            field2: value2,
            // ...
          })
        }}
      />
    )
  }}
</Form.Flow>
```

**解决方案**：
1. 对于使用数组 name 的组件（如 DatePicker range），添加 `reserveAble` 属性
2. 或避免在 onChange 中直接使用 datum.set，改用表单的受控模式

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

### 场景 2: 条件渲染与数组 name 组件的组合
**检查点**: 查根据条件切换使用数组 name 的组件场景
```jsx
// 需要检查的代码模式 - 用户示例中的典型场景
{formValue.timeType === 1 ? (
  // 单独的日期选择器
  <DatePicker name='effectiveTimeBegin' />
) : (
  // 范围日期选择器，使用数组 name
  <DatePicker 
    range
    name={['effectiveTimeBegin', 'effectiveTimeEnd']}
    // 注意：需要添加 reserveAble 属性
  />
)}
```

**风险说明**：条件切换时，如果没有设置 `reserveAble`，组件卸载时会清除对应的表单值

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

无直接的破坏性变更，但此修复在 3.6.2-beta.6 中被回退

## 风险等级

**实际影响极小**：
- 此修复仅存在于 3.6.1-beta.4 ~ 3.6.2-beta.5 这个狭窄的 beta 版本区间
- 3.6.1 正式版包含此修复，但 3.6.2 正式版已回退
- **对于正式版用户**：如果直接从 3.6.0 或更早升级到 3.6.2 或更高，可完全忽略此变更

**仅以下情况需要关注**：
1. 当前使用 3.6.1 正式版，准备升级到 3.6.2 或更高版本
2. 当前使用 3.6.1-beta.4 ~ 3.6.2-beta.5 之间的 beta 版本

**解决方案**：
为使用数组 name 的组件添加 `reserveAble` 属性即可

## 版本修复历史

1. **3.6.1-beta.4**：将 `updateValue()` 移入 useEffect 以解决并发渲染问题
2. **3.6.2-beta.6**：回退上述修复，恢复原有逻辑，推荐使用 `reserveAble` 属性解决问题
