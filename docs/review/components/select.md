# Select

- Review 日期：2026-11-05
- 核实状态：已核实
- 涉及文件：
  - packages/shineout/src/select/select.tsx
  - packages/shineout/src/select/select.type.ts
  - packages/base/src/select/select.tsx
  - packages/base/src/select/result.tsx
  - packages/base/src/select/list.tsx
  - packages/hooks/src/components/use-select/use-select.ts
  - packages/shineout-style/src/select/select.ts
  - packages/shineout/src/select/__test__/select.spec.tsx
- 状态：待优化

## 概要

Select 组件是多选/单选下拉框，支持搜索、分组、虚拟滚动、树形结构等功能。整体架构清晰，但存在几个待确认的边界问题、性能优化空间和 a11y 缺陷。主要问题集中在受控状态管理、重复处理逻辑和键盘操作完整性上。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| SELECT-1 | P0 | bug | packages/base/src/select/list.tsx:102 | 循环边界处理逻辑错误：nextHoverIndex < 0 时赋值为 max 会导致越界 | 应改为 nextHoverIndex = max - 1 或添加边界检查 |
| SELECT-2 | P2 | perf | packages/base/src/select/select.tsx:663 | 每次 renderList 调用时创建新的 listProps 对象，但关键回调已用 usePersistFn 缓存，数据变化时 List 重渲染是必要的 | 无需优化，性能表现符合预期 |
| SELECT-3 | P1 | bug | packages/base/src/select/result.tsx:114 | 依赖项缺失：useMemo([props.value, props.data, getDataByValues]) 中 getDataByValues 是引用，每次都变化，导致 memoize 失效 | 改为 useMemo(..., [value, data]) 并在组件内部注入 getDataByValues 调用 |
| SELECT-4 | P1 | a11y | packages/base/src/select/select.tsx:480、485 | 虚拟滚动列表上下键移动时缺少边界反馈：当到达列表顶/底部时无可视反馈提示 | 添加 aria-live 提示或声音反馈 |
| SELECT-5 | P2 | maintainability | packages/base/src/select/select.tsx:350 | renderItem 和 getRenderItem 定义重复，逻辑相同，只需保留一个 | 删除第 350 行的 renderItem 赋值，直接使用 getRenderItem |
| SELECT-6 | P2 | api | packages/base/src/select/select.tsx:232 | 多选模式下 focusSelected 默认为 true 但仅在满足条件时触发 inputRef.select()，行为不符合 API 文档 | 明确文档说明该属性的确切行为或调整实现 |
| SELECT-7 | P2 | test | packages/shineout/src/select/__test__/select.spec.tsx | 缺少受控/非受控切换的测试用例，缺少大数据虚拟滚动边界测试 | 补充受控状态切换、虚拟滚动边界值等测试 |

## 详细说明

### SELECT-1: 循环边界处理逻辑错误（P0）

**位置**：packages/base/src/select/list.tsx:102

**问题**：
```typescript
if (nextHoverIndex < 0) nextHoverIndex = max;
```

当执行向上翻页操作且 hoverIndex 已在最上面时，nextHoverIndex < 0，被赋值为 max (即 data.length)。这会导致尝试访问 data[max] 时越界。

**触发场景**：
1. Select 有 N 个选项
2. 用户向上键或翻页到第一项
3. 再按向上键时，hoverIndex 变成 max，超出数组界限

**修复思路**：
改为 `nextHoverIndex = max - 1` 或在 handleMove 中添加显式的边界检查。

### SELECT-3: useMemo 依赖项不完整（P1）

**位置**：packages/base/src/select/result.tsx:114

**问题**：
```typescript
const empty = useMemo(() => {
  return isEmptyResult();
}, [props.value, props.data, getDataByValues]);
```

getDataByValues 是函数引用，在每次 render 时都会变化（虽然逻辑相同但引用不同），导致 useMemo 缓存失效。

**修复思路**：
删除 getDataByValues 依赖项，改为 `[props.value, props.data]`，然后在 isEmptyResult 内部使用已稳定的 props.getDataByValues。

### SELECT-4: 虚拟滚动键盘操作缺少 a11y 反馈（P1）

**位置**：packages/base/src/select/select.tsx:480、485

**问题**：
上下键移动光标时缺少屏幕阅读器和键盘用户的反馈。到达列表边界时没有任何提示。

**修复思路**：
- 添加 aria-live="polite" 区域显示当前项信息
- 或使用 aria-valuenow/aria-valuemin/aria-valuemax 属性
- 考虑添加焦点环管理

### SELECT-7: 测试覆盖不足（P2）

**现有测试**：
- 基础功能：基础单选、多选、自适应、格式化等
- 功能测试：组、搜索、树形、创建、大数据等
- 快照测试：多个示例的快照

**缺失测试**：
- 受控 → 非受控 或反向切换
- 虚拟滚动边界值（itemsInView = 1、height = lineHeight 等）
- 搜索词为空字符串或空格的处理
- 大数据情况下的内存泄漏

## 测试覆盖

现有测试覆盖了基础功能、各种模式（多选、分组、树形等）、大数据场景和快照。

缺失的测试：
- 受控/非受控状态切换
- 虚拟滚动边界条件（如 itemsInView 为 1）
- 滚动性能基准
- 内存泄漏（特别是 onFilter 副作用）

## 核实记录

| ID | 删除原因 |
|----|---------|
| SELECT-2 | 降级为 P2：回调函数已通过 usePersistFn 持久化，listProps 对象每次创建是必要的以传递正确的数据，不构成性能问题 |

## TODO

- [ ] SELECT-1 属实：`list.tsx:102` 首项按上键 hoverIndex 变为 data.length，越界后无高亮项
- [ ] P0/P1 已逐条对照源码核实，可直接按清单修复
