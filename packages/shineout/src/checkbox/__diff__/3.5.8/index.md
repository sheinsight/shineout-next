# Checkbox 组件 3.5.8 版本 Diff 报告

## 问题描述

修复 `Checkbox` 触发两次 `onChange` 的缺陷（Regression: since v3.5.6）。该问题是由 3.5.6 版本修复嵌套 Checkbox.Group 状态问题时引入的副作用，在某些场景下会导致 onChange 事件被重复触发。

## 代码变更文件

`packages/base/src/checkbox/checkbox.tsx`

## 变更代码行

```diff
const CheckboxWithContext = <T,>(props: CheckboxProps<T>) => {
  return (
    <GroupContext.Consumer>
      {(value) => (
        <Checkbox
          {...props}
          {...value}
-         onRawChange={props.onChange}
+         onRawChange={value.onChange && props.onChange ? props.onChange : undefined}
          checked={'checked' in props ? props.checked : value.checked}
        />
      )}
    </GroupContext.Consumer>
  );
};
```

## 变更前后逻辑差异

### 变更前（v3.5.6 引入的问题）
1. 无条件将 `props.onChange` 传递给 `onRawChange` 属性
2. 在 Checkbox 组件的 handleChange 中，会同时调用：
   - `onRawChange`（即 `props.onChange`）
   - `onChange`（来自 context 的 onChange）
3. 导致同一个函数被调用两次

### 变更后（v3.5.8 修复）
1. 添加条件判断：`value.onChange && props.onChange ? props.onChange : undefined`
2. 只有当组件既在 Group 中（`value.onChange` 存在）又有自身的 onChange 时才传递
3. 避免了重复调用同一个 onChange 函数
4. 确保 onChange 事件只被触发一次

## 逻辑影响范围
- 仅影响 v3.5.6 版本引入的 onChange 重复触发问题
- 仅影响在 Checkbox.Group 中使用的 Checkbox 组件
- 不影响单独使用的 Checkbox 组件
- 不影响 3.5.6 版本修复的嵌套 Group 状态问题

## 升级注意事项

### 代码兼容性
- **需要检查**：如果有代码依赖了 v3.5.6-3.5.7 版本中 onChange 被触发两次的行为，需要调整
- **无破坏性变更**：这是一个 bug 修复，恢复了正常的行为

### 行为变化说明

1. **onChange 触发次数恢复正常**：
   - 升级前（v3.5.6-3.5.7）：onChange 事件可能被触发两次
   - 升级后：onChange 事件只触发一次
   - 受影响场景：
     ```tsx
     <Checkbox.Group onChange={groupOnChange}>
       <Checkbox 
         value="option1"
         onChange={(value, checked) => {
           console.log('Checkbox onChange:', value, checked);
           // v3.5.6-3.5.7: 可能打印两次
           // v3.5.8+: 只打印一次
         }}
       >
         选项 1
       </Checkbox>
     </Checkbox.Group>
     ```
   - 是否需要调整：检查是否有依赖重复触发的逻辑

2. **不影响其他功能**：
   - 嵌套 Checkbox.Group 的状态管理功能保持正常
   - 单独使用的 Checkbox 不受影响
   - Checkbox.Group 的整体功能不受影响

3. **版本升级建议**：
   - 如果使用 v3.5.6 版本，建议直接升级到 v3.5.8 或更高版本
   - 避免在 v3.5.6-3.5.7 版本遗留，以免受到 onChange 重复触发问题影响