# Dropdown 组件 3.4.0 版本 Diff 报告

## 问题描述

`Dropdown` 新增 `zIndex` 属性，允许用户自定义下拉面板的层级值。该属性默认值为 1051，解决了在特定场景下下拉面板可能被其他高层级元素遮挡的问题。

## 代码变更文件

1. `packages/base/src/dropdown/dropdown.type.ts`
2. `packages/base/src/dropdown/dropdownIn.tsx`
3. `packages/shineout/src/dropdown/__doc__/changelog.cn.md`

## 变更代码行

### 1. packages/base/src/dropdown/dropdown.type.ts
```typescript
// 第213-218行：新增属性定义
/**
 * @en The z-index value of the panel, the default value is 1051
 * @cn 面板的 zIndex 值，默认为 1051
 * @version 3.4.0
 */
zIndex?: number;
```

### 2. packages/base/src/dropdown/dropdownIn.tsx
```typescript
// 第31行：解构新增属性
zIndex,

// 第215行：传递属性到 Absolute 组件
zIndex={zIndex}

// 第84-89行：代码格式化调整（三元运算符）
const child = placeholder
  ? [
      <span key='text' className={dropdownClasses?.content}>
        {placeholder}
      </span>,
    ]
  : [];
```

## 变更前后逻辑差异

### 变更前
- Dropdown 组件的下拉面板使用默认的 z-index 值
- 无法通过 props 调整下拉面板的层级

### 变更后
- 新增 `zIndex` 可选属性，类型为 number
- 默认值为 1051（与组件库其他弹出层组件保持一致）
- `zIndex` 属性通过 props 传递给内部的 `Absolute` 组件，控制下拉面板的层级

### 对组件上下文及运作逻辑的影响
1. **属性传递链路**：`zIndex` 从 Dropdown 组件传递到 dropdownIn，再传递给 Absolute 组件
2. **层级控制能力**：用户现在可以根据实际场景调整下拉面板的层级，解决特殊布局下的遮挡问题
3. **默认行为保持不变**：不传递 `zIndex` 时，使用默认值 1051

## 风险使用场景

### 代码执行风险
1. **无破坏性变更**：`zIndex` 为新增的可选属性，现有代码无需修改即可正常运行

### 交互体验差异
1. **无视觉变化**：默认情况下，下拉面板的层级与之前保持一致
2. **层级冲突场景**：
   - 影响场景：用户设置了过低的 `zIndex` 值
   - 具体表现：下拉面板可能被其他元素遮挡
   - 受影响代码示例：`<Dropdown zIndex={10} />`（当页面中有更高层级的元素时）
3. **全局层级管理**：
   - 影响场景：在复杂应用中同时使用多个弹出层组件
   - 具体表现：需要协调管理不同组件的 `zIndex` 值以确保正确的层级关系
   - 受影响代码示例：同时使用 Dropdown、Modal、Popover 等组件时