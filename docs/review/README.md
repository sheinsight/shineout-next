# 组件 Review

逐组件代码 review 的结果，作为后续逐个优化的待办清单。每个组件一份文档，位于 `components/<组件名>.md`。

## 范围

每个组件的 review 覆盖它在各包中的全部实现：

| 包 | 路径 | 关注点 |
|----|------|--------|
| shineout | `packages/shineout/src/<name>` | 对外 API、类型定义、默认值、jssStyle 注入、测试 |
| base | `packages/base/src/<name>` | 渲染逻辑、受控/非受控、a11y、semantic DOM |
| hooks | `packages/hooks/src/components/use-<name>`、`packages/hooks/src/common` | 状态管理、副作用清理、性能 |
| shineout-style | `packages/shineout-style/src/<name>` | 样式 token 使用、硬编码值、RTL、暗色主题 |

## 严重程度

| 级别 | 含义 |
|------|------|
| P0 | 确定的 bug：崩溃、数据错误、内存泄漏、受控状态失效等，用户可感知 |
| P1 | 高概率出问题的边界情况、明显性能问题、a11y 缺陷、类型与实现不符 |
| P2 | 可维护性、代码重复、命名/API 不一致、测试缺失 |
| P3 | 风格、小优化、建议 |

## 单个组件文档模板

```markdown
# <组件名>

- Review 日期：YYYY-MM-DD
- 涉及文件：列出主要文件路径
- 状态：待优化 / 优化中 / 已完成

## 概要
两三句话说明组件结构和整体质量。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| BTN-1 | P1 | bug | packages/base/src/button/button.tsx:42 | ... | ... |

## 详细说明
对 P0/P1 问题给出触发场景、原因分析和修复思路。

## 测试覆盖
现有测试覆盖了什么，缺什么。
```

类别取值：`bug` / `perf` / `a11y` / `types` / `api` / `style` / `maintainability` / `test`。

## 核实状态

问题数按各文档问题清单实际统计。初审由多个 agent 并行完成，抽查发现误报、定级偏高和位置不准的情况都有，所以修复前要先看核实状态：

| 核实状态 | 含义 | 修复前要做什么 |
|----------|------|----------------|
| 已核实 | P0/P1 已逐条对照源码确认 | 可直接按清单修复 |
| 核实中断 | 核实 agent 中途停止，文档可能只改了一部分 | 逐条复核 P0/P1 |
| 仅初审 | 未经核实 | 先对照源码确认 |
| 初审过浅 | 一个 agent 一次看了 20 个组件，结论不可靠，包括“无问题” | 重新 review |

每份文档末尾的 `## TODO` 记录了该组件的后续待办，以及已经人工确认的结论。

## 跨组件待办

- [ ] `!x !== undefined` 恒为 true：`packages/base/src/tree-select/tree-select.tsx:365`、`packages/base/src/cascader/cascader.tsx:473,505`，同类写法可全局 grep 一起修
- [ ] 初审普遍把“没用 useMemo/useCallback”定成 P1 perf，复核时如果指不出具体的大数据或高频场景，降为 P2/P3
- [ ] 初审普遍报“缺少 role/aria”，复核时排除原生语义元素（`<table>`、`<button>`、`<input type="checkbox">`）自带的隐式语义

## 索引

| 组件 | P0 | P1 | P2 | P3 | 核实状态 |
|------|----|----|----|----|------|
| [alert](components/alert.md) | 0 | 1 | 2 | 0 | 初审过浅 |
| [avatar](components/avatar.md) | 0 | 0 | 3 | 1 | 初审过浅 |
| [badge](components/badge.md) | 0 | 0 | 2 | 1 | 初审过浅 |
| [border-beam](components/border-beam.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [breadcrumb](components/breadcrumb.md) | 0 | 3 | 3 | 0 | 仅初审 |
| [button](components/button.md) | 0 | 0 | 0 | 1 | 初审过浅 |
| [card-group](components/card-group.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [card](components/card.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [carousel](components/carousel.md) | 0 | 1 | 1 | 0 | 初审过浅 |
| [cascader](components/cascader.md) | 0 | 3 | 5 | 0 | 已核实 |
| [checkbox](components/checkbox.md) | 0 | 2 | 0 | 0 | 核实中断 |
| [collapse](components/collapse.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [date-picker](components/date-picker.md) | 3 | 4 | 4 | 1 | 已核实 |
| [descriptions](components/descriptions.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [divider](components/divider.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [drawer](components/drawer.md) | 0 | 1 | 2 | 1 | 仅初审 |
| [dropdown](components/dropdown.md) | 0 | 4 | 3 | 0 | 仅初审 |
| [editable-area](components/editable-area.md) | 0 | 1 | 7 | 7 | 仅初审 |
| [empty](components/empty.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [form](components/form.md) | 2 | 3 | 2 | 1 | 仅初审 |
| [gap](components/gap.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [grid](components/grid.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [icon](components/icon.md) | 0 | 0 | 2 | 0 | 初审过浅 |
| [image](components/image.md) | 0 | 2 | 7 | 1 | 核实中断 |
| [input](components/input.md) | 1 | 3 | 3 | 0 | 核实中断 |
| [link](components/link.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [list](components/list.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [menu](components/menu.md) | 0 | 3 | 2 | 0 | 仅初审 |
| [message](components/message.md) | 0 | 1 | 5 | 1 | 核实中断 |
| [modal](components/modal.md) | 0 | 1 | 4 | 1 | 核实中断 |
| [pagination](components/pagination.md) | 0 | 4 | 2 | 0 | 仅初审 |
| [popover](components/popover.md) | 2 | 3 | 3 | 0 | 核实中断 |
| [progress](components/progress.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [radio](components/radio.md) | 0 | 0 | 0 | 0 | 核实中断 |
| [rate](components/rate.md) | 0 | 3 | 5 | 1 | 已核实 |
| [rule](components/rule.md) | 3 | 4 | 3 | 2 | 仅初审 |
| [select](components/select.md) | 1 | 2 | 4 | 0 | 已核实 |
| [skeleton](components/skeleton.md) | 0 | 0 | 0 | 0 | 初审过浅 |
| [slider](components/slider.md) | 0 | 1 | 3 | 1 | 已核实 |
| [spin](components/spin.md) | 0 | 0 | 2 | 1 | 仅初审 |
| [steps](components/steps.md) | 0 | 2 | 3 | 0 | 仅初审 |
| [sticky](components/sticky.md) | 0 | 2 | 3 | 1 | 仅初审 |
| [switch](components/switch.md) | 0 | 2 | 0 | 0 | 核实中断 |
| [table](components/table.md) | 3 | 21 | 6 | 0 | 核实中断 |
| [tabs](components/tabs.md) | 0 | 4 | 3 | 0 | 仅初审 |
| [tag](components/tag.md) | 0 | 0 | 2 | 0 | 初审过浅 |
| [textarea](components/textarea.md) | 0 | 2 | 1 | 0 | 核实中断 |
| [tooltip](components/tooltip.md) | 0 | 3 | 3 | 2 | 核实中断 |
| [transfer](components/transfer.md) | 0 | 1 | 5 | 1 | 核实中断 |
| [tree-select](components/tree-select.md) | 0 | 4 | 3 | 0 | 核实中断 |
| [tree](components/tree.md) | 0 | 3 | 4 | 1 | 核实中断 |
| [upload](components/upload.md) | 1 | 5 | 5 | 3 | 核实中断 |
| [watermark](components/watermark.md) | 0 | 0 | 6 | 2 | 核实中断 |
