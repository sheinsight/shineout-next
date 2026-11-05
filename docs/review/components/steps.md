# Steps

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：
  - packages/shineout/src/steps/steps.tsx
  - packages/base/src/steps/steps.tsx
  - packages/base/src/steps/step.tsx
  - packages/base/src/steps/step.default.tsx
  - packages/base/src/steps/step.dot.tsx
  - packages/base/src/steps/step.arrow.tsx
  - packages/shineout-style/src/steps/
- 状态：待优化

## 概要

Steps 组件用于显示流程进度，支持 default/dot/arrow 三种类型和 horizontal/vertical 两种方向。通过 React Context 传递步骤状态。整体设计清晰，但存在类型冗余、键盘导航缺失、a11y 属性不完整等问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| STEP-1 | P1 | a11y | packages/base/src/steps/step.tsx:124-129 | 步骤项缺少 role="listitem" 或 role="step"、aria-current、aria-completed 等属性。无键盘导航支持（Arrow Up/Down/Left/Right 切换步骤） | 为 step 容器添加 role，为当前/已完成步骤添加 aria-current 和 aria-completed 属性，实现键盘导航 |
| STEP-2 | P1 | types | packages/base/src/steps/step.tsx:45-48 | dot 类型的 labelPlacement 逻辑重复：step.tsx 行 42-48 中规范化 labelPlacement，但 steps.tsx 行 38-44 中也做了同样的处理。导致相同逻辑在两处出现 | 将 labelPlacement 的规范化逻辑统一到 Steps 组件中，Step 直接使用规范化后的值 |
| STEP-3 | P2 | maintainability | packages/base/src/steps/step.tsx:96-104 | 渲染 Step 组件时使用 if-else 链选择组件，但没有抽象为映射表或工厂函数 | 使用 const stepComponents = { default: DefaultStep, dot: DotStep, arrow: ArrowStep } 来提高可读性 |
| STEP-4 | P2 | api | packages/base/src/steps/steps.tsx:58-64 | 行 58 中条件语句检查 `styles[type]`，但 styles 对象没有类型定义确保 type 的所有值都有对应的类名。可能存在新增 type 时忘记添加样式的情况 | 为 StepsClasses 添加类型约束，确保 type 的每个值都在 styles 中有对应的类名 |
| STEP-5 | P2 | test | packages/shineout/src/steps/__test__/ | 现有测试缺少：current 变化、disabled 函数、labelPlacement 组合、不同 type 的外观、键盘导航 | 补充上述测试用例 |

## 详细说明

### STEP-1: 缺少辅助功能属性和键盘导航

**触发场景**：屏幕阅读器用户或仅使用键盘导航的用户访问 Steps。

**原因分析**：
- step.tsx 行 124-129 中渲染的 div 容器没有语义角色
- 没有 aria-current 来标记当前步骤，没有 aria-completed 标记已完成步骤
- 没有实现键盘事件处理（Arrow Up/Down/Left/Right 改变 current）

**修复思路**：
```tsx
const getAriaCurrent = () => {
  if (status === 'process') return 'step';
  if (status === 'finish') return 'completed';
  return undefined;
};

<div
  className={rootClass}
  style={semStyle('step')}
  role="listitem"
  aria-label={`Step ${index + 1} of ${total}`}
  aria-current={getAriaCurrent()}
  onClick={handleChange}
  onKeyDown={(e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      // 通过 onChange 改变 current
    }
  }}
  tabIndex={isDisabled ? -1 : 0}
  dir={config.direction}
>
  {renderStep()}
</div>
```

### STEP-2: labelPlacement 规范化逻辑重复

**触发场景**：修改 Steps 组件的 labelPlacement 验证逻辑时需要同时修改两个位置。

**原因分析**：
- steps.tsx 行 38-44 中 `getLabelPlacement()` 检查 direction 是否为 vertical
- step.tsx 行 42-48 中 `getLabelPlacement()` 检查 type 是否为 dot
- 两处逻辑都在为传入的 labelPlacement 做规范化处理

**修复思路**：
```tsx
// 在 steps.tsx 中定义统一的规范化函数
const normalizeLabelPlacement = (
  placement: string,
  direction: string,
  type: string
) => {
  if (type === 'dot' && direction !== 'vertical') return 'vertical';
  if (direction === 'vertical') return 'horizontal';
  return placement;
};

// 在 Steps.tsx 中计算规范化值后通过 context 传递
// 在 step.tsx 中直接使用规范化后的值
```

### STEP-3: 组件选择逻辑不清晰

**触发场景**：新增 type 时忘记添加对应的 Step 组件映射。

**原因分析**：
- step.tsx 行 96-104 使用 if-else 链选择 Step 组件
- 这种方式容易遗漏新增的 type
- 没有默认值处理，若 type 无效会返回 undefined

**修复思路**：
```tsx
const stepComponentMap = {
  default: DefaultStep,
  dot: DotStep,
  arrow: ArrowStep,
} as const;

const Component = stepComponentMap[type] || DefaultStep;
```

### STEP-4: 缺少类型约束

**触发场景**：新增 step type 时，忘记在 StepsClasses 中添加对应的样式类名。

**原因分析**：
- styles.ts 中 StepsClasses 接口定义了样式类名
- 但 steps.tsx 行 58 中 `styles[type]` 没有类型检查，type 可能指向不存在的样式

**修复思路**：
```tsx
// 在 steps.type.ts 中添加类型约束
export type StepsType = 'default' | 'dot' | 'arrow';

export interface StepsClasses {
  rootClass: string;
  steps: string;
  [K in StepsType]: string; // 强制 StepsClasses 包含所有 type 的样式
  // ... 其他属性
}
```

## 测试覆盖

现有测试覆盖了基本的 Steps 渲染。缺失的测试：
- current 属性变化时步骤状态更新
- disabled 作为函数时的行为
- labelPlacement 与 direction/type 的组合验证
- 不同 type 的外观是否正确
- 键盘导航（Arrow Up/Down/Left/Right）
- 屏幕阅读器兼容性

## TODO

- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
