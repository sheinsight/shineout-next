# Input 组件 3.5.7 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.7
- 包含 Beta 版本: 3.5.7-beta.1 ~ 3.5.7-beta.7
- 发布日期: 2025-01-14

## 变更概要

本版本主要修复了 Input 组件在开启 `coin`（千分位）属性时的多个显示问题，并优化了数字输入溢出时的交互逻辑。

## 详细变更

### 3.5.7-beta.7
- **修复问题**: 修复 Input 开启 `coin` 情况下初始化数据不展示千分号的问题
- **PR**: [#919](https://github.com/sheinsight/shineout-next/pull/919)
- **影响组件**: Input (type="number" + coin)
- **问题原因**: 初始化时未正确格式化带千分位的数字

### 3.5.7-beta.5
- **修复问题**: 修复 Input 设置 `type='number'` 且开启 `coin` 属性后值为数字 0 时展示异常的问题
- **PR**: [#916](https://github.com/sheinsight/shineout-next/pull/916)
- **影响组件**: Input (type="number" + coin)
- **问题原因**: 对数字 0 的特殊处理不当导致显示异常

### 3.5.7-beta.7
- **优化功能**: 优化 Input 在 `type='number'` 开启 `coin` 下输入溢出内容时的交互逻辑
- **PR**: [#919](https://github.com/sheinsight/shineout-next/pull/919)
- **影响组件**: Input (type="number" + coin)
- **优化内容**: 改善了当输入内容超出限制时的用户体验

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-input/use-input-number.ts`
- `packages/base/src/input/input.tsx`

### 关键改动
1. 修复了千分位格式化的初始化逻辑
2. 增加了对数字 0 的特殊处理
3. 优化了输入溢出时的处理逻辑

## 受影响的使用场景

### 核心问题分析
本版本主要解决了开启千分位显示（coin）功能时的各种边界情况，包括初始化显示、特殊值处理和输入限制。

### 场景 1: 带千分位的金额输入初始化
**检查点**: 查使用 coin 属性且有初始值的 Input 组件
```jsx
// 需要检查的代码模式
const [amount, setAmount] = useState<string | number>(10000);

<Input 
  type="number"
  coin
  value={amount}
  onChange={(v) => setAmount(v)}
  placeholder="0"
/>

// 在表单中使用
<Form defaultValue={{ price: 5000 }}>
  <Form.Item label="Price">
    <Input 
      type="number"
      name="price"
      coin
      placeholder="0"
    />
  </Form.Item>
</Form>

// 初始值为 0 的场景
<Input.Number 
  coin
  defaultValue={0}
  placeholder="Enter amount"
/>
```

### 场景 2: 动态设置千分位数值
**检查点**: 查动态更新带千分位显示的数值输入场景
```jsx
// 需要检查的代码模式
const [price, setPrice] = useState<string | number>('');

// 动态设置为 0
<Button onClick={() => setPrice(0)}>Set to Zero</Button>
<Input.Number 
  coin
  value={price}
  onChange={(v) => {
    // v3.5.6 版本值为 0 时可能显示异常
    // v3.5.7 版本已修复
    setPrice(v);
  }}
/>

// 从接口获取数据
useEffect(() => {
  fetchData().then(data => {
    // data.amount 可能为 0
    setAmount(data.amount);
  });
}, []);

<Input 
  type="number"
  coin
  value={amount}
  onChange={handleAmountChange}
/>
```

### 场景 3: 千分位输入的范围限制
**检查点**: 查带有输入限制的千分位数字输入场景
```jsx
// 需要检查的代码模式
<Input.Number 
  coin
  max={999999}
  value={value}
  onChange={(v) => {
    // 输入超过最大值时的处理
    setValue(v);
  }}
  placeholder="Max: 999,999"
/>

// 带整数位限制
<Input 
  type="number"
  coin
  integerLimit={6}
  value={salary}
  onChange={handleSalaryChange}
  placeholder="Salary"
/>

// 同时限制整数位和小数位
<Input.Number 
  coin
  integerLimit={7}
  digits={2}
  value={budget}
  onChange={(v) => {
    // v3.5.7 优化了溢出时的交互
    setBudget(v);
  }}
/>
```

### 场景 4: 表单中的千分位金额计算
**检查点**: 查在表单中使用千分位输入并进行计算的场景
```jsx
// 需要检查的代码模式
<Form value={formData} onChange={handleFormChange}>
  <Form.Item label="Unit Price">
    <Input.Number 
      name="unitPrice"
      coin
      digits={2}
      placeholder="0.00"
    />
  </Form.Item>
  
  <Form.Item label="Quantity">
    <Input.Number 
      name="quantity"
      placeholder="0"
    />
  </Form.Item>
  
  <Form.Item label="Total">
    <Input.Number 
      coin
      value={formData.unitPrice * formData.quantity || 0}
      disabled
      placeholder="0.00"
    />
  </Form.Item>
</Form>
```

### 场景 5: 货币输入组合场景
**检查点**: 查组合货币符号和千分位输入的场景
```jsx
// 需要检查的代码模式
<Input.Group style={{ width: 300 }}>
  <Select 
    keygen 
    data={['USD', 'CNY', 'EUR']} 
    width={80}
    defaultValue="USD"
  />
  <Input 
    type="number"
    coin
    value={amount}
    onChange={(v) => {
      // 处理货币金额
      setAmount(v);
    }}
    placeholder="0.00"
  />
</Input.Group>

// 带前缀的金额输入
<Input 
  type="number"
  coin
  prefix="$"
  value={price}
  onChange={handlePriceChange}
  placeholder="0"
/>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了千分位显示的问题，提升了用户体验，不影响功能的正常使用