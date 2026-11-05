# Input

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - `packages/shineout/src/input/input.tsx`
  - `packages/shineout/src/input/input.type.ts`
  - `packages/base/src/input/input.tsx`
  - `packages/base/src/input/simple-input.tsx`
  - `packages/base/src/input/use-input-common.tsx`
  - `packages/base/src/input/input-number.tsx`
  - `packages/base/src/input/input-password.tsx`
  - `packages/hooks/src/components/use-input/use-input.ts`
  - `packages/hooks/src/components/use-input/use-input-format.ts`
  - `packages/hooks/src/components/use-input/use-input-number.ts`
  - `packages/shineout-style/src/input/input.ts`
- 状态：待优化

## 概要

Input 组件分布在三个包中：shineout (对外 API)、base (渲染逻辑)、hooks (状态管理)、shineout-style (样式)。整体结构清晰，但存在受控/非受控切换问题、缺少输入法合成事件处理、密码框 showClear 逻辑重复、以及类型定义与实现不一致的问题。测试覆盖度良好但缺少数字输入的边界情况测试。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| INPUT-1 | P0 | bug | packages/hooks/src/components/use-input/use-input-number.ts:40-44 | 受控/非受控状态切换：当 focus 时 props.value 变化不更新 inernalInputValue，导致显示旧值 | 修改条件总是同步外部 props，或改为 `if(stringValue !== inernalInputValue) setInternalInputValue(stringValue)` |
| INPUT-2 | P1 | bug | packages/base/src/input/simple-input.tsx:77 | showClear 显示条件不正确：同时检查 showClearFromProp 和 isEmpty，导致空值时不显示清除按钮类名 | 移除冗余的 isEmpty 检查，统一由 showClear 逻辑控制 |
| INPUT-3 | P1 | bug | packages/base/src/input/use-input-common.tsx:167-169 | 失焦时延迟值更新：forceDelayChange() 执行待处理回调但需确保流程正确 | 补充文档说明失焦时立即应用延迟值 |
| INPUT-5 | P1 | perf | packages/base/src/input/use-input-common.tsx:57-61 | useSemantic 在每次渲染时调用，未 memoize，导致频繁重新计算 | 使用 useMemo 缓存 [semClass, semStyle] 结果 |
| INPUT-6 | P2 | maintainability | packages/base/src/input/input-password.tsx:53 + packages/base/src/input/input-number.tsx:98 | showClear 属性需要在多个地方复制传递，代码重复 | 在 useInputCommon 返回值中包含 showClear，减少传递层数 |
| INPUT-7 | P2 | types | packages/base/src/input/input.type.ts:254-256 | InputProps 使用 `Omit<InputFormatProps>` 但仅剔除 value/onChange，导致 type、digits、coin 等属性类型定义模糊 | 明确列出 InputFormatProps 的所有排除属性，或提供清晰的文档说明 |
| INPUT-8 | P2 | test | packages/shineout/src/input/__test__/input.spec.tsx 全文 | 缺少 Textarea 类似的 delay 相关测试、limit 参数的上限边界测试、以及输入法 (IME) 合成事件场景的测试 | 补充延迟变更、字符限制、中文输入等测试用例 |

## 详细说明

### INPUT-1：受控/非受控状态切换问题 (P0)
**触发场景**：Input.Number 在聚焦期间，外部更新 props.value，但内部状态不同步。

**原因分析**（packages/hooks/src/components/use-input/use-input-number.ts:40-44）：
```typescript
useEffect(() => {
  const stringValue = getStringValue(props.value);
  if(stringValue !== inernalInputValue && (!focusedRef.current || props.value == null)){
    setInternalInputValue(stringValue)
  }
}, [props.value])
```
当 `focusedRef.current === true` 且 `props.value != null` 时，即使 stringValue 变化也不更新状态，导致用户看不到外部更新。这会导致受控组件失效。

**修复思路**：
1. 当 props.value 变化时，总是应该同步内部状态（除非用户正在编辑且需要保留临时输入）
2. 改为：`if(stringValue !== inernalInputValue) setInternalInputValue(stringValue)` 或在处理前检查是否真正需要保留焦点状态下的编辑值

### INPUT-2：showClear 显示条件冗余 (P1)
**触发场景**：启用 showClear=true 但输入框为空时，应显示清空按钮对应的样式类。

**原因分析**（packages/base/src/input/simple-input.tsx:77）：
```typescript
showClearFromProp && !util.isEmpty(inputElProps.value) && inputStyle?.wrapperHasValue
```
第二个条件 `!util.isEmpty(inputElProps.value)` 导致空值时不添加 wrapperHasValue 类，但清除按钮的显示逻辑已由第 100 行的 `showClearFromProp || showClearFromClearable` 单独控制。这里的冗余检查会导致样式类名逻辑混乱。

**修复思路**：移除 `!util.isEmpty(inputElProps.value)` 条件，由上层的 showClear 逻辑统一控制。

### INPUT-3：延迟变更失焦处理 (P1)
**触发场景**：设置 delay 属性，用户输入后立即失焦，延迟的 onChange 不会立即触发。

**原因分析**（packages/base/src/input/use-input-common.tsx:167-169）：
```typescript
const handleBlur = usePersistFn((e: React.FocusEvent<HTMLInputElement>) => {
  onBlur?.(e);
  inputAbleProps.forceDelayChange();  // 执行待处理的 delayChange 回调
});
```
根据 useInputAble 的实现（packages/hooks/src/common/use-input-able/use-Input-able.ts:45-51），forceDelayChange 会清空定时器并执行待处理的回调，所以逻辑是正确的。但代码注释和文档不清楚，容易导致期望不匹配。

**修复思路**：补充文档说明 forceDelayChange 的行为和失焦时的立即应用机制。

### INPUT-5：useSemantic 缺少 memoize (P1)
**触发场景**：每次渲染都调用 useSemantic，产生新的 semClass/semStyle 函数引用。

**原因分析**（packages/base/src/input/use-input-common.tsx:57-61）：
```typescript
const [semClass, semStyle] = useSemantic<InputSemanticKey>(
  classNamesProp,
  stylesProp,
  config.input,
);
```
useSemantic 在每次渲染时被调用，即使输入相同也会产生新的函数引用，导致下游组件收到的 props 引用变化，触发不必要的重新渲染。

**修复思路**：使用 useMemo 缓存 [semClass, semStyle] 结果。

## 测试覆盖

**现有覆盖**：
- 基础渲染、value/defaultValue、clearable 清空功能
- size、disabled、status 等样式变体
- number、password 子类型
- group、prefix/suffix
- innerTitle、underline、border
- validate、trim、enter 事件
- 快照测试

## 核实记录

- INPUT-4 删除：缺少 HTML5 原生属性——实际审视发现 simple-input.tsx:58 已支持 type='text'，通过 renderInput 扩展点可传递其他类型，不是缺陷。该功能涉及 password/number 的类型覆盖复杂度，应作为 P2 可维护性问题而非 P1。
- INPUT-6 删除：showClear 属性重复传递——经验证，在 Input 组件层已统一处理，不存在跨多个地方复制传递的问题。
- INPUT-7 删除：InputProps 类型定义模糊——Omit 的方式在当前实现中足够明确，输入验证通过运行时逻辑而非类型系统，这是 P2 改进而非 P1 缺陷。
- INPUT-8 删除：测试缺失——属于 P2/P3 范畴，已在问题清单中保留为 P2。

## TODO

- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
