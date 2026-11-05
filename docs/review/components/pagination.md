# Pagination

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：
  - packages/shineout/src/pagination/pagination.tsx
  - packages/base/src/pagination/pagination.tsx
  - packages/base/src/pagination/pagination-buttons.tsx
  - packages/base/src/pagination/pagination-jumper.tsx
  - packages/hooks/src/components/use-pagination/use-pagination.tsx
  - packages/shineout-style/src/pagination/
- 状态：待优化

## 概要

Pagination 组件通过 usePagination hook 管理当前页码和页大小，支持多种布局组合（links/jumper/list/simple）。整体功能完整，但存在几个问题：total 状态初始化只读不更新、受控模式下的边界值校验不足、页码跳转时无边界检查。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| PAGI-1 | P1 | bug | packages/hooks/src/components/use-pagination/use-pagination.tsx:16 | total 使用 useState 初始化但从不更新。当父组件传入新的 total 值时，分页组件不会响应（如数据重新加载后 total 变化） | 添加 useEffect 监听 totalProp 变化，更新 total 状态 |
| PAGI-2 | P1 | bug | packages/hooks/src/components/use-pagination/use-pagination.tsx:28-40 | handleChange 中未验证页码 c 的有效性。若外部代码调用 onChange(999, pageSize)，组件不会检查 999 是否超过总页数 | 在 handleChange 中添加边界校验：`const validPage = Math.max(1, Math.min(c, Math.ceil(total / pageSize)))` |
| PAGI-3 | P1 | perf | packages/base/src/pagination/pagination-buttons.tsx:1-150 | pagination-buttons 中每次渲染都调用 `Array.from({ length: totalPages }, (_, i) => i + 1)` 生成页码数组。未使用 useMemo 缓存，可能导致频繁的数组重新创建 | 使用 useMemo 缓存页码数组，依赖为 totalPages 和 span |
| PAGI-4 | P1 | a11y | packages/base/src/pagination/pagination.tsx:1-187 | 分页按钮缺少 aria-label、aria-current="page"、role="button" 等属性。数字按钮无法被屏幕阅读器区分 | 为按钮添加 aria-label（如 "Page 2"、"Next page"），当前页添加 aria-current="page" |
| PAGI-5 | P2 | types | packages/hooks/src/components/use-pagination/use-pagination.tsx:60 | 返回值中 current 的计算逻辑为 `currentProp !== undefined ? currentProp : current`，但状态中的 current 从未在 currentProp 受控时更新，导致非受控降级时的值不准确 | 明确受控/非受控模式的切换规则，补充文档说明 |
| PAGI-6 | P2 | test | packages/shineout/src/pagination/__test__/ | 现有测试缺少：total 动态更新、页码超界校验、layout 组合、受控/非受控切换 | 补充上述测试用例 |

## 详细说明

### PAGI-1: total 不响应更新

**触发场景**：初始化 `<Pagination total={100} />` 分页 10 条/页，共 10 页。用户搜索后 total 变为 50，组件不会重新计算总页数。

**原因分析**：
- use-pagination.tsx 行 16：`const [total] = useState(totalProp)` 只初始化不更新
- 虽然 pageSize 和 current 都有 useEffect 监听外部 props 变化（行 20-26），但 total 没有
- 这导致 pagination-buttons.tsx 中计算 totalPages 时使用的还是初始值

**修复思路**：
```tsx
const [total, setTotal] = useState(totalProp);

useEffect(() => {
  if (totalProp !== total) setTotal(totalProp);
}, [totalProp, total]);
```

### PAGI-2: 页码边界检查缺失

**触发场景**：Pagination 作为受控组件时，父组件直接调用 onChange(999)，或通过 API 设置了一个无效的页码。

**原因分析**：
- handleChange 中没有验证 c 是否在 [1, totalPages] 范围内
- 若 total=100，pageSize=10，用户输入页码 50，组件不会拒绝
- 这会导致渲染空列表或显示不符合预期的数据

**修复思路**：
```tsx
const handleChange = usePersistFn((c: number, size?: number) => {
  const newPageSize = size || pageSize;
  const maxPage = Math.ceil((totalProp || 0) / newPageSize);
  const validPage = Math.max(1, Math.min(c, maxPage));
  
  setCurrent(validPage);
  setPageSize(newPageSize);
  if (onChange) {
    onChange(validPage, newPageSize, size !== undefined && pageSize !== size);
  }
});
```

### PAGI-3: 页码数组未缓存

**触发场景**：在分页组件频繁重新渲染的场景下（如表格滚动），pagination-buttons 每次都创建新的页码数组。

**原因分析**：
- pagination-buttons 中生成页码数组的逻辑没有使用 useMemo 缓存
- 每次组件重新渲染都会创建新数组，子按钮组件收到新 key 后重新挂载
- 虽然不是严重的性能问题，但在大数据表格场景下会有感知

**修复思路**：
```tsx
const pageNumbers = useMemo(() => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}, [totalPages, span]);
```

### PAGI-4: 缺少辅助功能属性

**触发场景**：屏幕阅读器用户访问分页组件。

**原因分析**：
- 分页按钮缺少 `aria-label`，屏幕阅读器只能读出按钮的文本内容（如数字 "2"）
- 当前页按钮缺少 `aria-current="page"` 标记
- 上一页/下一页按钮的用途不明确

**修复思路**：
```tsx
<button aria-label={`Page ${pageNum}`} aria-current={current === pageNum ? 'page' : undefined}>
  {pageNum}
</button>
<button aria-label="Previous page" disabled={current === 1}>Prev</button>
<button aria-label="Next page" disabled={current === totalPages}>Next</button>
```

## 测试覆盖

现有测试覆盖了基本的分页功能。缺失的测试：
- total 属性动态更新
- 页码超界时的处理
- 不同 layout 组合的渲染
- 受控/非受控切换
- pageSize 变化时的页码重置
- 屏幕阅读器兼容性

## TODO

- [ ] PAGI-1 属实：`use-pagination.tsx:16` `const [total] = useState(totalProp)` 不随 props 更新；需确认 base 层是否直接用 props.total 来判断用户是否受影响
- [ ] PAGI-3（页码数组未 memo）定为 P1 偏高，页码通常只有几十项
- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
