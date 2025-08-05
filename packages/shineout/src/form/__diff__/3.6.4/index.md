# Form 组件 3.6.4 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.4
- 包含 Beta 版本: 3.6.4-beta.1 ~ 3.6.4-beta.8
- 发布日期: 2025-04-17

## 变更概要

本版本修复了两个重要问题：
1. ReactDOM.render 模式下并发设置 value 导致字段值丢失的问题
2. 表单组件 key 变更后 defaultValue 无法设置成功的问题

## 详细变更

### 3.6.4-beta.4
- **修复问题**: Form 在 ReactDOM.render 模式下并发设置 value 后导致某些字段值丢失的问题
- **PR**: [#1067](https://github.com/sheinsight/shineout-next/pull/1067)
- **影响组件**: Form
- **问题原因**: 默认值更新时会提前触发外部的 onChange，导致外部多次 setFormValue 不能合并生效

### 3.6.4-beta.5
- **修复问题**: Form 在表单组件的 key 变更后 defaultValue 无法设置成功的问题
- **PR**: [#1068](https://github.com/sheinsight/shineout-next/pull/1068)
- **影响组件**: 所有表单组件
- **问题原因**: 组件 key 变更导致重新挂载时，defaultValue 的处理逻辑存在问题

## 代码变更分析

### 修改文件
1. `packages/hooks/src/components/use-form/use-form.ts`
2. `packages/hooks/src/components/use-form/use-form-control/use-form-control.ts`

### 关键改动 1 - ReactDOM.render 并发问题
```javascript
// 修改前：同步更新默认值
update();
- updateDefaultValue();

// 修改后：异步更新默认值，避免过早触发 onChange
update();
+ // 默认值上位时会提前触发外部的onChange, 导致外部的多次setFormValue不能合并后生效的问题(ReactDOM.render方式渲染)
+ setTimeout(updateDefaultValue);
```

### 关键改动 2 - key 变更问题
```javascript
// 新增组件挂载状态跟踪
+ const { current: context } = React.useRef<FormControlContext>({
+   mounted: false,
+ });

// 添加 key 变更警告
+ if (context.mounted) {
+   devUseWarning.warn(
+     'Please avoid modifying the name property after the component has mounted, as this may result in unintended behavior or errors.',
+   );
+ }
```

## 受影响的使用场景

### 核心问题分析
1. **ReactDOM.render 并发问题**：在使用旧版 ReactDOM.render API 时，连续多次调用 setFormValue 可能导致部分字段值丢失
2. **key 变更问题**：当表单组件的 key 属性变化导致组件重新挂载时，defaultValue 可能无法正确应用

### 场景 1: ReactDOM.render 模式下的表单值更新
**检查点**: 查使用 ReactDOM.render API 且存在连续多次更新表单值的场景
```jsx
// 需要检查的代码模式
// 使用旧版 ReactDOM.render API
ReactDOM.render(<App />, document.getElementById('root'));

// App 组件中连续更新表单值
const [formValue, setFormValue] = useState({});

const handleBatchUpdate = () => {
  setFormValue({ field1: 'value1' });
  setFormValue({ field2: 'value2' });  // 可能丢失
  setFormValue({ field3: 'value3' });  // 可能丢失
};

<Form value={formValue} onChange={setFormValue}>
  <Input name="field1" />
  <Input name="field2" />
  <Input name="field3" />
</Form>
```

### 场景 2: 表单组件使用动态 key
**检查点**: 查表单组件设置了动态 key 且使用 defaultValue 的场景
```jsx
// 需要检查的代码模式
const [userId, setUserId] = useState(1);

<Form>
  <Input 
    key={userId}  // key 会变化
    name="username" 
    defaultValue="default_user"  // defaultValue 可能失效
  />
  <Select
    key={`select_${userId}`}
    name="role"
    defaultValue="guest"
    data={roles}
  />
</Form>
```

### 场景 3: 列表渲染中的表单组件
**检查点**: 查在列表渲染中使用 key 和 defaultValue 的表单组件
```jsx
// 需要检查的代码模式
{items.map((item, index) => (
  <div key={item.id}>
    <Input 
      key={`name_${item.id}`}
      name={`items[${index}].name`}
      defaultValue={item.defaultName}
    />
    <Input
      key={`value_${item.id}`} 
      name={`items[${index}].value`}
      defaultValue={item.defaultValue}
    />
  </div>
))}
```

### 场景 4: 条件渲染中切换组件 key
**检查点**: 查根据条件切换组件 key 的场景
```jsx
// 需要检查的代码模式
const [mode, setMode] = useState('edit');

<Form>
  <Input
    key={mode}  // mode 切换时 key 变化
    name="content"
    defaultValue={mode === 'edit' ? 'Edit mode' : 'View mode'}
  />
</Form>
```

### 场景 5: 多次同步调用表单更新方法
**检查点**: 查在事件处理函数中多次同步调用表单更新的场景
```jsx
// 需要检查的代码模式
const handleComplexUpdate = () => {
  // 连续调用可能导致问题
  formRef.current.set('field1', 'value1');
  formRef.current.set('field2', 'value2');
  formRef.current.set('field3', 'value3');
  
  // 或者
  onChange({ ...value, field1: 'value1' });
  onChange({ ...value, field2: 'value2' });
};
```

## Breaking Changes

无破坏性变更

## 风险等级

中风险 - 修改了表单值更新的时机，可能影响依赖特定更新顺序的代码
