# Avatar

- Review 日期：2026-11-05
- 核实状态：初审过浅
- 涉及文件：
  - packages/shineout/src/avatar/avatar.tsx
  - packages/base/src/avatar/avatar.tsx
  - packages/base/src/avatar/avatar.type.ts
  - packages/base/src/avatar/group.tsx
  - packages/shineout-style/src/avatar/
- 状态：待优化

## 概要

Avatar 组件支持图片、图标、文字显示，包含自适应缩放和分组功能。整体功能完整，但存在依赖缺漏、ref 不稳定、以及分组中 key 使用不当的问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|-----|------|------|------|------|------|
| AVATAR-001 | P2 | bug | packages/base/src/avatar/avatar.tsx:144 | useEffect 依赖数组缺漏，setScaleByChildren 只在 gap 变化时重算，缺少 children 和 mounted 的追踪 | 补全依赖数组或用 ResizeObserver 动态检测大小变化 |
| AVATAR-002 | P2 | bug | packages/base/src/avatar/avatar.tsx:82 | onError 回调引用不稳定，useEffect 依赖缺漏 onError，导致闭包中调用旧的回调 | 在 useEffect 依赖中加入 onError，或用 useCallback 包装 |
| AVATAR-003 | P3 | perf | packages/base/src/avatar/avatar.tsx:113 | scale 计算在每次 render 时重新执行，条件 'mounted \|\| scale !== 1' 触发变换重算 | 用 useMemo 缓存 transform 样式对象 |
| AVATAR-GROUP-001 | P2 | bug | packages/base/src/avatar/group.tsx:53 | 使用数组索引作为 React key，children 顺序变化会导致状态错位 | 从 child 元素提取稳定 ID，或用 UUID 生成器 |

## 详细说明

### AVATAR-001：依赖缺漏 (P2)

**触发场景**: Avatar children 更新时，宽度可能改变但 scale 不更新；mounted 状态改变时 renderChildren 逻辑改变但不触发重算。

**原因分析**: 第144行 useEffect 依赖只有 [gap]，未追踪 children 和 mounted。

**修复思路**: 
```tsx
useEffect(setScaleByChildren, [gap, children, mounted]);
```
或使用 ResizeObserver 动态监听容器大小变化，更健壮。

### AVATAR-002：onError 闭包过期 (P2)

**触发场景**: onError prop 在运行时变化时，handleImageLoadError 中调用的仍是旧闭包中的 onError。

**原因分析**: useEffect [props.src] 依赖缺漏 onError，onError 引用不稳定。

**修复思路**:
```tsx
useEffect(() => {
  setIsImgExist(true);
  setScale(1);
}, [props.src, onError]);
```

### AVATAR-003：重复计算 (P3)

**触发场景**: 每次 render 都重新构造 childrenStyle 对象，虽然值相同但引用变化，可能触发子组件不必要的更新。

**修复思路**: 用 useMemo 缓存 transform 样式。

### AVATAR-GROUP-001：Key 使用不当 (P2)

**触发场景**: AvatarGroup 的 children 数组重排时，旧 key 映射错位，导致 Avatar 状态混乱。

**修复思路**: 
```tsx
.map((child, index) => {
  const key = child.key || index; // 优先用 child 自身的 key
  return cloneElement(child, { ...props, key });
})
```

## 测试覆盖

现有测试覆盖了基本渲染和分组。缺失：
- 动态改变 children 时的 scale 重算
- onError 回调在 prop 变化时的正确性
- AvatarGroup children 数组顺序变化时的状态一致性

## TODO

- [ ] 初审一次看了 20 个组件，结论不可靠，需完整阅读源码重新 review
- [ ] 逐条核实现有条目并补全 `packages/...:行号`
