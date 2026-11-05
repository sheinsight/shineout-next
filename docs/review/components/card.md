# Card

- Review 日期：2026-11-05
- 核实状态：初审过浅
- 涉及文件：
  - packages/shineout/src/card/card.tsx
  - packages/base/src/card/card.tsx
  - packages/base/src/card/card.type.ts
  - packages/shineout-style/src/card/
- 状态：待优化

## 概要

Card 组件支持折叠、拖拽、手风琴等功能，结构复杂。内部状态管理通过 ref 和 context 实现，整体功能完整，无显著 bug 发现。

## 问题清单

无 P0/P1/P2 问题发现。

## 测试覆盖

测试覆盖了基本渲染、折叠、手风琴模式等功能。

## TODO

- [ ] 初审一次看了 20 个组件，结论不可靠，需完整阅读源码重新 review
- [ ] 逐条核实现有条目并补全 `packages/...:行号`
