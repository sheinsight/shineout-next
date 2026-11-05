# Modal

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：packages/base/src/modal/modal-content.tsx, packages/base/src/modal/modal.tsx, packages/base/src/modal/modal-func.tsx, packages/shineout/src/modal, packages/shineout-style/src/modal
- 状态：待优化

## 概要

Modal 是复杂的浮层组件，支持全屏、可移动、可缩放、嵌套等特性。核心问题：ESC 事件处理的依赖项缺失导致陈旧闭包、全局状态管理（hasMask、state）存在并发隐患、定时器未正确清理。此外还有 a11y 和测试覆盖缺陷。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| MODAL-3 | P1 | bug | packages/base/src/modal/modal-func.tsx:104 | 销毁定时器硬编码 300ms：destroyModal 中 setTimeout(doDestroy, 300) 与动画时长解耦，可能过早销毁或导致内存泄漏 | 从 Modal props 读取动画时长或暴露可配置延迟 |
| MODAL-4 | P2 | bug | packages/base/src/modal/modal-content.tsx:259-284 | originDocumentStyle 全局管理缺陷：多个 Modal 同时打开/关闭时，最后一个关闭会还原第一个打开时的样式，导致 overflow 和 padding 错误还原 | 用栈式结构管理每个 Modal 的原始样式快照 |
| MODAL-5 | P2 | a11y | packages/base/src/modal/modal-content.tsx:400-440 | 缺少焦点管理和焦点陷阱：Modal 打开时无法自动聚焦到内容，关闭时焦点未还原；Tab 键未被陷阱在 Modal 内 | 实现焦点陷阱和自动焦点管理 |
| MODAL-6 | P2 | a11y | packages/base/src/modal/modal-content.tsx:300-320 | 缺少 role 和 aria 属性：mask 无 role="presentation"，container 无 role="dialog"，无 aria-modal、aria-labelledby | 补充标准 a11y 属性 |
| MODAL-7 | P3 | style | packages/shineout-style/src/modal | zIndex 硬编码：Modal 默认 zIndex 来自 jssStyle，无全局 token 配置支持 | 提供 token 配置 zIndex（待确认文件） |
| MODAL-8 | P2 | test | packages/base/src/modal/__test__ | 测试缺陷：缺少多 Modal 嵌套测试、ESC 关闭的陈旧回调测试、Promise 清理测试、并发打开/关闭的 overflow 还原测试 | 添加嵌套、并发、Promise 清理的测试用例 |

## 详细说明

### MODAL-4: originDocumentStyle 还原错误

**触发场景**：多个 Modal 顺序打开再关闭。

**问题**：
- 第一个 Modal 打开：保存原始 overflow/padding，设为 hidden
- 第二个 Modal 打开：沿用第一个保存的原始值
- 第二个关闭：还原第一个的值，但这可能破坏第一个的状态
- 第一个关闭：再次还原，可能不正确

**修复思路**：用栈式结构，每个 Modal 保存自己的快照。

---

### MODAL-5: 焦点管理缺失

**问题**：
- Modal 打开时焦点不自动移入，屏幕阅读器用户体验差
- Tab 键不被陷阱在 Modal 内
- 关闭时焦点不还原

**修复思路**：
1. 打开时用 useLayoutEffect 自动聚焦（footer 第一个按钮或 body）
2. 实现焦点陷阱（Esc 或 Tab 限制）
3. 关闭时还原焦点

---

### MODAL-6: a11y 属性缺失

**缺失内容**：
- mask 应有 `role="presentation"`
- container 应有 `role="dialog"`
- 应有 `aria-modal="true"`
- 应有 `aria-labelledby` 指向 title

---

### MODAL-8: 测试覆盖缺陷

**缺失场景**：
- 多个 Modal 嵌套
- ESC 关闭的陈旧回调
- controlled mode 下状态变化
- Promise callback 的清理
- 并发打开/关闭对 document overflow 的影响

## 测试覆盖

packages/base/src/modal/__test__ 覆盖了基础功能、mask、footer，但缺少并发和 a11y 场景。

## 核实记录

| ID | 删除原因 |
|----|---------|
| MODAL-1 | 误报：`handleClose`（modal-content.tsx:209）由 usePersistFn 包裹，ESC 回调始终读到最新的 onClose 和 visible；已用 `packages/shineout/src/modal/__example__/test-07-esc-closure.tsx` 手动验证，表现正常 |
| MODAL-2 | 误报：JS 单线程不存在并发竞态；`hasMask` 不控制遮罩显示（由 `showMask` 依据 instanceIds 决定，modal-content.tsx:144-147），只决定由谁记录 html 原始样式。已用 `packages/shineout/src/modal/__example__/test-08-multiple-mask.tsx` 手动验证嵌套、快速开关、同时开关，表现正常 |

## TODO

- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
