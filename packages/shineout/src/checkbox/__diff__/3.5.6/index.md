# Checkbox 组件 3.5.6 版本 Diff 报告

## 问题描述
修复 `Checkbox.Group` 在嵌套情况下影响内部选中状态的问题

## 代码变更文件
- `packages/base/src/checkbox/checkbox.tsx`
- `packages/base/src/checkbox/checkbox.type.ts`

## 变更代码行
```diff
// checkbox.tsx
const Checkbox = <T,>(props: CheckboxProps<T>) => {
  // handleInputChange 中新增
+  if (props.onRawChange) {
+    props.onRawChange(checked ? htmlValue : undefined, checked, htmlValue);
+  }
  onChange?.(checked ? htmlValue : undefined, checked, htmlValue);

// CheckboxWithContext 组件改造
const CheckboxWithContext = <T,>(props: CheckboxProps<T>) => {
  return (
-   <GroupContext.Consumer>{(value) => <Checkbox {...props} {...value} />}</GroupContext.Consumer>
+   <GroupContext.Consumer>
+     {(value) => (
+       <Checkbox
+         {...props}
+         {...value}
+         onRawChange={props.onChange}
+         checked={'checked' in props ? props.checked : value.checked}
+       />
+     )}
+   </GroupContext.Consumer>
  );
};

// checkbox.type.ts 新增属性
+/**
+ * @en Value chane callback
+ * @cn 值改变回调函数
+ */
+onRawChange?: (value: T | undefined, checked: boolean, raw: T) => void;
```

## 变更前后逻辑差异
- **变更前**：嵌套的 Checkbox.Group 会相互影响选中状态，props 和 context value 直接合并可能导致状态混乱
- **变更后**：引入 `onRawChange` 机制，明确区分组件自身的 onChange 和从 context 传入的 onChange；优先使用 props.checked，避免嵌套时状态相互干扰

## 逻辑影响范围
- 修复嵌套 Checkbox.Group 场景下的状态管理问题
- 不影响非嵌套场景的正常使用
- 新增内部 API `onRawChange` 用于区分不同来源的 onChange 事件

## 风险使用场景

### 代码执行风险
- 无直接代码执行风险

### 交互体验差异
- 嵌套 Checkbox.Group 的选中状态不再相互影响，各自独立管理