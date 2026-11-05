# Link

- Review 日期：2026-11-05
- 核实状态：初审过浅
- 涉及文件：
  - packages/shineout/src/link/link.tsx
  - packages/base/src/link/link.tsx
  - packages/base/src/link/link.type.ts
  - packages/shineout-style/src/link/
- 状态：待优化

## 概要

Link 组件实现为禁用感知的链接元素，支持多种类型、大小、禁用状态。a11y 实现较完整，包括 aria-disabled 和键盘事件处理。

## 问题清单

无 P0/P1/P2 问题发现。

## 测试覆盖

测试覆盖了基本链接、禁用、类型、大小等功能。

## TODO

- [ ] 初审一次看了 20 个组件，结论不可靠，需完整阅读源码重新 review
- [ ] 逐条核实现有条目并补全 `packages/...:行号`
