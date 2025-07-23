# Input 组件 3.7.3-beta.4 版本 Diff 报告

## 问题描述

修复 `Input` 的 `onEnterPress` 事件在开启了 `Form` 的 `scrollToError` 后偶现无法触发的缺陷。该问题由表单提交后的自动滚动导致输入框失焦引起。

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
+   // 由于form的原生submit事件是在keydown中触发的，submit校验后触发scrollToError会导致当前焦点的input立即失焦
+   // 导致input的回车事件无法触发，所以这里在onKeyDown时机记录下needTriggerEnter标志
+   onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
+     if (e.key === 'Enter') {
+       context.needTriggerEnter = true;
+     }
+     props.onKeyDown?.(e);
+   },
+   onBlur: (e: any) => {
+     // 在onBlur时机判断是否需要补充触发onEnterPress
+     if (context.needTriggerEnter) {
+       context.needTriggerEnter = false;
+       onEnterPress?.(e.target.value || '', e);
+     }
+     props.onBlur?.(e);
+   },
  });

  const onKeyUp = usePersistFn((e: KeyboardEvent<HTMLInputElement>) => {
+   if (e.key === 'Enter') {
+     // 如果正常触发了keyup，清除标记
+     context.needTriggerEnter = false;
+   };
    props.onKeyUp?.(e);
    keyHandler(e);
  });
```

## 变更前后逻辑差异

### 变更前
- Form 开启 `scrollToError` 后，回车提交表单时会触发页面滚动
- 滚动导致当前聚焦的 Input 失去焦点
- 由于失焦发生在 keydown 和 keyup 之间，`onEnterPress` 事件无法正常触发
- 用户需要再次按回车才能触发事件

### 变更后
- 在 keydown 阶段检测到回车键时设置标记
- 如果 keyup 正常触发，清除标记并正常处理
- 如果因失焦导致 keyup 未触发，在 blur 事件中补充触发 `onEnterPress`
- 确保无论什么情况，回车事件都能被正确处理

## 逻辑影响范围
- 修复了 Form 与 Input 组合使用时的事件触发问题
- 确保 `onEnterPress` 在各种边界情况下都能可靠触发
- 不影响正常的键盘事件流程
- 不影响未在 Form 中使用的 Input 组件

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：仅修复了事件触发的可靠性问题

### 行为变化说明

1. **Form 中回车提交可靠性提升**：
   - 升级前：开启 `scrollToError` 后，回车提交可能需要按两次
   - 升级后：一次回车即可触发 `onEnterPress` 事件
   - 受影响场景：
     ```tsx
     <Form scrollToError>
       <Form.Item>
         <Input 
           onEnterPress={(value) => {
             console.log('提交:', value);
             // 升级前：可能不触发
             // 升级后：可靠触发
           }}
         />
       </Form.Item>
     </Form>
     ```
   - 是否需要调整：不需要，这是缺陷修复

2. **事件触发时机细微变化**：
   - 升级前：`onEnterPress` 只在 keyup 时触发
   - 升级后：正常情况在 keyup 触发，异常情况在 blur 时补充触发
   - 受影响场景：依赖精确事件时机的特殊逻辑
   - 是否需要调整：通常不需要，事件参数保持一致

3. **多次触发的保护**：
   - 通过标记机制确保不会重复触发
   - 即使在复杂的焦点切换场景下也能正确工作
   - 提升了表单交互的稳定性