# Form 组件 3.7.8 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.8
- 包含 Beta 版本: 3.7.8-beta.1 ~ 3.7.8-beta.12
- 发布日期: 2025-07-30

## 变更概要

3.7.8 版本修复了 Form 组件 onChange 回调返回值被直接修改后再设置新 value 不生效的问题。

## 详细变更

### 3.7.8-beta.11
- **修复问题**: Form 对 onChange 的返回值直接修改数据后再设置新 value 不生效的问题
- **PR**: [#1272](https://github.com/sheinsight/shineout-next/pull/1272), [#1257](https://github.com/sheinsight/shineout-next/pull/1257)
- **影响组件**: Form
- **问题原因**: onChange 回调中传递的是内部状态的引用，导致外部修改会影响内部状态

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-form/use-form.ts`

### 关键改动
```javascript
// 修改前：传递深拷贝的值
props.onChange?.(deepClone(context.value) as T);

// 修改后：直接传递 newValue
const newValue = typeof change === 'function' ? produce(context.value as T, change) : change;
context.value = newValue;
props.onChange?.(newValue as T);
```

## 受影响的使用场景

### 核心问题分析
当开发者在 Form 的 onChange 回调中直接修改返回的表单值对象，然后又通过 setState 设置新的表单值时，由于引用相同，React 认为值没有变化，导致表单不会更新。

### 场景 1: 直接修改 onChange 返回值
**检查点**: 查在 onChange 中直接修改表单值的场景
```jsx
// 需要检查的代码模式
const [formValue, setFormValue] = useState({
  name: '',
  age: 0
});

const handleFormChange = (value) => {
  // 错误做法：直接修改 value
  value.timestamp = Date.now();  // 直接修改
  
  // 3.7.8 之前：下面的 setState 可能不生效
  setFormValue(value);
};

<Form 
  value={formValue}
  onChange={handleFormChange}
>
  <Input name="name" />
  <Input name="age" type="number" />
</Form>

// 正确做法：创建新对象
const handleFormChange = (value) => {
  setFormValue({
    ...value,
    timestamp: Date.now()
  });
};
```

### 场景 2: 条件修改表单值
**检查点**: 查根据条件修改表单值的场景
```jsx
// 需要检查的代码模式
const handleFormChange = (value) => {
  // 根据条件修改值
  if (value.type === 'student') {
    value.role = 'learner';  // 直接修改
    delete value.salary;     // 直接删除属性
  }
  
  // 3.7.8 之前：表单可能不会反映这些变化
  setFormValue(value);
};

<Form value={formValue} onChange={handleFormChange}>
  <Select 
    name="type" 
    data={['student', 'teacher', 'employee']}
  />
  <Input name="role" />
  <Input name="salary" type="number" />
</Form>
```

### 场景 3: 计算衍生值
**检查点**: 查在 onChange 中计算并设置衍生值的场景
```jsx
// 需要检查的代码模式
const handleFormChange = (value) => {
  // 计算总价
  if (value.price && value.quantity) {
    value.total = value.price * value.quantity;  // 直接修改
  }
  
  // 计算折扣
  if (value.total > 100) {
    value.discount = value.total * 0.1;  // 直接修改
  }
  
  setFormValue(value);
};

<Form value={formValue} onChange={handleFormChange}>
  <Input name="price" type="number" />
  <Input name="quantity" type="number" />
  <Input name="total" type="number" disabled />
  <Input name="discount" type="number" disabled />
</Form>
```

### 场景 4: 数组/对象嵌套修改
**检查点**: 查修改嵌套数据结构的场景
```jsx
// 需要检查的代码模式
const handleFormChange = (value) => {
  // 错误：直接修改嵌套数组
  if (value.items) {
    value.items.forEach(item => {
      item.checked = true;  // 直接修改数组元素
    });
  }
  
  // 错误：直接修改嵌套对象
  if (value.user) {
    value.user.lastModified = new Date();  // 直接修改
  }
  
  setFormValue(value);
};

// 正确做法：使用 immer 或深拷贝
import { produce } from 'immer';

const handleFormChange = (value) => {
  const newValue = produce(value, draft => {
    if (draft.items) {
      draft.items.forEach(item => {
        item.checked = true;
      });
    }
    if (draft.user) {
      draft.user.lastModified = new Date();
    }
  });
  
  setFormValue(newValue);
};
```

### 场景 5: 表单联动更新
**检查点**: 查表单字段联动时的值修改场景
```jsx
// 需要检查的代码模式
const handleFormChange = (value) => {
  // 联动逻辑
  if (value.country === 'CN') {
    value.currency = 'CNY';     // 直接修改
    value.timezone = 'GMT+8';   // 直接修改
  } else if (value.country === 'US') {
    value.currency = 'USD';     // 直接修改
    value.timezone = 'GMT-5';   // 直接修改
  }
  
  // 3.7.8 之前：联动更新可能不生效
  setFormValue(value);
};

<Form value={formValue} onChange={handleFormChange}>
  <Select 
    name="country" 
    data={['CN', 'US', 'UK']}
  />
  <Input name="currency" />
  <Input name="timezone" />
</Form>
```

### 场景 6: 表单校验后的值修正
**检查点**: 查在 onChange 中进行值校验和修正的场景
```jsx
// 需要检查的代码模式
const handleFormChange = (value) => {
  // 值修正逻辑
  if (value.age && value.age < 0) {
    value.age = 0;  // 直接修改：修正负数
  }
  
  if (value.email) {
    value.email = value.email.toLowerCase();  // 直接修改：转小写
  }
  
  if (value.phone) {
    // 直接修改：格式化电话号码
    value.phone = value.phone.replace(/\D/g, '');
  }
  
  setFormValue(value);
};

<Form value={formValue} onChange={handleFormChange}>
  <Input name="age" type="number" />
  <Input name="email" />
  <Input name="phone" />
</Form>
```

## Breaking Changes

无破坏性变更，但修复了一个回归问题（3.7.8-beta.1 引入）

## 风险等级

中风险 - 修复了数据更新机制的问题，可能影响依赖直接修改表单值的代码逻辑