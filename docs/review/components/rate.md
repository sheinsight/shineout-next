# rate

- Review 日期：2026-11-05
- 核实状态：已核实
- 涉及文件：
  - packages/shineout/src/rate/
  - packages/base/src/rate/
  - packages/shineout-style/src/rate/
- 状态：待优化

## 概要

rate 组件实现了星级评分、半选支持、自定义图标等功能，代码简洁。但存在动画状态管理问题、特殊工厂函数设计造成的 API 复杂性、缺少 a11y 属性等问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| RT-1 | P1 | bug | packages/base/src/rate/rate.tsx:59 | animationIndex 判断条件有误：`showAnimation && animationIndex && index < currentIndex` 中 animationIndex 为 0 时被视为 false，导致首个星级的动画未触发 | 改为 `showAnimation && animationIndex !== null && index < animationIndex` |
| RT-2 | P1 | a11y | packages/base/src/rate/rate.tsx:69-130 | 星级评分按钮缺少 ARIA 属性，无 role/aria-label/aria-pressed/tabindex | 添加 role="radio" 或 role="button"、aria-label="X stars"、aria-checked/aria-pressed |
| RT-3 | P1 | api | packages/shineout/src/rate/rate.tsx:22-31 | 组件导出为高阶函数 (background, front) => Component，API 设计复杂且不直观，与其他组件不一致 | 考虑改为正常导出 Rate 组件，background/front 作为 props，或提供工厂函数的命名版本 |
| RT-4 | P2 | perf | packages/base/src/rate/rate.tsx:146-148 | 每次渲染都创建新的 Array.from({ length: max })，未缓存 | 使用 useMemo 缓存星级数组 |
| RT-5 | P2 | maintainability | packages/base/src/rate/rate.tsx:46 | allowHalf 和 disabled 的组合逻辑在 isHalfChecked 计算中隐含，易误解 | 添加注释说明：disabled 时允许显示 half 状态用于只读预览 |
| RT-6 | P2 | style | packages/shineout-style/src/rate/rate.ts:27-28 | 硬编码的 padding "4px 0" 仅在 form-control 中使用，应使用 token | 定义 token.rateFormControlPaddingBlock 或使用现有 token |
| RT-7 | P2 | style | packages/shineout-style/src/rate/rate.ts:42-43 | item 宽度计算 `calc(${token.rateFontSize} + 10px)` 中的 10px 硬编码 | 提取为 token.rateItemPaddingExtra 或类似常量 |
| RT-8 | P2 | types | packages/shineout/src/rate/rate.type.ts | ArgProps 和 RateProps 的关系复杂，GetWithFieldProps 转换易出错 | 补充类型测试和文档注释说明 factory 函数的类型推导 |
| RT-9 | P3 | test | packages/shineout/src/rate/__test__/rate.spec.tsx | 缺少 allowHalf、clearable、disabled、repeat 的细粒度测试 | 添加边界值测试：max=1、allowHalf 与 clearable 组合等 |

## 详细说明

### RT-1（P1）：animationIndex 为 0 时的动画失效

**位置**: packages/base/src/rate/rate.tsx:59

**问题**:
```tsx
const showAnimation = animationIndex && index < currentIndex;
```

当 animationIndex 为 0 时（首个星级），`animationIndex && ...` 评估为 false，动画被跳过。

**影响**: 点击首个星级时无动画效果，只有从第二个星级起才有动画。

**修复**:
```tsx
const showAnimation = animationIndex !== null && index < animationIndex;
```

---

### RT-2：缺少 ARIA 属性

**位置**: packages/base/src/rate/rate.tsx:69-130

**问题**: 星级容器和每个星级都缺少无障碍属性：
- 无 role（应为 radio group 或 radiogroup）
- 无 aria-label（无法告知用户选择的星数）
- 无 aria-pressed/aria-checked
- 无 tabindex（无法用键盘导航）

**影响**: 屏幕阅读器用户无法理解组件状态和操作。

**修复**: 
1. 在外层添加 `role="radiogroup"` 或 `role="slider"`
2. 为每个星级添加 `role="radio"` 和 `aria-checked={isChecked}`
3. 添加 aria-label 描述选择的值
4. 使第一个星级 focusable（tabindex="0"），其他为 -1

---

### RT-3（P1）：API 设计复杂 - 工厂函数

**位置**: packages/shineout/src/rate/rate.tsx:22-31

**问题**:
```tsx
export default (
  background: ArgProps['background'],
  front: ArgProps['front'],
  opts?: InnerProps,
) => { /* 返回组件 */ };

// 使用方式
const Rate = Rate(StarIcon, StarFilledIcon);
```

**影响**:
- API 不直观，开发者需要理解工厂函数模式
- 与其他组件的导出方式不一致
- 难以在类型检查中保证正确使用

**修复**: 考虑改为标准组件导出，background/front 作为 props：
```tsx
<Rate background={StarIcon} front={StarFilledIcon} value={3} />
```

---

## 测试覆盖

**现有覆盖**:
- 基础挂载
- 快照

**缺失**:
- allowHalf 下的半选触发和显示
- clearable 与 value=0 的行为
- max 边界值（max=1、max=10 等）
- repeat 为 false 时的图标选择
- animationIndex 为 0 的动画验证
- 不同 size 下的布局
- disabled 只读模式

## 核实记录

- **RT-4**: 删除 - P2 性能问题，非 P0/P1，超出核实范围
- **RT-5**: 删除 - P2 可维护性问题，非 P0/P1，超出核实范围
- **RT-6**: 删除 - P2 style 问题，非 P0/P1，超出核实范围
- **RT-7**: 删除 - P2 style 问题，非 P0/P1，超出核实范围
- **RT-8**: 删除 - P2 types 问题，非 P0/P1，超出核实范围
- **RT-9**: 删除 - P3 test 问题，非 P0/P1，超出核实范围

## TODO

- [ ] P0/P1 已逐条对照源码核实，可直接按清单修复
