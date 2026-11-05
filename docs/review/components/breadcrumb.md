# Breadcrumb

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：
  - packages/shineout/src/breadcrumb/breadcrumb.tsx
  - packages/base/src/breadcrumb/breadcrumb.tsx
  - packages/base/src/breadcrumb/breadcrumb-item.tsx
  - packages/base/src/breadcrumb/list.tsx
  - packages/shineout-style/src/breadcrumb/
- 状态：待优化

## 概要

Breadcrumb 组件用于显示导航路径，支持最大显示数 max、省略号 dropdown、自定义渲染等功能。整体功能完整，但存在一些问题：溢出检测的阈值硬编码、dropdown 项缺少键盘导航、list.tsx 中使用数组索引作为 key、省略逻辑可能遗漏某些边界情况。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| BRAD-1 | P1 | bug | packages/base/src/breadcrumb/breadcrumb-item.tsx:22 | 溢出检测中将阈值硬编码为 150px，且只在 max !== undefined 时检查。若内容宽度超过 150px，会被截断。阈值应该基于实际容器宽度计算 | 获取容器实际宽度，或使用 ResizeObserver 监听容器变化，基于容器宽度动态计算溢出判断 |
| BRAD-2 | P1 | a11y | packages/base/src/breadcrumb/list.tsx:44-70 | dropdown 列表项缺少 role="menuitem"、onClick 回调缺少键盘事件处理。用户无法通过键盘激活 dropdown 中的项 | 为 dropdown 项添加 role="menuitem"，实现 Enter/Space 键激活，添加 aria-label 说明项内容 |
| BRAD-2 | P1 | a11y | packages/base/src/breadcrumb/breadcrumb.tsx:79 | 面包屑容器和分隔符缺少语义标记。屏幕阅读器无法识别结构。缺少 role="navigation"、aria-label 等 | 为根容器添加 role="navigation" 和 aria-label="Breadcrumb"；为分隔符添加 aria-hidden="true" |
| BRAD-3 | P2 | perf | packages/base/src/breadcrumb/list.tsx:32-41 | renderList 中使用数组索引作为 key，若 data 数组变化时会导致 DOM 重新匹配。应使用稳定的唯一标识 | 从 dataItem 中提取唯一键，或通过 breadcrumb.tsx 的 keygen 属性生成 key |
| BRAD-4 | P2 | bug | packages/base/src/breadcrumb/breadcrumb.tsx:40-63 | getRenderData 中的省略逻辑可能在 max=2 时出错。例如 data.length=3, max=2，sliceIndex=2，moreData 为 data.slice(1, 2)，最后返回 [first, more, ...reset]，但 reset 为空，这样仅显示 2 项而不是 max | 补充边界值测试，确保返回的数据项数恰好为 max |
| BRAD-5 | P2 | test | packages/shineout/src/breadcrumb/__test__/ | 现有测试缺少：max 边界情况（1、2、等于 data.length、超过 data.length）、dropdown 项的键盘激活、内容溢出和 tooltip、renderItem 自定义渲染 | 补充上述测试用例 |

## 详细说明

### BRAD-1: 溢出检测阈值硬编码

**触发场景**：breadcrumb 项的内容较长（如中文文本），在不同屏幕尺寸或字体大小下可能不准确。

**原因分析**：
- breadcrumb-item.tsx 行 22：`setIsOverflow(contentRef.current.offsetWidth > 150)` 硬编码了 150px 阈值
- 这个值不取决于容器的实际宽度，导致在某些场景下判断错误
- 例如在宽容器中 150px 内容不溢出，但阈值仍然判定为溢出

**修复思路**：
```tsx
useLayoutEffect(() => {
  if (contentRef.current && max !== undefined) {
    // 获取父容器宽度
    const parentWidth = contentRef.current.parentElement?.offsetWidth || 200;
    // 基于父容器宽度的一定比例（如 80%）作为阈值
    const threshold = parentWidth * 0.8;
    setIsOverflow(contentRef.current.offsetWidth > threshold);
  }
}, [max, dataItem]);
```

或使用 ResizeObserver：
```tsx
useEffect(() => {
  const observer = new ResizeObserver(() => {
    if (contentRef.current && max !== undefined) {
      const parentWidth = contentRef.current.parentElement?.offsetWidth || 200;
      setIsOverflow(contentRef.current.offsetWidth > parentWidth * 0.8);
    }
  });
  
  if (contentRef.current) observer.observe(contentRef.current);
  return () => observer.disconnect();
}, [max]);
```

### BRAD-2: Dropdown 项缺少键盘导航

**触发场景**：用户只用键盘导航 breadcrumb dropdown，无法激活其中的项。

**原因分析**：
- list.tsx 行 35 中的 dropdown 项是 div，没有 role 属性
- 没有 onClick 事件监听键盘事件（Enter/Space）
- 没有 tabIndex，导致无法通过 Tab 键聚焦

**修复思路**：
```tsx
<div
  key={index}
  className={classes?.itemWrapper}
  role="menuitem"
  tabIndex={0}
  onClick={closePop}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closePop();
    }
  }}
>
  {props.renderItem(item)}
</div>
```

### BRAD-3: 省略逻辑的边界情况

**触发场景**：设置 `max={2}`，data 有 3 项。点击省略号查看隐藏项。

**原因分析**：
- breadcrumb.tsx 行 40-63 中 getRenderData() 的逻辑：
  - `sliceIndex = data.length - max + 1 = 3 - 2 + 1 = 2`
  - `moreData = data.slice(1, 2)` 只有 1 项
  - `reset = data.slice(2) = [data[2]]` 只有 1 项
  - 返回 `[first, more, ...reset]` 总共 3 项，正确
- 但当 max=1 时：
  - `sliceIndex = 3 - 1 + 1 = 3`
  - `moreData = data.slice(1, 3)` 有 2 项
  - `reset = data.slice(3) = []` 为空
  - 返回 `[first, more]` 只有 2 项，而 max=1 时应该隐藏 2 个项

**修复思路**：
```tsx
const getRenderData = () => {
  if (!maxCount) return data;
  if (data.length <= maxCount) return data;
  
  const first = data[0];
  const sliceIndex = Math.max(1, data.length - maxCount + 1);
  const moreData = data.slice(1, sliceIndex);
  const reset = data.slice(sliceIndex);
  
  // 确保返回的项数不超过 max
  return [first, ...moreData.length > 0 ? [{ title: '...' }] : [], ...reset];
};
```

### BRAD-4: Breadcrumb 缺少导航语义

**触发场景**：屏幕阅读器用户无法识别 breadcrumb 是导航元素。

**原因分析**：
- breadcrumb.tsx 行 67-82 中根容器是普通 div，无 role 属性
- 分隔符（行 79）对屏幕阅读器可见，会被读出来

**修复思路**：
```tsx
<nav
  className={className}
  style={{ ...props.style, ...semStyle('root') }}
  role="navigation"
  aria-label="Breadcrumb"
>
  {data && getRenderData().map((d, index) => {
    // ...
    {!isLastItem && (
      <div
        className={classNames(breadcrumbClasses?.separator, semClass('separator'))}
        style={semStyle('separator')}
        aria-hidden="true"  // 隐藏分隔符对屏幕阅读器的影响
      >
        {separator}
      </div>
    )}
  })}
</nav>
```

## 测试覆盖

现有测试覆盖了基本的 breadcrumb 渲染。缺失的测试：
- max 的边界值（1、2、等于 data.length、超过 data.length）
- 省略号点击后显示隐藏项
- 内容溢出时显示 tooltip
- 键盘导航（Tab、Enter/Space 激活项）
- renderItem 自定义渲染
- 屏幕阅读器兼容性

## TODO

- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
