# Form 组件 3.7.4 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.4
- 包含 Beta 版本: 3.7.4-beta.1 ~ 3.7.4-beta.8
- 发布日期: 2025-06-27

## 变更概要

3.7.4 版本主要修复了两个问题并新增了类型导出：
1. 修复 Form.Item 嵌套使用时 required 属性的继承问题
2. 修复 useForm 在非受控模式下的表单实例获取问题
3. 新增 FlowProps 和 Datum 类型导出

## 详细变更

### 3.7.4-beta.3
- **新功能**: Form 新增 FlowProps 及 Datum 类型导出
- **PR**: [#1198](https://github.com/sheinsight/shineout-next/pull/1198)
- **影响组件**: Form
- **功能说明**: 方便 TypeScript 用户使用相关类型定义

### 3.7.4-beta.7
- **修复问题**: Form 的 useForm 用非受控用法下，表单实例获取不正确的问题
- **PR**: [#1208](https://github.com/sheinsight/shineout-next/pull/1208)
- **影响组件**: Form hooks
- **问题原因**: useRef 在某些情况下无法正确触发组件更新

### 3.7.4-beta.8
- **修复问题**: Form.Item 嵌套使用时，子级的 required 属性设置为 false 不生效的问题
- **PR**: [#1210](https://github.com/sheinsight/shineout-next/pull/1210)
- **影响组件**: Form.Item
- **问题原因**: 嵌套 Form.Item 时属性继承逻辑有误

## 代码变更分析

### 修改文件
1. `packages/hooks/src/components/use-form/use-form-context.ts`
2. `packages/base/src/form/form-item.tsx`
3. `packages/shineout/src/form/form.type.ts`

### 关键改动

#### 1. useFormRef 实现优化
```javascript
// 修改前：使用 useRef
export function useFormRef<V>(): [FormRef<V>, ((formRef: FormRef<V>) => void)] {
  const formRef = React.useRef<FormRef<V>>({} as FormRef<V>);
  return [formRef.current, (ref) => { formRef.current = ref }]
}

// 修改后：使用 useState
export function useFormRef<V>(): [FormRef<V>, ((formRef: FormRef<V>) => void)] {
  const [formRef, setFormRef] = React.useState<FormRef<V>>({} as FormRef<V>);
  return [formRef, setFormRef]
}
```

#### 2. Form.Item required 属性处理
修复了嵌套 Form.Item 时，子级设置 `required={false}` 无法覆盖父级 `required={true}` 的问题。

## 受影响的使用场景

### 核心问题分析
1. **useForm 问题**：在非受控模式下，formRef 可能无法及时获取到正确的表单实例
2. **Form.Item 嵌套问题**：子级 Form.Item 无法覆盖父级的 required 设置

### 场景 1: 非受控表单的 useForm 使用
**检查点**: 查使用 useForm 创建表单实例但不使用 value/onChange 的场景
```jsx
// 需要检查的代码模式
const App = () => {
  const [formRef, setFormRef] = useFormRef();
  
  const handleSubmit = () => {
    // 3.7.4 之前，formRef 可能是空对象
    const values = formRef.getValue();
    console.log(values);
  };
  
  return (
    <Form 
      formRef={setFormRef}  // 非受控模式
      onSubmit={handleSubmit}
    >
      <Input name="username" />
      <Input name="password" type="password" />
      <Form.Submit>提交</Form.Submit>
    </Form>
  );
};
```

### 场景 2: Form.Item 嵌套使用
**检查点**: 查嵌套 Form.Item 并需要覆盖 required 属性的场景
```jsx
// 需要检查的代码模式
<Form>
  {/* 父级设置了 required */}
  <Form.Item label="用户信息" required={true}>
    <div style={{ padding: 20, border: '1px solid #eee' }}>
      {/* 子级想要取消必填 */}
      <Form.Item label="昵称" required={false}>
        <Input name="nickname" />
      </Form.Item>
      
      {/* 子级继承父级的必填 */}
      <Form.Item label="用户名">
        <Input name="username" />
      </Form.Item>
      
      {/* 子级明确设置不必填，3.7.4 之前可能不生效 */}
      <Form.Item label="备注" required={false}>
        <Textarea name="remark" />
      </Form.Item>
    </div>
  </Form.Item>
</Form>
```

### 场景 3: 动态表单实例管理
**检查点**: 查动态创建或切换表单实例的场景
```jsx
// 需要检查的代码模式
const [activeForm, setActiveForm] = useState('form1');
const [form1Ref, setForm1Ref] = useFormRef();
const [form2Ref, setForm2Ref] = useFormRef();

const getCurrentFormRef = () => {
  // 3.7.4 之前，切换时可能获取不到正确的实例
  return activeForm === 'form1' ? form1Ref : form2Ref;
};

return (
  <>
    {activeForm === 'form1' && (
      <Form formRef={setForm1Ref}>
        <Input name="field1" />
      </Form>
    )}
    
    {activeForm === 'form2' && (
      <Form formRef={setForm2Ref}>
        <Input name="field2" />
      </Form>
    )}
    
    <Button onClick={() => {
      const ref = getCurrentFormRef();
      ref.validate();  // 可能报错
    }}>
      验证当前表单
    </Button>
  </>
);
```

### 场景 4: TypeScript 类型使用
**检查点**: 查需要使用 Form 相关类型定义的场景
```tsx
// 需要检查的代码模式
import { Form, FlowProps, Datum } from 'shineout';

// 3.7.4 新增的类型导出
const MyFormFlow: React.FC<FlowProps> = ({ datum }) => {
  // 使用 Datum 类型
  const handleChange = (d: Datum) => {
    const value = d.get('fieldName');
    // ...
  };
  
  return <div>{/* Flow 内容 */}</div>;
};

// 自定义 Form 组件的类型定义
interface MyFormProps {
  flowProps?: FlowProps;
  datum?: Datum;
}
```

### 场景 5: 复杂表单布局的 required 标记
**检查点**: 查有复杂嵌套结构且需要灵活控制必填标记的场景
```jsx
// 需要检查的代码模式
<Form>
  {/* 分组容器，统一设置必填 */}
  <Form.Item label="基本信息" required>
    <Card>
      <Form.Item label="姓名">
        <Input name="name" />
      </Form.Item>
      
      {/* 特殊字段不需要必填 */}
      <Form.Item label="备用联系人" required={false}>
        <Input name="backupContact" />
      </Form.Item>
    </Card>
  </Form.Item>
  
  {/* 另一个分组，不设置必填 */}
  <Form.Item label="附加信息">
    <Card>
      <Form.Item label="兴趣爱好" required={false}>
        <Input name="hobby" />
      </Form.Item>
      
      {/* 特定字段需要必填 */}
      <Form.Item label="紧急联系人" required={true}>
        <Input name="emergencyContact" />
      </Form.Item>
    </Card>
  </Form.Item>
</Form>
```

### 场景 6: 表单实例的异步操作
**检查点**: 查在组件挂载后异步使用表单实例的场景
```jsx
// 需要检查的代码模式
const [formRef, setFormRef] = useFormRef();

useEffect(() => {
  // 异步操作中使用 formRef
  setTimeout(() => {
    // 3.7.4 之前可能获取不到实例
    if (formRef.set) {
      formRef.set({ 
        username: 'default',
        email: 'default@example.com' 
      });
    }
  }, 1000);
}, [formRef]);  // 3.7.4 后，formRef 变化会触发 effect

<Form formRef={setFormRef}>
  <Input name="username" />
  <Input name="email" />
</Form>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了表单实例管理和属性继承的问题，提升了开发体验