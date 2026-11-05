# Table

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - packages/shineout/src/table/
  - packages/base/src/table/
  - packages/hooks/src/components/use-table/
  - packages/shineout-style/src/table/
- 状态：待优化

## 概要

Table 是 shineout-next 中最复杂的组件之一，具有虚拟滚动、固定列、排序、筛选、行展开、树形数据等功能。经过深度代码审查，发现 30 个问题，其中 3 个 P0 确定 bug 涉及内存泄漏、行高缓存不清理、虚拟列表计算不同步，需要立即修复。虚拟滚动实现中存在多个递归计算错误和状态管理问题，a11y 支持总体良好（原生 HTML 已带隐式 ARIA role）。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题描述 |
|----|------|------|------|---------|
| TABLE-001 | P1 | bug | packages/hooks/src/components/use-table/use-table-virtual.tsx:70-76 | getRowSpanCount 递归函数返回值未被使用，合并行高度计算错误 |
| TABLE-002 | P1 | bug | packages/hooks/src/components/use-table/use-table-virtual.tsx:183-189 | rowSpanHeight 累加循环缺少 break，导致范围计算超出预期 |
| TABLE-003 | P0 | bug | packages/base/src/table/use-table-select.tsx:160-162 | 全局 keydown 事件监听器未被清理，存在内存泄漏 |
| TABLE-004 | P1 | bug | packages/hooks/src/components/use-table/use-table-sort.ts:30-32 | context.sortInfo 初始赋值逻辑错误，sortInfo 状态无法同步 |
| TABLE-005 | P1 | bug | packages/base/src/table/table.tsx:269 | useEffect 依赖 ref.current，ResizeObserver 被反复注册清理 |
| TABLE-006 | P1 | bug | packages/hooks/src/components/use-table/use-table-filter.ts:100 | useEffect 禁用 eslint 警告，columns 频繁变化时筛选条件可能不同步 |
| TABLE-007 | P0 | bug | packages/hooks/src/components/use-table/use-table-virtual.tsx:366 | 分页/数据切换时行高缓存未清理，导致虚拟滚动位置错误 |
| TABLE-008 | P1 | perf | packages/hooks/src/components/use-table/use-table-virtual.tsx:246-284 | handleScroll 使用固定 120ms 延迟，无法适应不同滚动速度，应使用 RAF |
| TABLE-009 | P1 | bug | packages/base/src/table/tbody.tsx:142-145 | useComponentMemo 的 lazy 虚拟滚动判断条件反向，导致性能优化失效 |
| TABLE-010 | P1 | bug | packages/hooks/src/components/use-table/use-table-row.tsx:154-162 | 数据倒序迭代后 unshift 到数组，O(n) 复杂度且易出错 |
| TABLE-011 | P1 | bug | packages/hooks/src/components/use-table/use-table-expand.tsx:44-52 | useEffect 依赖数组为空但访问 props.columns，列变化时检测不到 |
| TABLE-012 | P1 | bug | packages/base/src/table/table.tsx:224 | selectData useMemo 依赖项不完整，未包含 props.columns 等属性 |
| TABLE-013 | P1 | bug | packages/hooks/src/components/use-table/use-table-layout.tsx:118-120 | checkScroll 频繁 setTimeout，checkNum 可能达到上限导致滚动判断错误 |
| TABLE-014 | P2 | maintainability | packages/hooks/src/components/use-table/use-table-virtual.tsx:212-216 | autoAddRows 逻辑分散多处使用 setTimeout，容易产生竞态条件 |
| TABLE-017 | P1 | style | packages/base/src/table/table.tsx:537-548, 575-591 | mirrorScroller RTL 模式下样式处理不当，滚动条位置错误 |
| TABLE-018 | P1 | bug | packages/hooks/src/components/use-table/use-table-tree.tsx:186 | isEmptyTree 计算未检查 treeColumnsName，结果不准确 |
| TABLE-019 | P1 | bug | packages/base/src/table/table.tsx:359-361 | scrollingTimer 清理与重置不同步，scrolling 状态与实际不符 |
| TABLE-020 | P1 | bug | packages/hooks/src/components/use-table/use-table-virtual.tsx:306-315 | virtualColumn 模式下列宽计算未考虑列可见性 |
| TABLE-021 | P2 | api | packages/shineout/src/table/table.type.ts:124-128 | sortByColumn API 要求手动传入 columnSorter，不够友好 |
| TABLE-022 | P2 | maintainability | packages/base/src/table/tr.tsx:163-223 | renderTreeExpand 函数逻辑复杂分支众多，难以维护 |
| TABLE-023 | P2 | bug | packages/base/src/table/use-table-select.tsx:141-149 | bulkAddSelectionClass 可通过更严谨的边界检查提高健壮性 |
| TABLE-024 | P1 | bug | packages/hooks/src/components/use-table/use-table-layout.tsx:152-156 | changeColGroup 判断不完整，undefined 值处理错误 |
| TABLE-025 | P1 | perf | packages/base/src/table/tr.tsx:117-122 | setVirtualRowHeight 依赖项包含高频变化的值，导致频繁 getBoundingClientRect 读取 |
| TABLE-026 | P1 | bug | packages/hooks/src/components/use-table/use-table-virtual-external.tsx:25-49 | container 动态变化时 tableOffsetRef 不重新初始化，滚动计算错误 |
| TABLE-027 | P0 | bug | packages/hooks/src/components/use-table/use-table-virtual.tsx:395 | finalRowsInView 三个分量更新不同步，虚拟列表显示不完整 |
| TABLE-028 | P2 | test | 测试覆盖 | 缺少虚拟滚动+rowSpan、RTL 固定列、大数据、快速切换等集成测试 |
| TABLE-029 | P1 | style | packages/shineout-style/src/table/fixed-style.ts:31 | RTL 模式固定列偏移公式容易误读，实际计算错误 |
| TABLE-030 | P1 | bug | packages/base/src/table/table.tsx:366 | renderEmpty emptyNoBorder 条件判断不考虑 sticky，样式不一致 |
| TABLE-031 | P2 | maintainability | packages/base/src/table/table.tsx:405-737 | renderTable 函数过长（300+ 行），包含三种渲染模式应拆分 |
| TABLE-032 | P1 | bug | packages/base/src/table/table.tsx:173-182 | loading 参数处理错误，自定义加载组件时布�转换失败 |

## 详细说明（P0/P1 问题）

### TABLE-003: 全局事件监听器内存泄漏（P0 - bug）

**位置**: packages/base/src/table/use-table-select.tsx:160-162

**问题**:
```typescript
// module load 时执行的回调，仅注册一次，永不清理
ready(() => {
  document.addEventListener('keydown', handleKeydown);
});
```

全局 keydown 监听器在模块加载时注册，当表格组件销毁后监听器仍然存在。多个表格实例会导致事件处理混乱。

**修复建议**: 将事件监听器移到 useEffect 中管理，在组件 mount 时注册，unmount 时清理。

---

### TABLE-007: 虚拟滚动行高缓存未清理（P0 - bug）

**位置**: packages/hooks/src/components/use-table/use-table-virtual.tsx:366

**问题**:
context.preIndex 在 cleanup 中被设为 null，但 cachedHeight 数组未清空。分页切换或数据重新加载时，旧的行高缓存被复用，导致虚拟滚动位置错误。

**修复建议**: 在 props.data 变化时清空 context.cachedHeight = [];

---

### TABLE-019: 滚动状态管理潜在竞态条件（P1 - bug）

**位置**: packages/base/src/table/table.tsx:359-361

**问题**:
```typescript
if (context.scrollingTimer) {
  clearTimeout(context.scrollingTimer);
}
setScrolling(true);
context.scrollingTimer = setTimeout(() => {
  setScrolling(false);
}, 100);
```

快速滚动时，timeout 被反复清理创建。虽然浏览器会自动去重事件处理（同一函数多次注册的情况），但这里 scrolling 状态与实际滚动状态可能出现延迟不同步，影响 lazy 虚拟滚动的表现。

**修复建议**: 使用单一的 useEffect 管理 scrolling 状态，或使用标准化的 debounce 工具。

---

### TABLE-027: 虚拟列表行数计算不同步（P0 - bug）

**位置**: packages/hooks/src/components/use-table/use-table-virtual.tsx:395

**问题**:
```typescript
const finalRowsInView = rowsInView + context.rowSpanRows + context.autoAddRows;
```

三个分量的更新时机不同步，context.rowSpanRows 和 context.autoAddRows 可能被重置为 0，导致虚拟列表显示不完整。

**修复建议**: 使用 useMemo 或 useState 统一管理这些值的更新，确保同步性。

---

### TABLE-001: getRowSpanCount 递归逻辑错误（P1 - bug）

**位置**: packages/hooks/src/components/use-table/use-table-virtual.tsx:70-76

**问题**: 递归调用返回值未被使用，合并行高度计算错误。

**修复建议**: 将递归改为迭代方式，或改为 return getRowSpanCount(index + 1, count)。

---

### TABLE-005: useEffect 依赖 ref.current（P1 - bug）

**位置**: packages/base/src/table/table.tsx:269

**问题**: 依赖数组使用 ref.current 是反模式，导致 ResizeObserver 被反复注册清理。

**修复建议**: 改为 [] 或使用更稳定的依赖项。

---

---

### 其他 P1 问题概览

- TABLE-002: 行合并高度累加缺少 break
- TABLE-004: 排序状态同步失效
- TABLE-006: 筛选条件在 columns 频繁变化时可能不同步
- TABLE-008: 虚拟滚动使用固定延迟应改用 RAF
- TABLE-009: lazy 虚拟滚动判断条件反向
- TABLE-010: 数据倒序 unshift 性能差
- TABLE-011: useEffect 依赖数组未包含必要的 props
- TABLE-012: selectData useMemo 依赖项不完整
- TABLE-013: checkScroll 频繁 setTimeout 导致判断错误
- TABLE-018: 树形展开列判断未检查 treeColumnsName
- TABLE-020: virtualColumn 模式列宽计算错误
- TABLE-024: colgroup 判断条件不完整
- TABLE-025: getBoundingClientRect 频繁调用造成 layout thrashing
- TABLE-026: 容器动态变化时滚动位置计算错误
- TABLE-029: RTL 模式固定列偏移公式容易误读
- TABLE-030: Empty 状态样式条件判断不完整
- TABLE-032: loading 参数处理错误

---

## 测试覆盖

### 现有测试覆盖

- 基本渲染和快照测试
- CSS 类名覆盖
- 大小/边框/条纹等 props

### 缺失的测试（P2-TABLE-028）

关键缺失覆盖（优先级排序）：

1. **虚拟滚动与行合并（rowSpan）的交互** - 高优先级
   - 验证虚拨动时行高计算是否正确
   - 测试 rowSpan 与虚拟滚动共存时的 hover 状态
   - 验证合并行在虚拨动时不会"闪烁"

2. **RTL 模式下的固定列测试** - 高优先级
   - 固定列左/右偏移在 RTL 下是否正确
   - 镜像滚动条位置是否正确
   - 树形展开缩进方向是否符合 RTL

3. **大数据量性能基准** - 中优先级
   - 虚拨动 10000+ 行的 TTI/FCP
   - 快速滚动（1000px/100ms）的帧率
   - 内存使用量趋势

4. **快速数据切换的边界条件** - 中优先级
   - 分页切换时虚拨动位置是否复位
   - 排序/筛选期间滚动是否稳定
   - 数据突然清空时的状态恢复

5. **a11y 键盘操作** - 中优先级
   - Tab 键导航表格内容
   - 排序按钮的 Space/Enter 激活
   - 屏幕�读器对表结构的识别

## TODO

- [ ] TABLE-1（原 TABLE-10）属实：`use-table-virtual.tsx:70` 递归返回值被丢弃，rowSpan 合并最多算到 2 行
- [ ] “原生 <table> 缺少 role” 属误报，确认已删除
- [ ] 初审重写过一次，现有 30 条里 21 条 P1，定级明显偏高，需逐条复核
- [ ] 位置多为不完整路径（如 `use-table-virtual.tsx:70-76`），需补全为 `packages/...`
- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
