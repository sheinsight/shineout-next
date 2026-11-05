# Message

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：packages/base/src/message/message.tsx, packages/base/src/message/func.tsx, packages/base/src/message/manager.tsx, packages/shineout/src/message, packages/shineout-style/src/message
- 状态：待优化

## 概要

Message 是全局消息提示组件，采用函数式 API 设计。使用 PureComponent + 时间管理实现。问题主要集中在：全局状态管理的并发隐患、定时器泄漏、Promise 缺乏清理。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
# Message

- Review 日期：2026-11-05
- 涉及文件：packages/base/src/message/message.tsx, packages/base/src/message/func.tsx, packages/base/src/message/manager.tsx, packages/shineout/src/message, packages/shineout-style/src/message
- 状态：待优化

## 概要

Message 是全局消息提示组件，采用函数式 API 设计。使用 PureComponent + 时间管理实现。问题主要集中在：全局状态管理的并发隐患、定时器泄漏、Promise 缺乏清理。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| MSG-1 | P1 | bug | packages/base/src/message/message.tsx:104-118 | 消息超时清理竞态：onMouseLeave 触发 timeout 更新，快速事件或消息关闭时前一个 timeout 未清理，导致陈旧 timeout 执行或内存泄漏 | 增强 useEffect cleanup，追踪 timeout 实例完整生命周期 |
| MSG-2 | P2 | bug | packages/base/src/message/message.tsx:187-204 | removeMessage 回调时序问题：onClose 在状态更新后执行，若回调触发新消息，可能与旧消息清理竞态 | 同步执行 onClose 回调或确保消息操作队列化 |
| MSG-3 | P2 | perf | packages/base/src/message/manager.tsx:20-31 | JSS 样式表反复插入移除：destroy 时卸载导致样式移除，再次 show 时重新插入，产生 28-44ms 布局重算，导致 INP 升高 | 启用 keepStyleSheet 配置作为默认行为 |
| MSG-4 | P2 | api | packages/base/src/message/manager.tsx:41-75 | 语义 DOM 全局配置不一致：manager 接收 classNames/styles 但与 Message 组件的全局 config 合并逻辑可能不同步 | 确保 manager 和 component 的 config 合并逻辑一致 |
| MSG-5 | P2 | bug | packages/base/src/message/func.tsx:16-17 | duration 参数优先级不清：duration 可来自参数、defaultOptions、硬编码 3，逻辑不直观 | 文档化优先级或统一为对象参数 |
| MSG-6 | P2 | a11y | packages/base/src/message/message.tsx:100-125 | 缺少 a11y 属性：item 无 role="alert"，无 aria-live，屏幕阅读器无法标识 | 添加 role="alert" 和 aria-live="polite" |
| MSG-7 | P3 | test | packages/base/src/message/__test__ | 测试缺陷：缺少并发、timeout 清理、callback 时序测试 | 补充并发和清理测试 |

## 详细说明

### MSG-1: 全局状态并发隐患

**触发场景**：同时从多个位置调用 Message.show()，或快速切换 container。

**问题**：
- 第 8 行：`let lastContainer: HTMLElement | null = null;`
- 第 45-48 行：`if (lastContainer && lastContainer !== target) destroy(position);`
- 无原子性保护，并发调用时多个线程可能同时修改

**修复思路**：用 Map<position, container> 替代，或加互斥锁。

---

### MSG-2: timeoutMap 依赖项错误

**问题**：
- 第 36 行：`[Object.keys(timeoutMap).length]`
- Object.keys 每次都返回新数组，引用变化
- 依赖数组实际每次都不同，effect 每次都执行

**修复思路**：直接用 timeoutMap 作为依赖，或用 Map + key 集合。

---

### MSG-3: 定时器泄漏（P0）

**问题**：
- 第 178-184 行：setTimeout 若消息未手动关闭就卸载
- 定时器继续在 timeoutMap 中运行
- Message 卸载时未清理所有定时器

**修复思路**：在 Message PureComponent 的 componentWillUnmount 中遍历 timeoutMap 并 clearTimeout。

---

### MSG-6: a11y 缺陷

**问题**：item 和消息容器无 role，屏幕阅读器无法标识。

**修复思路**：
- item 添加 `role="alert"` 和 `aria-live="polite"`
- 根据 type 设置 aria-label（如 "Success message"�

## 测试覆盖

缺少：
- 多位置并发消息测试
- duration 参数优先级测试
- 消息卸载时定时器清理测试
- Promise onClose 清理测试

## TODO

- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
