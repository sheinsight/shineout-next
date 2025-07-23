# Input 组件 3.7.3-beta.4 版本 Diff 报告

## 问题描述
修复 `Input` 的 `onEnterPress` 事件在开启了 Form 的 scrollToError 后偶现的无法触发的问题

## 代码变更文件
`packages/base/src/input/simple-input.tsx`

## 变更代码行
```diff
-import React, { KeyboardEvent, useContext } from 'react';
+import React, { KeyboardEvent, useContext, useRef } from 'react';

const Input = (props: SimpleInputProps) => {
+ const { current: context } = useRef({
+   needTriggerEnter: false,
+ });

  const { getRootProps, getClearProps, getInputProps, showClear, focused, disabled } = useInput({
    ...rest,
    onFocusedChange,
+   // 由于form的原生submit事件是在keydown中触发的，submit校验后触发scrollToError会导致当前焦点的input立即失焦，导致input的回车事件无法触发
+   // 所以这里在onKeyDown时机记录下needTriggerEnter标志，在onBlur时机判断是否需要触发onEnterPress
+   onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
+     if (e.key === 'Enter') {
+       context.needTriggerEnter = true;
+     }
+     props.onKeyDown?.(e);
+   },
+   onBlur: (e: any) => {
+     if (context.needTriggerEnter) {
+       context.needTriggerEnter = false;
+       onEnterPress?.(e.target.value || '', e);
+     }
+     props.onBlur?.(e);
+   },
  });

  const onKeyUp = usePersistFn((e: KeyboardEvent<HTMLInputElement>) => {
+   if (e.key === 'Enter') {
+     context.needTriggerEnter = false;
+   };
    props.onKeyUp?.(e);
    keyHandler(e);
  });
```

## 变更前后逻辑差异
- **变更前**：Form 开启 scrollToError 后，submit 事件触发滚动会导致 Input 失焦，onEnterPress 事件无法正常触发
- **变更后**：
  1. 在 onKeyDown 时记录回车键按下状态
  2. 如果 onKeyUp 中正常触发了回车事件，清除标记
  3. 如果因失焦导致 onKeyUp 未触发，在 onBlur 时补充触发 onEnterPress

## 逻辑影响范围
- 修复了 Form 中 Input 的 onEnterPress 事件偶现失效问题
- 确保回车事件在各种场景下都能正确触发
- 不影响正常的键盘事件流程

## 升级注意事项

### 代码兼容性
- 无直接代码执行风险

### 行为变化说明
- Form 中的 Input 回车提交行为更加稳定可靠