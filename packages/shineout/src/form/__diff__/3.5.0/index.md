# Form 组件 3.5.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.0
- 包含 Beta 版本: 3.5.0-beta.1 ~ 3.5.0-beta.13
- 发布日期: 2024-11-11

## 变更概要

3.5.0 是一个重要的功能版本，新增了三个重要特性：
1. Form.useForm hook 用法
2. Form.Item label 属性支持对象配置
3. Form reserveAble 属性控制字段卸载时是否保留值

## 详细变更

### 3.5.0-beta.2
- **新功能**: Form 新增 useForm 用法，获取的 form 实例方法与 formRef 相同，但是可以在任何地方使用，不受组件渲染影响
- **PR**: [#711](https://github.com/sheinsight/shineout-next/pull/711)
- **影响组件**: Form
- **功能说明**: 提供了更灵活的表单实例管理方式

### 3.5.0-beta.9
- **新功能**: Form 新增 reserveAble 属性，用于控制表单项是否保留值
- **PR**: [#772](https://github.com/sheinsight/shineout-next/pull/772)
- **影响组件**: Form
- **功能说明**: 控制字段卸载时是否保留其值

### 3.5.0-beta.10
- **新功能**: Form.Item 的 label 属性新增对象配置模式，支持在标签文本旁添加 tooltip 提示说明
- **PR**: [#788](https://github.com/sheinsight/shineout-next/pull/788)
- **影响组件**: Form.Item
- **功能说明**: 增强了表单标签的信息展示能力

## 代码变更分析

### 新增 API

#### 1. Form.useForm Hook
```javascript
import { Form } from 'shineout';

// 在组件外部创建 form 实例
const form = Form.useForm();

// 在组件内部使用
function MyComponent() {
  // form 实例可以在任何地方使用
  const handleClick = () => {
    form.validate();
    form.set({ name: 'value' });
  };
  
  return <Form formRef={form}>...</Form>;
}
```

#### 2. Form.Item label 对象配置
```javascript
// 新增的对象配置方式
<Form.Item 
  label={{
    text: "用户名",
    tip: "请输入您的用户名，支持字母和数字"
  }}
>
  <Input name="username" />
</Form.Item>
```

#### 3. Form reserveAble 属性
```javascript
// 控制字段卸载时是否保留值
<Form reserveAble={true}>
  {/* 字段卸载时值会被保留 */}
</Form>
```

## 受影响的使用场景

### 场景 1: 跨组件的表单控制
**检查点**: 查需要在表单组件外部控制表单的场景
```jsx
// 需要检查的代码模式
// 使用 useForm 可以更方便地在组件外部控制表单
const form = Form.useForm();

// 父组件
function ParentComponent() {
  const handleValidate = () => {
    form.validate().then(values => {
      console.log('表单数据:', values);
    });
  };
  
  return (
    <>
      <Button onClick={handleValidate}>验证表单</Button>
      <ChildComponent form={form} />
    </>
  );
}

// 子组件
function ChildComponent({ form }) {
  return (
    <Form formRef={form}>
      <Input name="username" />
      <Input name="password" type="password" />
    </Form>
  );
}
```

### 场景 2: 表单标签的帮助信息
**检查点**: 查需要在表单标签旁显示帮助信息的场景
```jsx
// 需要检查的代码模式
const rules = Rule();

<Form>
  <Form.Item 
    label={{
      text: "密码",
      tip: "密码长度至少8位，必须包含字母和数字"
    }}
  >
    <Input 
      name="password" 
      type="password"
      rules={[rules.required, rules.minLength(8)]}
    />
  </Form.Item>
  
  <Form.Item 
    label={{
      text: "邮箱",
      tip: "请输入常用邮箱，用于接收通知"
    }}
  >
    <Input 
      name="email"
      rules={[rules.required, rules.email]}
    />
  </Form.Item>
</Form>
```

### 场景 3: 动态表单字段的值保留
**检查点**: 查根据条件动态显示/隐藏字段，但需要保留字段值的场景
```jsx
// 需要检查的代码模式
const [showAdvanced, setShowAdvanced] = useState(false);

<Form reserveAble={true}>  {/* 开启值保留 */}
  <Input name="basic" />
  
  <Checkbox 
    checked={showAdvanced}
    onChange={setShowAdvanced}
  >
    显示高级选项
  </Checkbox>
  
  {showAdvanced && (
    <>
      <Input name="advanced1" />
      <Input name="advanced2" />
      {/* 这些字段隐藏后值会被保留 */}
    </>
  )}
  
  <Form.Submit>提交</Form.Submit>
</Form>
```

### 场景 4: 复杂表单的全局控制
**检查点**: 查需要在多个地方控制同一个表单的场景
```jsx
// 需要检查的代码模式
// 创建全局表单实例
const globalForm = Form.useForm();

// 工具栏组件
function Toolbar() {
  return (
    <div>
      <Button onClick={() => globalForm.reset()}>重置</Button>
      <Button onClick={() => globalForm.validate()}>验证</Button>
      <Button onClick={() => globalForm.submit()}>提交</Button>
    </div>
  );
}

// 表单组件
function FormContent() {
  return (
    <Form formRef={globalForm}>
      <Input name="field1" />
      <Input name="field2" />
    </Form>
  );
}

// 主应用
function App() {
  return (
    <>
      <Toolbar />
      <FormContent />
    </>
  );
}
```

### 场景 5: 分步表单的值保留
**检查点**: 查多步骤表单中切换步骤时需要保留数据的场景
```jsx
// 需要检查的代码模式
const [step, setStep] = useState(1);

<Form reserveAble={true}>
  {step === 1 && (
    <div>
      <Input name="step1.name" />
      <Input name="step1.email" />
    </div>
  )}
  
  {step === 2 && (
    <div>
      <Input name="step2.address" />
      <Input name="step2.phone" />
    </div>
  )}
  
  {step === 3 && (
    <div>
      <Input name="step3.notes" />
      {/* 切换步骤时，之前步骤的数据会被保留 */}
    </div>
  )}
  
  <Button onClick={() => setStep(step + 1)}>下一步</Button>
</Form>
```

### 场景 6: 表单字段的复杂提示
**检查点**: 查需要为表单字段提供详细说明的场景
```jsx
// 需要检查的代码模式
<Form>
  <Form.Item 
    label={{
      text: "API 密钥",
      tip: "在控制台中生成的 API 密钥，请妥善保管"
    }}
    required
  >
    <Input name="apiKey" type="password" />
  </Form.Item>
  
  <Form.Item 
    label={{
      text: "回调地址",
      tip: "接收通知的 HTTPS 地址，必须是公网可访问的"
    }}
  >
    <Input 
      name="webhookUrl"
      rules={[rules.required, rules.url]}
    />
  </Form.Item>
</Form>
```

## Breaking Changes

无破坏性变更，均为新增功能

## 风险等级

低风险 - 新增功能不影响现有功能的使用