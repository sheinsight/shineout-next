# Form 组件 3.7.7 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.7
- 包含 Beta 版本: 3.7.7-beta.1 ~ 3.7.7-beta.9
- 发布日期: 2025-07-18

## 变更概要

3.7.7 版本修复了 Form.FieldSet 在插入 undefined 值时子组件不渲染的问题。

## 详细变更

### 3.7.7-beta.8
- **修复问题**: Form.FieldSet 的 onAppend 和 onInsert 在非末尾的位置插入 undefined 时，children 的表单组件不渲染的问题
- **PR**: [#1252](https://github.com/sheinsight/shineout-next/pull/1252)
- **影响组件**: Form.FieldSet
- **问题原因**: 在数组中间插入 undefined 值时，渲染逻辑处理不当

## 代码变更分析

### 修改文件
- `packages/base/src/form/form-fieldset.tsx`
- `packages/hooks/src/utils/object.ts`

### 关键改动
修复了 FieldSet 处理数组值时的渲染逻辑，确保即使插入 undefined 值，子组件也能正确渲染。

## 受影响的使用场景

### 核心问题分析
当使用 Form.FieldSet 管理数组数据时，如果通过 onAppend 或 onInsert 在非末尾位置插入 undefined 值，会导致对应位置的表单组件无法渲染。

### 场景 1: 动态表单列表的插入操作
**检查点**: 查使用 Form.FieldSet 并在中间位置插入新项的场景
```jsx
// 需要检查的代码模式
<Form.FieldSet name="users">
  {({ value = [], onAppend, onInsert, onRemove }) => (
    <>
      {value.map((item, index) => (
        <div key={index}>
          <Input 
            name={`users[${index}].name`}
            placeholder="姓名"
          />
          <Input 
            name={`users[${index}].email`}
            placeholder="邮箱"
          />
          <Button 
            onClick={() => {
              // 在当前项后面插入新项
              // 3.7.7 之前：如果插入 undefined，新项的表单组件可能不渲染
              onInsert(index + 1);
            }}
          >
            在此后插入
          </Button>
          <Button onClick={() => onRemove(index)}>
            删除
          </Button>
        </div>
      ))}
      <Button onClick={() => onAppend()}>
        添加用户
      </Button>
    </>
  )}
</Form.FieldSet>
```

### 场景 2: 带默认值的列表项插入
**检查点**: 查插入操作时使用 undefined 或空对象的场景
```jsx
// 需要检查的代码模式
const handleInsertWithDefault = (index) => {
  // 插入一个空项（undefined）
  onInsert(index, undefined);
  
  // 或者插入一个默认对象
  // onInsert(index, { name: '', email: '' });
};

<Form.FieldSet name="items">
  {({ value = [], onInsert }) => (
    <>
      {value.map((item, index) => (
        <div key={index}>
          <Form.Item label={`项目 ${index + 1}`}>
            <Input name={`items[${index}].title`} />
          </Form.Item>
          <Form.Item>
            <Textarea name={`items[${index}].description`} />
          </Form.Item>
          
          {index < value.length - 1 && (
            <Button onClick={() => handleInsertWithDefault(index + 1)}>
              插入新项
            </Button>
          )}
        </div>
      ))}
    </>
  )}
</Form.FieldSet>
```

### 场景 3: 批量插入操作
**检查点**: 查一次性插入多个项目的场景
```jsx
// 需要检查的代码模式
const handleBatchInsert = (startIndex) => {
  // 批量插入多个空项
  for (let i = 0; i < 3; i++) {
    onInsert(startIndex + i, undefined);
  }
};

<Form.FieldSet name="tasks">
  {({ value = [], onInsert, onAppend }) => (
    <>
      <Button onClick={() => handleBatchInsert(1)}>
        在位置1批量插入3个任务
      </Button>
      
      {value.map((task, index) => (
        <Card key={index}>
          <Input 
            name={`tasks[${index}].name`}
            placeholder="任务名称"
          />
          <Select 
            name={`tasks[${index}].priority`}
            data={['high', 'medium', 'low']}
            placeholder="优先级"
          />
        </Card>
      ))}
    </>
  )}
</Form.FieldSet>
```

### 场景 4: 拖拽排序后的插入
**检查点**: 查拖拽排序功能中的插入操作
```jsx
// 需要检查的代码模式
const handleDrop = (dragIndex, dropIndex) => {
  const dragItem = value[dragIndex];
  
  // 先删除
  onRemove(dragIndex);
  
  // 再插入到新位置
  // 如果 dragItem 是 undefined，可能出现渲染问题
  onInsert(dropIndex, dragItem);
};

<Form.FieldSet name="sortableItems">
  {({ value = [], onInsert, onRemove }) => (
    <DraggableList onDrop={handleDrop}>
      {value.map((item, index) => (
        <DraggableItem key={index} index={index}>
          <Input name={`sortableItems[${index}].content`} />
        </DraggableItem>
      ))}
    </DraggableList>
  )}
</Form.FieldSet>
```

### 场景 5: 模板复制功能
**检查点**: 查复制现有项作为模板插入的场景
```jsx
// 需要检查的代码模式
const handleDuplicate = (index) => {
  const template = value[index];
  // 如果 template 是 undefined，可能导致问题
  onInsert(index + 1, template ? { ...template } : undefined);
};

<Form.FieldSet name="templates">
  {({ value = [], onInsert }) => (
    <>
      {value.map((template, index) => (
        <div key={index}>
          <Input name={`templates[${index}].name`} />
          <Input name={`templates[${index}].pattern`} />
          <Button onClick={() => handleDuplicate(index)}>
            复制此模板
          </Button>
        </div>
      ))}
    </>
  )}
</Form.FieldSet>
```

### 场景 6: 初始化空数组
**检查点**: 查初始化时预填充空项的场景
```jsx
// 需要检查的代码模式
useEffect(() => {
  // 初始化3个空项
  if (!value || value.length === 0) {
    for (let i = 0; i < 3; i++) {
      onAppend(undefined);  // 3.7.7 之前可能导致渲染问题
    }
  }
}, []);

<Form.FieldSet name="prefilledList" defaultValue={[]}>
  {({ value = [], onAppend }) => (
    <>
      {value.map((item, index) => (
        <div key={index}>
          <Input 
            name={`prefilledList[${index}].field`}
            placeholder={`字段 ${index + 1}`}
          />
        </div>
      ))}
    </>
  )}
</Form.FieldSet>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了 FieldSet 插入操作的渲染问题，提升了动态表单的可靠性