# Form 组件 3.6.3 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.3
- 包含 Beta 版本: 3.6.3-beta.1 ~ 3.6.3-beta.8
- 发布日期: 2025-04-10

## 变更概要

本版本修复了表单组件 defaultValue 的设置时机问题，确保默认值能够在正确的时机生效，避免被外部 value 状态覆盖。

## 详细变更

### 3.6.3-beta.2
- **修复问题**: Form 在设置 defaultValue 时，默认值设置时机晚于外部 value 状态的问题
- **PR**: [#1049](https://github.com/sheinsight/shineout-next/pull/1049)
- **影响组件**: Form 及所有表单组件
- **问题原因**: defaultValue 通过 setTimeout 异步设置，导致在某些情况下晚于外部 value 的更新

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-form/use-form.ts`

### 关键改动
```javascript
// 修改前：使用 setTimeout 异步设置默认值
if (df !== undefined && deepGet(context.value, n) === undefined) {
  if (!context.mounted) context.defaultValues[n] = df;
- setTimeout(() => {
-   onChange((v) => {
-     deepSet(v, n, df, deepSetOptions);
-   });
-   update(n);
- });
}

// 修改后：同步设置默认值
if (df !== undefined && deepGet(context.value, n) === undefined) {
  if (!context.mounted) context.defaultValues[n] = df;
+ onChange((v) => {
+   deepSet(v, n, df, deepSetOptions);
+ });
+ update(n);
}
```

## 受影响的使用场景

### 核心问题分析
这个问题的本质是 defaultValue 的设置时机问题。在修复前，defaultValue 通过 setTimeout 异步设置，这会导致在快速的状态更新场景下，默认值可能无法正确应用。这影响所有使用 defaultValue 的表单组件。

### 场景 1: 受控表单快速切换初始值
**检查点**: 查受控 Form 中快速更新 value 且组件有 defaultValue 的场景
```jsx
// 需要检查的代码模式
const [formValue, setFormValue] = useState({});

// 快速连续更新
useEffect(() => {
  setFormValue({ name: 'initial' });
  // 立即再次更新
  setFormValue({ name: 'updated' });
}, []);

<Form value={formValue} onChange={setFormValue}>
  <Input name="name" defaultValue="default" />
</Form>
```

### 场景 2: 条件渲染中使用 defaultValue
**检查点**: 查条件渲染的表单组件设置了 defaultValue 的场景
```jsx
// 需要检查的代码模式
const [show, setShow] = useState(false);

<Form value={value} onChange={onChange}>
  {show && (
    <Input 
      name="conditionalField" 
      defaultValue="defaultValue" 
    />
  )}
</Form>
```

### 场景 3: 动态表单项的默认值设置
**检查点**: 查 Form.FieldSet 中动态添加的表单项使用 defaultValue 的场景
```jsx
// 需要检查的代码模式
<Form.FieldSet name="items">
  {({ onAppend }) => (
    <>
      <Input name="name" defaultValue="Item Name" />
      <Input name="quantity" defaultValue={1} type="number" />
      <Button onClick={() => onAppend({})}>Add Item</Button>
    </>
  )}
</Form.FieldSet>
```

### 场景 4: 嵌套路径的 defaultValue
**检查点**: 查使用嵌套路径 name 且设置了 defaultValue 的组件
```jsx
// 需要检查的代码模式
<Form value={value} onChange={onChange}>
  <Input 
    name="user.profile.nickname" 
    defaultValue="Anonymous" 
  />
  <Select 
    name="user.settings.theme" 
    defaultValue="light"
    data={['light', 'dark']}
  />
</Form>
```

### 场景 5: Form.Field 包裹的自定义组件默认值
**检查点**: 查 Form.Field 包裹自定义组件且使用 defaultValue 的场景
```jsx
// 需要检查的代码模式
<Form value={value} onChange={onChange}>
  <Form.Field name="custom" defaultValue={{ x: 0, y: 0 }}>
    <CustomCoordinateInput />
  </Form.Field>
</Form>
```

### 场景 6: 表单重置与默认值
**检查点**: 查使用 Form.Reset 或 formRef.reset() 且依赖 defaultValue 的场景
```jsx
// 需要检查的代码模式
const formRef = useRef();

<Form ref={formRef} value={value} onChange={onChange}>
  <Input name="field1" defaultValue="default1" />
  <DatePicker name="date" defaultValue={new Date()} />
  <Form.Reset>Reset</Form.Reset>
</Form>

// 或手动重置
formRef.current.reset();
```

## Breaking Changes

无破坏性变更

## 风险等级

中风险 - 虽然修复了 defaultValue 的时机问题，但改变了设置的同步/异步行为，可能影响依赖原有异步行为的代码
