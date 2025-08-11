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

### 场景 1: Form.Field 使用数组 name 导致 onChange 多次执行（最典型问题）
**检查点**: 查 Form.Field 使用数组 name 并且表单为受控组件的场景
```jsx
// 需要检查的代码模式 - 用户实际遇到的问题示例
const [value, setValue] = useState({
  nameObj: {
    firstName: 'Harry1',
    lastName: 'Potter2',
  },
});

const handleChange = (v) => {
  console.log(v); // 3.5.3 之前：这里会打印多次
  setValue(v);
};

<Form value={value} onChange={handleChange}>
  {/* 数组 name 映射到嵌套对象字段 */}
  <Form.Field name={['nameObj.firstName', 'nameObj.lastName']}>
    <NameInput />
  </Form.Field>
</Form>
```

**问题表现**：
- 用户输入一次，onChange 会被触发 2-3 次
- 在某些情况下可能导致死循环
- 影响性能和用户体验

### 场景 2: reserveAble 与嵌套字段
**检查点**: 查使用 reserveAble 并有嵌套字段的表单
```jsx
// 需要检查的代码模式
<Form reserveAble>
  {/* 深度嵌套字段 */}
  <Input name="user.profile.settings.theme" />
  
  {/* 条件渲染的嵌套字段 */}
  {showAdvanced && (
    <Input name="config.advanced.options.timeout" />
  )}
  
  {/* FieldSet 中的嵌套字段 */}
  <Form.FieldSet name="addresses" reserveAble>
    {() => (
      <>
        <Input name="city.district.street" />
        <Input name="postal.code" />
      </>
    )}
  </Form.FieldSet>
</Form>
```

**问题表现**：3.5.3 之前，深度嵌套字段在组件卸载后值可能丢失

### 场景 3: formRef.set 更新数组值
**检查点**: 查使用 formRef.set 更新数组字段的场景
```jsx
// 需要检查的代码模式
const formRef = useRef();

// 更新相同长度的数组
const updateArrayField = () => {
  const currentValue = formRef.current.get('items');
  // 3.5.3 之前：如果新数组长度与原数组相同，可能无法更新
  formRef.current.set('items', [
    { id: 1, name: 'new1' },
    { id: 2, name: 'new2' },
    { id: 3, name: 'new3' }
  ]);
};

// FieldSet 场景
const updateFieldSetArray = () => {
  // 3.5.3 之前：更新 FieldSet 管理的数组可能失败
  formRef.current.set('users', newUsersArray);
};
```

### 场景 4: 嵌套字段的自定义校验
**检查点**: 查对嵌套字段使用自定义校验规则的场景
```jsx
// 需要检查的代码模式
const validateNested = (value, formData, callback) => {
  // 3.5.3 之前：formData 结构可能不正确
  // 例如期望 formData.user.profile，但实际可能是扁平结构
  console.log('formData structure:', formData);
  
  if (formData.user && formData.user.role === 'admin') {
    // 基于其他嵌套字段的校验逻辑
    if (!value) {
      callback(new Error('管理员必须设置此字段'));
      return;
    }
  }
  callback(true);
};

<Form>
  <Input name="user.role" />
  <Input 
    name="user.permissions.level" 
    rules={[validateNested]}
  />
</Form>
```

### 场景 5: 嵌套 FieldSet 与 onChange
**检查点**: 查嵌套使用 Form.FieldSet 的场景
```jsx
// 需要检查的代码模式
<Form 
  value={formValue}
  onChange={(value) => {
    // 3.5.3 之前：嵌套 FieldSet 可能导致死循环
    setFormValue(value);
  }}
>
  <Form.FieldSet name="items">
    {() => (
      <Form.FieldSet name="subItems">
        {() => <Input name="value" />}
      </Form.FieldSet>
    )}
  </Form.FieldSet>
</Form>
```

### 场景 6: 新增功能使用
**检查点**: 可以利用新增的 formRef 方法改善用户体验
```jsx
// 新增功能示例
const formRef = useRef();

// 1. validateFieldsWithValue - 获取校验后的值
const handleValidateWithValue = async () => {
  try {
    const values = await formRef.current.validateFieldsWithValue();
    console.log('Validated values:', values);
    // 直接使用校验后的值进行提交
    submitForm(values);
  } catch (errors) {
    console.log('Validation failed:', errors);
  }
};

// 2. scrollToField - 滚动到指定字段
const handleScrollToError = () => {
  formRef.current.validate().catch((errors) => {
    // 滚动到第一个错误字段
    const firstErrorField = Object.keys(errors)[0];
    formRef.current.scrollToField(firstErrorField);
  });
};

<Form ref={formRef} name="myForm">
  <Input name="username" />
  <Input name="email" />
  {/* 很长的表单内容 */}
  <Input name="address.detail" />
</Form>
```

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

## 升级建议

1. **重点检查**：
   - **Form.Field 使用数组 name 的场景**（最高优先级）
   - 嵌套 Form.FieldSet 的使用
   - 使用 formRef.set 更新数组的代码
   - 依赖 reserveAble 的条件渲染场景

2. **测试重点**：
   - 表单数据更新的正确性
   - 嵌套字段的校验逻辑
   - 条件渲染时的数据保留

3. **可选优化**：
   - 使用新增的 scrollToField 改善错误提示体验
   - 使用 validateFieldsWithValue 简化提交逻辑