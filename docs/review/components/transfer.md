# Transfer

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - packages/shineout/src/transfer/transfer.tsx
  - packages/base/src/transfer/transfer.tsx
  - packages/base/src/transfer/transfer-list.tsx
  - packages/base/src/transfer/transfer-operate.tsx
  - packages/hooks/src/components/use-transfer/use-transfer.tsx
  - packages/shineout-style/src/transfer/transfer.ts
- 状态：待优化

## 概要

Transfer 组件是双向传输列表，支持搜索、选择、批量操作等功能。整体结构清晰，但存在多处性能优化不足、useMemo 依赖不完整、缺少 a11y 属性、内存泄漏隐患等问题。核心问题在于渲染函数依赖数组省略了关键变量，以及缺少资源清理机制。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| TR-1 | P1 | perf | packages/base/src/transfer/transfer.tsx:204-209, 210-215 | renderSourceList 和 renderTargetList 的 useMemo 依赖数组省略了 datum、itemClass、empty、title、footer 等关键变量 | 添加缺失的依赖或改为条件渲染避免 memo |
| TR-2 | P2 | perf | packages/base/src/transfer/transfer.tsx:188-196 | onSelectChange 回调定义为内联箭头函数，每次渲染创建新实例导致 TransferList 不必要重渲染 | 用 useCallback 包装 |
| TR-3 | P2 | maintainability | packages/base/src/transfer/transfer-list.tsx:62-85 | ResizeObserver 注册后缺少充分的 cleanup，组件卸载时可能内存泄漏 | 使用 WeakRef 或更严格的生命周期管理 |
| TR-4 | P2 | bug | packages/base/src/transfer/transfer.tsx:155 | onFilterProp 调用前未检查其是否为函数，直接调用可能抛异常 | 添加类型检查：`if (onFilterProp && typeof onFilterProp === 'function')` |
| TR-5 | P2 | a11y | packages/base/src/transfer/transfer.tsx:215 | Transfer 容器缺 role、aria-label，列表缺 aria-describedby，无障碍信息不足 | 添加 role="region" 和 aria-label 描述源/目标列表 |
| TR-6 | P2 | maintainability | packages/hooks/src/components/use-transfer/use-transfer.tsx:65-87 | useMemo 中 keygen 调用未做错误处理，若 keygen 返回 undefined 或抛异常，数据可能丢失 | 添加 try-catch 和错误日志 |
| TR-7 | P3 | types | packages/base/src/transfer/transfer.tsx:204-215 | useMemo 依赖混合各种类型（布尔、字符串、数组、对象），对象引用变化导致 memo 频繁失效 | 提取稳定的依赖或使用浅比较 |

## 详细说明

### TR-1: useMemo 依赖数组缺失关键变量 (P1)

**触发场景**：改变 datum、itemClass、empty、title、footer 等属性时，renderSourceList/renderTargetList 仍返回旧的渲染结果。

**原因分析**：
```javascript
const renderSourceList = useMemo(() => {
  return renderList('source');
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [
  source, loading, size, filterSourceText, sourceSelectedKeys,
  renderFilter, children, classNamesProp, stylesProp, config.transfer
]);
// ❌ 缺: datum, itemClass, empty, title, footer, listHeight, lineHeight 等
```

这些缺失的依赖会影响渲染结果，但改变时不会触发 memo 重算。

**修复思路**：
```javascript
const renderSourceList = useMemo(() => {
  return renderList('source');
}, [
  source, loading, size, filterSourceText, sourceSelectedKeys,
  renderFilter, children, classNamesProp, stylesProp, config.transfer,
  // 添加缺失的依赖
  datum, itemClass, empty, title, footer, listHeight, lineHeight,
  // 或改为条件渲染，不用 memo
]);
```
或者如果依赖太多，考虑去掉 memo 或改为回调函数 memoize。

### TR-2: onSelectChange 每次渲染创建新函数 (P2)

**触发场景**：Transfer 组件重新渲染时，onSelectChange 回调被重新定义，TransferList 子组件 props 改变，导致不必要的子组件重渲染。

**原因分析**：
```javascript
const renderList = (listType: TransferListType) => {
  return (
    <TransferList
      // ...
      onSelectChange={(keys) => {  // ❌ 每次渲染创建新函数
        if (isSource) {
          // ...
        }
      }}
    />
  );
};
```

**修复思路**：
```javascript
const handleSourceSelectChange = useCallback(
  (keys: KeygenResult[]) => {
    // ...
  },
  [/* 依赖 */]
);

const handleTargetSelectChange = useCallback(
  (keys: KeygenResult[]) => {
    // ...
  },
  [/* 依赖 */]
);
```

### TR-3: ResizeObserver 未完全清理 (P2)

**触发场景**：组件卸载时，ResizeObserver 可能仍在观察 DOM 元素，导致内存泄漏。

**原因分析**：
```javascript
useEffect(() => {
  if (!listContainerRef.current) return;
  const observer = new ResizeObserver(() => {
    // ...
  });
  observer.observe(listContainerRef.current);
  
  return () => {
    observer.disconnect();  // cleanup
  };
}, []);
```

如果 listContainerRef 的引用变化或组件快速卸载，observer 可能未完全清理。

**修复思路**：
```javascript
useEffect(() => {
  if (!listContainerRef.current) return;
  const observer = new ResizeObserver(() => {
    // ...
  });
  observer.observe(listContainerRef.current);
  
  return () => {
    observer.disconnect();
  };
}, [listContainerRef]);  // 明确依赖
```

### TR-4: 缺少函数类型检查 (P2)

**触发场景**：onFilterProp 未定义或不是函数时直接调用导致异常。

**原因分析**：
```javascript
const handleFilter = (text: string, listType: TransferListType) => {
  // ...
  const isMatch = onFilterProp(filterText, item, isSource);  // ❌ 未检查
  // ...
};
```

**修复思路**：
```javascript
const handleFilter = (text: string, listType: TransferListType) => {
  // ...
  if (onFilterProp && typeof onFilterProp === 'function') {
    const isMatch = onFilterProp(filterText, item, isSource);
    // ...
  }
};
```

### TR-5: 缺少无障碍属性 (P2)

**触发场景**：屏幕阅读器用户无法理解 Transfer 的作用和两个列表的含义。

**原因分析**：
```javascript
<div className={rootClass}>
  {/* ❌ 缺 role 和 aria-label */}
  <TransferList title={titles?.[0]} />
  <TransferOperate />
  <TransferList title={titles?.[1]} />
</div>
```

**修复思路**：
```javascript
<div className={rootClass} role="region" aria-label={`${titles?.[0]} 和 ${titles?.[1]} 双向传输`}>
  <TransferList title={titles?.[0]} aria-label={`源列表：${titles?.[0]}`} />
  <TransferOperate />
  <TransferList title={titles?.[1]} aria-label={`目标列表：${titles?.[1]}`} />
</div>
```

### TR-6: keygen 调用未做错误处理 (P2)

**触发场景**：keygen 函数抛异常或返回 undefined，导致数据丢失或列表渲染错误。

**原因分析**：
```javascript
const useMemo(() => {
  const source: DataItem[] = [];
  const target: DataItem[] = [];
  
  data.forEach((item) => {
    const key = getKey(keygen, item);  // ❌ 未 try-catch
    const isChecked = datum.check(item);
    // ...
  });
}, [data, value, selectedKeys]);
```

**修复思路**：
```javascript
useMemo(() => {
  const source: DataItem[] = [];
  const target: DataItem[] = [];
  
  data.forEach((item) => {
    try {
      const key = getKey(keygen, item);
      const isChecked = datum.check(item);
      // ...
    } catch (error) {
      console.warn('Transfer keygen error:', error);
    }
  });
}, [data, value, selectedKeys]);
```

### TR-7: 依赖类型混合导致 memo 失效 (P3)

useMemo 依赖数组中混合了原始类型（boolean、string）和引用类型（array、object），对象引用变化频繁导致 memo 重新计算。应分离或稳定这些依赖。

## 测试覆盖

现有测试（packages/shineout/src/transfer/__test__/transfer.spec.tsx）覆盖：
- 基础渲染
- 数据转移
- 搜索过滤
- 禁用状态

缺失：
- useMemo 依赖变化时的渲染验证
- ResizeObserver cleanup 验证
- keygen 异常处理测试
- 快速卸载/重挂载时的内存泄漏检测
- 无障碍属性验证（role、aria-label）
- 虚拟列表模式下的性能测试

## 核实记录

TR-5：降级从 P1 到 P2，a11y 缺陷通常不构成 P1 级别。

## TODO

- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
