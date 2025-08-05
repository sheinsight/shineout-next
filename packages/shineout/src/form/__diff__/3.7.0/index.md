# Form 组件 3.7.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.0
- 包含 Beta 版本: 3.7.0-beta.1 ~ 3.7.0-beta.44 (缺少 beta.40)
- 发布日期: 2025-06-10

## 变更概要

3.7.0 是一个重要版本，包含了多项新功能和重要修复：
1. 新增 Form.Item 的 keepErrorBelow 属性
2. 修复了 defaultValue 覆盖原值的回归问题
3. 修复了字段值联动时错误状态清除问题

## 详细变更

### 3.7.0-beta.33
- **新功能**: Form.Item 新增 `keepErrorBelow` 属性，错误信息独占一行，不再覆盖提示信息
- **PR**: [#1130](https://github.com/sheinsight/shineout-next/pull/1130)
- **影响组件**: Form.Item
- **功能说明**: 改善了错误信息的显示方式，避免覆盖 tip 提示信息

### 3.7.0-beta.41
- **修复问题**: Form 在同字段表单组件发生挂载卸载时 defaultValue 可能覆盖原值的问题(Regression: since v3.6.4-beta.5)
- **PR**: [#1144](https://github.com/sheinsight/shineout-next/pull/1144)
- **影响组件**: Form 及所有表单组件
- **问题原因**: 3.6.4-beta.5 版本引入的回归问题

### 3.7.1-beta.6
- **修复问题**: Form 设置某字段值的同时设置了其他字段的值，此时其他字段上的错误状态未自动清除的问题
- **PR**: [#1160](https://github.com/sheinsight/shineout-next/pull/1160)
- **影响组件**: Form
- **问题原因**: 字段联动更新时的错误状态管理问题

## 代码变更分析

### 关键改动
本版本主要涉及表单错误显示优化和字段生命周期管理的修复。

## 受影响的使用场景

### 核心问题分析
1. **keepErrorBelow 新功能**：提供了更好的错误信息展示方式
2. **defaultValue 回归问题**：修复了组件重新挂载时的值管理问题
3. **联动错误清除**：改善了表单字段联动时的错误状态管理

### 场景 1: 使用 keepErrorBelow 改善错误显示
**检查点**: 查需要同时显示 tip 和错误信息的表单项
```jsx
// 需要检查的代码模式
const rules = Rule();

<Form>
  <Form.Item 
    label="邮箱"
    tip="请输入常用邮箱"
    keepErrorBelow  // 3.7.0 新增，错误信息显示在下方
  >
    <Input 
      name="email" 
      rules={[rules.required, rules.email]}
    />
  </Form.Item>
</Form>
```

### 场景 2: 同字段组件的动态切换
**检查点**: 查同一个 name 在不同组件间切换且有 defaultValue 的场景
```jsx
// 需要检查的代码模式
const [isTextarea, setIsTextarea] = useState(false);

<Form>
  {isTextarea ? (
    <Textarea 
      name="content" 
      defaultValue="默认内容"  // 切换时可能覆盖已有值
    />
  ) : (
    <Input 
      name="content" 
      defaultValue="默认内容"  // 切换时可能覆盖已有值
    />
  )}
</Form>
```

### 场景 3: 表单字段联动清除错误
**检查点**: 查一个字段变化时同时更新多个字段的场景
```jsx
// 需要检查的代码模式
const formRef = useRef();

const handleTypeChange = (type) => {
  // 同时设置多个字段
  formRef.current.set({
    type: type,
    subType: '',  // 清空关联字段
    options: getDefaultOptions(type)
  });
  // 3.7.0 之前，subType 和 options 的错误状态可能不会清除
};

<Form ref={formRef}>
  <Select 
    name="type" 
    data={types}
    onChange={handleTypeChange}
  />
  <Select 
    name="subType" 
    data={subTypes}
    rules={[rules.required]}  // 有校验规则
  />
  <Checkbox.Group 
    name="options"
    data={options}
    rules={[rules.minLength(1)]}  // 有校验规则
  />
</Form>
```

### 场景 4: 条件渲染中的 defaultValue 管理
**检查点**: 查条件渲染中反复挂载卸载且有 defaultValue 的组件
```jsx
// 需要检查的代码模式
const [showDetail, setShowDetail] = useState(true);

<Form>
  <Checkbox 
    checked={showDetail}
    onChange={setShowDetail}
  >
    显示详情
  </Checkbox>
  
  {showDetail && (
    <>
      <Input 
        name="detail.title" 
        defaultValue="默认标题"  // 重新显示时的值处理
      />
      <Textarea 
        name="detail.description" 
        defaultValue="默认描述"  // 重新显示时的值处理
      />
    </>
  )}
</Form>
```

### 场景 5: 表单重置时的错误状态
**检查点**: 查使用 formRef.reset() 或 Form.Reset 且有复杂联动的场景
```jsx
// 需要检查的代码模式
const handleReset = () => {
  // 重置表单并更新关联数据
  formRef.current.reset();
  formRef.current.set({
    relatedField: 'new value'
  });
};

<Form ref={formRef}>
  <Input name="field1" rules={[rules.required]} />
  <Input name="field2" rules={[rules.email]} />
  <Input name="relatedField" />
  
  <Button onClick={handleReset}>自定义重置</Button>
</Form>
```

### 场景 6: 嵌套表单的错误显示
**检查点**: 查使用 Form.FieldSet 的嵌套表单且需要优化错误显示的场景
```jsx
// 需要检查的代码模式
<Form>
  <Form.FieldSet name="users">
    {({ value = [] }) => 
      value.map((user, index) => (
        <div key={index}>
          <Form.Item 
            label={`用户 ${index + 1}`}
            tip="请填写完整信息"
            keepErrorBelow  // 嵌套表单中的错误显示
          >
            <Input 
              name={`users[${index}].name`}
              rules={[rules.required]}
            />
          </Form.Item>
        </div>
      ))
    }
  </Form.FieldSet>
</Form>
```

## Breaking Changes

无破坏性变更，但新增了 API 功能

## 风险等级

中风险 - 修复了 defaultValue 的回归问题和错误状态管理，可能影响依赖原有行为的代码
