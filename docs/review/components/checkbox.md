# Checkbox

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - `packages/shineout/src/checkbox/checkbox.tsx`
  - `packages/shineout/src/checkbox/checkbox.type.ts`
  - `packages/base/src/checkbox/checkbox.tsx`
  - `packages/base/src/checkbox/simple-checkbox.tsx`
  - `packages/base/src/checkbox/use-checkbox-inputable.tsx`
  - `packages/hooks/src/components/use-check/use-check.ts`
  - `packages/shineout-style/src/checkbox/checkbox.ts`
- 状态：待优化

## 概要

Checkbox 组件支持单选、组选、非确定状态等多种模式。整体实现复杂，包含历史 inputable 兼容逻辑。主要问题是处理函数 disabled 的优先级不清、indeterminate 状态与受控/非受控切换时的状态不一致、以及 a11y 属性缺失。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| CHECKBOX-1 | P1 | bug | packages/base/src/checkbox/checkbox.tsx:26-27 | indeterminate 状态处理：当 checked === 'indeterminate' 时，传给 useCheck 的 checked 被强制转为 true，导致 indeterminate 状态下的点击行为不符预期 | 在 useCheck 中支持 'indeterminate' 字符串状态，或在 simple-checkbox 中专门处理 indeterminate 逻辑 |
| CHECKBOX-3 | P1 | api | packages/shineout/src/checkbox/checkbox.tsx:50-66 | 三层 onChange 回调：props.onRawChange、onChange、以及 useCheckboxInputable 内的 onChange，逻辑复杂易出错，且 onRawChange 文档缺失 | 梳理所有 onChange 的调用时机，补充 onRawChange 文档 |

## 详细说明

### CHECKBOX-1：indeterminate 状态转换错误 (P1)
**触发场景**：设置 checked='indeterminate'，点击后期望切换到 checked/unchecked，但实际行为不符。

**原因分析**（packages/base/src/checkbox/checkbox.tsx:26-27）：
```typescript
const { getRootProps, getIndicatorProps, getInputProps, disabled, checked } = useCheck({
  ...rest,
  checked: props.checked === 'indeterminate' ? true : props.checked,
  defaultChecked: props.defaultChecked === 'indeterminate' ? true : props.defaultChecked,
});
```
useCheck 接收的 checked 被转为 boolean，失去了 indeterminate 的状态信息。这导致 indeterminate 的点击行为无法正确切换（通常应该 indeterminate → unchecked 或 indeterminate → checked）。

**修复思路**：
1. 在 useCheck 中支持 'indeterminate' 字符串状态，增加对应的处理逻辑
2. 或在 simple-checkbox 中处理 indeterminate 的特殊逻辑，不依赖 useCheck

### CHECKBOX-3：onChange 回调链复杂且文档缺失 (P1)
**触发场景**：Group 模式下，多个组件监听 onChange，逻辑不明确。

**原因分析**（packages/shineout/src/checkbox/checkbox.tsx:50-66）：
```typescript
if (props.onRawChange) {
  props.onRawChange(checked ? htmlValue : undefined, checked, htmlValue);
}
onChange?.(checked ? htmlValue : undefined, checked, htmlValue);
```
这里 onRawChange 和 onChange 都会触发，但 onRawChange 是只在 Group 模式下才由 GroupContext 传入的。这个逻辑对用户不透明，容易导致重复回调或遗漏。

**修复思路**：
1. 明确文档说明 onRawChange 和 onChange 的区别和调用顺序
2. 补充 onRawChange 的使用场景和参数说明

## 测试覆盖

**现有覆盖**：
- 基础渲染、checked/defaultChecked
- indeterminate 样式渲染
- disabled 状态
- onClick 事件

## 核实记录

- CHECKBOX-2 删除：disabled 函数类型——经验证，packages/base/src/checkbox/checkbox.tsx:29-31 已正确处理 disabled 为函数时的调用。类型定义清晰，不是 P1 问题。
- CHECKBOX-4 删除：缺少 aria-checked——原生 input[type=checkbox] 已自带隐式 aria-checked。建议保留这条作为可维护性改进但不是 P1 缺陷。
- CHECKBOX-5 删除：inputable 代码占用——属于 P2 可维护性问题，已从 P1 清单移除。
- CHECKBOX-6 删除：onChange 未缓存——经验证，packages/shineout/src/checkbox/checkbox.tsx 使用 usePersistFn 包装 handleChange（第 50 行），已正确缓存。
- CHECKBOX-7 删除：测试缺失——属于 P2 范畴，已从 P1 清单移除。

## TODO

- [ ] CHECKBOX-1 位置应为 `packages/base/src/checkbox/simple-checkbox.tsx:26-27`；indeterminate 点击后变 checked 是否算 bug 需结合产品预期判断
- [ ] 核实中断时问题清单由 7 条变为 2 条，需对照代码补回被误删的 P2
- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
