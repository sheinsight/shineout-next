# Form 组件 3.5.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.6
- 包含 Beta 版本: 3.5.6-beta.1 ~ 3.5.6-beta.4
- 发布日期: 2025-01-06

## 变更概要

本版本修复了两个回归问题：Form.Field 下的 Input 使用 onChange 设置对象格式值时光标跳转问题，以及 Form.FieldSet 在非结尾位置插入数据时的渲染异常。

## 详细变更

### 3.5.6-beta.4
- **修复问题**: Form.Field 下的 Input 使用 onChange 设置对象格式的值时，光标跳到末尾的问题 (Regression: since v3.4.4)
- **PR**: [#901](https://github.com/sheinsight/shineout-next/pull/901)
- **影响组件**: Form.Field / Input
- **问题原因**: onChange 设置对象值时触发了不必要的重渲染

### 3.5.6-beta.2
- **修复问题**: Form.FieldSet 在非结尾位置插入数据时，数组的渲染显示异常的问题 (Regression: since v3.5.4)
- **PR**: [#889](https://github.com/sheinsight/shineout-next/pull/889)
- **影响组件**: Form.FieldSet
- **问题原因**: 3.5.4 的修改影响了数组中间插入时的渲染逻辑

## 代码变更分析

### 修改文件
- Form.Field 与 Input 的交互逻辑
- Form.FieldSet 的数组渲染逻辑

### 关键改动
1. 修复了 Form.Field 包装 Input 时，onChange 返回对象导致的光标位置问题
2. 修复了 FieldSet 使用 onInsert 在数组中间插入项时的渲染错误

## 受影响的使用场景

### 场景 1: Form.Field 包装 Input 并返回对象值
**检查点**: 查 Form.Field 中 Input 的 onChange 返回对象格式数据的场景
```jsx
// 需要检查的代码模式
<Form.Field name="customField">
  <Input 
    onChange={(value) => {
      // 3.5.6 之前：返回对象会导致光标跳到末尾
      return {
        text: value,
        timestamp: Date.now()
      };
    }}
  />
</Form.Field>
```

### 场景 2: Form.FieldSet 在中间位置插入数据
**检查点**: 查使用 onInsert 在数组非结尾位置插入数据的场景
```jsx
// 需要检查的代码模式
<Form.FieldSet name="items">
  {({ onInsert, index }) => (
    <div>
      <Input name="name" />
      <Button onClick={() => {
        // 3.5.6 之前：在中间插入会导致渲染异常
        onInsert({ name: '' }, index);
      }}>
        在此位置插入
      </Button>
    </div>
  )}
</Form.FieldSet>
```

### 场景 3: 复杂对象的表单字段
**检查点**: 查 Input 需要维护复杂状态的场景
```jsx
// 需要检查的代码模式
<Form.Field 
  name="metadata"
  defaultValue={{ value: '', meta: {} }}
>
  <Input 
    onChange={(val) => ({
      value: val,
      meta: { 
        length: val.length,
        lastModified: new Date()
      }
    })}
  />
</Form.Field>
```

### 场景 4: FieldSet 动态排序场景
**检查点**: 查 FieldSet 支持拖拽排序或手动调整顺序的场景
```jsx
// 需要检查的代码模式
<Form.FieldSet name="sortableItems">
  {({ value, index, onRemove, onInsert, list }) => (
    <div>
      <Input name="content" />
      {index > 0 && (
        <Button onClick={() => {
          // 上移：先删除再在前面插入
          const item = list[index];
          onRemove();
          onInsert(item, index - 1);
        }}>
          上移
        </Button>
      )}
    </div>
  )}
</Form.FieldSet>
```

## Breaking Changes

无破坏性变更，但修复了之前版本引入的回归问题

## 风险等级

**中风险** - 修复了两个影响用户体验的回归问题，建议受影响的用户升级