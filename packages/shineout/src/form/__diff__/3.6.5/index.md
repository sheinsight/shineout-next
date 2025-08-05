# Form 组件 3.6.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.5
- 包含 Beta 版本: 3.6.5-beta.1 ~ 3.6.5-beta.12
- 发布日期: 2025-04-17

## 变更概要

本版本修复了 Form.Flow 组件的两个问题：
1. 内容更新不同步的问题
2. 默认 watch 不生效的问题

## 详细变更

### 3.6.5-beta.3
- **修复问题**: Form.Flow 内容更新不同步的问题、Form.Flow 默认 watch 不生效的问题
- **PR**: [#1081](https://github.com/sheinsight/shineout-next/pull/1081)
- **影响组件**: Form.Flow
- **问题原因**: strict 属性默认值处理不当，以及非受控表单的更新逻辑缺失

## 代码变更分析

### 修改文件
1. `packages/base/src/form/form-flow.tsx`
2. `packages/hooks/src/components/use-form/use-form.ts`

### 关键改动 1 - Form.Flow strict 属性处理
```javascript
// 修改前：直接使用 props.strict
const memoizedResult = useMemo(() => {
- if (!props.strict) return null;
  // ...
}, [valueOfNames?.toString()]);

// 修改后：设置默认值 strict = true
+ const { strict = true } = props;
const memoizedResult = useMemo(() => {
+ if (!strict) return null;
  // ...
}, [valueOfNames?.toString()]);
```

### 关键改动 2 - 非受控表单更新
```javascript
// 修改前：非受控表单不更新
if (props.value === context.value) return;

// 修改后：非受控表单也需要更新
if (props.value === context.value) {
+ if (!isControl) update();
  return;
}
```

## 受影响的使用场景

### 核心问题分析
1. **strict 属性问题**：Form.Flow 的 strict 属性未设置默认值，导致默认行为不符合预期
2. **非受控表单更新**：非受控表单中的 Form.Flow 可能无法正确响应数据变化

### 场景 1: Form.Flow 未设置 strict 属性
**检查点**: 查使用 Form.Flow 但未显式设置 strict 属性的场景
```jsx
// 需要检查的代码模式
<Form>
  <Input name="trigger" />
  
  {/* 未设置 strict，3.6.5 之前可能不按预期工作 */}
  <Form.Flow names={['trigger']}>
    {(datum) => (
      <div>触发值：{datum.get('trigger')}</div>
    )}
  </Form.Flow>
</Form>
```

### 场景 2: 非受控表单中的 Form.Flow
**检查点**: 查非受控表单（未设置 value 和 onChange）中使用 Form.Flow 的场景
```jsx
// 需要检查的代码模式
// 非受控表单
<Form>
  <Select name="type" data={types} />
  
  <Form.Flow names={['type']}>
    {(datum) => {
      const type = datum.get('type');
      return type === 'custom' ? (
        <Input name="customValue" placeholder="请输入自定义值" />
      ) : null;
    }}
  </Form.Flow>
</Form>
```

### 场景 3: Form.Flow 依赖多个字段
**检查点**: 查 Form.Flow 监听多个字段且未设置 strict 的场景
```jsx
// 需要检查的代码模式
<Form>
  <Input name="firstName" />
  <Input name="lastName" />
  
  <Form.Flow names={['firstName', 'lastName']}>
    {(datum) => (
      <div>
        全名：{datum.get('firstName')} {datum.get('lastName')}
      </div>
    )}
  </Form.Flow>
</Form>
```

### 场景 4: Form.Flow 中的条件渲染
**检查点**: 查 Form.Flow 内部有条件渲染逻辑的场景
```jsx
// 需要检查的代码模式
<Form>
  <Checkbox name="showAdvanced">显示高级选项</Checkbox>
  
  <Form.Flow names={['showAdvanced']}>
    {(datum) => datum.get('showAdvanced') && (
      <>
        <Input name="advanced1" />
        <Input name="advanced2" />
        <Select name="advanced3" data={options} />
      </>
    )}
  </Form.Flow>
</Form>
```

### 场景 5: 嵌套 Form.Flow
**检查点**: 查嵌套使用 Form.Flow 的场景
```jsx
// 需要检查的代码模式
<Form>
  <Select name="category" data={categories} />
  
  <Form.Flow names={['category']}>
    {(datum) => (
      <>
        <Select name="subCategory" data={getSubCategories(datum.get('category'))} />
        
        <Form.Flow names={['subCategory']}>
          {(innerDatum) => (
            <Input name="details" placeholder={`输入${innerDatum.get('subCategory')}详情`} />
          )}
        </Form.Flow>
      </>
    )}
  </Form.Flow>
</Form>
```

### 场景 6: Form.Flow 与表单提交
**检查点**: 查 Form.Flow 内容影响表单提交逻辑的场景
```jsx
// 需要检查的代码模式
<Form onSubmit={handleSubmit}>
  <Radio.Group name="submitType" data={['now', 'schedule']} />
  
  <Form.Flow names={['submitType']}>
    {(datum) => datum.get('submitType') === 'schedule' && (
      <DatePicker name="scheduleTime" min={new Date()} />
    )}
  </Form.Flow>
  
  <Form.Submit>提交</Form.Submit>
</Form>
```

## Breaking Changes

无破坏性变更，但行为有变化：Form.Flow 的 strict 属性现在默认为 true

## 风险等级

中风险 - Form.Flow 的默认行为发生变化，可能影响依赖原有默认行为的代码
