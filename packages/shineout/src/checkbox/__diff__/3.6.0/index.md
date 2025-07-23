# Checkbox 组件 3.6.0 版本 Diff 报告

## 问题描述

修复 `Checkbox` 在 Form 中使用且传了 name 时，Checkbox 的 onChange 会触发两次的缺陷（Regression: since v3.4.3）。该问题是由 v3.4.3 版本修复 createPortal 场景问题时引入的副作用，在 Form 环境中会导致 onChange 事件重复触发。

## 代码变更文件

1. `packages/base/src/checkbox/checkbox.tsx`
2. `packages/base/src/checkbox/use-checkbox-inputable.tsx`

## 变更代码行

### 1. checkbox.tsx - 添加 ignoreOnChange 参数
```diff
const handleChange = usePersistFn((checked: boolean) => {
  if (inputable) {
    // 兼容历史版本的inputable
    onInputableCheckboxChange(checked);
    return;
  }

  // 兼容Checkbox在createPortal中使用时，无法改变勾选状态的问题
  if ('value' in props && props.checked === undefined) {
-   onInputableCheckboxChange(checked);
+   onInputableCheckboxChange(checked, true);
  }
  onChange?.(checked ? htmlValue : undefined, checked, htmlValue);
});
```

### 2. use-checkbox-inputable.tsx - 增加 ignoreOnChange 逻辑
```diff
-const onInputableCheckboxChange = (c: boolean) => {
+const onInputableCheckboxChange = (c: boolean, ignoreOnChange?: boolean) => {
  setCheckedState(c);
+  if(ignoreOnChange) return;
  props?.onChange?.(undefined, c, undefined as any);
};
```

## 变更前后逻辑差异

### 变更前（v3.4.3 引入的问题）
1. v3.4.3 为了修复 createPortal 场景问题，添加了特殊判断
2. 当 `'value' in props && props.checked === undefined` 时，调用 `onInputableCheckboxChange(checked)`
3. 这会在内部触发 `props?.onChange` 回调
4. 在 Form 环境中，同时触发了正常的 onChange 和这里的 onChange，导致重复

### 变更后（v3.6.0 修复）
1. 在 `onInputableCheckboxChange` 函数中添加 `ignoreOnChange` 参数
2. 当 `ignoreOnChange` 为 true 时，只更新内部状态，不触发 onChange 事件
3. 在 createPortal 特殊圼理中传入 `true`，避免重复触发
4. 保持对 createPortal 场景的状态更新支持，但不触发额外的 onChange

## 逻辑影响范围
- 仅影响在 Form 中使用且传了 name 属性的 Checkbox
- 修复了 v3.4.3 版本引入的回归问题
- 不影响独立使用的 Checkbox 组件
- 不影响 Checkbox.Group 中的 Checkbox
- 保持对 createPortal 场景的支持

## 升级注意事项

### 代码兼容性
- **需要检查**：如果有代码依赖了 v3.4.3-3.5.x 版本中 Form 中 Checkbox onChange 被触发两次的行为
- **无破坏性变更**：这是一个回归问题修复，恢复了正常行为

### 行为变化说明

1. **Form 中的 Checkbox 恢复正常**：
   - 升级前：Form 中的 Checkbox onChange 被触发两次
   - 升级后：onChange 只触发一次
   - 受影响场景：
     ```tsx
     <Form>
       <Form.Item name="agree">
         <Checkbox
           onChange={(value, checked) => {
             console.log('Form Checkbox onChange:', value, checked);
             // v3.4.3-3.5.x: 打印两次
             // v3.6.0+: 只打印一次
           }}
         >
           同意协议
         </Checkbox>
       </Form.Item>
     </Form>
     ```
   - 是否需要调整：检查是否有依赖重复触发的逻辑

2. **createPortal 支持保持**：
   - 依然支持在 Modal、Popover 等 createPortal 组件中使用
   - 状态更新功能正常，但不会额外触发 onChange
   - 受影响场景：
     ```tsx
     <Modal visible={visible}>
       <Checkbox
         value={checked}
         onChange={(value) => {
           setChecked(value);
           // v3.4.3-3.5.x: 在 Form 中可能触发两次
           // v3.6.0+: 仅触发一次，但状态依然正常更新
         }}
       >
         选项
       </Checkbox>
     </Modal>
     ```
   - 是否需要调整：不需要，功能保持不变

3. **版本升级路径建议**：
   - 从 v3.4.3-3.5.x 直接升级到 v3.6.0 或更高版本
   - 避免在中间版本停留，以免受到 onChange 重复触发问题影响