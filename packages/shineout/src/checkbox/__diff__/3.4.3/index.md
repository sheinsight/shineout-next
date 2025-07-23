# Checkbox 组件 3.4.3 版本 Diff 报告

## 问题描述

修复 `Checkbox` 在 createPortal 中使用时，无法改变勾选状态的缺陷。当 Checkbox 在 Modal、Popover 等使用 React.createPortal 的组件中使用时，点击无法正常切换选中状态。

## 代码变更文件

1. `packages/base/src/checkbox/checkbox.tsx`
2. `packages/base/src/checkbox/use-checkbox-inputable.tsx`

## 变更代码行

### 1. checkbox.tsx - 增加 createPortal 场景特殊处理
```diff
const handleChange = usePersistFn((checked: boolean) => {
  if (inputable) {
    // 兼容历史版本的inputable
    onInputableCheckboxChange(checked);
    return;
  }

+ // 兼容Checkbox在createPortal中使用时，无法改变勾选状态的问题
+ if ('value' in props && props.checked === undefined) {
+   onInputableCheckboxChange(checked);
+ }
  onChange?.(checked ? htmlValue : undefined, checked, htmlValue);
});
```

### 2. use-checkbox-inputable.tsx - 重构状态管理逻辑
```diff
-import { useState } from 'react';
+import { useEffect, useState } from 'react';

const useCheckboxInputable = <T,>(
  props: Pick<CheckboxProps<T>, 'value' | 'checked' | 'inputable' | 'onChange'>,
) => {
- const [checkedState, setCheckedState] = useState(false);
+ const [checkedState, setCheckedState] = useState<boolean | undefined>(undefined);

+ // 使用 useEffect 同步 value 到内部状态
+ useEffect(() => {
+   setCheckedState(!!props.value);
+ }, [props.value]);

  const onInputableCheckboxChange = (c: boolean) => {
    setCheckedState(c);
    props?.onChange?.(undefined, c, undefined as any);
  };
  
  const onInputChange = (_value?: string) => {
    props?.onChange?.(_value as T, true, undefined as any);
  };
  
  return {
-   checked: inputable ? checkedState : props.checked,
+   checked: props.checked ?? checkedState,
    onInputableCheckboxChange,
    onInputChange,
  };
};
```

## 变更前后逻辑差异

### 变更前
1. 在 createPortal 场景下，Checkbox 的状态更新机制失效
2. 点击 Checkbox 时，虽然触发了事件，但 UI 不会更新
3. inputable 模式的状态管理较为简单，初始值为 false

### 变更后
1. 针对 createPortal 场景增加特殊判断：当有 `value` 但没有 `checked` 属性时
2. 通过 `onInputableCheckboxChange` 更新内部状态
3. 使用 `useEffect` 保持 value 与内部 checkedState 同步
4. checked 返回值优先使用 `props.checked`，如果未定义则使用 `checkedState`

## 逻辑影响范围
- 修复了在 Modal、Popover、Tooltip 等使用 createPortal 的组件中 Checkbox 无法正常工作的问题
- 优化了 inputable 模式下的状态管理逻辑
- 不影响常规 DOM 树中的 Checkbox 使用
- 不影响受控模式（有 checked 属性）的 Checkbox

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：这是一个缺陷修复，仅针对特定场景增加处理逻辑

### 行为变化说明

1. **createPortal 场景下的 Checkbox 恢复正常**：
   - 升级前：在 Modal/Popover 中的 Checkbox 点击无法切换状态
   - 升级后：Checkbox 可以正常勾选/取消勾选
   - 受影响场景：
     ```tsx
     <Modal visible={visible}>
       <Checkbox 
         value={checked}
         onChange={(value) => {
           setChecked(value);
           // 升级前：点击后 UI 不更新
           // 升级后：正常更新
         }}
       >
         同意协议
       </Checkbox>
     </Modal>
     ```
   - 是否需要调整：不需要，这是缺陷修复

2. **value 属性与内部状态同步**：
   - 升级前：内部 checkedState 初始为 false
   - 升级后：使用 useEffect 同步 value 到 checkedState
   - 受影响场景：
     ```tsx
     // 动态更新 value 时
     <Checkbox value={dynamicValue} />
     // 升级后内部状态会正确同步
     ```
   - 是否需要调整：不需要，增强了稳定性

3. **不影响其他使用方式**：
   - 普通 DOM 中的 Checkbox 不受影响
   - 受控模式（传入 checked 属性）不受影响
   - Checkbox.Group 中的 Checkbox 不受影响