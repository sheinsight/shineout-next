# Checkbox 组件 3.5.6 版本 Diff 报告

## 问题描述

修复 `Checkbox.Group` 在嵌套情况下影响内部选中状态的缺陷。当 Checkbox.Group 嵌套使用时，内层 Group 的选中状态会被外层 Group 影响，导致状态管理混乱。

## 代码变更文件

1. `packages/base/src/checkbox/checkbox.tsx`
2. `packages/base/src/checkbox/checkbox.type.ts`

## 变更代码行

### 1. checkbox.tsx - 增加 onRawChange 处理逻辑
```diff
const Checkbox = <T,>(props: CheckboxProps<T>) => {
  // 在 handleChange 函数中新增
  const handleChange = usePersistFn((checked: boolean) => {
    // ...其他逻辑
    
+   // 如果存在 onRawChange，优先调用
+   if (props.onRawChange) {
+     props.onRawChange(checked ? htmlValue : undefined, checked, htmlValue);
+   }
    onChange?.(checked ? htmlValue : undefined, checked, htmlValue);
  });
}
```

### 2. CheckboxWithContext 组件重构
```diff
const CheckboxWithContext = <T,>(props: CheckboxProps<T>) => {
  return (
-   <GroupContext.Consumer>
-     {(value) => <Checkbox {...props} {...value} />}
-   </GroupContext.Consumer>
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
```

### 3. checkbox.type.ts - 新增内部属性
```diff
+/**
+ * @en Value change callback
+ * @cn 值改变回调函数
+ * @private 内部使用，用于区分不同来源的 onChange
+ */
+onRawChange?: (value: T | undefined, checked: boolean, raw: T) => void;
```

## 变更前后逻辑差异

### 变更前
1. CheckboxWithContext 直接将 props 和 context value 合并传递
2. 嵌套时，外层 Group 的 context 会覆盖内层组件的 props
3. 导致内层 Checkbox 的状态被外层 Group 控制
4. onChange 事件可能被错误地触发或覆盖

### 变更后
1. 引入 `onRawChange` 机制，保存组件自身的 onChange
2. 明确 checked 优先级：`'checked' in props ? props.checked : value.checked`
3. 确保每个 Checkbox 的 onChange 事件独立处理
4. 嵌套的 Checkbox.Group 能够独立管理各自的状态

## 逻辑影响范围
- 修复嵌套 Checkbox.Group 场景下的状态管理问题
- 不影响单层 Checkbox.Group 的正常使用
- 不影响单独使用的 Checkbox 组件
- 新增的 `onRawChange` 为内部 API，不对外暴露

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：这是一个缺陷修复，不会影响现有代码
- **注意**：该版本可能引入了 onChange 触发两次的问题，在 3.5.8 版本中已修复

### 行为变化说明

1. **嵌套 Checkbox.Group 状态独立**：
   - 升级前：内层 Group 的状态被外层 Group 干扰
   - 升级后：每个 Group 独立管理状态
   - 受影响场景：
     ```tsx
     <Checkbox.Group 
       value={['A']} 
       onChange={(value) => console.log('外层:', value)}
     >
       <Checkbox value="A">选项 A</Checkbox>
       
       <Checkbox.Group 
         value={['B']} 
         onChange={(value) => console.log('内层:', value)}
       >
         <Checkbox value="B">选项 B</Checkbox>
         <Checkbox value="C">选项 C</Checkbox>
       </Checkbox.Group>
     </Checkbox.Group>
     // 升级前：点击选项 B/C 可能触发外层 onChange
     // 升级后：内外层 onChange 独立触发
     ```
   - 是否需要调整：不需要，这是缺陷修复

2. **checked 属性优先级明确**：
   - 升级前：context 的 checked 可能覆盖 props.checked
   - 升级后：props.checked 始终优先于 context.checked
   - 受影响场景：
     ```tsx
     <Checkbox.Group value={['A']}>
       <Checkbox value="A" checked={false}>
         {/* 升级前：可能显示为选中（因为 Group value 包含 'A'） */}
         {/* 升级后：一定显示为未选中（props.checked = false） */}
       </Checkbox>
     </Checkbox.Group>
     ```
   - 是否需要调整：检查是否有依赖这种不合理行为的代码

3. **可能的副作用**：
   - 该版本可能导致某些场景下 onChange 触发两次
   - 建议同时升级到 3.5.8 或更高版本以避免此问题