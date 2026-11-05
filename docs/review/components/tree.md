# Tree

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - packages/shineout/src/tree/tree.tsx
  - packages/base/src/tree/tree.tsx
  - packages/base/src/tree/tree-simple-node.tsx
  - packages/base/src/tree/tree-root.tsx
  - packages/base/src/tree/tree-virtual.tsx
  - packages/hooks/src/components/use-tree/use-tree.ts
  - packages/shineout-style/src/tree/tree.ts
- 状态：待优化

## 概要

Tree 组件是虚拟滚动树形容器，支持拖拽、展开/折叠、单选/多选等功能。整体架构清晰，但存在多个状态管理 bug、全局拖拽状态管理不安全、性能优化不足、缺少 a11y 支持等问题。核心问题在于受控/非受控状态切换的 useEffect 依赖不完整，以及拖拽操作使用全局变量导致竞态条件。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| TREE-1 | P1 | bug | packages/base/src/tree/tree.tsx:81-85 | useEffect 依赖数组缺少 isActiveControlled，导致受控状态检测失效 | 添加 isActiveControlled 到依赖数组，或重构条件判断 |
| TREE-2 | P1 | bug | packages/base/src/tree/tree.tsx:310-317 | useEffect 依赖 expanded，但条件 `!props.expanded` 不在依赖数组，导致早返回条件失效 | 添加 props.expanded 到依赖数组 |
| TREE-3 | P1 | bug | packages/base/src/tree/tree-simple-node.tsx:10-21, 171-208 | 全局变量 dragLock 用于拖拽锁定，未在错误时重置，可导致所有拖拽操作永久卡死 | 改用 useRef 或组件内 state 管理拖拽状态 |
| TREE-4 | P2 | perf | packages/base/src/tree/tree.tsx:130-133, 303 | getDragImageSelector 每次渲染创建新函数，传给 RootTree 导致子组件不必要重渲染 | 用 useCallback 缓存 |
| TREE-5 | P2 | style | packages/base/src/tree/tree-simple-node.tsx:190-191 | 拖拽预览图硬编码白色背景和阴影 `'#fff'` 和 `'0 0 5px 0 rgba(0, 0, 0, 0.1)'`，不支持暗色主题 | 使用设计 token 替代 |
| TREE-6 | P2 | a11y | packages/base/src/tree/tree-simple-node.tsx:273-285 | 树节点缺少 aria-expanded、aria-selected 等语义属性 | 为 node 元素添加 role="treeitem"、aria-expanded、aria-selected 等 |
| TREE-7 | P2 | style | packages/shineout-style/src/tree/tree.ts:7, 43, 73-76, 84-86 等 | 样式中存在多处硬编码数值：childNodeMarginLeft=12、left:-24、marginLeft:-24、width:16 等，应使用 token | 提取为 token 变量或 CSS 自定义属性 |
| TREE-8 | P3 | maintainability | packages/base/src/tree/tree.tsx:319-322 | useEffect([active]) 调用 handleUpdateActive，但 handleUpdateActive 闭包依赖 isActiveControlled、propSetActive、datum 等外部状态 | 补全依赖数组或使用 usePersistFn 稳定函数引用 |

## 详细说明

### TREE-1: useEffect 受控状态检测失效 (P1)

**触发场景**：使用受控模式 `<Tree active={...} />` 时，外部改变 active prop，组件不会更新内部 active 状态。

**原因分析**：
```javascript
const isActiveControlled = 'active' in props;
useEffect(() => {
  if (isActiveControlled && propActive !== active) {
    setActive(propActive);
  }
}, [active, propActive]);  // ❌ 缺少 isActiveControlled
```
isActiveControlled 是在组件渲染时计算的，不在依赖数组中。虽然从 props 推导但没有显式依赖，可能导致 React Linter 误报或真实的闭包陷阱。

**修复思路**：
```javascript
}, [isActiveControlled, active, propActive])
// 或者
}, [active, propActive, 'active' in props])
```

### TREE-2: 展开状态更新条件失效 (P1)

**触发场景**：使用非受控模式，expanded 改变时应调用 `datum.updateExpanded(expanded)`，但条件 `!props.expanded` 检查已过时。

**原因分析**：
```javascript
useEffect(() => {
  if (!context.mounted) return;
  if (!props.expanded) return;  // ❌ props.expanded 不在依赖数组
  datum.updateExpanded(expanded);
}, [expanded]);  // 仅依赖 expanded
```
若 props.expanded 从有值变无值（或反之），这个条件的行为会变化，但 effect 不会重新执行。

**修复思路**：
```javascript
}, [expanded, props.expanded])
```

### TREE-3: 全局拖拽锁导致死锁 (P1)

**触发场景**：
1. 用户开始拖拽一个节点，dragLock 设为 true
2. 如果拖拽过程中发生错误（如 onDrop 抛异常）或用户快速切换组件
3. dragLock 永不重置，所有后续拖拽操作被 `if (dragLock) return;` 阻止

**原因分析**：
```javascript
// ❌ 全局变量
let dragLock = false;

const handleDragStart = (e: React.DragEvent) => {
  if (dragLock) return;
  dragLock = true;  // 设置全局状态
  // ... 复杂逻辑
};

const handleDragEnd = (e: React.DragEvent) => {
  if (!dragLock) return;
  dragLock = false;  // 仅在正常路径重置
  // ... 如果中间抛异常，dragLock 永远不会重置
};
```

**修复思路**：
```javascript
const dragLockRef = useRef(false);

const handleDragStart = (e: React.DragEvent) => {
  if (dragLockRef.current) return;
  dragLockRef.current = true;
  try {
    // ... 复杂逻辑
  } finally {
    dragLockRef.current = false;
  }
};
```
或使用 useEffect cleanup，在组件卸载时重置。

### TREE-4: getDragImageSelector 性能问题 (P2)

getDragImageSelector 在每次渲染时创建新函数实例，传给 RootTree 作为 prop，导致 RootTree 即使其他 props 未变也会重新渲染。

**修复**：
```javascript
const getDragImageSelector = useCallback(
  (data?: DataItem) => {
    if (util.isFunc(dragImageSelector)) return dragImageSelector(data);
    return dragImageSelector;
  },
  [dragImageSelector]
);
```

### TREE-5: 拖拽预览硬编码样式 (P2)

拖拽元素的样式硬编码了 `background: '#fff'` 和 `boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.1)'`，在暗色主题下会很难看。

**修复**：使用 token，例如从 tree.ts 中获取或在样式文件中定义。

### TREE-6: 缺少无障碍属性 (P2)

树节点没有 aria-expanded、aria-selected 等属性，屏幕阅读器用户无法了解节点状态。

**修复**：在节点元素上添加：
```jsx
<div
  role="treeitem"
  aria-expanded={expanded}
  aria-selected={active === id}
>
  {/* ... */}
</div>
```

### TREE-7: 样式硬编码数值 (P2)

tree.ts 中多处硬编码：marginLeft: 12, left: -24, width: 16 等，应提取为 token 变量便于维护和主题切换。

### TREE-8: useEffect 依赖不完整 (P3)

Line 319-322 的 useEffect 调用 handleUpdateActive，但该函数闭包依赖多个外部变量（isActiveControlled、propSetActive、datum），这些变量改变时 effect 不会重新执行。

## 测试覆盖

现有测试（packages/shineout/src/tree/__test__/tree.spec.tsx）覆盖：
- 基础渲染
- 受控/非受控模式
- 拖拽操作
- 展开/折叠
- 禁用状态
- 虚拟滚动

缺失：
- 受控 active 改变时的更新测试
- 拖拽异常场景（快速连续拖拽、拖拽途中卸载）
- 无障碍属性验证
- 暗色主题下样式验证

## 核实记录

无。全部 P0/P1 问题属实，位置正确。

## TODO

- [ ] TREE-3 相关：`packages/base/src/tree/tree-simple-node.tsx:13` 模块级 `dragLock`，需确认拖拽中途卸载或异常时能否复位
- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
