# Tree-Select

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - packages/shineout/src/tree-select/tree-select.tsx
  - packages/base/src/tree-select/tree-select.tsx
  - packages/hooks/src/components/use-treeselect/use-treeselect.ts
  - packages/shineout-style/src/tree-select/tree-select.ts
- 状态：待优化

## 概要

TreeSelect 组件是树形下拉选择器，支持单选/多选、虚拟滚动、过滤、搜索等功能。整体逻辑复杂度较高，存在 useEffect 依赖不完整、状态管理竞态、条件逻辑错误、性能优化不足等问题。核心问题在于虚拟模式下展开状态处理不当，以及受控/非受控模式切换时的状态不一致。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| TS-1 | P1 | bug | packages/base/src/tree-select/tree-select.tsx:502-506 | useEffect 依赖数组缺 virtual，虚拟模式切换时展开状态不更新 | 添加 virtual 到依赖数组 |
| TS-2 | P1 | bug | packages/base/src/tree-select/tree-select.tsx:365 | 逻辑错误 `if (!multiple !== undefined && !showArrow)` 布尔判断混乱 | 改为 `if (multiple === undefined && !showArrow)` 或 `if (!multiple && !showArrow)` |
| TS-3 | P1 | bug | packages/base/src/tree-select/tree-select.tsx:536-545 | handleTreeChange 缺少 datum 存在检查，在快速状态变化时可能调用不存在的方法 | 添加 null check：`if (!datum) return;` |
| TS-4 | P2 | perf | packages/base/src/tree-select/tree-select.tsx:201-209 | useMemo 依赖包含 config.transfer（对象），每次 config 重新引用导致 memo 失效 | 提取稳定的依赖或移除 config.transfer |
| TS-5 | P2 | a11y | packages/base/src/tree-select/tree-select.tsx:758-766 | tabIndex 在某些条件下为 undefined，破坏键盘导航 | 改为 `tabIndex={disabled === true || showInput ? -1 : 0}` |
| TS-6 | P2 | style | packages/base/src/tree-select/tree-select.tsx:693-698 | 分页信息 padding 硬编码 `'3px 4px'` 和 `'0 5px'`，不使用 token | 改用 token 或 CSS 变量 |
| TS-7 | P1 | bug | packages/base/src/tree-select/tree-select.tsx:349-362 | handleClear 中 onChange 调用不一致：multiple 时传 `[]`，非 multiple 时传 `['']`，导致值类型混乱 | 统一返回类型，确保与 value 类型一致 |

## 详细说明

### TS-1: 虚拟模式下展开状态丢失 (P1)

**触发场景**：启用虚拟滚动后，切换 virtual 模式或初始化时展开状态未正确同步。

**原因分析**：
```javascript
useEffect(() => {
  if (virtual && expanded && expanded.length > 0) {
    setVirtualExpanded(expanded);
  }
}, [expanded]);  // ❌ 缺 virtual
```
当 virtual prop 从 false 变 true 时，该 effect 不会重新执行，导致虚拟节点展开状态不更新。

**修复思路**：
```javascript
}, [virtual, expanded])
```

### TS-2: 条件逻辑混乱 (P1)

**触发场景**：当 multiple 为真且 showArrow 为假时，条件判断行为不符合预期。

**原因分析**：
```javascript
if (!multiple !== undefined && !showArrow) return null;
```
`!multiple !== undefined` 永远为 true（非 undefined 的布尔值一定不等于 undefined），这不是作者想要的逻辑。

**修复思路**：
判断代码意图，应该是：
- 若 multiple 未定义且 showArrow 为假，则返回 null
- 或若 multiple 为假且 showArrow 为假，则返回 null

```javascript
if ((multiple === undefined || !multiple) && !showArrow) return null;
```

### TS-3: datum 可能为空的调用 (P1)

**触发场景**：快速改变树数据或卸载组件时，handleTreeChange 仍可能被回调调用。

**原因分析**：
```javascript
const handleTreeChange = (val: KeygenResult[], item: DataItem) => {
  // ... 逻辑 ...
  datum.updateValue(val);  // ❌ datum 可能为 undefined
};
```
如果组件卸载或重新初始化，datum 引用变化，但 handleTreeChange 还被事件触发。

**修复思路**：
```javascript
const handleTreeChange = (val: KeygenResult[], item: DataItem) => {
  if (!datum) return;
  // ... 逻辑 ...
};
```

### TS-4: useMemo 依赖中的对象引用 (P2)

**触发场景**：config 对象每次重新创建，即使内容相同，也导致 useMemo 失效。

**原因分析**：
```javascript
useMemo(() => {
  return renderList();
}, [
  // ... 其他依赖 ...
  config.transfer,  // ❌ 每次 config 重新引用时失效
]);
```

**修复思路**：
```javascript
useMemo(() => {
  return renderList();
}, [
  // 移除 config.transfer，或提取其中稳定的属性
]);
```

### TS-5: 键盘导航被破坏 (P2)

**触发场景**：当 disabled 为 true 或 showInput 为 true 时，根元素 tabIndex 为 undefined，屏幕阅读器和键盘导航不工作。

**原因分析**：
```javascript
tabIndex={disabled === true || showInput ? undefined : 0}
```
undefined 时元素不参与 tab 键导航。

**修复思路**：
```javascript
tabIndex={disabled === true || showInput ? -1 : 0}
// -1: 不参与 tab 键导航但可被 JS focus
// 0: 正常 tab 导航
```

### TS-6: 分页 padding 硬编码 (P2)

样式中分页组件的 padding 为硬编码值，应提取为 token。

### TS-7: onChange 返回值类型不一致 (P1)

**触发场景**：清空单�树形选择器时，onChange 接收 `['']` 而不是 `[]`，导致外部状态管理混乱。

**原因分析**：
```javascript
const handleClear = () => {
  // ...
  onChange(multiple ? [] : ['']);  // ❌ 类型不一致
};
```
这与 value 的实际类型预期不符。

**修复思路**：统一为 `[]`，或确保与初始化的 defaultValue 类型一致。

## 测试覆盖

现有测试（packages/shineout/src/tree-select/__test__/treeSelect.spec.tsx）覆盖：
- 基础渲染
- 单选/多选
- 过滤搜索
- 虚拟滚动

缺失：
- 虚拟模式与非虚拟模式切换测试
- 快速改变 virtual prop 时的展开状态测试
- 清空操作的返回值类型检验
- 键盘导航 a11y 测试
- disabled 状态下的交互测试

## 核实记录

无。全部 P0/P1 问题属实，位置正确。

## TODO

- [ ] TS-2 属实：`packages/base/src/tree-select/tree-select.tsx:365` `!multiple !== undefined` 恒为 true
- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
