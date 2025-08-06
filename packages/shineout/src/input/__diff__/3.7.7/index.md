# Input 组件 3.7.7 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.7
- 包含 Beta 版本: 3.7.7-beta.1 ~ 3.7.7-beta.9
- 发布日期: 2025-07-16

## 变更概要

本版本修复了 Input 组件的 `autoSelect` 属性在某些场景下无法自动选中所有文本的问题。

## 详细变更

### 3.7.7-beta.3
- **修复问题**: 修复 Input 的 `autoSelect` 属性在某些场景下无法自动选中所有文本的问题
- **PR**: [#1245](https://github.com/sheinsight/shineout-next/pull/1245)
- **影响组件**: Input
- **问题原因**: 自动选中逻辑在特定条件下未能正确执行

## 代码变更分析

### 修改文件
- `packages/base/src/input/input.tsx`

### 关键改动
优化了 `autoSelect` 属性的实现逻辑，确保在各种场景下都能正确地自动选中输入框中的所有文本。

## 受影响的使用场景

### 核心问题分析
`autoSelect` 属性用于在输入框获得焦点时自动选中所有文本，这个功能在某些特定场景下可能无法正常工作。

### 场景 1: 基本的自动选中功能
**检查点**: 查使用 autoSelect 属性的 Input 组件
```jsx
// 需要检查的代码模式
<Input 
  value={value}
  onChange={setValue}
  autoSelect
  placeholder="Click to select all"
/>

// 在表单中使用
<Form.Item label="Code">
  <Input 
    name="code"
    defaultValue="ABC123"
    autoSelect
    placeholder="Auto select on focus"
  />
</Form.Item>

// 带前后缀的输入框
<Input 
  autoSelect
  prefix="$"
  suffix=".00"
  defaultValue="100"
  placeholder="Price"
/>
```

### 场景 2: 动态渲染的 Input
**检查点**: 查在条件渲染或动态生成的 Input 中使用 autoSelect 的场景
```jsx
// 需要检查的代码模式
const [showInput, setShowInput] = useState(false);

{showInput && (
  <Input 
    autoSelect
    defaultValue="Dynamic content"
    onFocus={() => {
      // v3.7.6 版本可能无法自动选中
      // v3.7.7 版本已修复
      console.log('Input focused');
    }}
  />
)}

// 列表中的动态输入框
{items.map((item, index) => (
  <Input 
    key={item.id}
    value={item.value}
    autoSelect
    onChange={(v) => updateItem(index, v)}
    placeholder="Edit value"
  />
))}
```

### 场景 3: Modal/Drawer 中的 autoSelect
**检查点**: 查在弹出层中使用 autoSelect 的场景
```jsx
// 需要检查的代码模式
<Modal 
  visible={visible} 
  onClose={handleClose}
  afterOpen={() => {
    // Modal 打开后可能需要手动聚焦
    inputRef.current?.focus();
  }}
>
  <Form>
    <Form.Item label="Name">
      <Input 
        ref={inputRef}
        autoSelect
        defaultValue={editingName}
        placeholder="Edit name"
      />
    </Form.Item>
  </Form>
</Modal>

// Drawer 中的使用
<Drawer visible={drawerVisible}>
  <Input 
    autoSelect
    value={searchValue}
    onChange={setSearchValue}
    placeholder="Search..."
    autoFocus
  />
</Drawer>
```

### 场景 4: 编辑模式切换
**检查点**: 查在编辑/只读模式切换时使用 autoSelect 的场景
```jsx
// 需要检查的代码模式
const [editMode, setEditMode] = useState(false);

{editMode ? (
  <Input 
    autoSelect
    value={text}
    onChange={setText}
    onBlur={() => {
      setEditMode(false);
      saveText(text);
    }}
    autoFocus
  />
) : (
  <div onClick={() => setEditMode(true)}>
    {text || 'Click to edit'}
  </div>
)}

// 表格中的内联编辑
const EditableCell = ({ value, onChange }) => {
  const [editing, setEditing] = useState(false);
  
  return editing ? (
    <Input 
      autoSelect
      defaultValue={value}
      onBlur={(e) => {
        setEditing(false);
        onChange(e.target.value);
      }}
      autoFocus
    />
  ) : (
    <div onClick={() => setEditing(true)}>{value}</div>
  );
};
```

### 场景 5: 程序化聚焦与 autoSelect
**检查点**: 查通过程序控制聚焦并期望自动选中的场景
```jsx
// 需要检查的代码模式
const inputRef = useRef<any>(null);

const handleAction = () => {
  // 程序化聚焦
  inputRef.current?.focus();
  // v3.7.7 确保 autoSelect 在程序化聚焦时也能工作
};

<div>
  <Button onClick={handleAction}>Focus Input</Button>
  <Input 
    ref={inputRef}
    autoSelect
    defaultValue="Will be selected"
    placeholder="Click button to focus"
  />
</div>

// 快捷键触发聚焦
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
  };
  
  document.addEventListener('keydown', handleKeyPress);
  return () => document.removeEventListener('keydown', handleKeyPress);
}, []);

<Input 
  ref={searchInputRef}
  autoSelect
  placeholder="Press Ctrl+F to focus"
/>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了 autoSelect 功能的可靠性问题，提升了用户体验