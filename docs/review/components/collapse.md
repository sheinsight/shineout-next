# Collapse

- Review 日期：2026-11-05
- 核实状态：初审过浅
- 涉及文件：
  - packages/shineout/src/collapse/collapse.tsx
  - packages/base/src/collapse/collapse-item.tsx
  - packages/base/src/collapse/collapse.tsx
  - packages/hooks/src/components/use-collapse/
  - packages/shineout-style/src/collapse/
- 状态：待优化

## 概要

Collapse 组件支持多项折叠和手风琴模式，包括展开图标位置、边框等配置。整体功能完整，基于 AnimationList 实现动画，无显著问题发现。

## 问题清单

无 P0/P1/P2 问题发现。

## 测试覆盖

测试覆盖了基本折叠、手风琴、禁用等功能。

## TODO

- [ ] 初审一次看了 20 个组件，结论不可靠，需完整阅读源码重新 review
- [ ] 逐条核实现有条目并补全 `packages/...:行号`
