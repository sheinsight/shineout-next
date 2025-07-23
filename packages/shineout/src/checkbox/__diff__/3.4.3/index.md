# Checkbox 组件 3.4.3 版本 Diff 报告

## 问题描述
修复 `Checkbox` 在 createPortal 中使用时，无法改变勾选状态的问题

## 代码变更文件
- `packages/base/src/checkbox/checkbox.tsx`
- `packages/base/src/checkbox/use-checkbox-inputable.tsx`

## 变更代码行
```diff
// checkbox.tsx
const handleInputChange = usePersistFn((checked: boolean) => {
  // ...
+ // 兼容Checkbox在createPortal中使用时，无法改变勾选状态的问题
+ if ('value' in props && props.checked === undefined) {
+   onInputableCheckboxChange(checked);
+ }
  onChange?.(checked ? htmlValue : undefined, checked, htmlValue);
});

// use-checkbox-inputable.tsx
-import { useState } from 'react';
+import { useEffect, useState } from 'react';

const useCheckboxInputable = <T,>(
  props: Pick<CheckboxProps<T>, 'value' | 'checked' | 'inputable' | 'onChange'>,
) => {
- const { inputable } = props;
- const [checkedState, setCheckedState] = useState(false);
+ const [checkedState, setCheckedState] = useState<boolean | undefined>(undefined);

+ useEffect(() => {
+   setCheckedState(!!props.value);
+ }, [props.value]);

- const checked = inputable ? checkedState : props.checked;
  const onInputableCheckboxChange = (c: boolean) => {
    setCheckedState(c);
    props?.onChange?.(undefined, c, undefined as any);
  };
- const onInputChange = (value?: string) => {
-   props?.onChange?.(value as T, true, undefined as any);
+ const onInputChange = (_value?: string) => {
+   props?.onChange?.(_value as T, true, undefined as any);
  };
  return {
-   checked,
+   checked: props.checked ?? checkedState,
    onInputableCheckboxChange,
    onInputChange,
  };
```

## 变更前后逻辑差异
- **变更前**：在 createPortal 场景下，Checkbox 状态无法正确更新
- **变更后**：
  1. 增加了对 value 属性且 checked 未定义场景的特殊处理
  2. 使用 useEffect 同步 value 到内部 checkedState
  3. checked 属性优先级调整为 `props.checked ?? checkedState`

## 逻辑影响范围
- 修复了在 Modal、Popover 等使用 createPortal 的组件中 Checkbox 无法改变状态的问题
- 优化了 inputable 模式下的状态管理逻辑
- 不影响常规使用场景

## 升级注意事项

### 代码兼容性
- 无直接代码执行风险

### 行为变化说明
- createPortal 场景下的 Checkbox 恢复正常的勾选/取消勾选功能