# Checkbox 组件 3.6.0 版本 Diff 报告

## 问题描述
修复 `Checkbox` 在 Form 中使用且传了 name 时，Checkbox 的 onChange 会触发两次的问题（Regression: since v3.4.3）

## 代码变更文件
- `packages/base/src/checkbox/checkbox.tsx`
- `packages/base/src/checkbox/use-checkbox-inputable.tsx`

## 变更代码行
```diff
// checkbox.tsx
// 兼容Checkbox在createPortal中使用时，无法改变勾选状态的问题
if ('value' in props && props.checked === undefined) {
-  onInputableCheckboxChange(checked);
+  onInputableCheckboxChange(checked, true);
}

// use-checkbox-inputable.tsx
-const onInputableCheckboxChange = (c: boolean) => {
+const onInputableCheckboxChange = (c: boolean, ignoreOnChange?: boolean) => {
  setCheckedState(c);
+  if(ignoreOnChange) return;
  props?.onChange?.(undefined, c, undefined as any);
};
```

## 变更前后逻辑差异
- **变更前**：在 createPortal 场景下调用 `onInputableCheckboxChange` 时会触发 onChange 事件，导致在 Form 中使用时 onChange 被触发两次
- **变更后**：增加 `ignoreOnChange` 参数，在特定场景下（value 存在且 checked 未定义）只更新状态而不触发 onChange 事件

## 逻辑影响范围
- 影响在 Form 中使用且传了 name 属性的 Checkbox
- 修复了 v3.4.3 版本引入的回归问题
- 不影响独立使用的 Checkbox 组件

## 升级注意事项

### 代码兼容性
- 依赖 Checkbox onChange 被调用两次的代码逻辑需要调整

### 行为变化说明
- Form 中的 Checkbox 不再触发两次 onChange，恢复正常行为