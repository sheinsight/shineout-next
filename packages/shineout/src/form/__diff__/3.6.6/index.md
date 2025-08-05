# Form 组件 3.6.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.6
- 包含 Beta 版本: 3.6.6-beta.1 ~ 3.6.6-beta.7
- 发布日期: 2025-05-09

## 变更概要

本版本修复了 formRef.set 方法设置对象字段时的问题，并增强了该方法的功能，新增了 options 参数支持。

## 详细变更

### 3.6.6-beta.5
- **修复问题**: Form 的 formRef `set` 设置某对象字段下的部分子字段值，未设值子字段的表单组件值未清空的问题
- **PR**: [#1106](https://github.com/sheinsight/shineout-next/pull/1106)
- **影响组件**: Form
- **问题原因**: set 方法只更新指定的字段，不会影响对象中的其他字段

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-form/use-form.ts`

### 关键改动
```javascript
// 修改前：只能部分更新
setValue(
  vals: { [key: string]: any },
- option: { validate?: boolean; names?: string[] } = { validate: false },
)

// 修改后：新增 forceUpdate 选项
setValue(
  vals: { [key: string]: any },
+ option: { validate?: boolean; forceUpdate?: boolean } = { validate: false },
)

// 根据 forceUpdate 决定更新范围
- update(fullKeyPaths);
+ if (option.forceUpdate) {
+   update();  // 更新所有字段
+ } else {
+   update(fullKeyPaths);  // 只更新指定字段
+ }
```

## 受影响的使用场景

### 核心问题分析
当使用 formRef.set 设置对象类型字段的部分属性时，该对象的其他属性对应的表单组件不会被更新，导致显示的值与实际表单数据不一致。

### 场景 1: 设置对象字段的部分属性
**检查点**: 查使用 formRef.set 设置对象字段部分属性的场景
```jsx
// 需要检查的代码模式
const formRef = useRef();

// 原始数据
const initialData = {
  user: {
    name: 'John',
    email: 'john@example.com',
    phone: '123456'
  }
};

// 只更新 user.name，其他字段可能不会清空
formRef.current.set({
  user: {
    name: 'Jane'
    // email 和 phone 在表单中可能仍显示原值
  }
});

<Form ref={formRef}>
  <Input name="user.name" />
  <Input name="user.email" />
  <Input name="user.phone" />
</Form>
```

### 场景 2: 重置对象字段
**检查点**: 查需要重置整个对象字段的场景
```jsx
// 需要检查的代码模式
// 清空用户信息
const resetUserInfo = () => {
  formRef.current.set({
    user: {}  // 期望清空所有 user 下的字段
  });
};

<Form ref={formRef}>
  <Form.Item label="用户信息">
    <Input name="user.firstName" />
    <Input name="user.lastName" />
    <Input name="user.department" />
  </Form.Item>
</Form>
```

### 场景 3: 切换数据源时的表单更新
**检查点**: 查切换不同数据对象时使用 formRef.set 的场景
```jsx
// 需要检查的代码模式
const [currentId, setCurrentId] = useState(1);
const users = {
  1: { name: 'User1', role: 'admin', status: 'active' },
  2: { name: 'User2', role: 'user' }  // 缺少 status
};

// 切换用户时
const switchUser = (id) => {
  setCurrentId(id);
  formRef.current.set({
    profile: users[id]  // User2 没有 status，但表单可能仍显示 User1 的 status
  });
};
```

### 场景 4: 嵌套对象的部分更新
**检查点**: 查更新深层嵌套对象属性的场景
```jsx
// 需要检查的代码模式
const updateAddress = () => {
  formRef.current.set({
    'company.address': {
      city: 'New York'
      // street 和 zipCode 可能保留原值
    }
  });
};

<Form ref={formRef}>
  <Input name="company.address.street" />
  <Input name="company.address.city" />
  <Input name="company.address.zipCode" />
</Form>
```

### 场景 5: 动态表单字段的值设置
**检查点**: 查根据条件动态设置不同字段组合的场景
```jsx
// 需要检查的代码模式
const [formType, setFormType] = useState('basic');

const applyTemplate = (type) => {
  if (type === 'basic') {
    formRef.current.set({
      config: { theme: 'light', size: 'medium' }
    });
  } else {
    formRef.current.set({
      config: { theme: 'dark', size: 'large', advanced: true }
    });
  }
};

<Form ref={formRef}>
  <Select name="config.theme" data={themes} />
  <Select name="config.size" data={sizes} />
  {formType === 'advanced' && (
    <Checkbox name="config.advanced">高级选项</Checkbox>
  )}
</Form>
```

### 场景 6: 使用新的 forceUpdate 选项
**检查点**: 查可能需要使用 forceUpdate 选项强制更新所有字段的场景
```jsx
// 需要检查的代码模式
// 3.6.6 版本后可以使用 forceUpdate
formRef.current.set(
  { user: { name: 'New Name' } },
  { forceUpdate: true }  // 强制更新所有字段
);
```

## Breaking Changes

无破坏性变更，但新增了 API 功能

## 风险等级

中风险 - 虽然修复了问题，但可能影响依赖原有部分更新行为的代码
