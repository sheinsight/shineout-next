# Tooltip

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：packages/base/src/tooltip/tooltip.tsx, packages/base/src/tooltip/tooltip.type.ts, packages/hooks/src/common/use-click-away, packages/hooks/src/components/use-popup, packages/shineout-style/src/tooltip
- 状态：待优化

## 概要

Tooltip 是一个基于 use-popup hook 的浮层提示组件。整体架构合理，但存在多个内存泄漏问题：事件监听器未正确清理（尤其在 persistent 模式下）、点击外部事件处理竞态、定时器泄漏。此外还有 a11y 缺陷和硬编码样式值问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| TT-1 | P1 | bug | packages/base/src/tooltip/tooltip.tsx:96-124 | persistent 模式下事件监听器内存泄漏：bindEvents 绑定的监听器引用与 unbindEvents 调用 getTargetProps() 获取的新引用不匹配，导致 removeEventListener 失效 | 在 useRef 中缓存事件处理函数引用，确保 bind/unbind 使用同一引用 |
| TT-2 | P1 | bug | packages/hooks/src/common/use-click-away/index.ts:29-53 | useClickAway 监听器竞态：setTimeout 延迟 addEventListener，但 cleanup 同步执行，导致可能在监听器添加前就被移除 | 追踪附加状态或清除延迟定时器再移除监听器 |
| TT-3 | P2 | bug | packages/base/src/tooltip/tooltip.tsx:74-89 | pointAtCenter memo 依赖项错误：依赖 targetRef.current 但这是可变对象，position 变化时计算陈旧 | 移除 targetRef.current 依赖，仅依赖 pointAtCenter 和 position |
| TT-4 | P1 | bug | packages/hooks/src/components/use-popup/use-popup.ts:28-60 | use-popup 中的 triggerTimer 未清理：组件卸载时定时器未 clear，导致定时器泄漏和陈旧状态更新 | 在 useEffect cleanup 中 clearTimeout(context.triggerTimer) |
| TT-5 | P2 | perf | packages/base/src/tooltip/tooltip.tsx:126-138 | innerProps memo 失效：依赖 events 对象但每次 render 都是新对象（getTargetProps 每次创建新引用），memo 每次都重算 | 移除 events 依赖，仅依赖 persistent 和 trigger |
| TT-6 | P3 | maintainability | packages/base/src/tooltip/tooltip.tsx:178-185 | 语义 class 重复：同时应用 tooltipClasses、className 和 semClass('root')，优先级不清 | 文档化优先级或统一到语义系统 |
| TT-7 | P2 | a11y | packages/base/src/tooltip/tooltip.tsx:178-202 | 缺少 a11y 属性：无 role="tooltip"、无 aria-hidden、无 id for aria-describedby、箭头无 role | 添加 role、aria-hidden、id，绑定 aria-describedby |
| TT-8 | P3 | style | packages/shineout-style/src/tooltip/tooltip.ts:5-6, 139, 354-372 | 箭头尺寸硬编码：arrowGap=12、arrowHeight=8 硬编码且 clip-path 使用固定坐标，无法通过 token 定制 | 抽取为 token 参数 |

## 详细说明

### TT-1: persistent 模式事件监听器泄漏

**触发场景**：使用 `persistent={true}` 的 Tooltip，多次挂载/卸载或切换 persistent 状态。

**原因分析**：
- 第 99-101 行：bindEvents 使用第 71 行的 `events` 对象添加监听器
- 第 109 行：unbindEvents 重新调用 `getTargetProps()`，返回新的函数引用
- 第 110-112 行：新引用与原引用不同，removeEventListener 匹配失败，监听器残留

**修复思路**：用 useRef 保存原始事件处理函数，unbind 时使用相同引用。

---

### TT-2: useClickAway 竞态

**触发场景**：Tooltip 快速挂载/卸载（如动态列表）。

**原因分析**：
- setTimeout 延迟事件附加
- cleanup 函数同步执行，可能先于 setTimeout 回调完成
- 监听器尚未添加就被移除尝试，导致内存泄漏

**修复思路**：跟踪附加完成状态，cleanup 前检查或 clearTimeout。

---

### TT-4: use-popup 定时器泄漏

**触发场景**：Tooltip 在 mouseLeave 延迟期间卸载。

**原因分析**：
- context.triggerTimer 存储在 ref，组件卸载时无 cleanup
- 定时器继续运行，可能调用已卸载组件的 setOpenState

**修复思路**：添加 useEffect cleanup 清理定时器。

---

### TT-7: a11y 缺陷

**缺失内容**：
- Tooltip 根元素无 `role="tooltip"`
- 无 `aria-hidden` 控制可见性
- 无 `id` 供 aria-describedby 引用
- 触发元素与 Tooltip 无 ARIA 关联

**修复思路**：补充标准 a11y 属性，用 aria-describedby 链接触发元素和 Tooltip 内容。

## 测试覆盖

packages/shineout/src/tooltip/__test__/tooltip.spec.tsx 覆盖了基础功能和 persistent 模式，但缺少：
- persistent + trigger 变化的交互测试
- 事件监听器清理验证
- 快速挂载/卸载的内存泄漏测试
- 动态 children 场景

## TODO

- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
