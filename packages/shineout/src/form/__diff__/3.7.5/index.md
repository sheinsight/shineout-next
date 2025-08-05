# Form 组件 3.7.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.5
- 包含 Beta 版本: 3.7.5-beta.1 ~ 3.7.5-beta.11
- 发布日期: 2025-07-09

## 变更概要

3.7.5 版本修复了表单字段卸载后重新挂载时会携带历史校验错误信息的问题。

## 详细变更

### 3.7.5-beta.4
- **修复问题**: Form 卸载携带校验错误字段后，重新挂载该字段时会携带历史校验错误信息的问题
- **PR**: [#1219](https://github.com/sheinsight/shineout-next/pull/1219)
- **影响组件**: Form
- **问题原因**: 字段卸载时没有清理对应的错误信息

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-form/use-form.ts`

### 关键改动
```javascript
// 在 unbind 函数中添加错误信息清理逻辑
if (validateFieldSet.size === 0 && updateFieldSet.size === 0) {
  context.names.delete(n);
  delete context.defaultValues[n];
  
  // 新增：清理错误信息
  if (context.errors[n]) {
    delete context.errors[n];
  }
}
```

## 受影响的使用场景

### 核心问题分析
当表单字段在有错误状态时被卸载，然后重新挂载时，之前的错误信息会被保留并显示，即使字段已经是全新的状态。这会导致用户看到不应该存在的错误提示。

### 场景 1: 条件渲染的表单字段
**检查点**: 查根据条件显示/隐藏的表单字段，特别是有校验规则的字段
```jsx
// 需要检查的代码模式
const rules = Rule();
const [showEmail, setShowEmail] = useState(true);

<Form>
  <Checkbox 
    checked={showEmail}
    onChange={setShowEmail}
  >
    需要邮箱
  </Checkbox>
  
  {showEmail && (
    <Input 
      name="email" 
      rules={[rules.required, rules.email]}
      placeholder="请输入邮箱"
    />
  )}
</Form>

// 问题场景：
// 1. 用户输入了错误的邮箱格式，显示错误信息
// 2. 取消勾选"需要邮箱"，字段被卸载
// 3. 重新勾选"需要邮箱"，字段重新挂载
// 3.7.5 之前：错误信息仍然显示
// 3.7.5 之后：字段是干净的状态，无错误信息
```

### 场景 2: 动态表单字段切换
**检查点**: 查根据类型或选项动态切换不同表单字段的场景
```jsx
// 需要检查的代码模式
const [contactType, setContactType] = useState('phone');

<Form>
  <Radio.Group 
    value={contactType}
    onChange={setContactType}
    data={['phone', 'email', 'wechat']}
  />
  
  {contactType === 'phone' && (
    <Input 
      name="contact"
      rules={[rules.required, rules.phoneNumber]}
      placeholder="请输入手机号"
    />
  )}
  
  {contactType === 'email' && (
    <Input 
      name="contact"
      rules={[rules.required, rules.email]}
      placeholder="请输入邮箱"
    />
  )}
  
  {contactType === 'wechat' && (
    <Input 
      name="contact"
      rules={[rules.required]}
      placeholder="请输入微信号"
    />
  )}
</Form>

// 问题场景：切换联系方式类型时，之前的错误信息可能会保留
```

### 场景 3: 多步骤表单的步骤切换
**检查点**: 查多步骤表单中切换步骤导致字段卸载/挂载的场景
```jsx
// 需要检查的代码模式
const [step, setStep] = useState(1);

<Form>
  {step === 1 && (
    <div>
      <Input 
        name="username"
        rules={[rules.required, rules.minLength(3)]}
      />
      <Input 
        name="password"
        rules={[rules.required, rules.minLength(6)]}
      />
    </div>
  )}
  
  {step === 2 && (
    <div>
      <Input 
        name="realName"
        rules={[rules.required]}
      />
      <Input 
        name="idCard"
        rules={[rules.required, rules.idCard]}
      />
    </div>
  )}
  
  {step === 3 && (
    <div>
      {/* 返回第一步时，之前的错误不应该还在 */}
      <Button onClick={() => setStep(1)}>返回第一步</Button>
    </div>
  )}
</Form>
```

### 场景 4: 列表项的增删操作
**检查点**: 查动态列表中删除后重新添加项目的场景
```jsx
// 需要检查的代码模式
const [items, setItems] = useState([{ id: 1, value: '' }]);

const removeItem = (id) => {
  setItems(items.filter(item => item.id !== id));
};

const addItem = () => {
  setItems([...items, { id: Date.now(), value: '' }]);
};

<Form>
  {items.map((item, index) => (
    <div key={item.id}>
      <Input 
        name={`items[${index}].value`}
        rules={[rules.required]}
      />
      <Button onClick={() => removeItem(item.id)}>删除</Button>
    </div>
  ))}
  <Button onClick={addItem}>添加项目</Button>
</Form>

// 问题场景：删除有错误的项目后，新添加的项目可能会显示之前的错误
```

### 场景 5: Tab 切换中的表单
**检查点**: 查单个 Form 中根据 Tab 切换显示不同字段的场景
```jsx
// 需要检查的代码模式
const [activeTab, setActiveTab] = useState('basic');

<Form>  {/* Form 保持挂载 */}
  <Tabs activeKey={activeTab} onChange={setActiveTab}>
    <Tabs.Panel key="basic" title="基本信息">
      <Input 
        name="nickname"
        rules={[rules.required]}
      />
      <Input 
        name="bio"
        rules={[rules.maxLength(200)]}
      />
    </Tabs.Panel>
    
    <Tabs.Panel key="security" title="安全设置">
      <Input 
        name="oldPassword"
        type="password"
        rules={[rules.required]}
      />
      <Input 
        name="newPassword"
        type="password"
        rules={[rules.required, rules.minLength(8)]}
      />
    </Tabs.Panel>
  </Tabs>
  
  <Form.Submit>提交</Form.Submit>
</Form>

// 问题场景：
// 1. 在"基本信息"标签中，nickname 字段输入错误内容
// 2. 切换到"安全设置"标签（nickname 字段被卸载）
// 3. 切换回"基本信息"标签（nickname 字段重新挂载）
// 3.7.5 之前：nickname 字段会显示之前的错误信息
// 3.7.5 之后：nickname 字段是干净的状态
```

### 场景 6: 模态框中的表单重置
**检查点**: 查模态框关闭后重新打开时表单状态的场景
```jsx
// 需要检查的代码模式
const [visible, setVisible] = useState(false);

const handleClose = () => {
  setVisible(false);
  // 不需要手动清理错误了
};

<Modal 
  visible={visible}
  onClose={handleClose}
  destroyOnClose  // 关闭时销毁内容
>
  <Form>
    <Input 
      name="title"
      rules={[rules.required]}
    />
    <Textarea 
      name="content"
      rules={[rules.required, rules.minLength(10)]}
    />
  </Form>
</Modal>

// 问题场景：
// 1. 打开模态框，输入错误内容，显示错误信息
// 2. 关闭模态框（组件被销毁）
// 3. 重新打开模态框
// 3.7.5 之前：可能还会看到之前的错误信息
// 3.7.5 之后：表单是全新的状态
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了字段生命周期管理的问题，提升了用户体验