# Form 组件 3.7.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.1
- 包含 Beta 版本: 3.7.1-beta.1 ~ 3.7.1-beta.9
- 发布日期: 2025-06-18

## 变更概要

3.7.1 版本主要修复了一个表单字段联动时的错误状态管理问题。

## 详细变更

### 3.7.1-beta.6
- **修复问题**: Form 设置某字段值的同时设置了其他字段的值，此时其他字段上的错误状态未自动清除的问题
- **PR**: [#1160](https://github.com/sheinsight/shineout-next/pull/1160)
- **影响组件**: Form
- **问题原因**: 在批量设置多个字段值时，非当前字段的错误状态没有被正确触发校验

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-form/use-form.ts`

### 关键改动
```javascript
// 修改前：update 函数只更新视图，不触发错误字段的重新校验
context.updateMap[key]?.forEach((update) => {
  update(context.value, context.errors, context.serverErrors);
});

// 修改后：update 函数在更新视图时，如果字段有错误则自动触发重新校验
context.updateMap[key]?.forEach((update) => {
  update(context.value, context.errors, context.serverErrors);
  if(context.errors[key]) {
    validateFields(key).catch(() => {});
  }
});
```

## 受影响的使用场景

### 核心问题分析
这个问题出现在表单字段联动场景中，当通过 `formRef.set()` 或其他方式同时设置多个字段的值时，如果其中某些字段已经有错误状态，这些错误状态不会自动清除，即使新值是合法的。

### 场景 1: 表单联动修改其他字段值
**检查点**: 查字段联动时修改其他字段值但错误信息仍然存在的场景
```jsx
// 需要检查的代码模式
const rules = Rule();
const formRef = useRef();

// 示例1：字段联动修改值
const handlePriceChange = (price) => {
  // 价格变化时，自动计算税额
  const tax = price * 0.1;
  formRef.current.set({
    price: price,
    tax: tax,  // 即使税额已经符合规则，之前的错误信息可能还在
  });
};

// 示例2：选项变化影响其他字段
const handleTypeChange = (type) => {
  // 类型变化时，设置默认配置
  formRef.current.set({
    type: type,
    config: getDefaultConfig(type),  // config字段之前的错误可能不会清除
    maxValue: type === 'A' ? 100 : 200  // maxValue字段之前的错误可能不会清除
  });
};

<Form ref={formRef}>
  <Input 
    name="price" 
    type="number"
    onChange={handlePriceChange}
  />
  <Input 
    name="tax" 
    type="number"
    rules={[rules.required, rules.min(0)]}  // 即使值已经合法，错误信息可能还在
  />
  
  <Select 
    name="type" 
    data={['A', 'B', 'C']}
    onChange={handleTypeChange}
  />
  <Input 
    name="config" 
    rules={[rules.required]}  // 联动设置后错误信息可能不会自动清除
  />
  <Input 
    name="maxValue" 
    type="number"
    rules={[rules.required, rules.max(500)]}  // 联动设置后错误信息可能不会自动清除
  />
</Form>
```

### 场景 2: 表单重置部分字段
**检查点**: 查使用 formRef.set 批量更新多个字段的场景
```jsx
// 需要检查的代码模式
const handleReset = () => {
  // 重置部分字段
  formRef.current.set({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  // 3.7.1 之前，这些字段如果有错误状态，可能不会被清除
};

<Form ref={formRef}>
  <Input name="name" rules={[rules.required]} />
  <Input name="email" rules={[rules.required, rules.email]} />
  <Input name="phone" rules={[rules.required, rules.phone]} />
  <Textarea name="address" rules={[rules.required]} />
  <Button onClick={handleReset}>重置表单</Button>
</Form>
```

### 场景 3: 条件字段的显示与隐藏
**检查点**: 查根据条件动态设置多个字段值的场景
```jsx
// 需要检查的代码模式
const [isCompany, setIsCompany] = useState(false);

const handleTypeChange = (checked) => {
  setIsCompany(checked);
  if (!checked) {
    // 切换为个人时，清空公司相关字段
    formRef.current.set({
      companyName: '',
      taxNumber: '',
      companyAddress: ''
    });
  }
};

<Form ref={formRef}>
  <Checkbox checked={isCompany} onChange={handleTypeChange}>
    公司用户
  </Checkbox>
  
  {isCompany && (
    <>
      <Input 
        name="companyName" 
        rules={[rules.required]}  // 切换时错误状态需要清除
      />
      <Input 
        name="taxNumber" 
        rules={[rules.required, rules.taxId]}  // 切换时错误状态需要清除
      />
      <Input 
        name="companyAddress" 
        rules={[rules.required]}  // 切换时错误状态需要清除
      />
    </>
  )}
</Form>
```

### 场景 4: 表单数据的批量导入
**检查点**: 查从外部数据源批量设置表单值的场景
```jsx
// 需要检查的代码模式
const handleImportData = async () => {
  const data = await fetchUserData();
  // 批量设置多个字段
  formRef.current.set({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    phone: data.phone || '',
    address: data.address || ''
  });
  // 3.7.1 之前，已有错误的字段可能不会自动重新校验
};

<Form ref={formRef}>
  <Input name="firstName" rules={[rules.required]} />
  <Input name="lastName" rules={[rules.required]} />
  <Input name="email" rules={[rules.required, rules.email]} />
  <Input name="phone" rules={[rules.phone]} />
  <Textarea name="address" rules={[rules.maxLength(200)]} />
  <Button onClick={handleImportData}>导入数据</Button>
</Form>
```

### 场景 5: 表单步骤切换
**检查点**: 查多步骤表单中切换步骤时批量更新字段的场景
```jsx
// 需要检查的代码模式
const [step, setStep] = useState(1);

const handlePrevStep = () => {
  if (step === 3) {
    // 从第3步返回第2步时，可能需要清空第3步的部分数据
    formRef.current.set({
      paymentMethod: '',
      cardNumber: '',
      cardHolder: ''
    });
  }
  setStep(step - 1);
};

<Form ref={formRef}>
  {step === 1 && (
    // 第1步：基本信息
    <div>...</div>
  )}
  
  {step === 2 && (
    // 第2步：详细信息
    <div>...</div>
  )}
  
  {step === 3 && (
    // 第3步：支付信息
    <>
      <Select 
        name="paymentMethod" 
        data={paymentMethods}
        rules={[rules.required]}
      />
      <Input 
        name="cardNumber" 
        rules={[rules.required, rules.creditCard]}
      />
      <Input 
        name="cardHolder" 
        rules={[rules.required]}
      />
    </>
  )}
  
  <Button onClick={handlePrevStep}>上一步</Button>
</Form>
```

### 场景 6: 动态表单模板切换
**检查点**: 查根据模板类型批量设置不同字段组合的场景
```jsx
// 需要检查的代码模式
const templates = {
  basic: { name: '张三', age: 25 },
  advanced: { name: '李四', age: 30, education: '本科', experience: 5 }
};

const handleTemplateChange = (templateType) => {
  const template = templates[templateType];
  // 应用模板时批量设置字段
  formRef.current.set(template);
};

<Form ref={formRef}>
  <Select 
    data={['basic', 'advanced']}
    onChange={handleTemplateChange}
    placeholder="选择模板"
  />
  
  <Input name="name" rules={[rules.required]} />
  <Input name="age" type="number" rules={[rules.required, rules.min(18)]} />
  <Input name="education" rules={[rules.required]} />
  <Input name="experience" type="number" rules={[rules.min(0)]} />
</Form>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了批量设置字段值时的错误状态管理问题，提升了表单联动场景的用户体验
