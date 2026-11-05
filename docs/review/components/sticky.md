# Sticky

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：packages/base/src/sticky/sticky.tsx, packages/shineout/src/sticky, packages/shineout-style/src/sticky
- 状态：待优化

## 概要

Sticky 是吸附组件，支持 CSS sticky 和 JS 实现、边界元素停止吸附等高级特性。实现复杂，存在多个内存泄漏问题：scroll/resize 监听器在 props 变化时未清理、context 对象变异存在风险、IntersectionObserver margin 计算可能偏差、RTL 支持缺失。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| STICKY-1 | P1 | bug | packages/base/src/sticky/sticky.tsx:427-433, 376-378, 394-396 | scroll 监听器泄漏：stickyBoundary 从有值变为 undefined 时，旧监听器未清理（cleanup 条件依赖当前 props） | 追踪监听器是否已添加，无条件清理或用 prev props 比较 |
| STICKY-2 | P2 | bug | packages/base/src/sticky/sticky.tsx:31-40 | Context 对象变异风险：IntersectionObserver 等引用手动管理，边界情况下可能状态污染 | 添加明确的类型检查和清理流程 |
| STICKY-3 | P1 | bug | packages/base/src/sticky/sticky.tsx:363-379, 443 | window resize 监听器未清理：useLayoutEffect 依赖 [css, top, bottom]，stickyBoundary 变化时未重新清理/添加监听器 | 添加 props.stickyBoundary 到依赖数组 |
| STICKY-4 | P2 | bug | packages/base/src/sticky/sticky.tsx:335-337, 147 | IntersectionObserver margin 计算可能偏差：rootMargin 和 offset 计算逻辑不匹配，可能导致双重减法或边界错误 | 添加注释和单元测试验证 margin 语义 |
| STICKY-5 | P2 | bug | packages/base/src/sticky/sticky.tsx:92-120 | originPosition 卸载未清理：组件在 stopped 状态卸载时 originPosition 残留，可能污染 context | 在 cleanup 中重置 originPosition 为 null |
| STICKY-6 | P3 | style | packages/base/src/sticky/sticky.tsx:84-88, 103-104, 142, 149, 173-174, 186 | RTL 不支持：transform 和 left/right 位置计算硬编码，RTL 页面布局错误 | 使用 CSS 逻辑属性或添加 RTL 检测 |

## 详细说明

### STICKY-1: scroll 监听器泄漏

**触发场景**：stickyBoundary 从值变为 undefined，或快速切换 boundary 函数。

**原因分析**：
- 第 376-378 行：`if (props.stickyBoundary) { target.removeEventListener(...) }`
- 若当前 props.stickyBoundary 为 undefined，条件为 false，监听器不被移除
- 但上一次 render 中已添加的监听器无法清理

**修复思路**：追踪监听器附加状态或用 cleanup ref。

---

### STICKY-3: resize 监听器未清理（P1）

**问题**：
- 第 363-379 行：createTargetEvents 添加 resize 监听器
- 第 443 行：useLayoutEffect 依赖 `[css, top, bottom]`
- 若只有 stickyBoundary 变化，effect 不重新运行，旧 resize 监听器残留

**修复思路**：添加 `props.stickyBoundary` 到依赖数组。

---

### STICKY-4: IntersectionObserver margin 计算

**问题**：
- 第 335-337 行：rootMargin 设为 `-(bottom || 0)px`
- 第 147 行：offset 计算为 `scrollRect.bottom - (props.bottom || 0) - outRootRect.top`
- 若 bottom 在某处未定义，可能出现不匹配

**修复思路**：添加注释和单元测试验证 margin 语义。

---

### STICKY-5: originPosition 卸载未清理

**问题**：组件在 stopped 状态卸载时，context.originPosition 未重置，可能残留。

**修复思路**：在 useLayoutEffect cleanup 中重置。

---

### STICKY-6: RTL 不支持

**问题**：所有位置计算使用硬编码 left，RTL 页面错误。

**修复思路**：用 CSS 逻辑属性（inset-inline-start）或添加 RTL 检测。

## 测试覆盖

缺少：
- stickyBoundary 变化的监听器清理测试
- 快速切换 boundary 的内存泄漏测试
- RTL 布局测试
- IntersectionObserver margin 单元测试

## TODO

- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
