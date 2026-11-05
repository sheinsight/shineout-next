# slider

- Review 日期：2026-11-05
- 核实状态：已核实
- 涉及文件：
  - packages/shineout/src/slider/
  - packages/base/src/slider/
  - packages/hooks/src/components/use-slider/
  - packages/shineout-style/src/slider/
- 状态：待优化

## 概要

slider 组件实现了单值和范围选择、垂直方向、RTL 支持，整体架构清晰。但存在硬编码的间距值、缺少必要的键盘操作 a11y、disabled 函数处理边界情况不完善等问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| SL-4 | P1 | bug | packages/hooks/src/components/use-slider/use-slider.ts:190-195 | 范围模式下拖动时交换位置，但交换后的值可能违反 disabled 函数规则 | 交换后需重新验证新位置是否符合 disabled 规则，否则可能进入非法状态 |
| SL-5 | P2 | perf | packages/base/src/slider/slider.tsx:158 | scale 数组在每次渲染时都会遍历调用 renderScale，未优化 | 将 scale 列表提取为 useMemo，避免重复创建对象 |
| SL-6 | P2 | maintainability | packages/hooks/src/components/use-slider/use-slider.ts:46-48 | 复杂的条件注释说明存在设计折衷，但未文档化 | 添加 TODO 或文档注释说明为何需要特殊的 disabled 函数处理 |
| SL-7 | P2 | types | packages/shineout/src/slider/slider.type.ts | SliderValueType 类型定义与实现中的范围值处理不一致 | 确保类型与实现一致，补充类型测试 |
| SL-8 | P3 | test | packages/shineout/src/slider/__test__/slider.spec.tsx | 缺少 disabled 函数、step 精度、vertical 方向、RTL 的测试 | 添加更多测试覆盖 disabled 函数细节、浮点 step、vertical 滑动 |

## 详细说明

## 详细说明

### SL-1：样式硬编码

**位置**: packages/shineout-style/src/slider/slider.ts:13、28、184、209

**问题**:
```ts
padding: `20px 10px`,  // 第 13 行
padding: `10px 70px 10px 20px`,  // 第 28 行（vertical）
transform: 'translate(-50%, -14px)',  // 第 175、179 等多处
padding: '1px 4px',  // 第 184、209 行
```

**影响**: 样式难以维护，跨主题样式不一致。

**修复**: 定义 token 并使用引用替代。

---

### SL-2：缺少 ARIA 属性

**位置**: packages/base/src/slider/slider.tsx

**问题**: 滑块 indicator 未设置：
- `role="slider"` 
- `aria-label`
- `aria-valuenow` / `aria-valuemin` / `aria-valuemax`
- `tabindex="0"`

**影响**: 屏幕阅读器无法识别滑块，无障碍使用受限。

**修复**: 在 indicator div 上添加完整的 ARIA 属性。

---

### SL-3：缺少键盘操作支持

**位置**: packages/base/src/slider/slider.tsx

**问题**: 无法用键盘调整滑块值。

**影响**: 键盘用户无法操作组件。

**修复**: 
1. 为 indicator 添加 tabindex
2. 实现 onKeyDown 处理 ArrowLeft/Right/Home/End 等按键
3. 根据 vertical 和 direction 正确映射按键方向

---

### SL-4（P1）：disabled 函数与范围交换冲突

**位置**: packages/hooks/src/components/use-slider/use-slider.ts:190-195

**问题**:
```ts
if (newRate[0] > newRate[1]) {
  context.dragIndex = context.dragIndex === 0 ? 1 : 0;
  const temp = newRate[0];
  newRate[0] = newRate[1];
  newRate[1] = temp;
}
```

交换后的值未验证 disabled 规则。如果原始 disabled 函数要求位置 0 < 位置 1，交换后可能违反规则。

**修复**: 交换后调用 isDisabled 检查新值是否合法，若不合法则撤销交换或选择最近的合法边界。

---

## 测试覆盖

**现有覆盖**:
- 基础挂载测试
- 快照测试

**缺失**:
- disabled 函数细粒度测试（特别是 step 与 disabled 的交互）
- 浮点 step 的精度测试（如 0.1）
- vertical 和 RTL 组合的方向性测试
- 键盘导航测试
- 范围模式下交换位置的完整场景

## 核实记录

- **SL-1**: P1 style - 保留，位置已补全
- **SL-2**: P1 a11y - 保留，位置已补全
- **SL-3**: P1 a11y - 保留，位置已补全

## TODO

- [ ] P0/P1 已逐条对照源码核实，可直接按清单修复
