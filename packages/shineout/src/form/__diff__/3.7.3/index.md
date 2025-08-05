# Form 组件 3.7.3 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.3
- 包含 Beta 版本: 3.7.3-beta.1 ~ 3.7.3-beta.8
- 发布日期: 2025-06-21

## 变更概要

3.7.3 版本修复了 Form 组件的 scrollToError 功能相关的两个问题。

## 详细变更

### 3.7.3-beta.3
- **修复问题**: Form 的 scrollToError 偶现的无法滚动到错误字段位置的问题
- **PR**: [#1181](https://github.com/sheinsight/shineout-next/pull/1181)
- **影响组件**: Form
- **问题原因**: 表单提交时的异步时序问题导致滚动定位不准确

### 3.7.3-beta.4
- **修复问题**: Input 组件的 onEnterPress 事件在开启 Form 的 scrollToError 后偶现无法触发的问题
- **PR**: [#1182](https://github.com/sheinsight/shineout-next/pull/1182)
- **影响组件**: Form + Input
- **问题原因**: scrollToError 导致的焦点处理与 Enter 键事件冲突

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-form/use-form.ts`

### 关键改动
```javascript
// 1. 增加了提交超时常量
const SUBMIT_TIMEOUT = 10;

// 2. 修改 handleSubmitError 中的滚动延时
setTimeout(() => {
  // 滚动到错误位置的逻辑
}, SUBMIT_TIMEOUT + 10);  // 从立即执行改为延时 20ms

// 3. 调整表单提交时的焦点处理顺序
const result = await validateFields(undefined, { ignoreBind: true }).catch((e) => e);
if (activeEl) activeEl.focus();  // 先恢复焦点，再处理结果
if (result === true) {
  props.onSubmit?.((context.value ?? {}) as T);
} else {
  handleSubmitError(result);
}
```

## 受影响的使用场景

### 核心问题分析
这两个问题都与表单提交时的异步处理和焦点管理有关。当开启 scrollToError 后，表单提交失败时会自动滚动到第一个错误字段，这个过程可能会干扰正常的事件处理流程。

### 场景 1: 表单提交后的错误定位
**检查点**: 查开启 scrollToError 的表单，特别是有复杂布局或在弹窗中的表单
```jsx
// 需要检查的代码模式
const rules = Rule();

<Form 
  scrollToError={true}  // 开启自动滚动到错误
  onSubmit={handleSubmit}
>
  {/* 长表单内容 */}
  <Input name="username" rules={[rules.required]} />
  <Input name="email" rules={[rules.required, rules.email]} />
  {/* 更多字段... */}
  <Input name="address" rules={[rules.required]} />
  
  <Form.Submit>提交</Form.Submit>
</Form>

// 3.7.3 之前，如果表单很长，可能偶现无法准确滚动到错误字段
```

### 场景 2: Input 的 Enter 键提交
**检查点**: 查在 Input 中使用 onEnterPress 并且表单开启了 scrollToError 的场景
```jsx
// 需要检查的代码模式
<Form scrollToError={true}>
  <Input 
    name="search"
    placeholder="按 Enter 搜索"
    onEnterPress={(value) => {
      console.log('Enter pressed:', value);
      // 3.7.3 之前，这个事件可能不会触发
    }}
  />
  
  <Input 
    name="username"
    rules={[rules.required]}
    onEnterPress={() => {
      // 自定义的 Enter 处理逻辑
      formRef.current.submit();
    }}
  />
</Form>
```

### 场景 3: 弹窗中的表单滚动
**检查点**: 查在 Modal 或 Drawer 中使用表单并开启 scrollToError 的场景
```jsx
// 需要检查的代码模式
<Modal visible={visible}>
  <Form 
    scrollToError={true}
    onSubmit={handleSubmit}
  >
    {/* 弹窗中的长表单 */}
    <div style={{ maxHeight: 400, overflow: 'auto' }}>
      <Input name="field1" rules={[rules.required]} />
      <Input name="field2" rules={[rules.required]} />
      {/* 更多字段... */}
      <Input name="field20" rules={[rules.required]} />
    </div>
    
    <Form.Submit>提交</Form.Submit>
  </Form>
</Modal>
```

### 场景 4: 多步骤表单的错误定位
**检查点**: 查多步骤表单中使用 scrollToError 的场景
```jsx
// 需要检查的代码模式
const [step, setStep] = useState(1);

<Form 
  scrollToError={true}
  onSubmit={handleSubmit}
>
  {step === 1 && (
    <div>
      <Input name="step1.field1" rules={[rules.required]} />
      <Input name="step1.field2" rules={[rules.required]} />
    </div>
  )}
  
  {step === 2 && (
    <div>
      <Input name="step2.field1" rules={[rules.required]} />
      <Input 
        name="step2.field2" 
        rules={[rules.required]}
        onEnterPress={() => {
          // 触发下一步
          validateStep();
        }}
      />
    </div>
  )}
  
  <Button onClick={() => formRef.current.submit()}>
    提交
  </Button>
</Form>
```

### 场景 5: 嵌套滚动容器中的表单
**检查点**: 查表单在嵌套滚动容器中使用 scrollToError 的场景
```jsx
// 需要检查的代码模式
<div style={{ height: '100vh', overflow: 'auto' }}>
  <div style={{ padding: 20 }}>
    <Form 
      scrollToError={true}
      scrollParent={() => document.querySelector('.custom-scroll-container')}
    >
      <div className="custom-scroll-container" style={{ height: 300, overflow: 'auto' }}>
        <Input name="field1" rules={[rules.required]} />
        <Input name="field2" rules={[rules.required]} />
        {/* 嵌套滚动容器中的表单字段 */}
      </div>
      
      <Form.Submit>提交</Form.Submit>
    </Form>
  </div>
</div>
```

### 场景 6: 快速连续提交的场景
**检查点**: 查可能快速连续触发提交的场景
```jsx
// 需要检查的代码模式
<Form scrollToError={true}>
  <Input 
    name="quickSearch"
    placeholder="输入后按 Enter"
    onEnterPress={() => {
      // 快速按 Enter 可能导致问题
      formRef.current.submit();
    }}
  />
  
  <Input 
    name="username"
    rules={[rules.required]}
    onEnterPress={() => {
      // 另一个 Enter 触发提交
      handleQuickSubmit();
    }}
  />
  
  {/* 多个提交按钮 */}
  <Button onClick={() => formRef.current.submit()}>提交</Button>
  <Button onClick={() => formRef.current.submit()}>快速提交</Button>
</Form>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了 scrollToError 功能的时序问题，提升了表单交互的可靠性