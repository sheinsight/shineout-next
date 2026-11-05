# Popover

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：packages/base/src/popover/popover.tsx, packages/base/src/popover/confirm.tsx, packages/shineout/src/popover, packages/hooks/src/components/use-popup
- 状态：待优化

## 概要

Popover 基于 use-popup hook 和 AbsoluteList 实现，支持多种触发方式。存在严重的事件监听器内存泄漏问题（P0 级）：事件处理函数引用不匹配导致 removeEventListener 失效，scrollDismiss useEffect 缺少依赖数组导致重复绑定。此外还有 Promise 清理缺陷和类型定义混乱。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| POV-1 | P0 | bug | packages/base/src/popover/popover.tsx:81, 112-114, 129-132 | 事件监听器内存泄漏：bindEvents 使用第 81 行的 events，但 unbindEvents 调用 getTargetProps() 获取新引用，导致 removeEventListener 失效 | 保存第一次 getTargetProps() 的引用，bind/unbind 使用相同引用 |
| POV-2 | P0 | bug | packages/base/src/popover/popover.tsx:150-162 | scrollDismiss useEffect 缺少依赖数组：每次 render 都添加监听器而不清理，导致多个监听器堆积 | 添加依赖数组：[props.scrollDismiss, closePop] |
| POV-3 | P1 | bug | packages/base/src/popover/popover.tsx:142-147, 170-178 | bindEvents 多次调用：useEffect 中调用一次，noscript 回调又调用一次，可能重复绑定 | 用标准 React 模式替代 noscript 方案，确保单一绑定点 |
| POV-4 | P2 | bug | packages/base/src/popover/popover.tsx:61, 223 | boundaryStyle 状态未清理：Popover 关闭或边界变化时陈旧样式可能残留 | 在关闭或边界变化时重置 boundaryStyle 为 undefined |
| POV-5 | P1 | bug | packages/base/src/popover/confirm.tsx:13-27, 30-44 | Confirm Promise 回调未清理：Promise 在组件卸载后解决导致陈旧状态更新警告 | 使用 AbortController 或卸载状态标记追踪 |
| POV-6 | P1 | bug | packages/base/src/popover/popover.tsx:142-147 | useEffect 依赖数组缺少 trigger/props：effect 为空依赖但依赖闭包中的 trigger/clickToCancelDelay，props 变化时绑定陈旧 | 添加依赖：[trigger, props.clickToCancelDelay, props.adjust, closePop] |
| POV-7 | P2 | types | packages/shineout/src/popover/confirm.type.ts:12 | 类型定义混乱：复杂嵌套 Omit 定义未导出也未使用，Confirm props 允许不适用的字段如 trigger | 文档化或移除未使用类型，严格限制 Confirm props |
| POV-8 | P2 | style | packages/base/src/popover/popover.tsx:84-102, packages/base/src/common/arrow.ts:3, 5 | 箭头偏移硬编码：arrowHCenterOffset=16、arrowVCenterOffset=12 假设固定箭头尺寸，自定义主题时偏移错误 | 参数化箭头偏移或运行时计算实际尺寸 |

## 详细说明

### POV-1: 事件监听器内存泄漏（P0）

**触发场景**：Popover 挂载/卸载循环、trigger 模式切换。

**原因分析**：
- 第 81 行：`const events = getTargetProps();`
- 第 112-114 行：用这个 events 对象添加监听器
- 第 129 行：`const events = getTargetProps();` 获取新对象
- 第 130-132 行：新引用与原引用不同，removeEventListener 匹配失败

结果：每次卸载都有残留监听器。

**修复思路**：在 useRef 中保存初次获取的 events 引用，或改用标准的 React 事件委托。

---

### POV-2: scrollDismiss useEffect 缺少依赖（P0）

**触发场景**：使用 scrollDismiss 的 Popover，任何状态变化导致重新 render。

**原因分析**：第 150-162 行 useEffect 无依赖数组，每次 render 都执行：
1. 添加新的 scroll 监听器
2. cleanup 试图移除，但引用变化导致失效
3. 多个监听器堆积

**修复思路**：添加 `[props.scrollDismiss, closePop]` 依赖数组。

---

### POV-5: Confirm Promise 泄漏

**触发场景**：onOk/onCancel 返回 Promise，Promise 解决前组件卸载。

**原因分析**：
```javascript
callback.then(() => {
  close();
  setOk(false); // 可能在卸载后执行
});
```

**修复思路**：用 AbortController 或 isMounted 标记跟踪。

---

### POV-6: useEffect 依赖缺失

**问题**：第 142-147 行 useEffect 为 `[]`，但闭包依赖 trigger、clickToCancelDelay 等，这些变化时绑定不更新。

**修复思路**：加入依赖或提取 bindEvents 为 useCallback。

---

### POV-8: 箭头偏移硬编码

**问题**：假设箭头宽 16px、高 8px。自定义主题改大小时，pointAtCenter 偏移错误。

**修复思路**：从 token 读取或运行时测量箭头实际尺寸。

## 测试覆盖

packages/shineout/src/popover/__test__/popover.bug.spec.tsx 覆盖了 Issue #1288，但缺少：
- 事件监听器清理验证
- scrollDismiss 动态目标测试
- Promise 卸载时清理测试
- 多次挂载/卸载的内存泄漏测试

## TODO

- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
