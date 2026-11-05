# Button

- Review 日期：2026-11-05
- 核实状态：初审过浅
- 涉及文件：
  - packages/shineout/src/button/button.tsx
  - packages/base/src/button/button.tsx
  - packages/base/src/button/button.type.ts
  - packages/hooks/src/components/use-button/
  - packages/shineout-style/src/button/
- 状态：待优化

## 概要

Button 组件支持多种模式、大小、状态，集成了加载状态和 a11y 属性。整体质量较好，实现相对完整，无显著 P0/P1 问题发现。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|-----|------|------|------|------|------|
| BTN-001 | P3 | maintainability | packages/base/src/button/button.tsx:106-110 | 隐藏前置 icon 的逻辑通过 isShineoutIcon 类型判断实现，但这个标记来自外部组件，耦合度高 | 考虑通过 API 参数（如 hideLeadingIcon）让用户显式控制 |

## 详细说明

### BTN-001：Icon 识别耦合度高 (P3)

**触发场景**: loading 时自动隐藏第一个 Shineout icon，但这依赖于外部 Icon 组件的内部标记 isShineoutIcon。

**原因分析**: 第108行检查 `(item.type as any).isShineoutIcon`，这个标记来自 Icon 的 makeIcon 函数，两个组件之间通过隐式约定耦合。

**修复思路**: 
- 可考虑添加 `hideLeadingIcon` 布尔参数，让使用者显式控制
- 或将这个逻辑改为配置选项

## 测试覆盖

测试覆盖完整，包括各种类型、模式、加载状态。未发现明显缺漏。

## TODO

- [ ] 初审一次看了 20 个组件，结论不可靠，需完整阅读源码重新 review
- [ ] 逐条核实现有条目并补全 `packages/...:行号`
