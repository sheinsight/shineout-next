# Spin

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：packages/base/src/spin/spin.tsx, packages/base/src/spin/spins.tsx, packages/shineout/src/spin, packages/shineout-style/src/spin
- 状态：待优化

## 概要

Spin 是加载动画组件，支持多种动画样式和 tip。实现清晰但存在性能和一致性问题：每次 render 重新获取 JSS 样式和 semantic config、ScaleCircle 样式命名混乱、容器模式下指示器 className 应用不一致。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| SPIN-1 | P2 | perf | packages/base/src/spin/spin.tsx:73-89 | 每次 render 重新获取 JSS 样式和 semantic config：jssStyle?.spin?.() 和 globalSemanticConfig 每次都创建新对象，多个 Spin 时性能劣化 | 用 useMemo 缓存 spinStyle 和 globalSemanticConfig |
| SPIN-2 | P3 | maintainability | packages/base/src/spin/spins.tsx:105-121 | ScaleCircle 样式命名混乱：使用 fadingCircle class 而非 scaleCircle，可能是复制错误或设计不一致 | 确认设计意图，若是独立样式则修改 className |
| SPIN-3 | P2 | bug | packages/base/src/spin/spin.tsx:91-163 | 容器模式下 className 应用不一致：indicator 在容器内以 isRoot=false 渲染，无法应用用户传入的 className 到指示器 | 文档化 className 应用规则或调整渲染逻辑 |

## 详细说明

### SPIN-1: 每次 render 重新生成样式对象

**触发场景**：页面内多个 Spin 组件并发渲染，或 loading 状态频繁切换。

**问题**：
- 第 73 行：`const spinStyle = jssStyle?.spin?.() || ({} as SpinClasses);`
- 第 76-78 行：`const globalSemanticConfig = (...) ? { classNames: ..., styles: ... } : undefined;`
- 每次 render 都创建新对象引用

**修复思路**：用 useMemo 包装这两个对象创建。

---

### SPIN-2: ScaleCircle 样式命名错误

**问题**：第 115 行使用 `spinStyles.fadingCircle`，但组件名为 ScaleCircle，应使用 `spinStyles.scaleCircle`。

**可能原因**：复制粘贴错误或设计意图不明。

**修复思路**：确认设计意图后修正。

---

### SPIN-3: 容器模式 className 应用不一致

**问题**：
- 第 98-100 行：isRoot 为 true 时 mergedClassName 包含用户 className
- 第 151 行：容器模式下 renderContent(false) 导致 isRoot=false
- 用户传入的 className 只应用于根元素，不应用于指示器

**修复思路**：文档化此行为或分别传递 className 到 indicator 和 content。

## 测试覆盖

缺少：
- 多 Spin 并发渲染的性能测试
- 容器模式下 className 应用测试
- ScaleCircle 样式验证测试

## TODO

- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
