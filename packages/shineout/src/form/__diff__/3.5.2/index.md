# Form 组件 3.5.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.2
- 包含 Beta 版本: 3.5.2-beta.1 ~ 3.5.2-beta.11（缺少 beta.5）
- 发布日期: 2024-11-28

## 变更概要

3.5.2 版本主要修复了表单初始化和 defaultValue 相关的三个问题：
1. value 异步更新时 defaultValue 无法同步的问题
2. FieldSet 初始化默认值后更新内部值异常的问题
3. FieldSet 设置默认值覆盖初始化值的问题

## 详细变更

### 3.5.2-beta.3
- **修复问题**: Form.FieldSet 设置默认值覆盖前者初始化值的问题
- **PR**: [#808](https://github.com/sheinsight/shineout-next/pull/808)
- **影响组件**: Form.FieldSet
- **问题原因**: FieldSet 的默认值处理时机不当

### 3.5.2-beta.9
- **修复问题**: Form.FieldSet 初始化默认值后更新内部值异常的问题
- **PR**: [#816](https://github.com/sheinsight/shineout-next/pull/816)
- **影响组件**: Form.FieldSet
- **问题原因**: FieldSet 内部值更新逻辑有误

### 3.5.2-beta.10
- **修复问题**: Form 初始化表单后 value 异步更新导致 defaultValue 无法再次同步的问题
- **PR**: [#817](https://github.com/sheinsight/shineout-next/pull/817)
- **影响组件**: Form
- **问题原因**: 异步更新时 defaultValue 的同步时机问题

## 代码变更分析

### 核心问题
这三个问题都与表单的初始化和默认值管理有关，特别是在异步数据更新的场景下。

## 受影响的使用场景

### 场景 1: 异步加载表单数据
**检查点**: 查表单数据异步加载后设置 defaultValue 的场景
```jsx
// 需要检查的代码模式
const [formData, setFormData] = useState(null);

useEffect(() => {
  // 异步加载数据
  fetchUserData().then(data => {
    setFormData(data);
  });
}, []);

<Form value={formData}>
  {/* 3.5.2 之前：异步设置 value 后，defaultValue 可能不生效 */}
  <Input name="username" defaultValue="默认用户名" />
  <Input name="email" defaultValue="default@example.com" />
  <Select 
    name="role" 
    defaultValue="user"
    data={['admin', 'user', 'guest']}
  />
</Form>
```

### 场景 2: FieldSet 的默认值设置
**检查点**: 查 FieldSet 设置 defaultValue 的场景
```jsx
// 需要检查的代码模式
const [users, setUsers] = useState([
  { id: 1, name: 'User1' }
]);

<Form>
  <Form.FieldSet 
    name="users"
    defaultValue={[{ name: '', email: '' }]}  // 默认值
  >
    {({ value = [], onAppend, onRemove }) => (
      <>
        {value.map((user, index) => (
          <div key={index}>
            <Input 
              name={`users[${index}].name`}
              defaultValue="默认名称"  // 3.5.2 之前可能被覆盖
            />
            <Input 
              name={`users[${index}].email`}
              defaultValue="default@email.com"
            />
          </div>
        ))}
        <Button onClick={() => onAppend()}>添加</Button>
      </>
    )}
  </Form.FieldSet>
</Form>
```

### 场景 3: FieldSet 内部值更新
**检查点**: 查 FieldSet 初始化后更新内部值的场景
```jsx
// 需要检查的代码模式
<Form.FieldSet 
  name="config"
  defaultValue={{ theme: 'light', language: 'zh' }}
>
  {({ value, onChange }) => {
    // 内部更新值
    const handleThemeChange = (theme) => {
      // 3.5.2 之前：这种更新可能异常
      onChange({
        ...value,
        theme,
        // 联动更新其他字段
        primaryColor: theme === 'dark' ? '#fff' : '#000'
      });
    };
    
    return (
      <>
        <Select 
          name="config.theme"
          data={['light', 'dark']}
          onChange={handleThemeChange}
        />
        <Input name="config.language" />
        <Input name="config.primaryColor" />
      </>
    );
  }}
</Form.FieldSet>
```

### 场景 4: 编辑模式的表单初始化
**检查点**: 查编辑模式下异步加载数据并设置默认值的场景
```jsx
// 需要检查的代码模式
const EditForm = ({ id }) => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (id) {
      // 编辑模式：异步加载数据
      fetchData(id).then(setData);
    }
  }, [id]);
  
  return (
    <Form value={data}>
      {/* 新建模式使用 defaultValue，编辑模式使用异步数据 */}
      <Input 
        name="title" 
        defaultValue="新建标题"  // 3.5.2 之前在编辑模式可能出问题
      />
      
      <Form.FieldSet 
        name="items"
        defaultValue={[{ name: '', value: '' }]}
      >
        {({ value = [] }) => (
          value.map((item, index) => (
            <div key={index}>
              <Input name={`items[${index}].name`} />
              <Input name={`items[${index}].value`} />
            </div>
          ))
        )}
      </Form.FieldSet>
    </Form>
  );
};
```

### 场景 5: 嵌套 FieldSet 的默认值
**检查点**: 查嵌套使用 FieldSet 并设置默认值的场景
```jsx
// 需要检查的代码模式
<Form>
  <Form.FieldSet 
    name="company"
    defaultValue={{ name: '默认公司', departments: [] }}
  >
    <Input name="company.name" />
    
    <Form.FieldSet 
      name="company.departments"
      defaultValue={[{ name: '默认部门', employees: [] }]}
    >
      {({ value = [] }) => (
        value.map((dept, i) => (
          <div key={i}>
            <Input name={`company.departments[${i}].name`} />
            
            <Form.FieldSet name={`company.departments[${i}].employees`}>
              {/* 嵌套的 FieldSet */}
            </Form.FieldSet>
          </div>
        ))
      )}
    </Form.FieldSet>
  </Form.FieldSet>
</Form>
```

### 场景 6: 条件初始化的表单
**检查点**: 查根据条件异步初始化表单数据的场景
```jsx
// 需要检查的代码模式
const ConditionalForm = ({ mode }) => {
  const [formValue, setFormValue] = useState(null);
  
  useEffect(() => {
    // 根据模式加载不同的初始数据
    if (mode === 'template') {
      loadTemplate().then(setFormValue);
    } else if (mode === 'draft') {
      loadDraft().then(setFormValue);
    }
  }, [mode]);
  
  return (
    <Form value={formValue}>
      <Input 
        name="name" 
        defaultValue={mode === 'new' ? '新建项目' : ''}
      />
      
      <Form.FieldSet 
        name="settings"
        defaultValue={mode === 'new' ? { autoSave: true } : {}}
      >
        <Checkbox name="settings.autoSave">自动保存</Checkbox>
        <Input name="settings.interval" type="number" />
      </Form.FieldSet>
    </Form>
  );
};
```

## Breaking Changes

无破坏性变更

## 风险等级

中风险 - 修复了多个初始化相关的问题，可能影响依赖原有初始化行为的代码