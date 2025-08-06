# Input 组件 3.6.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.2
- 包含 Beta 版本: 3.6.2-beta.1 ~ 3.6.2-beta.6
- 发布日期: 2025-04-03

## 变更概要

本版本修复了 Input.Group 的 `seperate` 属性在一些组合场景下的样式问题。

## 详细变更

### 3.6.2-beta.6
- **修复问题**: 修复 Input.Group 的 `seperate` 在一些组合场景下的样式问题
- **PR**: [#1038](https://github.com/sheinsight/shineout-next/pull/1038)
- **影响组件**: Input.Group
- **问题原因**: 在某些特定的组件组合下，`seperate` 属性的样式渲染存在问题

## 代码变更分析

### 修改文件
- `packages/shineout-style/src/input/input-border.ts`
- `packages/shineout-style/src/input/input.ts`

### 关键改动
修复了 `seperate` 属性在不同组件组合下的样式兼容性问题，确保独立边框在各种场景下都能正确显示。

## 受影响的使用场景

### 核心问题分析
此问题主要影响使用了 `seperate` 属性的 Input.Group 组件，特别是在与其他组件（如 Select、DatePicker、Button 等）组合使用时的样式表现。

### 场景 1: Input.Group 与多种组件组合
**检查点**: 查使用 seperate 属性并组合多种不同组件的场景
```jsx
// 需要检查的代码模式
<Input.Group seperate style={{ width: 400 }}>
  <Select keygen data={['Option1', 'Option2']} width={100} />
  <Input placeholder="please enter" />
  <Button type="primary">Search</Button>
</Input.Group>

// 与日期选择器组合
<Input.Group seperate>
  <DatePicker placeholder="Start date" />
  <span style={{ padding: '0 8px' }}>to</span>
  <DatePicker placeholder="End date" />
</Input.Group>

// 复杂组合
<Input.Group seperate>
  <Select keygen data={['http://', 'https://']} width={100} />
  <Input placeholder="domain" />
  <Select keygen data={['.com', '.org', '.net']} width={80} />
</Input.Group>
```

### 场景 2: 不同尺寸的 seperate Input.Group
**检查点**: 查不同 size 属性下使用 seperate 的场景
```jsx
// 需要检查的代码模式
<Input.Group seperate size="small" style={{ width: 300 }}>
  <Input placeholder="Small size" />
  <Button size="small">Go</Button>
</Input.Group>

<Input.Group seperate size="large" style={{ width: 300 }}>
  <Select keygen data={['USD', 'CNY']} width={80} size="large" />
  <Input type="number" placeholder="0.00" size="large" />
</Input.Group>

// 默认尺寸
<Input.Group seperate>
  <Input placeholder="First" />
  <Input placeholder="Second" />
  <Input placeholder="Third" />
</Input.Group>
```

### 场景 3: 嵌套在表单中的 seperate Input.Group
**检查点**: 查在 Form.Item 中使用 seperate Input.Group 的场景
```jsx
// 需要检查的代码模式
<Form>
  <Form.Item label="Price Range">
    <Input.Group seperate>
      <Input.Number 
        name="minPrice"
        placeholder="Min"
        min={0}
      />
      <span style={{ padding: '0 8px' }}>-</span>
      <Input.Number 
        name="maxPrice"
        placeholder="Max"
        min={0}
      />
    </Input.Group>
  </Form.Item>

  <Form.Item label="Search">
    <Input.Group seperate>
      <Select 
        keygen 
        data={['Title', 'Content', 'Author']} 
        width={100}
        defaultValue="Title"
      />
      <Input 
        placeholder="Enter keyword"
        suffix={<icons.Search />}
      />
    </Input.Group>
  </Form.Item>
</Form>
```

### 场景 4: 带有自定义样式的 seperate Input.Group
**检查点**: 查添加了自定义样式或 className 的 seperate Input.Group
```jsx
// 需要检查的代码模式
<Input.Group 
  seperate 
  className="custom-input-group"
  style={{ 
    width: 400,
    backgroundColor: '#f5f5f5',
    padding: '8px'
  }}
>
  <Input placeholder="Custom styled" />
  <Button>Action</Button>
</Input.Group>

// 主题定制场景
<div className="dark-theme">
  <Input.Group seperate>
    <Input placeholder="Dark theme input" />
    <Select keygen data={['Option1', 'Option2']} width={120} />
  </Input.Group>
</div>
```

### 场景 5: 动态内容的 seperate Input.Group
**检查点**: 查内容动态变化的 seperate Input.Group 场景
```jsx
// 需要检查的代码模式
const [showExtra, setShowExtra] = useState(false);

<Input.Group seperate style={{ width: 400 }}>
  <Input placeholder="Always visible" />
  {showExtra && (
    <>
      <Select keygen data={['AND', 'OR']} width={80} />
      <Input placeholder="Extra condition" />
    </>
  )}
  <Button onClick={() => setShowExtra(!showExtra)}>
    {showExtra ? 'Less' : 'More'}
  </Button>
</Input.Group>

// 列表场景
{items.map((item, index) => (
  <Input.Group key={index} seperate style={{ marginBottom: 8 }}>
    <Input 
      value={item.value}
      onChange={(v) => updateItem(index, v)}
    />
    <Button onClick={() => removeItem(index)}>Remove</Button>
  </Input.Group>
))}
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 仅修复样式问题，不影响功能逻辑