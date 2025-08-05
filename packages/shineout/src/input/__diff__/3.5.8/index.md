# Input 组件 3.5.8 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.8
- 包含 Beta 版本: 3.5.8-beta.1 ~ 3.5.8-beta.17
- 发布日期: 2025-02-13

## 变更概要

本版本修复了 Input 组件在开启 `digits` 且值为 0 时依然可以输入小数的问题，这是 3.5.7 版本引入的回归问题。

## 详细变更

### 3.5.8-beta.5
- **修复问题**: 修复 Input 开启 `digits` 是值为 0 的情况下依然可以输入小数的问题（Regression: since v3.5.7）
- **PR**: [#935](https://github.com/sheinsight/shineout-next/pull/935)
- **影响组件**: Input (type="number")
- **问题原因**: 3.5.7 版本在处理 coin 相关问题时，引入了新的回归问题，导致 digits=0 时的整数限制失效

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-input/use-input-number.ts`

### 关键改动
修复了当 `digits` 设置为 0 时的验证逻辑，确保在这种情况下用户无法输入小数点和小数。

## 受影响的使用场景

### 核心问题分析
此问题影响所有设置了 `digits={0}` 希望限制为整数输入的场景。在 3.5.7 版本中，即使设置了 `digits={0}`，用户仍然可以输入小数，这违反了预期行为。

### 场景 1: 整数输入限制
**检查点**: 查使用 digits={0} 限制整数输入的场景
```jsx
// 需要检查的代码模式
<Input 
  type="number"
  digits={0}
  value={quantity}
  onChange={(v) => {
    // v3.5.7 版本即使 digits=0 也能输入小数
    // v3.5.8 版本已修复，只能输入整数
    setQuantity(v);
  }}
  placeholder="digits 0"
  clearable
/>

// 在表单中使用
<Form.Item label="Quantity" required>
  <Input.Number 
    name="quantity"
    digits={0}
    min={1}
    placeholder="Enter quantity"
    rules={[{ required: true, message: 'Please enter quantity' }]}
  />
</Form.Item>
```

### 场景 2: 年龄、人数等整数场景
**检查点**: 查需要严格整数输入的业务场景
```jsx
// 需要检查的代码模式
<Form value={formData} onChange={setFormData}>
  <Form.Item label="Age">
    <Input 
      type="number"
      name="age"
      digits={0}
      min={0}
      max={150}
      placeholder="Enter age"
    />
  </Form.Item>
  
  <Form.Item label="Number of People">
    <Input.Number 
      name="peopleCount"
      digits={0}
      min={1}
      placeholder="Enter number"
    />
  </Form.Item>
</Form>

// 库存数量输入
<Input.Number 
  digits={0}
  value={stock}
  onChange={(v) => {
    // 确保库存数量为整数
    setStock(v);
  }}
  placeholder="Stock quantity"
/>
```

### 场景 3: 带有不同 digits 设置的混合输入
**检查点**: 查同时使用不同 digits 设置的场景
```jsx
// 需要检查的代码模式
const [intValue, setIntValue] = useState<number | string>('');
const [floatValue, setFloatValue] = useState<number | string>('');

<div>
  {/* 整数输入 */}
  <Input 
    type="number"
    digits={0}
    value={intValue}
    onChange={setIntValue}
    placeholder="Integer only"
  />
  
  {/* 小数输入 */}
  <Input 
    type="number"
    digits={2}
    value={floatValue}
    onChange={setFloatValue}
    placeholder="Allow 2 decimals"
  />
</div>
```

### 场景 4: 配置项中的整数限制
**检查点**: 查在配置表单中使用整数限制的场景
```jsx
// 需要检查的代码模式
<Form.Item label="Max Retry Times">
  <Input.Number 
    name="maxRetry"
    digits={0}
    min={0}
    max={10}
    defaultValue={3}
    placeholder="0-10"
  />
</Form.Item>

<Form.Item label="Timeout (seconds)">
  <Input 
    type="number"
    name="timeout"
    digits={0}
    min={1}
    placeholder="Timeout in seconds"
    suffix="s"
  />
</Form.Item>
```

### 场景 5: 带验证的整数输入
**检查点**: 查需要验证整数格式的输入场景
```jsx
// 需要检查的代码模式
const validateInteger = (value: any) => {
  if (value && !Number.isInteger(Number(value))) {
    return 'Please enter an integer';
  }
  return true;
};

<Form.Item label="Employee ID">
  <Input.Number 
    name="employeeId"
    digits={0}
    placeholder="Enter employee ID"
    rules={[
      { required: true, message: 'Employee ID is required' },
      { validator: validateInteger }
    ]}
  />
</Form.Item>

// 动态验证
<Input 
  type="number"
  digits={0}
  value={value}
  onChange={(v) => {
    // v3.5.8 确保不会接收小数值
    if (v !== null && v !== undefined) {
      setValue(Math.floor(Number(v)));
    }
  }}
/>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了回归问题，恢复了 `digits={0}` 的正确行为