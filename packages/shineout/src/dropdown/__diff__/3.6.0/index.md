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
```diff
// 第5行：新增导入
+import { ButtonShape } from '@sheinx/hooks';

// 第172-177行：新增属性定义
+/**
+ * @en The shape of placeholder button
+ * @cn 占位按钮的shape
+ * @version 3.6.0
+ */
+buttonShape?: ButtonShape
```

### 2. packages/base/src/dropdown/dropdownIn.tsx
```diff
// 第32行：解构新增属性
const {
  // ... 其他属性
+ buttonShape,
} = props;

// 第132行：传递属性到 Button 组件
<Button
  // ... 其他属性
+ shape={buttonShape}
  // ...
/>
```

### 3. packages/shineout-style/src/dropdown/dropdown.ts
```diff
content: {
  flex: '1',
  minWidth: '0',
+ '& > svg': {
+   display: 'block',
+   margin: '0 auto'
+ }
},
```

### 4. packages/shineout/src/dropdown/__example__/t-002-no-placeholder.tsx
```diff
// 第10-12行：新增 SVG 图标
+const moreIcon = <svg viewBox="0 0 24 24" width="24px" height="24px" style={{display: 'block'}}>
+<path d="M4.00195 10C5.10652 10 6.00195 10.8954 6.00195 12C6.00195 13.1046 5.10652 14 4.00195 14C2.89738 14 2.00195 13.1046 2.00195 12C2.00195 10.8954 2.89738 10 4.00195 10ZM12.002 10C13.1065 10 14.002 10.8954 14.002 12C14.002 13.1046 13.1065 14 12.002 14C10.8974 14 10.002 13.1046 10.002 12C10.002 10.8954 10.8974 10 12.002 10ZM20.002 10C21.1065 10 22.002 10.8954 22.002 12C22.002 13.1046 21.1065 14 20.002 14C18.8974 14 18.002 13.1046 18.002 12C18.002 10.8954 18.8974 10 20.002 10Z"></path>
+</svg>

// 第44-45行：修改示例
-<Dropdown data={data} onClick={console.log} />
-<Dropdown data={data} disabled />
+<Dropdown data={data} placeholder="Default" />
+<Dropdown data={data} placeholder={moreIcon} buttonShape="circle" hideArrow />
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

## 逻辑影响范围
- 新增 `buttonShape` 属性传递链路，从 Dropdown 组件传递到内部 Button 组件
- SVG 居中样式仅作用于 `.content` 类下的直接子 SVG 元素
- 复用 Button 组件的 shape 逻辑，保持组件库 API 一致性

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：`buttonShape` 为新增的可选属性，现有代码无需修改即可正常运行

### 行为变化说明
1. **SVG 图标自动居中**：
   - 升级前：placeholder 中的 SVG 元素按内联元素显示，可能左对齐
   - 升级后：SVG 元素自动设置为块级元素并水平居中
   - 受影响场景：在 placeholder 中直接传入 SVG 元素
   - 示例代码：`<Dropdown placeholder={<svg>...</svg>} />`
   - 是否需要调整：通常不需要，但如果需要保持原有对齐方式，可通过额外包裹元素处理

2. **自定义 margin 样式被覆盖**：
   - 升级前：SVG 元素的自定义 margin 样式正常生效
   - 升级后：自定义的 margin 会被 `margin: 0 auto` 覆盖
   - 受影响场景：对 placeholder 中的 SVG 设置了 margin 样式
   - 示例代码：`<Dropdown placeholder={<svg style={{margin: '0 10px'}}>...</svg>} />`
   - 是否需要调整：如需保留自定义间距，可使用 padding 或包裹元素

3. **复合内容布局变化**：
   - 升级前：SVG 与其他元素保持行内布局
   - 升级后：SVG 变为块级元素，可能破坏原有布局
   - 受影响场景：placeholder 包含 SVG 和文字的组合
   - 示例代码：`<Dropdown placeholder={<span><svg />文字</span>} />`
   - 是否需要调整：需要调整布局结构或添加样式以保持原有效果