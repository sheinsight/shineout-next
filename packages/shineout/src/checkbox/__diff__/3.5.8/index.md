# Checkbox 组件 3.5.8 版本 Diff 报告

## 问题描述
修复 `Checkbox` 触发两次 `onChange` 的问题（Regression: since v3.5.6）

## 代码变更文件
`packages/base/src/checkbox/checkbox.tsx`

## 变更代码行
```diff
const CheckboxWithContext = <T,>(props: CheckboxProps<T>) => {
  // ...
  return (
    <Consumer>
      {(value) => (
        <Checkbox
          {...props}
          {...value}
-         onRawChange={props.onChange}
+         onRawChange={value.onChange && props.onChange ? props.onChange : undefined}
          checked={'checked' in props ? props.checked : value.checked}
        />
      )}
    </Consumer>
  );
};
```

## 变更前后逻辑差异
- **变更前**：无条件将 `props.onChange` 传递给 `onRawChange`，导致在某些场景下 onChange 被触发两次
- **变更后**：只有当 `value.onChange` 和 `props.onChange` 都存在时才传递 `props.onChange`，避免重复触发

## 逻辑影响范围
- 修复了 v3.5.6 引入的 onChange 双重触发问题
- 影响在 Checkbox.Group 中使用的 Checkbox 组件
- 确保 onChange 事件只被触发一次

## 风险使用场景

### 代码执行风险
- 依赖 onChange 被触发两次的代码逻辑需要调整

### 交互体验差异
- onChange 事件恢复正常，只触发一次