# Badge

- Review 日期：2026-11-05
- 核实状态：初审过浅
- 涉及文件：
  - packages/shineout/src/badge/badge.tsx
  - packages/base/src/badge/badge.tsx
  - packages/base/src/badge/badge.type.ts
  - packages/shineout-style/src/badge/
- 状态：待优化

## 概要

Badge 组件用于显示数值或状态标记，支持点形、数字、自定义等多种模式。功能完整但存在类型检查不严、CSS 优先级问题和测试缺漏。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|-----|------|------|------|------|------|
| BADGE-001 | P2 | bug | packages/base/src/badge/badge.tsx:76 | 文字模式下，color 背景样式与 status 类可能因 CSS 优先级冲突，导致颜色不生效 | 确保 color inline 样式优先级高于 status 类，或调整 CSS 权重 |
| BADGE-002 | P2 | bug | packages/base/src/badge/badge.tsx:38 | overflowCount 边界检查中 Number(count) 转换，当 count 为无效值时返回 NaN，导致比较永远失败 | 补充类型守卫，确保 count 是数值或字符串数值后再比较 |
| BADGE-003 | P3 | test | packages/shineout/src/badge/__test__/badge.spec.tsx:183 | 缺少 color 属性的完整测试，如无效值、undefined、不同格式组合 | 补充 color 属性变化、color + status 组合的测试 |

## 详细说明

### BADGE-001：样式优先级冲突 (P2)

**触发场景**: 使用 text badge，同时指定 color 和 status 时，status 的 CSS 类可能覆盖 inline color 样式。

**原因分析**: renderText() 在第105行应用 color，但 status 类的权重可能更高。

**修复思路**: 
- 确保 color inline 样式应用在所有类之后
- 或在样式表中提高 inline 样式优先级
- 测试组合场景：color="red" + status="success"

### BADGE-002：类型检查不足 (P2)

**触发场景**: 传入无效 count 值（如对象、null、错误的字符串）时，Number() 转换导致 NaN，isOverflowCount 判断失效。

**原因分析**: 第38行直接调用 Number()，缺少预先的类型守卫。

**修复思路**:
```tsx
const isOverflowCount = () => {
  if (overflowCount === undefined) return false;
  if (!util.isNumber(count) && !util.isString(count)) return false;
  const numCount = Number(count);
  return !isNaN(numCount) && numCount > overflowCount;
};
```

### BADGE-003：测试覆盖不足 (P3)

**触发场景**: color 属性在不同场景下的表现缺乏测试覆盖。

**修复思路**: 补充测试用例：
- color 为不同格式（hex、rgb、命名色）
- color + status 组合
- color 为 undefined/null
- 无效 color 值

## 测试覆盖

现有测试覆盖了基本场景（数字、点、自定义）。缺失：
- color 属性与 status 的交互
- 无效 count 输入的处理
- overflowCount 的边界值测试

## TODO

- [ ] 初审一次看了 20 个组件，结论不可靠，需完整阅读源码重新 review
- [ ] 逐条核实现有条目并补全 `packages/...:行号`
