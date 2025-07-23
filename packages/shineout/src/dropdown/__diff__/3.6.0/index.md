# Dropdown 组件 3.6.0 版本 Diff 报告

## 问题描述

`Dropdown` 组件新增 `buttonShape` 属性，功能同 `Button` 组件的 `shape` 属性。此功能允许用户自定义占位按钮的形状，特别是在需要创建圆形按钮（如更多操作按钮）时非常有用。同时修复了当不传 placeholder 时，图标不水平居中的样式问题。

## 代码变更文件

1. `packages/base/src/dropdown/dropdown.type.ts`
2. `packages/base/src/dropdown/dropdownIn.tsx`
3. `packages/shineout-style/src/dropdown/dropdown.ts`
4. `packages/shineout/src/dropdown/__doc__/changelog.cn.md`
5. `packages/shineout/src/dropdown/__example__/t-002-no-placeholder.tsx`

## 变更代码行

### 1. packages/base/src/dropdown/dropdown.type.ts
```typescript
// 第5行：新增导入
import { ButtonShape } from '@sheinx/hooks';

// 第172-177行：新增属性定义
/**
 * @en The shape of placeholder button
 * @cn 占位按钮的shape
 * @version 3.6.0
 */
buttonShape?: ButtonShape
```

### 2. packages/base/src/dropdown/dropdownIn.tsx
```typescript
// 第32行：解构新增属性
buttonShape,

// 第132行：传递属性到 Button 组件
shape={buttonShape}
```

### 3. packages/shineout-style/src/dropdown/dropdown.ts
```css
// 第124-127行：新增样式
'& > svg': {
  display: 'block',
  margin: '0 auto'
}
```

### 4. packages/shineout/src/dropdown/__example__/t-002-no-placeholder.tsx
```tsx
// 第10-12行：新增 SVG 图标
const moreIcon = <svg viewBox="0 0 24 24" width="24px" height="24px" style={{display: 'block'}}>
<path d="M4.00195 10C5.10652 10 6.00195 10.8954 6.00195 12C6.00195 13.1046 5.10652 14 4.00195 14C2.89738 14 2.00195 13.1046 2.00195 12C2.00195 10.8954 2.89738 10 4.00195 10ZM12.002 10C13.1065 10 14.002 10.8954 14.002 12C14.002 13.1046 13.1065 14 12.002 14C10.8974 14 10.002 13.1046 10.002 12C10.002 10.8954 10.8974 10 12.002 10ZM20.002 10C21.1065 10 22.002 10.8954 22.002 12C22.002 13.1046 21.1065 14 20.002 14C18.8974 14 18.002 13.1046 18.002 12C18.002 10.8954 18.8974 10 20.002 10Z"></path>
</svg>

// 第44-45行：修改示例
<Dropdown data={data} placeholder="Default" />
<Dropdown data={data} placeholder={moreIcon} buttonShape="circle" hideArrow />
```

## 变更前后逻辑差异

### 变更前
- Dropdown 组件的占位按钮形状固定，无法自定义
- 占位符内容中的 SVG 元素没有特定的居中样式处理

### 变更后
- 新增 `buttonShape` 可选属性，接受 ButtonShape 类型值（'default' | 'circle' | 'round'）
- `buttonShape` 属性值传递给内部 Button 组件的 `shape` 属性
- 占位符容器的直接子 SVG 元素应用了 `display: block` 和 `margin: 0 auto` 样式，实现水平居中
- 该属性为可选属性，不传递时保持原有行为

### 对组件上下文及运作逻辑的影响
1. **属性传递机制**：在 dropdownIn 组件中新增了 buttonShape 的解构和传递，建立了从 Dropdown 到内部 Button 组件的属性映射关系
2. **样式层级影响**：新增的 SVG 居中样式仅作用于 `.content` 类下的直接子 SVG 元素，不会影响嵌套更深的 SVG 元素
3. **组件复用性**：通过复用 Button 组件的 shape 属性逻辑，保持了组件库的一致性

## 风险使用场景

### 代码执行风险
1. **无破坏性变更**：`buttonShape` 为新增的可选属性，现有代码无需修改即可正常运行

### 交互体验差异
1. **SVG 图标布局变化**：
   - 影响场景：在 placeholder 中直接传入 SVG 元素的现有代码
   - 具体表现：SVG 元素会从原本的内联元素变为块级元素并自动居中
   - 受影响代码示例：`<Dropdown placeholder={<svg>...</svg>} />`
   - 视觉变化：原本可能左对齐或有自定义 margin 的 SVG 图标会变为居中显示

2. **自定义样式覆盖**：
   - 影响场景：用户对 placeholder 中的 SVG 设置了自定义 margin 样式
   - 具体表现：自定义的 margin 样式会被 `margin: 0 auto` 覆盖
   - 受影响代码示例：`<Dropdown placeholder={<svg style={{margin: '0 10px'}}>...</svg>} />`

3. **复合内容布局**：
   - 影响场景：placeholder 中包含 SVG 和其他元素的组合
   - 具体表现：仅 SVG 元素会被设置为块级并居中，可能破坏原有的行内布局
   - 受影响代码示例：`<Dropdown placeholder={<span><svg />文字</span>} />`