# Textarea

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - `packages/shineout/src/textarea/textarea.tsx`
  - `packages/shineout/src/textarea/textarea.type.ts`
  - `packages/base/src/textarea/textarea.tsx`
  - `packages/base/src/textarea/simple-textarea.tsx`
  - `packages/base/src/textarea/use-auto-size.tsx`
  - `packages/hooks/src/components/use-textarea/use-textarea.ts`
  - `packages/hooks/src/components/use-textarea/use-textarea-format.ts`
  - `packages/shineout-style/src/textarea/textarea.ts`
- 状态：待优化

## 概要

Textarea 组件在 base 包中的实现完整，支持自动高度、字符限制、内嵌标题等功能。整体质量较好，但存在 autosize 时隐藏 textarea 赋值不同步、info 显示条件与 focused 状态耦合过紧、以及缺少 IME 合成事件处理的问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| TEXTAREA-1 | P1 | bug | packages/base/src/textarea/use-auto-size.tsx:34-43 | autosize 模式下 cloneElement 传递 onChange，且直接调用 el.props.onChange，在高频输入时会导致状态更新和高度重算的竞态 | 确保 onChange 仅触发一次，分离隐藏 textarea 的更新逻辑，使用 ref 而非 cloneElement |
| TEXTAREA-2 | P2 | bug | packages/base/src/textarea/textarea.tsx:115 | hasValue 判断逻辑：`value === 0 || (value && value.length)` 支持数字 0 作为有值状态，逻辑合理但不够显式 | 改为显式的类型检查使意图更清晰 |
| TEXTAREA-3 | P1 | perf | packages/base/src/textarea/textarea.tsx:138-150 | getInfoState 依赖于 focused，但 focused 从 onStatusChange 回调更新，若回调触发频繁会导致重算 | 确保 useMemo 的依赖数组完整，考虑防抖 focused 变化 |

## 详细说明

### TEXTAREA-1：autosize onChange 重复触发 (P1)
**触发场景**：启用 autosize，用户输入时会修改 textarea 高度。

**原因分析**（packages/base/src/textarea/use-auto-size.tsx:34-43）：
```typescript
return cloneElement(el, {
  onChange: (...args: any) => {
    el.props.onChange(...args);  // 直接调用原有的 onChange
    resetHeight(args[0].target.value);  // 赋值给隐藏 textarea
  },
})
```
这里 cloneElement 的 onChange 会和原有的 onChange 同时执行。当原组件中已有 onChange 处理时，会导致触发两次或出现竞态。同时隐藏 textarea 的赋值与主 textarea 的值同步之间存在时序问题。

**修复思路**：
1. 使用 useCallback 包装 onChange，避免每次渲染重新创建
2. 分离隐藏 textarea 的更新，使用 ref 直接修改而非通过 cloneElement

### TEXTAREA-3：getInfoState 频繁重算 (P1)
**触发场景**：focused 状态频繁变化时，getInfoState 被反复执行。

**原因分析**（packages/base/src/textarea/textarea.tsx:138-150，以及第 159 行的 useMemo 依赖）：
getInfoState 函数依赖于 focused 状态，但 focused 是通过 onStatusChange 回调动态更新的。如果这个回调触发很频繁，会导致 useMemo 频繁重新计算，影响性能。

**修复思路**：
1. 确保 useMemo 的依赖数组包含所有必要的依赖
2. 考虑对 focused 变化进行防抖或节流处理

## 测试覆盖

**现有覆盖**：
- 基础渲染、value/defaultValue
- size 变体
- autosize 功能
- info 显示逻辑
- custom info 函数
- footer 渲染

## 核实记录

- TEXTAREA-2 降级：hasValue 判断逻辑——经实际代码验证，`value === 0 || (value && value.length)` 的逻辑虽不显式，但正确支持数字 0 作为有值状态。降级为 P2 可维护性问题而非 P1 缺陷。
- TEXTAREA-4 删除：textarea 缺少 aria 属性——原生 textarea 已自带隐式 role='textbox'，inner-title 可作为标签替代。需通过 Form 上下文设置 aria-label，不是组件本身缺陷。
- TEXTAREA-5 删除：测试缺失——属于 P2 范畴，已从 P1 清单中移除。

## TODO

- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
