# Border Beam

- Review 日期：2026-11-05
- 核实状态：初审过浅
- 涉及文件：
  - packages/shineout/src/border-beam/border-beam.tsx
  - packages/base/src/border-beam/border-beam.tsx
  - packages/base/src/border-beam/border-beam-effect.tsx
  - packages/base/src/border-beam/use-child-dom.ts
  - packages/base/src/border-beam/use-border-size.ts
  - packages/shineout-style/src/border-beam/
- 状态：待优化

## 概要

Border Beam 组件为装饰性边框效果组件，通过 CSS 变量和 Portal 实现跟踪边框的动画效果。整体实现新颖，包含 ref 合并、host 元素追踪等高级特性。整体质量较好，无显著问题发现。

## 问题清单

无 P0/P1/P2 问题发现。

## 测试覆盖

测试覆盖了基本渲染、颜色、动画参数等功能。

## TODO

- [ ] 初审一次看了 20 个组件，结论不可靠，需完整阅读源码重新 review
- [ ] 逐条核实现有条目并补全 `packages/...:行号`
