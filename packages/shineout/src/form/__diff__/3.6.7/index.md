# Form 组件 3.6.7 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.7
- 包含 Beta 版本: 3.6.7-beta.1 ~ 3.6.7-beta.7
- 发布日期: 2025-05-27

## 变更概要

本版本修复了三个重要问题：
1. 列表数据更新导致校验状态丢失
2. 动态 name 导致字段被删除
3. 相同 name 组件切换时 datum.set 失效

## 详细变更

### 3.6.7-beta.2
- **修复问题**: Form 在列表数据中使用时，列表数据更新导致校验状态丢失的问题
- **PR**: [#1115](https://github.com/sheinsight/shineout-next/pull/1115)
- **影响组件**: Form
- **问题原因**: 列表数据更新时，表单校验状态没有正确保持

### 3.6.7-beta.5
- **修复问题**: Form 在设置动态 name 且为数组 name 的情况下导致字段可能被删除的问题
- **PR**: [#1123](https://github.com/sheinsight/shineout-next/pull/1123)
- **影响组件**: Form 及所有表单组件
- **问题原因**: 动态 name 变化时，字段管理逻辑存在缺陷

### 3.6.7-beta.7
- **修复问题**: Form 在相同 name 的组件切换渲染过程中，执行 datum.set 等改值行为失效的问题
- **PR**: [#1127](https://github.com/sheinsight/shineout-next/pull/1127)
- **影响组件**: Form
- **问题原因**: 组件切换时的内部状态管理问题

## 代码变更分析

### 修改文件
1. `packages/hooks/src/components/use-form/use-form.ts`
2. `packages/hooks/src/components/use-form/use-form-control/use-form-control.ts`

### 关键改动
详细代码改动涉及表单内部状态管理和字段生命周期管理的优化。

## 受影响的使用场景

### 核心问题分析
这三个问题都涉及表单在动态场景下的状态管理，包括列表渲染、动态 name、组件切换等场景。

### 场景 1: 列表数据中的表单校验
**检查点**: 查在列表渲染中使用表单，且列表数据会动态更新的场景
```jsx
// 需要检查的代码模式
const rules = Rule();
const [items, setItems] = useState([
  { id: 1, name: '', email: '' },
  { id: 2, name: '', email: '' }
]);

// 列表数据更新（增删改）
const updateList = () => {
  setItems([...items, { id: 3, name: '', email: '' }]);
};

<Form>
  {items.map((item, index) => (
    <div key={item.id}>
      <Input 
        name={`items[${index}].name`}
        rules={[rules.required]}  // 校验状态可能丢失
      />
      <Input 
        name={`items[${index}].email`}
        rules={[rules.email]}  // 校验状态可能丢失
      />
    </div>
  ))}
</Form>
```

### 场景 2: 动态数组 name 的表单组件
**检查点**: 查使用动态生成的数组 name 的场景
```jsx
// 需要检查的代码模式
const [fieldPath, setFieldPath] = useState(['user', 'info']);

// 动态改变 name 路径
const changeFieldPath = () => {
  setFieldPath(['company', 'details']);  // name 变化可能导致字段被删除
};

<Form>
  <Form.Field 
    name={fieldPath}  // Form.Field 支持动态数组 name
    defaultValue="initial value"
  >
    <Input />
  </Form.Field>
  <Button onClick={changeFieldPath}>切换字段路径</Button>
</Form>
```

### 场景 3: 相同 name 的组件切换
**检查点**: 查根据条件切换不同组件但使用相同 name 的场景
```jsx
// 需要检查的代码模式
const [inputType, setInputType] = useState('text');
const formRef = useRef();

// 切换组件类型后设置值
const handleTypeChange = (type) => {
  setInputType(type);
  // datum.set 可能失效
  formRef.current.set('field', 'new value');
};

<Form ref={formRef}>
  {inputType === 'text' ? (
    <Input name="field" />
  ) : (
    <Textarea name="field" />  // 相同 name，不同组件
  )}
</Form>
```

### 场景 4: Form.FieldSet 中的动态索引
**检查点**: 查 Form.FieldSet 中使用动态索引的场景
```jsx
// 需要检查的代码模式
<Form.FieldSet name="users">
  {({ value = [] }) => 
    value.map((user, index) => {
      // 动态生成的 name
      const dynamicName = user.active ? 
        [`users[${index}]`, 'activeInfo'] : 
        [`users[${index}]`, 'inactiveInfo'];
      
      return (
        <Form.Field key={user.id} name={dynamicName}>
          <Input />
        </Form.Field>
      );
    })
  }
</Form.FieldSet>
```

### 场景 5: 表单项的条件显示与校验
**检查点**: 查表单项根据条件显示/隐藏且有校验规则的场景
```jsx
// 需要检查的代码模式
const [showEmail, setShowEmail] = useState(true);

<Form>
  <Form.Item label="">
    <Checkbox 
      checked={showEmail}
      onChange={setShowEmail}
    >
      需要邮箱
    </Checkbox>
  </Form.Item>
  
  {showEmail && (
    <Form.Item label="邮箱">
      <Input 
        name="email" 
        rules={[rules.required, rules.email]}  // 组件卸载重新挂载后校验状态
      />
    </Form.Item>
  )}
</Form>
```

### 场景 6: 表格中的行内编辑表单
**检查点**: 查在表格行内编辑中使用表单的场景
```jsx
// 需要检查的代码模式
const columns = [
  {
    title: 'Name',
    render: (d, index) => (
      <Form>
        <Input 
          name={`row[${index}].name`}  // 表格行索引相关的 name
          defaultValue={d.name}
          rules={[rules.required]}
        />
      </Form>
    )
  }
];

<Table 
  keygen="id"
  columns={columns}
  data={tableData}
/>
```

## Breaking Changes

无破坏性变更

## 风险等级

中风险 - 修复了多个动态场景下的状态管理问题，可能影响依赖原有行为的代码
