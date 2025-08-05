# Input 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.30
- 发布日期: 2025-03-13

## 变更概要

本版本主要新增了 Input.Group 的 `seperate` 属性支持独立边框样式，并修复了 Input.Number 在输入小数点时的退格删除问题。

## 详细变更

### 3.6.0-beta.25
- **新增功能**: Input.Group 新增 `seperate` 属性：组合到一起的组件有独立的边框
- **PR**: [#992](https://github.com/sheinsight/shineout-next/pull/992)
- **影响组件**: Input.Group
- **功能说明**: 添加 `seperate` 属性后，组合内的每个组件将显示独立的边框，而非共享一个整体边框

### 3.6.0-beta.21
- **修复问题**: 修复 Input.Number 在输入小数点情况下，退格至小数点前时会将小数点删除的问题（Regression: since v3.4.0）
- **PR**: [#989](https://github.com/sheinsight/shineout-next/pull/989)
- **影响组件**: Input.Number
- **问题原因**: 在 onChange 处理逻辑中，对以小数点结尾的值没有特殊处理，导致小数点被过早删除

## 代码变更分析

### 1. Input.Group 新增 seperate 属性

#### 修改文件
- `packages/base/src/input/input-group.type.ts`
- `packages/base/src/input/input-group.tsx`
- `packages/shineout-style/src/input/input-border.ts`
- `packages/shineout-style/src/input/input.ts`

#### 关键改动
```typescript
// packages/base/src/input/input-group.type.ts
export interface InputGroupProps {
  // ... 其他属性
  
  /**
   * @en Whether to seperate the border
   * @cn 是否分离边框
   * @default false
   */
  seperate?: boolean;
}
```

### 2. Input.Number 小数点退格修复

#### 修改文件
- `packages/hooks/src/components/use-input/use-input-number.ts`

#### 关键改动
```javascript
// 修改前
const onInnerChange = usePersistFn((val?: string | number | null) => {
  setInternalInputValue(getStringValue(val));
  if(typeof val === 'string'){
    const num = parseFloat(val);
    if(val === '') {
      // 处理空值逻辑
    }
  }
});

// 修改后
const onInnerChange = usePersistFn((val?: string | number | null) => {
  setInternalInputValue(getStringValue(val));
  if(typeof val === 'string'){
    if(val.endsWith('.')) return  // 新增：如果值以小数点结尾，不触发 onChange
    const num = parseFloat(val);
    if(val === '') {
      // 处理空值逻辑
    }
  }
});
```

## 受影响的使用场景

### 核心问题分析
1. **Input.Group 独立边框功能**：这是一个纯新增的视觉样式功能，影响组合输入框的展示效果，不会影响现有代码
2. **Input.Number 小数点处理**：修复了数字输入框在特定输入序列下的交互问题，提升了用户输入体验

### 场景 1: 需要独立边框样式的组合输入框
**检查点**: 查 Input.Group 组件使用并可能需要独立边框样式的场景
```jsx
// 需要检查的代码模式
<Input.Group seperate>
  <Select keygen data={['Option1', 'Option2']} width={100} />
  <Input placeholder="please enter" />
  <Button type="primary">Search</Button>
</Input.Group>

// 组合日期选择器和输入框
<Input.Group seperate style={{ width: 300 }}>
  <Select keygen data={['Option1', 'Option2']} width={100} defaultValue="Option1" />
  <DatePicker placeholder="please select" style={{ flex: 1 }} />
</Input.Group>

// 带图标的搜索框组合
<Input.Group seperate style={{ width: 300 }}>
  <Select keygen data={['All', 'Product', 'User']} width={100} />
  <Input placeholder="please enter" suffix={<icons.Search />} />
</Input.Group>
```

### 场景 2: Input.Number 输入小数的场景
**检查点**: 查 Input.Number 或 type="number" 的 Input 组件，特别是涉及小数输入的场景
```jsx
// 需要检查的代码模式
const [price, setPrice] = useState<string | number>('');

<Input.Number 
  value={price}
  onChange={(v) => setPrice(v)}
  digits={2}  // 允许2位小数
  placeholder="0.00"
/>

// 或使用 Input 的 number 类型
<Input 
  type="number"
  value={amount}
  onChange={(v) => setAmount(v)}
  placeholder="please enter"
/>

// 带最小值限制的数字输入
<Input.Number 
  min={0}
  value={quantity}
  onChange={handleQuantityChange}
/>
```

### 场景 3: 表单中的金额/价格输入
**检查点**: 查 Form 中使用 Input.Number 输入金额、价格、折扣等需要小数的场景
```jsx
// 需要检查的代码模式
<Form value={formValue} onChange={setFormValue}>
  <Form.Item label="Price" required>
    <Input.Number 
      name="price"
      placeholder="please enter price" 
      digits={2}
      min={0}
      rules={[{ required: true, message: 'Price is required' }]}
    />
  </Form.Item>
  
  <Form.Item label="Discount">
    <Input.Number 
      name="discount"
      placeholder="e.g: 0.85" 
      max={1}
      step={0.01}
      defaultValue={1}
    />
  </Form.Item>
</Form>
```

### 场景 4: 实时计算的数字输入
**检查点**: 查需要实时计算或格式化的数字输入场景
```jsx
// 需要检查的代码模式
const [value, setValue] = useState<string | undefined>();

<Input.Number 
  value={value}
  onChange={(v) => {
    setValue(v);
    // 实时计算逻辑
    if (typeof v === 'number') {
      calculateTotal(v);
    }
  }}
  coin  // 千分位展示
  digits={2}
/>

// 在 Input.Group 中使用
<Input.Group width={300}>
  <Link onClick={onMinus} style={leftBtnStyle}>
    <icons.Minus />
  </Link>
  <Input
    type="number"
    value={number}
    onChange={(v) => setNumber(v)}
    placeholder="please enter"
  />
  <Link onClick={onPlus} style={rightBtnStyle}>
    <icons.Add />
  </Link>
</Input.Group>
```

### 场景 5: 受控模式下的小数点保留
**检查点**: 查受控模式下需要保留输入过程中小数点的场景
```jsx
// 需要检查的代码模式
const [inputValue, setInputValue] = useState<string | number>('0.');

<Input.Number 
  value={inputValue}
  onChange={(v) => {
    // v3.4.0 版本可能会丢失小数点
    // v3.6.0 版本已修复此问题
    setInputValue(v);
  }}
  clearable
/>

// 在表单中的受控使用
<Form.Field name="amount">
  <Input.Number 
    placeholder="0.00"
    digits={2}
    onChange={(v) => {
      console.log('Input.Number onChange', v);
    }}
  />
</Form.Field>
```

### 场景 6: Input.Group 不同组件组合场景
**检查点**: 查使用 Input.Group 组合不同组件的场景，评估是否需要独立边框
```jsx
// 需要检查的代码模式

// URL 输入组合
<Input.Group style={{ width: 300 }}>
  <b>http://</b>
  <Input placeholder="please enter" />
  <b>.com</b>
</Input.Group>

// 需要独立边框的 URL 输入
<Input.Group seperate style={{ width: 300 }}>
  <b style={{ padding: '0 8px' }}>http://</b>
  <Input placeholder="please enter" />
  <b style={{ padding: '0 8px' }}>.com</b>
</Input.Group>

// 不同尺寸的组合输入
<Input.Group size="small" style={{ width: 300 }}>
  <Select keygen data={['USD', 'CNY', 'EUR']} width={80} />
  <Input type="number" placeholder="0.00" />
</Input.Group>

<Input.Group size="large" seperate>
  <Input placeholder="First Name" />
  <div style={{ lineHeight: '38px' }}>-</div>
  <Input placeholder="Last Name" />
</Input.Group>
```

### 场景 7: 数字输入的各种限制场景
**检查点**: 查使用 digits、integerLimit、numType 等属性限制数字输入的场景
```jsx
// 需要检查的代码模式

// 整数输入
<Input 
  type="number"
  digits={0}
  placeholder="digits 0"
  clearable
/>

// 限制小数位数
<Input 
  type="number"
  digits={2}
  placeholder="digits 2"
  clearable
/>

// 自动修正小数位数
<Input 
  type="number"
  digits={3}
  autoFix
  placeholder="digits 3; autoFix"
  clearable
/>

// 正数限制
<Input.Number 
  numType="positive"
  integerLimit={3}
  placeholder="positive; integerLimit 3"
  clearable
/>

// 非负数限制
<Input 
  type="number"
  numType="non-negative"
  placeholder="non-negative"
  clearable
/>
```

### 场景 8: Form.FieldSet 中的嵌套数字输入
**检查点**: 查在 Form.FieldSet 中使用数字输入的场景
```jsx
// 需要检查的代码模式
<Form value={value} onChange={handleChange}>
  <Form.FieldSet name="account">
    <Form.Item label="Balance">
      <Input.Number 
        name="balance"
        digits={2}
        min={0}
        placeholder="0.00"
        coin
      />
    </Form.Item>
    
    <Form.Item label="Credit Limit">
      <Input 
        type="number"
        name="creditLimit"
        digits={2}
        placeholder="10000.00"
      />
    </Form.Item>
  </Form.FieldSet>
</Form>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 仅新增功能和修复 bug，不会影响现有功能的正常使用