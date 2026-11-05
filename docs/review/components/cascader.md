# Cascader

- Review 日期：2026-11-05
- 核实状态：已核实
- 涉及文件：
  - packages/shineout/src/cascader/cascader.tsx
  - packages/shineout/src/cascader/cascader.type.ts
  - packages/base/src/cascader/cascader.tsx
  - packages/base/src/cascader/list.tsx
  - packages/base/src/cascader/filter-list.tsx
  - packages/hooks/src/components/use-cascader/use-cascader.ts
  - packages/shineout-style/src/cascader/cascader.ts
  - packages/shineout/src/cascader/__test__/cascader.spec.tsx
- 状态：待优化

## 概要

Cascader 组件是多层级级联选择器，支持多选、动态加载、搜索过滤等功能。整体架构合理，但存在多个风险点：副作用依赖项管理混乱、受控值同步问题、useRef 滥用导致的状态不一致，以及条件渲染逻辑中的运算符错误。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| CAS-1 | P2 | maintainability | packages/base/src/cascader/cascader.tsx:758 | 条件逻辑在 render 时执行：`!util.shallowEqual(value, datum.getValue())` 导致每次 render 都可能调用 datum.setValue，破坏受控状态的稳定性 | 移至 useEffect，仅在必要时同步值，必要时通过 ref 跟踪 prevValue 避免不必要的更新 |
| CAS-3 | P1 | bug | packages/base/src/cascader/cascader.tsx:750-755 | useEffect 依赖项不完整：usePrevious 实现不稳定，prevData 基于时序问题导致 datum.setData 可能被重复调用 | 使用 useRef 记录上一次 data，改为 useCallback 缓存 datum.setData 调用 |
| CAS-4 | P1 | bug | packages/base/src/cascader/cascader.tsx:762-768 | useEffect 依赖项 [value, open] 导致 open 变化时重新同步值：当 open 变化时，即使 value 未变，也会重新调用 datum.setValue 和 updatePathByValue | 分离为两个 useEffect：value 变化时 setValue，open 变化时仅 updatePathByValue |
| CAS-5 | P1 | types | packages/base/src/cascader/cascader.tsx:473、505 | 逻辑运算符错误：`!mode !== undefined` 等价于 `(!mode) !== undefined`，总是 true，应该是 `mode !== undefined` | 修复为 `mode !== undefined` |
| CAS-6 | P2 | perf | packages/base/src/cascader/cascader.tsx:405-407 | handleChange 和 handleClear 未使用 usePersistFn 缓存，每次 render 创建新引用传递给子组件，导致列表不必要重渲染 | 使用 usePersistFn 包装这两个回调 |
| CAS-7 | P2 | maintainability | packages/base/src/cascader/cascader.tsx:179-191 | onCollapse 回调中的 isPreventBlur 和 blurEvent 状态管理分散，难以追踪 | 考虑使用 useReducer 或专门的 hook 整合状态 |
| CAS-8 | P2 | a11y | packages/base/src/cascader/cascader.tsx:398-402 | Tab 键关闭弹出层但缺少焦点管理，关闭后焦点可能丢失或回到 body | 添加焦点陷阱管理和初始焦点恢复 |
| CAS-9 | P2 | test | packages/shineout/src/cascader/__test__/cascader.spec.tsx | 缺少多选模式下的受控值变化测试，缺少动态加载(loader)边界条件测试 | 补充 loader 异常、网络超时、受控值竞态等场景 |

## 详细说明

### CAS-1: 条件逻辑在 render 时执行（降为 P2）

**位置**：packages/base/src/cascader/cascader.tsx:758

**代码**：
```typescript
if ((openProp || props.renderOptionList) && !util.shallowEqual(value, datum.getValue())) {
  datum.setValue(value);
}
```

**问题**：
该逻辑在 render 时执行（非 useEffect 内），每次 render 都会检查条件并可能调用 datum.setValue。当外部受控 value 是新对象引用或 datum 内部值不同时，会频繁同步，导致受控模式下的状态更新不可控。

**触发场景**：
1. 外部受控 value 每次都是新数组引用（`[...value]`）
2. 弹出层打开或 renderOptionList 存在
3. datum.getValue() 返回的结构与 value 不完全相等（引用比较）

**修复思路**：
1. 将条件移至 useEffect，只在必要时同步
2. 使用 useRef 记录上一次检查的结果，避免在 render 时执行副作用
3. 仅在 value prop 真正变化时才调用 datum.setValue

### CAS-3: useEffect 依赖项导致重复副作用（P1）

**位置**：packages/base/src/cascader/cascader.tsx:750-755

**代码**：
```typescript
const prevData = usePrevious(data);

useEffect(() => {
  if (!prevData) return;
  if (prevData !== data) {
    datum.setData(data);
  }
}, [data]);
```

**问题**：
- prevData 基于 usePrevious 实现，存在 render 时序问题
- 当 data 变化时，虽然依赖项只有 [data]，但 datum.setData 的引用可能随时变化
- 如果 data 是传入的数组，每次都会被重新创建，useEffect 会频繁触发

**修复思路**：
1. 使用 useRef 记录上一次的 data，而不是 usePrevious
2. 或在 useCallback 中缓存 datum.setData 调用

### CAS-4: useEffect 分离不当导致重复更新（P1）

**位置**：packages/base/src/cascader/cascader.tsx:762-768

**代码**：
```typescript
useEffect(() => {
  if (!value) return;
  datum.setValue(value);
  if(!open) return
  updatePathByValue();
}, [value, open]);
```

**问题**：
当 open 状态变化时，整个 effect 重新运行，即使 value 未变，也会重新调用 datum.setValue 和 updatePathByValue，导致不必要的状态更新。

**修复思路**：
分离为两个 useEffect：
1. `useEffect(() => { datum.setValue(value); }, [value])`
2. `useEffect(() => { if (open) updatePathByValue(); }, [open, value])`

### CAS-5: 双重否定逻辑错误（P1）

**位置**：packages/base/src/cascader/cascader.tsx:473、505

**代码**：
```typescript
if (!mode !== undefined && !showArrow) return null;  // 第 473 行
if (!mode !== undefined && !showArrow) return null;  // 第 505 行
```

**问题**：
`!mode !== undefined` 等价于 `(!mode) !== undefined`，即检查 (!mode) 是否不等于 undefined。这总是 true（因为 !mode 是 boolean）。应该是 `mode !== undefined`。

**修复思路**：
改为 `if (mode !== undefined && !showArrow) return null;`

### CAS-6: 回调函数缺少持久化（降为 P2）

**位置**：packages/base/src/cascader/cascader.tsx:405-407、409-419

**代码**：
```typescript
const handleChange = (item: Value, selectId?: DataItem) => {
  onChange?.(item, selectId);
};

const handleClear = (e: React.MouseEvent) => {
  e.stopPropagation();
  setPath([]);
  // ...
  handleChange([] as unknown as Value);
  if (open) closePop();
  if (props.onClear) props.onClear();
};
```

**问题**：
这两个回调每次 render 时都重新创建，传递给 CascaderList 和 CascaderFilterList 时，子组件会因为引用变化而重渲染。

**修复思路**：
使用 usePersistFn 包装：
```typescript
const handleChange = usePersistFn((item: Value, selectId?: DataItem) => {
  onChange?.(item, selectId);
});

const handleClear = usePersistFn((e: React.MouseEvent) => {
  // ...
});
```

### CAS-8: Tab 键关闭后焦点管理缺失（P2）

**位置**：packages/base/src/cascader/cascader.tsx:398-402

**问题**：
Tab 键触发 onBlur 并关闭弹出层，但没有确保焦点正确返回。用户按 Tab 后，焦点可能丢失或跳到意外位置。

**修复思路**：
- 实现焦点管理：记录打开前的焦点元素，关闭时恢复
- 或使用 FocusScope 库
- 确保 aria-expanded 等属性正确更新

### CAS-9: 测试覆盖不足（P2）

**现有测试**：
- 快照测试覆盖了多个场景（多选、压缩、loader、过滤等）
- 基础功能测试

**缺失的测试**：
- 多选 + 受控值完整切换
- loader 动态加载的错误处理和超时
- 快速切换 value 导致的竞态
- 搜索过滤下的多选行为
- clearable 在多选模式下的完整性

## 测试覆盖

现有测试通过快照和基本功能覆盖了主要场景。

缺失的测试：
- 受控值动态切换（特别是多选模式）
- loader 异常场景（网络错误、超时）
- 焦点管理（Tab 键、初始焦点）
- 搜索性能基准（大数据过滤）

## 核实记录

| ID | 删除原因 |
|----|---------|
| CAS-2 | 误报删除：代码实际已正确传递 item 作为 onChange 的第二参数，与 Select 保持一致，不存在缺失问题 |
| CAS-1 | 主会话复核降级 P0→P2：render 期间同步是为修复外部受控打开场景（见代码注释），有 shallowEqual 守卫，不会无限循环；属于 render 内副作用的可维护性问题 |
| CAS-6 | 主会话复核降级 P1→P2：未指出具体的高频或大数据场景 |

## TODO

- [ ] CAS-5 属实：`cascader.tsx:473,505` `!mode !== undefined` 恒为 true，与 TS-2 同类，可一起修
- [ ] P0/P1 已逐条对照源码核实，可直接按清单修复
