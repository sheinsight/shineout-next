# date-picker

- Review 日期：2026-11-05
- 核实状态：已核实
- 涉及文件：
  - packages/shineout/src/date-picker/
  - packages/base/src/date-picker/
  - packages/hooks/src/components/use-datepicker/
  - packages/shineout-style/src/date-picker/
- 状态：待优化

## 概要

date-picker 组件覆盖了日期、时间、范围等多种选择模式，整体架构合理，但存在样式硬编码、缺少必要的依赖数组清理、以及边界值处理不完善等问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| DP-1 | P0 | bug | packages/shineout/src/date-picker/date-picker.tsx:54 | useMemo 依赖数组为空，导致 format/type/range/timeZone 变化时 defaultValue 不更新，受控状态失效 | 补充依赖数组：[props.defaultValue, props.format, props.type, props.range, props.timeZone, locale] |
| DP-2 | P0 | bug | packages/hooks/src/components/use-datepicker/use-month.ts:33-37, use-year.ts:30-34, use-date.ts:25-31 | onCurrentChange 回调被调用两次（条件内一次+条件外一次），导致事件重复触发 | 删除无条件的 onCurrentChange 调用，仅保留条件内的调用 |
| DP-3 | P0 | bug | packages/base/src/date-picker/time.tsx:40-66 | timer 和 changeTimer 在组件卸载时未清理，导致内存泄漏和 warning | 添加 useEffect cleanup 清理两个 timer |
| DP-4 | P1 | bug | packages/hooks/src/components/use-datepicker/util.ts:89 | 时区验证范围错误，应支持 UTC-12 到 UTC+14 但只检查到 UTC+13，导致部分时区不可用 | 改为 `num <= 14 && num >= -12` |
| DP-5 | P1 | bug | packages/hooks/src/components/use-datepicker/util.ts:215,228 | 周数格式解析时错误地切取 3 个字符（应为 2 个），导致周解析失败 | 改为 `weekIndex + 2` |
| DP-8 | P1 | style | packages/shineout-style/src/date-picker/date-picker.ts:78-97 | 宽度值硬编码（240, 280, 420）未使用 token 替代 | 应使用 token 定义尺寸常量 |
| DP-9 | P1 | style | packages/shineout-style/src/date-picker/date-picker.ts:214 | 分隔符左右间距硬编码 "8px" | 应使用 token 替代 |
| DP-10 | P2 | a11y | packages/base/src/date-picker/day.tsx、month.tsx、year.tsx、time.tsx | 日期/时间选择单元格缺少 ARIA 属性，无 role/aria-label/aria-selected | 添加 role="button"、aria-label、aria-selected 属性 |
| DP-11 | P2 | perf | packages/base/src/date-picker/result.tsx:30-44 | Input 组件不必要的重渲染，props.open 变化触发不相关的 state 更新 | 使用 React.memo 或优化依赖跟踪 |
| DP-12 | P2 | maintainability | packages/base/src/date-picker/date-picker.tsx:19-72 | position 验证逻辑混杂在组件顶层，复杂度高 | 提取 normalizePosition 工具函数 |
| DP-13 | P2 | maintainability | packages/hooks/src/components/use-datepicker/use-time.tsx:38-49、util.ts:262-266 | 时间字符串解析逻辑重复 | 提取公共工具函数 |
| DP-14 | P3 | test | packages/shineout/src/date-picker/__test__/datePicker.spec.tsx:22-46 | 大量测试用例被注释，覆盖不足 | 恢复 timezone、range、format、disable 等关键场景的测试 |

## 详细说明

### DP-1（P0）：useMemo 依赖数组缺失导致受控状态失效

**位置**: packages/shineout/src/date-picker/date-picker.tsx:54

**问题**:
```tsx
const defaultValue = useMemo(() => {
  if (props.defaultValue) {
    const dateArr = convertValueToDateArr(props.defaultValue, format, options);
    // ... 使用 props.format, props.type, props.timeZone, props.range, locale
    return (props.range ? formattedDefaultValue : formattedDefaultValue[0]) as Value;
  }
  return props.defaultValue;
}, [])  // 空数组！
```

**触发场景**: 用户改变组件的 format、type、timeZone 或 range 属性时，defaultValue 不会重新计算。

**原因**: 依赖数组为空，React 不会在依赖变化时重新执行 useMemo。

**影响**: 受控状态失效，onChange 不会被触发，显示的值与实际值不一致。

**修复**: 补充完整的依赖数组
```tsx
}, [props.defaultValue, props.format, props.type, props.range, props.timeZone, locale])
```

---

### DP-2（P0）：onCurrentChange 双重回调导致事件重复

**位置**: 
- packages/hooks/src/components/use-datepicker/use-month.ts:33-37
- packages/hooks/src/components/use-datepicker/use-year.ts:30-34
- packages/hooks/src/components/use-datepicker/use-date.ts:25-31

**问题**: 在 setCurrent 函数中，onCurrentChange 被调用两次：
1. 在 if (props.current !== undefined) 条件内调用一次
2. 在条件外又无条件调用一次

**影响**: 外部监听器接收重复事件，导致竞态条件、不必要的重渲染或逻辑破坏。

**修复**: 删除条件外的无条件调用，仅保留条件内的调用。

---

### DP-3（P0）：Timer 内存泄漏

**位置**: packages/base/src/date-picker/time.tsx:40-66

**问题**: scrollToIndex 和 handleScroll 函数创建的 setTimeout 存储在 context.timer 和 context.changeTimer，但组件卸载时未清理，导致内存泄漏。

**影响**: 内存持续占用，控制台出现 "Can't perform a React state update on an unmounted component" 警告。

**修复**: 添加 useEffect cleanup
```tsx
useEffect(() => {
  return () => {
    if (context.timer) clearTimeout(context.timer);
    if (context.changeTimer) clearTimeout(context.changeTimer);
  };
}, []);
```

---

### DP-4（P1）：时区验证范围错误

**位置**: packages/hooks/src/components/use-datepicker/util.ts:89

**问题**: 验证范围为 `num <= 13 && num >= -12`，但实际有效范围应为 UTC-12 到 UTC+14。部分地区（汤加、基里巴斯）使用 UTC+13 和 UTC+14，会被错误拒绝。

**修复**: 改为 `num <= 14 && num >= -12`

---

### DP-5（P1）：周数格式解析截取错误

**位置**: packages/hooks/src/components/use-datepicker/util.ts:215、228

**问题**: 
```ts
date.slice(weekIndex, weekIndex + 3)  // 周数只有 2 位，不是 3 位
```

**影响**: 周解析失败或获取错误数据，导致日期选择不正确。

**修复**: 改为 `weekIndex + 2`

---

### DP-8 / DP-9：样式硬编码

**位置**: packages/shineout-style/src/date-picker/date-picker.ts:78-97、214

**问题**: 宽度（240/280/420px）和间距（8px）硬编码未使用 token。

**修复**: 在 theme 中定义 token，使用引用替代。

## 测试覆盖

**现有覆盖**:
- 基础挂载测试（mountTest）
- 部分属性测试（className、style、display 等）
- 一个受控组件示例（test-001-control）

**缺失**:
- timezone 参数的边界测试（跨越 DST、负时区）
- range 模式下的边界值选择（开始日期等于结束日期）
- 不同 format 组合的格式化验证
- disabled 函数的细粒度测试
- allowSingle 的单选模式验证
- 清空功能（clearable）的 undefined 处理

## 核实记录

- **DP-6**: 删除 - handlePropsValueChange 中未发现 inputArr 的管理缺陷，edit 状态与 inputArr 同步正常，误报
- **DP-7**: 删除 - picker.tsx 中并无直接访问 dateArr[1] 的代码，getEndDobule/getStartDobule 等函数的参数不涉及 dateArr 直接索引，误报

## TODO

- [ ] P0/P1 已逐条对照源码核实，可直接按清单修复
