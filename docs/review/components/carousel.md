# Carousel

- Review 日期：2026-11-05
- 核实状态：初审过浅
- 涉及文件：
  - packages/shineout/src/carousel/carousel.tsx
  - packages/base/src/carousel/carousel.tsx
  - packages/base/src/carousel/carousel.type.ts
  - packages/hooks/src/components/use-carousel/use-carousel.ts
  - packages/shineout-style/src/carousel/
- 状态：待优化

## 概要

Carousel 组件支持自动轮播、手动导航、多种指示器样式。自动播放通过 hook 实现，存在计时器泄漏问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|-----|------|------|------|------|------|
| CAROUSEL-001 | P1 | bug | packages/hooks/src/components/use-carousel/use-carousel.ts:122-148 | 自动轮播的 setTimeout 未在 useEffect cleanup 中清除，组件卸载时计时器仍在运行，导致内存泄漏 | 在 useEffect 中返回 cleanup 函数清除 context.timer |
| CAROUSEL-002 | P2 | bug | packages/hooks/src/components/use-carousel/use-carousel.ts:144-148 | useEffect 依赖数组只有空 []，受控模式下 value 变化时不重新启动自动轮播 | 补充依赖：[interval, valueProp, total, autoPlay] |

## 详细说明

### CAROUSEL-001：计时器泄漏 (P1)

**触发场景**: Carousel 启用自动轮播后卸载，setTimeout 仍在后台执行，导致：
1. 内存泄漏（timer 无法回收）
2. 可能的 state update warning（已卸载组件）

**原因分析**: useEffect 第144-148 行启动自动轮播但无 cleanup。第122-124 行的 setNext 也会设置新 timer，但从不清理。

**修复思路**:
```tsx
useEffect(() => {
  if (interval > 0 && total > 1) {
    start();
  }
  return () => {
    stop(); // 清除所有待处理的 timer
  };
}, [interval, total]);
```

### CAROUSEL-002：受控模式下依赖缺漏 (P2)

**触发场景**: 外部 value 变化时，carousel 需要重置自动轮播计时器。当前第152-156 行有判断但依赖数组只有 []，useEffect 实际上不会运行。

**原因分析**: 第148 行 useEffect 依赖为空，第156 行写法有误，应该是两个独立的 useEffect。

**修复思路**:
```tsx
useEffect(() => {
  if (interval > 0 && total > 1) {
    start();
  }
  return () => stop();
}, [interval, total, autoPlay]);

// 受控模式下，value 变化时重置
useEffect(() => {
  if (isControlled && autoPlay && valueProp !== undefined) {
    stop();
    setNext(actualCurrent + 1);
  }
}, [valueProp, autoPlay]);
```

## 测试覆盖

缺少对计时器生命周期的测试：
- 卸载时是否清除 timer
- 受控模式下 value 变化时是否重置轮播
- 快速切换 interval 时的行为

## TODO

- [ ] 初审一次看了 20 个组件，结论不可靠，需完整阅读源码重新 review
- [ ] 逐条核实现有条目并补全 `packages/...:行号`
