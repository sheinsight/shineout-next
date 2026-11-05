# Dropdown

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：
  - packages/shineout/src/dropdown/dropdown.tsx
  - packages/base/src/dropdown/dropdown.tsx
  - packages/base/src/dropdown/dropdownIn.tsx
  - packages/base/src/dropdown/Item.tsx
  - packages/shineout-style/src/dropdown/
- 状态：待优化

## 概要

Dropdown 组件用于下拉菜单，支持递归嵌套、divider/group/disabled 等丰富特性。整体功能完整，但存在几个问题：Item 组件使用 PureComponent 但 onClick 依然是内联函数、缺少键盘导航、dropdownIn 中的 minWidth 硬编码为 90、没有验证数据结构的完整性。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| DROP-1 | P1 | perf | packages/base/src/dropdown/Item.tsx:28-94 | Item 使用 PureComponent 优化，但在 dropdownIn.tsx 行 213 中传入的 onClick 是内联函数 `d.onClick || onClick`，每次渲染都会创建新函数，导致 PureComponent 的 props 比较失效 | 使用 useCallback 缓存 onClick，或在父组件中提前合并函数 |
| DROP-2 | P1 | a11y | packages/base/src/dropdown/dropdownIn.tsx:177-230 | dropdown 项缺少 role="menuitem"、aria-disabled 等属性；缺少键盘导航（Arrow Up/Down/Enter/Escape） | 为 Item 和 Dropdown 子项添加 role="menuitem"；为 list 容器添加 role="menu"；实现键盘导航 |
| DROP-3 | P1 | a11y | packages/base/src/dropdown/Item.tsx:92 | Item 组件中非链接项使用 `<a>` 元素，但没有 href 属性。应该使用 button 或其他语义元素 | 当 data.url 不存在时使用 button 或 div[role="menuitem"]，而非空 href 的 a 元素 |
| DROP-4 | P1 | bug | packages/base/src/dropdown/dropdownIn.tsx:88-89 | contentStyle 中 minWidth 硬编码为 90，这个值对于长内容的 dropdown 可能过小。应该基于按钮宽度或内容宽度计算 | 将 minWidth 改为基于 targetRef.current.offsetWidth 的动态计算 |
| DROP-5 | P2 | maintainability | packages/base/src/dropdown/dropdownIn.tsx:180 | renderList 中使用数组索引 index 作为 Fragment key，当数据变化时会导致 DOM 错误匹配 | 为数据项添加唯一 id，使用 getKey 从数据中提取 |
| DROP-6 | P2 | types | packages/base/src/dropdown/dropdownIn.tsx:43-56 | positionMap 中的值映射关系不清晰，某些位置值被映射到了互不相关的值（如 'top-right' 映射到 'left-bottom'）。缺少注释说明为什么这样映射 | 添加注释说明位置转换的理由，或使用更清晰的命名 |
| DROP-7 | P2 | test | packages/shineout/src/dropdown/__test__/ | 现有测试缺少：递归嵌套菜单、divider/group 的渲染、disabled 项的行为、键盘导航、position 转换 | 补充上述测试用例 |

## 详细说明

### DROP-1: PureComponent 优化失效

**触发场景**：在频繁重新渲染的列表中使用 Dropdown，观察 Item 组件的渲染次数。

**原因分析**：
- Item.tsx 行 28 中声明为 `React.PureComponent`，会进行浅比较优化
- 但在 dropdownIn.tsx 行 213 中：`onClick={d.onClick || onClick}` 是内联函数
- 每次父组件渲染时都会创建新函数，props 比较时发现 onClick 不同，导致 Item 重新渲染

**修复思路**：
```tsx
// 在 dropdownIn.tsx 中使用 useMemo 或 useCallback
const getItemClickHandler = useCallback((dItem) => {
  return dItem.onClick || onClick;
}, [onClick]);

// 或在渲染时
{
  onClick={useMemo(() => d.onClick || onClick, [d.onClick, onClick])}
}
```

或将 Item 转换为函数组件并使用 memo：
```tsx
const Item = memo(({ data, onClick, ... }: ItemProps) => {
  // ...
});
```

### DROP-2: 缺少键盘导航

**触发场景**：用户使用键盘导航 Dropdown，按 Arrow Down/Up 切换项，按 Enter 确认，按 Escape 关闭。

**原因分析**：
- Dropdown 项缺少 role="menuitem"、aria-disabled、aria-selected 等属性
- List 容器缺少 role="menu"
- 没有实现键盘事件处理

**修复思路**：
```tsx
// 在 dropdownIn.tsx 中
<div
  role="menu"
  className={classNames(...)}
  onKeyDown={(e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      // 移动焦点到下一项
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      // 移动焦点到上一项
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // 触发当前项的 onClick
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePop();
    }
  }}
>
  {renderList()}
</div>

// 在 Item.tsx 中
<a
  role="menuitem"
  aria-disabled={data.disabled}
  tabIndex={isFocused ? 0 : -1}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  }}
>
```

### DROP-3: 非链接项使用 `<a>` 元素

**触发场景**：Dropdown 项没有 url 属性时，仍然渲染为 `<a>` 元素但没有 href。屏幕阅读器读出 "link" 但用户期望的是 "button"。

**原因分析**：
- Item.tsx 行 92：当 content 不是有效元素时，总是返回 `<a>` 元素
- 即使 data.url 不存在，href 也是 undefined，不符合语义

**修复思路**：
```tsx
// 在 Item.tsx 中区分 link 和 button
if (data.url) {
  return <a {...props}>{content}</a>;
} else {
  return (
    <button
      {...props}
      role="menuitem"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {content}
    </button>
  );
}
```

### DROP-4: minWidth 硬编码

**触发场景**：Dropdown 按钮文本较短（如 "添加"），但下拉菜单项较长（如 "删除这个非常重要的数据"）。minWidth 90 可能导致菜单太窄。

**原因分析**：
- dropdownIn.tsx 行 88：`minWidth: 90` 是硬编码的
- 这个值对于所有 Dropdown 实例都相同，无法根据内容调整

**修复思路**：
```tsx
const contentStyle = useMemo(() => {
  const buttonWidth = targetRef.current?.offsetWidth || 90;
  return {
    width: width,
    minWidth: Math.max(90, buttonWidth),  // 至少是按钮宽度
    gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : undefined,
    ...(!isSub ? semStyle('list') : undefined),
    ...boundaryStyle,
  } as React.CSSProperties;
}, [width, columns, isSub, semStyle, boundaryStyle, targetRef.current?.offsetWidth]);
```

### DROP-5: 使用数组索引作为 key

**触发场景**：Dropdown 数据被过滤或排序时，项的顺序变化导致 DOM 错误匹配。

**原因分析**：
- dropdownIn.tsx 行 223 中：`<React.Fragment key={index}>`
- 当数据数组变化时，索引可能指向不同的数据项

**修复思路**：
```tsx
// 为数据项添加唯一 id，或使用 keygen
{renderList().map((_, index) => {
  const d = data[index] as DropdownNode;
  const key = (d as any).id || getKey(keygen, d, index);
  return (
    <React.Fragment key={key}>
      {/* ... */}
    </React.Fragment>
  );
})}
```

## 测试覆盖

现有测试覆盖了基本的 Dropdown 功能。缺失的测试：
- 递归嵌套菜单的渲染和交互
- divider 和 group 的正确渲染
- disabled 项的点击不触发 onClick
- 键盘导航（Arrow、Enter、Escape）
- position 转换的正确性
- 屏幕阅读器兼容性
- PureComponent 的优化是否生效

## TODO

- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
