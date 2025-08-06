# Input 组件 3.7.3 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.3
- 包含 Beta 版本: 3.7.3-beta.1 ~ 3.7.3-beta.8
- 发布日期: 2025-06-17

## 变更概要

本版本修复了 Input 组件的精度丢失问题和 onEnterPress 事件触发问题。

## 详细变更

### 3.7.3-beta.4
- **修复问题**: 修复 Input 的 onEnterPress 事件在开启了 Form 的 scrollToError 后偶现的无法触发的问题
- **PR**: [#1182](https://github.com/sheinsight/shineout-next/pull/1182)
- **影响组件**: Input
- **问题原因**: Form 的 scrollToError 功能与 onEnterPress 事件处理存在冲突

### 3.7.3-beta.1
- **修复问题**: 修复 Input 设置了 `digits` 和 `autoFix` 属性时，偶现的精度丢失问题
- **PR**: [#1178](https://github.com/sheinsight/shineout-next/pull/1178)
- **影响组件**: Input (type="number")
- **问题原因**: 自动修正小数位数时的浮点数计算精度问题

## 代码变更分析

### 修改文件
1. onEnterPress 修复：
   - `packages/base/src/input/input.tsx`

2. 精度丢失修复：
   - `packages/hooks/src/components/use-input/use-input-number.ts`

### 关键改动
1. 优化了 onEnterPress 事件的处理逻辑，避免与 Form 的 scrollToError 功能冲突
2. 改进了 autoFix 功能的数值处理算法，解决浮点数精度问题

## 受影响的使用场景

### 核心问题分析
1. **onEnterPress 事件问题**：影响在表单中使用 Input 并监听回车事件，同时开启了 scrollToError 的场景
2. **精度丢失问题**：影响使用 digits 和 autoFix 组合进行自动小数位修正的场景

### 场景 1: 表单中的回车提交
**检查点**: 查在 Form 中使用 Input 并监听 onEnterPress，同时开启 scrollToError 的场景
```jsx
// 需要检查的代码模式
<Form 
  scrollToError
  onSubmit={handleSubmit}
>
  <Form.Item label="Username" required>
    <Input 
      name="username"
      placeholder="Press Enter to submit"
      onEnterPress={(e) => {
        // v3.7.2 版本在 scrollToError 开启时可能无法触发
        // v3.7.3 版本已修复
        console.log('Enter pressed');
        form.current?.submit();
      }}
      rules={[{ required: true, message: 'Username is required' }]}
    />
  </Form.Item>
  
  <Form.Item label="Password" required>
    <Input.Password 
      name="password"
      onEnterPress={() => {
        // 触发表单提交
        form.current?.submit();
      }}
      rules={[{ required: true, message: 'Password is required' }]}
    />
  </Form.Item>
</Form>
```

### 场景 2: 带自动修正的小数输入
**检查点**: 查同时使用 digits 和 autoFix 的数字输入场景
```jsx
// 需要检查的代码模式
<Input.Number 
  value={price}
  onChange={(v) => {
    // v3.7.2 版本可能出现精度丢失
    // 如输入 1.999 自动修正为 2 位小数时可能变成 1.99 或 2.00
    // v3.7.3 版本已修复
    setPrice(v);
  }}
  digits={2}
  autoFix
  placeholder="Auto fix to 2 decimals"
/>

// 金额计算场景
<Form.Item label="Unit Price">
  <Input 
    type="number"
    name="unitPrice"
    digits={4}
    autoFix
    placeholder="0.0000"
    onChange={(v) => {
      // 精度敏感的计算
      calculateTotal(v, quantity);
    }}
  />
</Form.Item>
```

### 场景 3: 多字段表单的快速输入
**检查点**: 查使用回车键快速切换表单字段的场景
```jsx
// 需要检查的代码模式
const inputRefs = useRef<Array<any>>([]);

<Form scrollToError>
  {fields.map((field, index) => (
    <Form.Item key={field.name} label={field.label}>
      <Input 
        ref={el => inputRefs.current[index] = el}
        name={field.name}
        placeholder={field.placeholder}
        onEnterPress={() => {
          // 回车切换到下一个字段
          if (index < fields.length - 1) {
            inputRefs.current[index + 1]?.focus();
          } else {
            // 最后一个字段提交表单
            form.current?.submit();
          }
        }}
      />
    </Form.Item>
  ))}
</Form>
```

### 场景 4: 高精度数值输入
**检查点**: 查需要高精度数值计算的场景
```jsx
// 需要检查的代码模式
const [exchangeRate, setExchangeRate] = useState<string | number>('');

<div>
  <Form.Item label="Exchange Rate">
    <Input.Number 
      value={exchangeRate}
      onChange={setExchangeRate}
      digits={6}
      autoFix
      placeholder="e.g., 6.123456"
    />
  </Form.Item>
  
  <Form.Item label="Amount">
    <Input 
      type="number"
      value={amount}
      onChange={(v) => {
        setAmount(v);
        // 高精度计算
        if (v && exchangeRate) {
          const result = Number(v) * Number(exchangeRate);
          // v3.7.3 确保精度不丢失
          setConvertedAmount(result.toFixed(6));
        }
      }}
      digits={2}
      autoFix
    />
  </Form.Item>
</div>
```

### 场景 5: 条件验证与回车提交
**检查点**: 查有条件验证规则且使用回车提交的场景
```jsx
// 需要检查的代码模式
<Form 
  scrollToError
  onSubmit={handleSubmit}
>
  <Form.Item label="Email">
    <Input 
      name="email"
      type="email"
      placeholder="Optional email"
      onEnterPress={() => {
        // 根据条件决定是否提交
        if (isEmailRequired && !email) {
          message.warning('Email is required');
        } else {
          form.current?.submit();
        }
      }}
      rules={isEmailRequired ? [
        { required: true, message: 'Email is required' },
        { type: 'email', message: 'Invalid email format' }
      ] : []}
    />
  </Form.Item>
  
  <Form.Item label="Price">
    <Input.Number 
      name="price"
      digits={2}
      autoFix
      min={0.01}
      placeholder="Min 0.01"
      onEnterPress={() => {
        // 验证通过后提交
        form.current?.validate().then(() => {
          form.current?.submit();
        });
      }}
    />
  </Form.Item>
</Form>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了事件触发和精度计算问题，提升了组件的可靠性