# Radio

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - `packages/shineout/src/radio/radio.tsx`
  - `packages/shineout/src/radio/radio.type.ts`
  - `packages/base/src/radio/radio.tsx`
  - `packages/base/src/radio/simple-radio.tsx`
  - `packages/base/src/radio/group.tsx`
  - `packages/hooks/src/components/use-check/use-check.ts`
  - `packages/shineout-style/src/radio/radio.ts`
- 状态：待优化

## 概要

Radio 组件支持单选、分组、按钮样式等多种显示模式。结构清晰，但存在 disabled 作为函数时的使用不一致、Group 上下文中的状态同步问题、以及 a11y 属性不完整的问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|

## 详细说明

(暂无 P0/P1 问题需详细说明)

---

## 测试覆盖

**现有覆盖**：
- 基础渲染、checked/defaultChecked
- Group 模式
- block、button、button-outline 样式
- size 变体
- disabled 状态

## 核实记录

- RADIO-1 删除：disabled 函数处理不当——经实际代码验证（packages/base/src/radio/radio.tsx:21-31），getDisabled 的结果正确传入 SimpleRadio 的 disabled 属性（第 30 行）。逻辑正确，不是 P1 缺陷。
- RADIO-2 删除：checked 类型定义模糊——Radio 组件中 checked 属性的类型定义清晰，支持函数用法有相应的文档。不是 P1 问题。
- RADIO-3 删除：缺少 aria-labelledby——原生 label + input 已提供隐式标签关联，不是必需的 P1 缺陷。
- RADIO-4 删除：verticalAlign 参数文档缺失——属于 P2 可维护性问题，已从 P1 清单移除。
- RADIO-5 删除：测试缺失——属于 P2 范畴，已从 P1 清单移除。

## TODO

- [ ] 核实中断时问题清单被清空（原有 1 条 P1、4 条 P2），需重新 review
- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
