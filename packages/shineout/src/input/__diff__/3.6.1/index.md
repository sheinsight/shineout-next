# Input 组件 3.6.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.1
- 包含 Beta 版本: 3.6.1-beta.1 ~ 3.6.1-beta.7
- 发布日期: 2025-03-25

## 变更概要

本版本主要修复了 Input.Group 下的 Input 组件 onBlur/onFocus 事件参数格式问题，以及 Input.Number 输入特定格式小数时的问题。

## 详细变更

### 3.6.1-beta.7
- **修复问题**: 修复 Input.Number 输入"0.0"这种格式时小数点丢失的问题
- **PR**: [#1014](https://github.com/sheinsight/shineout-next/pull/1014)
- **影响组件**: Input.Number
- **问题原因**: 对"0.0"这种特殊格式的处理不当导致小数点被过早清除

### 3.6.1-beta.4
- **修复问题**: 修复 Input.Group 下面的 Input 的 onBlur 和 onFocus 回调函数的参数格式不正确的问题
- **PR**: [#1014](https://github.com/sheinsight/shineout-next/pull/1014)
- **影响组件**: Input.Group 内的 Input 组件
- **问题原因**: 事件参数传递时格式不统一，导致在 Input.Group 环境下的事件参数与单独使用时不一致

## 代码变更分析

### 修改文件
- `packages/base/src/input/input-group.tsx`

### 关键改动
修复了 Input.Group 组件中事件参数的传递格式，确保 onBlur 和 onFocus 事件的参数格式与单独使用 Input 组件时保持一致。

## 受影响的使用场景

### 核心问题分析
1. **Input.Group 事件参数问题**：影响在 Input.Group 中使用 Input 组件并监听 blur/focus 事件的场景
2. **Input.Number 特殊格式处理**：影响输入类似"0.0"、"1.0"等以.0结尾的小数场景

### 场景 1: Input.Group 中监听 blur/focus 事件
**检查点**: 查 Input.Group 中使用 onBlur 或 onFocus 事件处理器的场景
```jsx
// 需要检查的代码模式
<Input.Group style={{ width: 300 }}>
  <Input 
    placeholder="please enter"
    onBlur={(e) => {
      // v3.6.0 版本可能参数格式不正确
      // v3.6.1 版本已修复
      console.log('blur event', e);
      handleBlur(e.target.value);
    }}
    onFocus={(e) => {
      console.log('focus event', e);
    }}
  />
  <Button type="primary">Search</Button>
</Input.Group>

// 组合多个输入框的场景
<Input.Group>
  <Input 
    name="firstName"
    placeholder="First Name"
    onBlur={(e) => validateName(e.target.value)}
  />
  <div>-</div>
  <Input 
    name="lastName"
    placeholder="Last Name"
    onBlur={(e) => validateName(e.target.value)}
  />
</Input.Group>
```

### 场景 2: Form 中使用 Input.Group 并处理事件
**检查点**: 查 Form 中使用 Input.Group 且需要处理 blur/focus 事件的场景
```jsx
// 需要检查的代码模式
<Form value={formValue} onChange={setFormValue}>
  <Form.Item label="Full Name">
    <Input.Group style={{ width: 400 }}>
      <Input 
        name="firstName"
        placeholder="First Name"
        onBlur={(e) => {
          // 可能需要手动触发验证
          form.current?.validateField('firstName');
        }}
      />
      <span style={{ padding: '0 8px' }}>-</span>
      <Input 
        name="lastName"
        placeholder="Last Name"
        onBlur={(e) => {
          form.current?.validateField('lastName');
        }}
      />
    </Input.Group>
  </Form.Item>
</Form>
```

### 场景 3: Input.Number 输入整数后添加小数点
**检查点**: 查 Input.Number 可能输入 x.0 格式数字的场景
```jsx
// 需要检查的代码模式
const [price, setPrice] = useState<string | number>('');

<Input.Number 
  value={price}
  onChange={(v) => {
    // 输入 "1.0" 或 "0.0" 时
    // v3.6.0 版本可能丢失小数点变成 "1" 或 "0"
    // v3.6.1 版本已修复
    setPrice(v);
  }}
  placeholder="0.00"
  clearable
/>

// 在表单中使用
<Form.Item label="Unit Price">
  <Input.Number 
    name="unitPrice"
    placeholder="0.00"
    digits={2}
    onChange={(v) => {
      // 输入过程中可能出现 "10.0" 的情况
      calculateTotal(v);
    }}
  />
</Form.Item>
```

### 场景 4: 带验证的 Input.Group 场景
**检查点**: 查 Input.Group 中需要在 blur 时触发验证的场景
```jsx
// 需要检查的代码模式
<Input.Group>
  <Select 
    keygen 
    data={['+86', '+1', '+44']} 
    width={100}
    onBlur={() => console.log('select blur')}
  />
  <Input 
    type="number"
    placeholder="Phone number"
    onBlur={(e) => {
      // 验证手机号格式
      if (!validatePhone(e.target.value)) {
        setError('Invalid phone number');
      }
    }}
    onFocus={() => setError('')}
  />
</Input.Group>
```

### 场景 5: Input.Group 配合 separate 属性的事件处理
**检查点**: 查使用 separate 属性的 Input.Group 中的事件处理
```jsx
// 需要检查的代码模式
<Input.Group separate style={{ width: 400 }}>
  <Input 
    placeholder="Search keyword"
    onFocus={(e) => {
      // 显示搜索建议
      setShowSuggestions(true);
    }}
    onBlur={(e) => {
      // 延迟隐藏搜索建议
      setTimeout(() => setShowSuggestions(false), 200);
    }}
  />
  <Select 
    keygen 
    data={['All', 'Title', 'Content']} 
    width={100}
    defaultValue="All"
  />
</Input.Group>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了事件参数格式和特殊输入处理的问题，提升了组件的一致性和稳定性