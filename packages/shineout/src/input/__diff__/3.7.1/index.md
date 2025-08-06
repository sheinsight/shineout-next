# Input 组件 3.7.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.1
- 包含 Beta 版本: 3.7.1-beta.1 ~ 3.7.1-beta.9
- 发布日期: 2025-06-11

## 变更概要

本版本修复了 Input 组件的事件类型定义问题，以及 Input.Group 的 `seperate` 属性的层级和拼写问题。

## 详细变更

### 3.7.1-beta.7
- **修复问题**: 修复 Input 的 onBlur 和 onFocus 事件的参数类型错误问题
- **PR**: [#1161](https://github.com/sheinsight/shineout-next/pull/1161)
- **影响组件**: Input, Textarea
- **问题原因**: TypeScript 类型定义不正确，导致事件参数类型提示错误

### 3.7.1-beta.4
- **修复问题**: 修复 Input.Group 的 `seperate` 在hover时层级高过了Table固定列的问题
- **PR**: [#1158](https://github.com/sheinsight/shineout-next/pull/1158)
- **影响组件**: Input.Group
- **问题原因**: z-index 层级设置不当，导致与 Table 固定列冲突

### 3.7.1-beta.4
- **修复问题**: 修复 Input.Group 的 `seperate` 属性名称拼写错误问题，修正为 `separate`，原 `seperate` 属性仍保留但标记为废弃
- **PR**: [#1158](https://github.com/sheinsight/shineout-next/pull/1158)
- **影响组件**: Input.Group
- **修正内容**: 添加正确拼写的 `separate` 属性，同时保持向后兼容

## 代码变更分析

### 修改文件
1. 事件类型修复：
   - `packages/shineout/src/input/input.type.ts`
   - `packages/shineout/src/textarea/textarea.type.ts`

2. 层级和拼写修复：
   - `packages/base/src/input/input-group.type.ts`
   - `packages/shineout-style/src/input/input.ts`

### 关键改动
1. 修正了 onBlur 和 onFocus 事件的 TypeScript 类型定义
2. 调整了 `seperate` 模式下的 z-index 值，避免与 Table 固定列冲突
3. 添加了正确拼写的 `separate` 属性，同时保留 `seperate` 以保持兼容性

## 受影响的使用场景

### 核心问题分析
1. **事件类型问题**：影响使用 TypeScript 开发且监听 Input 事件的项目
2. **层级冲突问题**：影响在 Table 中使用带 `seperate` 属性的 Input.Group 的场景
3. **属性拼写问题**：提供了正确的拼写选项，但保持了向后兼容

### 场景 1: TypeScript 项目中的事件处理
**检查点**: 查使用 TypeScript 并监听 Input onBlur/onFocus 事件的场景
```tsx
// 需要检查的代码模式
interface FormData {
  username: string;
  email: string;
}

const MyForm: React.FC = () => {
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    // v3.7.0 版本可能有类型错误
    // v3.7.1 版本已修复
    console.log('Blur:', e.target.value);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    console.log('Focus:', e.target.name);
  };

  return (
    <Form>
      <Form.Item label="Username">
        <Input 
          name="username"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </Form.Item>
      
      <Form.Item label="Description">
        <Textarea 
          name="description"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </Form.Item>
    </Form>
  );
};
```

### 场景 2: Table 中使用 seperate Input.Group
**检查点**: 查在 Table 列中使用带 seperate 的 Input.Group 的场景
```jsx
// 需要检查的代码模式
const columns = [
  {
    title: 'Price Range',
    render: (record) => (
      <Input.Group seperate style={{ width: 200 }}>
        <Input.Number 
          value={record.minPrice}
          onChange={(v) => updatePrice(record.id, 'min', v)}
          placeholder="Min"
        />
        <span>-</span>
        <Input.Number 
          value={record.maxPrice}
          onChange={(v) => updatePrice(record.id, 'max', v)}
          placeholder="Max"
        />
      </Input.Group>
    )
  },
  // 固定列
  {
    title: 'Action',
    fixed: 'right',
    render: () => <Button>Edit</Button>
  }
];

<Table 
  columns={columns}
  data={data}
  fixed="both"
/>
```

### 场景 3: 迁移到正确拼写的 separate 属性
**检查点**: 查使用 seperate 属性并考虑迁移的场景
```jsx
// 旧写法（仍然支持但已废弃）
<Input.Group seperate>
  <Input placeholder="Old spelling" />
  <Button>Search</Button>
</Input.Group>

// 新写法（推荐）
<Input.Group separate>
  <Input placeholder="Correct spelling" />
  <Button>Search</Button>
</Input.Group>

// 条件使用
<Input.Group {...(showSeparate ? { separate: true } : {})}>
  <Select keygen data={options} width={100} />
  <Input placeholder="Conditional separate" />
</Input.Group>
```

### 场景 4: 复杂布局中的层级问题
**检查点**: 查在复杂布局（Modal、Drawer、Popover 等）中使用 seperate Input.Group 的场景
```jsx
// 需要检查的代码模式
<Modal visible={visible} onClose={handleClose}>
  <Table columns={columns} data={data}>
    {/* Table 内使用 */}
  </Table>
  
  <div style={{ marginTop: 16 }}>
    <Input.Group seperate>
      <Input placeholder="Search in modal" />
      <Button>Go</Button>
    </Input.Group>
  </div>
</Modal>

// 在 Popover 中使用
<Popover
  content={
    <Input.Group seperate style={{ width: 250 }}>
      <Input placeholder="Filter" />
      <Button size="small">Apply</Button>
    </Input.Group>
  }
>
  <Button>Show Filter</Button>
</Popover>
```

### 场景 5: 事件类型严格检查的场景
**检查点**: 查启用了严格类型检查的 TypeScript 项目
```tsx
// 需要检查的代码模式
const StrictForm: React.FC = () => {
  // 严格类型定义
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    // v3.7.1 确保类型正确
    validateField(name, value);
  };

  const handleTextareaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // 处理多行文本
    processText(value);
  };

  return (
    <>
      <Input 
        onBlur={handleInputBlur}
        onFocus={(e) => {
          // 类型推断应该正确
          e.currentTarget.select();
        }}
      />
      
      <Textarea 
        onBlur={handleTextareaBlur}
        onFocus={(e) => {
          console.log('Textarea focused:', e.currentTarget.rows);
        }}
      />
    </>
  );
};
```

## Breaking Changes

无破坏性变更，但有以下注意事项：
- `seperate` 属性已标记为废弃，建议迁移到 `separate`
- 两个属性目前都可以使用，功能完全相同

## 风险等级

低风险 - 修复了类型定义和样式层级问题，提供了更好的开发体验