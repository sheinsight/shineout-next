# Form 组件 3.5.7 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.7
- 包含 Beta 版本: 3.5.7-beta.1 ~ 3.5.7-beta.9
- 发布日期: 2025-01-14

## 变更概要

本版本修复了两个 Form 相关的问题，并增强了 Form.FieldSet 的 onChange 方法。

## 详细变更

### Bug 修复

#### 3.5.7-beta.6
- **修复问题**: Form 在 Modal 组件中嵌套使用时，子 Form 卸载后父 Form 无法提交的问题
- **PR**: [#914](https://github.com/sheinsight/shineout-next/pull/914)
- **影响组件**: Form
- **问题原因**: 嵌套表单在 Modal 中卸载时，事件处理清理不当

#### 3.5.7-beta.4
- **修复问题**: Form 的 FormRef.validateFields 方法校验数组类型字段不生效的问题
- **PR**: [#909](https://github.com/sheinsight/shineout-next/pull/909)
- **影响组件**: Form
- **问题原因**: validateFields 对数组字段的处理逻辑有误

### 功能增强

#### 3.5.7-beta.5
- **增强功能**: Form.FieldSet children 的 onChange 方法增加第二个参数 options，设置 options.validate 为 false 时，不立即校验该字段
- **PR**: [#912](https://github.com/sheinsight/shineout-next/pull/912)
- **影响组件**: Form.FieldSet

## 代码变更分析

### 修改文件
- Form 的嵌套表单处理逻辑
- FormRef.validateFields 的数组字段校验逻辑
- Form.FieldSet 的 onChange 方法签名

### 关键改动
1. 修复了 Modal 中嵌套表单的生命周期管理
2. 完善了 validateFields 对数组字段的支持
3. 为 FieldSet 的 onChange 添加了控制校验的选项

## 受影响的使用场景

### 场景 1: Modal 中的嵌套表单
**检查点**: 查在 Modal 中使用嵌套 Form 的场景
```jsx
// 需要检查的代码模式
<Form ref={mainFormRef} onSubmit={handleMainSubmit}>
  <Input name="mainField" />
  
  <Modal visible={visible} onClose={handleClose}>
    <Form onSubmit={handleModalSubmit}>
      <Input name="modalField" />
      <Form.Submit>提交</Form.Submit>
    </Form>
  </Modal>
  
  <Form.Submit>
    提交主表单
  </Form.Submit>
</Form>

// 3.5.7 之前：关闭 Modal 后，主表单可能无法提交
```

### 场景 2: validateFields 校验数组字段
**检查点**: 查使用 formRef.validateFields 校验数组类型字段的场景
```jsx
// 需要检查的代码模式
const formRef = useRef();

const handleValidate = async () => {
  try {
    // 3.5.7 之前：数组字段可能无法正确校验
    await formRef.current.validateFields(['items', 'tags[]']);
  } catch (errors) {
    console.log('校验失败', errors);
  }
};

<Form ref={formRef}>
  <Form.FieldSet name="items" rules={[/* ... */]}>
    {/* ... */}
  </Form.FieldSet>
  
  <Select 
    name="tags" 
    multiple
    rules={[{ required: true, message: '请选择标签' }]}
  />
</Form>
```

### 场景 3: FieldSet onChange 跳过校验
**检查点**: 查需要在 FieldSet 中临时跳过校验的场景
```jsx
// 需要检查的代码模式 - 新功能
<Form.FieldSet name="items">
  {({ onChange, value }) => (
    <>
      <Input 
        name="price"
        onChange={(price) => {
          // 3.5.7 新增：可以跳过立即校验
          onChange({ ...value, price }, { validate: false });
          
          // 异步计算其他字段
          calculateTotal(price).then(total => {
            onChange({ ...value, price, total }, { validate: true });
          });
        }}
      />
      <Input name="total" disabled />
    </>
  )}
</Form.FieldSet>
```

### 场景 4: 条件渲染的 Modal 表单
**检查点**: 查条件渲染 Modal 中表单的场景
```jsx
// 需要检查的代码模式
<Form ref={formRef}>
  <Input name="type" />
  
  {showModal && (
    <Modal visible onClose={() => setShowModal(false)}>
      <Form>
        <Input name="detail" />
      </Form>
    </Modal>
  )}
  
  <Form.Submit>提交</Form.Submit>
</Form>
```

### 场景 5: 复杂数组字段校验
**检查点**: 查对嵌套数组或复杂数组结构进行校验的场景
```jsx
// 需要检查的代码模式
const formRef = useRef();

<Form ref={formRef}>
  <Form.FieldSet name="users">
    {() => (
      <Form.FieldSet name="permissions">
        {() => <Checkbox.Group name="roles" />}
      </Form.FieldSet>
    )}
  </Form.FieldSet>
</Form>

// 校验嵌套数组字段
formRef.current.validateFields(['users[].permissions[].roles']);
```

## Breaking Changes

无破坏性变更

## 风险等级

**低风险** - 修复了特定场景的问题，增强功能为可选使用