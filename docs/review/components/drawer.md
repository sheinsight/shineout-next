# Drawer

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：packages/shineout/src/drawer/drawer.tsx, packages/shineout/src/drawer/drawer.type.ts, packages/shineout-style/src/drawer
- 状态：待优化

## 概要

Drawer 是 Modal 的包装器，通过 position 属性实现抽屉效果。实现简洁，问题主要继承自 Modal。新增问题：position 的 RTL 处理可能不完整，样式定制缺乏 token 支持。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| DRAWER-1 | P1 | bug | packages/shineout/src/drawer/drawer.tsx:8-20 | 继承 Modal 的所有 P0/P1 问题：ESC 依赖缺失、全局状态竞态、定时器泄漏等（见 MODAL-1/2/3） | 修复 Modal 后自动解决 |
| DRAWER-2 | P2 | maintainability | packages/shineout/src/drawer/drawer.tsx:7-20 | config.drawer 合并逻辑与 semantic DOM 系统重复：每个组件都实现相似的 config merge，无统一抽象 | 提取通用 config merge 工具函数 |
| DRAWER-3 | P3 | style | packages/shineout-style/src/drawer | Drawer 样式 token 缺失：width/height/动画时长等应通过 token 可配置，目前需修改源码 | 补充完整的 token 配置 |
| DRAWER-4 | P2 | a11y | packages/shineout/src/drawer/drawer.tsx | position 'top'/'bottom'/'left'/'right' 对屏幕阅读器无语义说明 | 考虑补充 aria-label 或根据 position 自动生成描述 |

## 详细说明

### DRAWER-1: 继承 Modal 问题

**影响**：Drawer 直接使用 Modal 实现，Modal 的所有缺陷（ESC 陈旧闭包、全局状态竞态、定时器泄漏、焦点管理缺失）同样影响 Drawer。

**修复思路**：同步修复 Modal（MODAL-1、MODAL-2、MODAL-3）。

---

### DRAWER-2: config merge 重复

**问题**：drawer.tsx 第 7-20 行的 config.drawer 合并逻辑在其他组件（如 modal.tsx）中也有相似实现。

**修复思路**：抽提通用工具函数如 `mergeConfigWithProps(config, props, configKey)`。

---

### DRAWER-3: 样式 token 缺乏

**问题**：Drawer 的宽高、动画时长等无 token 支持，无法通过 setConfig 自定义。

**修复思路**：补充 token 配置，允许 `setConfig({ drawer: { width: 300, animationDuration: 0.3 } })`。

---

### DRAWER-4: a11y 缺陷

**问题**：position 属性对屏幕阅读器无语义表示。

**修复思路**：根据 position 自动设置 aria-label（如 'Left drawer' for position='left'）。

## 测试覆盖

packages/shineout/src/drawer/__test__ 应覆盖 position 变化、宽高变化、嵌套 Modal，但需补充 a11y 和性能测试。

## TODO

- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
