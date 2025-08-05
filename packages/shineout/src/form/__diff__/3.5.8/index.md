# Form 组件 3.5.8 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.8
- 包含 Beta 版本: 3.5.8-beta.1 ~ 3.5.8-beta.5
- 发布日期: 2024-12-13

## 变更概要

3.5.8 版本修复了 Form 组件在使用 JSON path 格式数组作为 name 时 defaultValue 无法生效的问题。

## 详细变更

### 3.5.8-beta.1
- **修复问题**: 修复 UI 相关问题
- **PR**: [#977](https://github.com/sheinsight/shineout-next/pull/977)
- **影响组件**: 多个组件（非 Form 组件相关）

### 3.5.8-beta.2
- **修复问题**: 修复 Upload 组件 webkitdirectory 属性失效的问题
- **PR**: [#978](https://github.com/sheinsight/shineout-next/pull/978)
- **影响组件**: Upload（非 Form 组件相关）

### 3.5.8-beta.3
- **版本更新**: 3.6.0-beta.13 版本相关内容
- **PR**: [#979](https://github.com/sheinsight/shineout-next/pull/979)
- **影响组件**: 多个组件

### 3.5.8-beta.4
- **修复问题**: 修复 Form 下的组件设置 name 为 JSON path 格式的数组时，组件上的 defaultValue 无法生效的问题
- **PR**: [#980](https://github.com/sheinsight/shineout-next/pull/980)
- **影响组件**: Form
- **问题原因**: 当使用数组格式的 name（如 ['user', 'info', 'name']）时，defaultValue 的处理逻辑存在问题

### 3.5.8-beta.5
- **修复问题**: 修复 TreeSelect 过滤筛选情况下选择数据不完整的问题
- **PR**: [#981](https://github.com/sheinsight/shineout-next/pull/981)
- **影响组件**: TreeSelect（非 Form 组件相关）

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-form/use-form-control/use-form-control.ts`
- `packages/hooks/src/components/use-form/use-form.ts`
- `packages/hooks/src/components/use-form/use-form.type.ts`

### 关键改动
修复了 Form 组件处理数组格式 name 时的 defaultValue 初始化逻辑。

## 受影响的使用场景

### 核心问题分析
当表单组件使用数组格式的 name（JSON path）并设置 defaultValue 时，defaultValue 无法正确应用到组件上。

### 场景 1: Form.Field 使用数组 name 和 defaultValue
**检查点**: 查找使用 Form.Field 配合数组格式 name 和 defaultValue 的场景
```jsx
// 需要检查的代码模式
<Form>
  {/* 3.5.8 之前：defaultValue 可能无法生效 */}
  <Form.Field 
    name={['user', 'profile', 'nickname']}
    defaultValue="默认昵称"
  >
    <Input placeholder="请输入昵称" />
  </Form.Field>
  
  <Form.Field 
    name={['user', 'settings', 'notifications']}
    defaultValue={['email', 'sms']}
  >
    <Checkbox.Group data={['email', 'sms', 'push']} />
  </Form.Field>
</Form>
```

### 场景 2: DatePicker range 模式使用数组 name
**检查点**: 查找 DatePicker 的 range 模式配合数组 name 和 defaultValue 的场景
```jsx
// 需要检查的代码模式
<Form>
  {/* 3.5.8 之前：日期范围的默认值可能无法生效 */}
  <DatePicker 
    range
    name={['filters', 'dateRange']}
    defaultValue={['2024-01-01', '2024-12-31']}
    placeholder={['开始日期', '结束日期']}
  />
  
  <DatePicker 
    range
    type="datetime"
    name={['query', 'timeRange']}
    defaultValue={[new Date(2024, 0, 1), new Date(2024, 11, 31)]}
  />
</Form>
```

### 场景 3: 深层嵌套的表单数据结构
**检查点**: 查找深层嵌套数据结构中使用 defaultValue 的场景
```jsx
// 需要检查的代码模式
<Form value={formData}>
  <Form.FieldSet name={['company', 'departments', 0]}>
    {/* 3.5.8 之前：嵌套结构中的 defaultValue 可能无法生效 */}
    <Form.Field name={['leader', 'name']} defaultValue="默认负责人">
      <Input />
    </Form.Field>
    
    <Form.Field name={['budget', 'amount']} defaultValue={100000}>
      <Input type="number" />
    </Form.Field>
  </Form.FieldSet>
</Form>
```

### 场景 4: 动态表单字段
**检查点**: 查找动态生成表单字段并使用数组 name 的场景
```jsx
// 需要检查的代码模式
function DynamicForm() {
  const [fields, setFields] = useState(['field1', 'field2']);
  
  return (
    <Form>
      {fields.map((field, index) => (
        <Form.Field
          key={field}
          name={['dynamic', 'fields', index, 'value']}
          defaultValue={`默认值${index + 1}`} // 3.5.8 之前：可能无法生效
        >
          <Input placeholder={`字段 ${index + 1}`} />
        </Form.Field>
      ))}
    </Form>
  );
}
```

### 场景 5: 条件渲染的表单字段
**检查点**: 查找条件渲染时使用数组 name 和 defaultValue 的场景
```jsx
// 需要检查的代码模式
function ConditionalForm() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <Form>
      <Checkbox checked={showAdvanced} onChange={setShowAdvanced}>
        显示高级选项
      </Checkbox>
      
      {showAdvanced && (
        <>
          {/* 3.5.8 之前：条件渲染时的 defaultValue 可能无法生效 */}
          <Form.Field 
            name={['advanced', 'settings', 'cache']}
            defaultValue={true}
          >
            <Switch />
          </Form.Field>
          
          <Form.Field 
            name={['advanced', 'settings', 'timeout']}
            defaultValue={30}
          >
            <Input type="number" addonAfter="秒" />
          </Form.Field>
        </>
      )}
    </Form>
  );
}
```

### 场景 6: 表单重置与 defaultValue
**检查点**: 查找使用表单重置功能并依赖 defaultValue 的场景
```jsx
// 需要检查的代码模式
function ResetForm() {
  const formRef = useRef();
  
  return (
    <Form ref={formRef}>
      <Form.Field 
        name={['user', 'preferences', 'theme']}
        defaultValue="light" // 3.5.8 之前：重置时可能无法恢复到默认值
      >
        <Select data={['light', 'dark', 'auto']} />
      </Form.Field>
      
      <Form.Field 
        name={['user', 'preferences', 'language']}
        defaultValue="zh-CN"
      >
        <Select data={[
          { value: 'zh-CN', text: '中文' },
          { value: 'en-US', text: 'English' }
        ]} />
      </Form.Field>
      
      <Button onClick={() => formRef.current.reset()}>
        重置表单
      </Button>
    </Form>
  );
}
```

## Breaking Changes

无破坏性变更

## 风险等级

中风险 - 修复了数组格式 name 的 defaultValue 处理问题，可能会导致原本没有生效的 defaultValue 突然生效，需要检查相关使用场景