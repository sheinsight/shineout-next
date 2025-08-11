# Form 组件 3.5.4 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.4
- 包含 Beta 版本: 3.5.4-beta.1 ~ 3.5.4-beta.17
- 发布日期: 2024-12-12

## 变更概要

本版本修复了两个重要问题：Form.FieldSet 使用 set 方法后的光标失焦问题（3.5.3 引入的回归），以及 Form 嵌套 Form 的提交和重置行为。

## 详细变更

### Bug 修复

#### 3.5.4-beta.3
- **修复问题**: Form.FieldSet 使用 set 方法设置后，输入文本后光标失焦的问题 (Regression: since v3.5.3)
- **PR**: [#851](https://github.com/sheinsight/shineout-next/pull/851)
- **影响组件**: Form.FieldSet
- **问题原因**: 3.5.3 的改动导致使用 formRef.set 更新 FieldSet 数据后，输入框会失去焦点

#### 3.5.4-beta.2
- **修复问题**: Form 嵌套 Form 的提交和重置行为
- **PR**: [#849](https://github.com/sheinsight/shineout-next/pull/849)
- **影响组件**: Form
- **问题原因**: 嵌套表单的事件冒泡处理不当，导致内层表单的提交/重置会影响外层表单

## 代码变更分析

### 关键改动

1. **FieldSet 光标失焦修复**：
   - 问题源于 3.5.3 中对 FieldSet 更新逻辑的优化
   - 修复了 set 方法触发的重新渲染导致的焦点丢失

2. **嵌套表单事件处理**：
   - 改进了表单事件的冒泡控制
   - 确保内层表单的操作不会意外触发外层表单

## 受影响的使用场景

### 场景 1: Form.FieldSet 使用 formRef.set 更新数据（输入失焦问题）

**快速判断**：
如果你的代码不满足以下条件，可以跳过此检查：
- 使用 Form.FieldSet 组件
- 在输入事件（onChange/onBlur）中调用 formRef.set
- 更新的字段名与 FieldSet 的 name 属性相同

**精准检查特征**：
```javascript
// 高风险模式 - 必须检查
// 特征：onChange 中直接调用 formRef.set 更新当前 FieldSet
<Form.FieldSet name="items">
  {() => (
    <Input 
      onChange={(value) => {
        formRef.current.set('items', newItems); // ⚠️ 高风险
      }}
    />
  )}
</Form.FieldSet>

// 低风险模式 - 可以忽略
// 特征：仅在按钮点击等非输入事件中更新
<Button onClick={() => formRef.current.set('items', newItems)}>
  更新数据
</Button>
```

**检查命令建议**：
```bash
# 第一步：粗筛（找出所有 FieldSet + formRef.set 的文件）
grep -l "Form.FieldSet" $(grep -l "formRef.*set" *.jsx)

# 第二步：精筛（检查是否在 onChange 等事件中使用）
grep -A5 -B5 "onChange.*formRef.*set\|formRef.*set.*onChange" <file>
```
```jsx
// 需要检查的代码模式 - 3.5.4 之前会导致失焦
const formRef = useRef();

const updateFieldSetData = () => {
  // 3.5.3 引入的问题：执行后输入框会失去焦点
  formRef.current.set('items', [
    { id: 1, name: 'Item 1', quantity: 10 },
    { id: 2, name: 'Item 2', quantity: 20 }
  ]);
};

<Form ref={formRef}>
  <Form.FieldSet name="items">
    {({ onAppend, onRemove }) => (
      <>
        <Input 
          name="name" 
          placeholder="输入后会失焦（3.5.3）"
        />
        <Input 
          name="quantity" 
          type="number"
        />
        <Button onClick={updateFieldSetData}>
          更新数据
        </Button>
      </>
    )}
  </Form.FieldSet>
</Form>
```

**问题表现**：
- 使用 formRef.set 更新 FieldSet 数据后
- 用户在输入框中输入时，每输入一个字符就会失去焦点
- 需要重新点击输入框才能继续输入

### 场景 2: 动态更新 FieldSet 数组项
**检查点**: 查动态操作 FieldSet 数组项并保持编辑状态的场景
```jsx
// 需要检查的代码模式
const formRef = useRef();
const [editingIndex, setEditingIndex] = useState(null);

const handleUpdateItem = (index, newData) => {
  const items = formRef.current.get('items');
  items[index] = { ...items[index], ...newData };
  // 3.5.3 的问题：这里会导致正在编辑的输入框失焦
  formRef.current.set('items', items);
};

<Form ref={formRef}>
  <Form.FieldSet name="items" defaultValue={[{ name: '', price: 0 }]}>
    {({ value, index }) => (
      <div>
        <Input 
          name="name"
          onFocus={() => setEditingIndex(index)}
          onChange={(name) => {
            // 实时更新其他关联字段
            if (name.length > 0) {
              handleUpdateItem(index, { hasName: true });
            }
          }}
        />
        <Input name="price" type="number" />
      </div>
    )}
  </Form.FieldSet>
</Form>
```

### 场景 3: Form 嵌套 Form
**检查点**: 查表单嵌套使用的场景
```jsx
// 需要检查的代码模式 - 3.5.4 之前可能有问题
<Form 
  onSubmit={(outerData) => {
    console.log('外层表单提交', outerData);
  }}
  onReset={() => {
    console.log('外层表单重置');
  }}
>
  <Input name="outerField" />
  
  {/* 嵌套的内层表单 */}
  <div style={{ border: '1px solid #ccc', padding: 20 }}>
    <Form 
      onSubmit={(innerData) => {
        // 3.5.4 之前：可能会同时触发外层表单的提交
        console.log('内层表单提交', innerData);
      }}
      onReset={() => {
        // 3.5.4 之前：可能会同时触发外层表单的重置
        console.log('内层表单重置');
      }}
    >
      <Input name="innerField" />
      <Form.Submit>提交内层</Form.Submit>
      <Form.Reset>重置内层</Form.Reset>
    </Form>
  </div>
  
  <Form.Submit>提交外层</Form.Submit>
  <Form.Reset>重置外层</Form.Reset>
</Form>
```

**问题表现**：
- 内层表单的提交/重置会冒泡到外层表单
- 导致意外的表单操作

### 场景 4: Modal/Drawer 中的嵌套表单
**检查点**: 查在弹出层中使用嵌套表单的场景
```jsx
// 需要检查的代码模式
const [modalVisible, setModalVisible] = useState(false);

<Form onSubmit={handleMainSubmit}>
  <Input name="mainField" />
  
  <Modal 
    visible={modalVisible}
    footer={null}
  >
    {/* Modal 中的独立表单 */}
    <Form 
      onSubmit={(modalData) => {
        // 3.5.4 之前：可能会触发主表单的提交
        saveModalData(modalData);
        setModalVisible(false);
      }}
    >
      <Input name="modalField" />
      <Form.Submit>保存</Form.Submit>
    </Form>
  </Modal>
  
  <Button onClick={() => setModalVisible(true)}>
    打开Modal
  </Button>
  <Form.Submit>提交主表单</Form.Submit>
</Form>
```

### 场景 5: 条件渲染的嵌套表单
**检查点**: 查根据条件渲染嵌套表单的场景
```jsx
// 需要检查的代码模式
const [showNested, setShowNested] = useState(false);

<Form onSubmit={handleMainSubmit}>
  <Input name="type" />
  
  {showNested && (
    <Form 
      onSubmit={(nestedData) => {
        // 处理嵌套表单数据
        // 3.5.4 之前：需要阻止事件冒泡
        handleNestedSubmit(nestedData);
      }}
    >
      <Input name="nestedField" />
      <Form.Submit>提交嵌套表单</Form.Submit>
    </Form>
  )}
  
  <Form.Submit>提交主表单</Form.Submit>
</Form>
```

## Breaking Changes

无破坏性变更，但修复了 3.5.3 引入的回归问题

## 风险等级

**中风险** - 特别是对于从 3.5.3 升级的用户：

1. **高优先级修复**（3.5.3 的回归）：
   - Form.FieldSet 输入失焦问题严重影响用户体验
   - 如果你的项目在 3.5.3 中遇到此问题，强烈建议升级

2. **中优先级修复**：
   - 嵌套表单的事件处理改进
   - 影响特定的表单嵌套场景

## 升级建议

### 从 3.5.3 升级
**强烈建议升级**，特别是如果你：
- 使用 Form.FieldSet 并通过 formRef.set 更新数据
- 发现输入框频繁失焦的问题
- 使用了嵌套表单

### 从更早版本升级
如果你的项目中有：
- Form.FieldSet 的动态数据更新
- 表单嵌套使用（Form 中包含 Form）
- Modal/Drawer 中的独立表单

建议在升级后重点测试这些场景。

## 版本关联说明

此版本修复了 3.5.3 中引入的回归问题。如果你跳过了 3.5.3 直接升级到 3.5.4，可以避免输入失焦的问题。