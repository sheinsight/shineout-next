# Input 组件 3.6.0-beta.22 版本 Diff 报告

## 问题描述
`Input.Group` 新增 `seperate` 属性：组合到一起的组件有独立的边框

## 代码变更文件
- `packages/base/src/input/input-group.tsx`
- `packages/base/src/input/input-group.type.ts`
- `packages/base/src/input/input.type.ts`
- `packages/shineout-style/src/button/button.ts`
- `packages/shineout-style/src/input/input-border.ts`
- `packages/shineout-style/src/input/input.ts`

## 变更代码行
```diff
// input-group.type.ts
export interface InputGroupProps {
+ /**
+  * @en Whether to display a separate border
+  * @cn 是否显示独立边框
+  * @default false
+  */
+ seperate?: boolean;
}

// input-group.tsx
const InputGroup = (props: InputGroupProps) => {
  const {
    className,
    style,
    size,
    disabled,
    tip,
    error,
    popover,
    width,
+   seperate,
    children,
  } = props;

  const rootClass = classNames(
    className,
    jssStyle?.group,
+   seperate && jssStyle?.seperate,
  );

// input-border.ts - 新增独立边框样式
+ seperate: {
+   '& $wrapperGroup': {
+     '& > *': {
+       marginLeft: '0 !important',
+       marginRight: '8px',
+       '&:last-child': {
+         marginRight: '0',
+       },
+     },
+     '& $wrapper': {
+       borderRadius: token.inputBorderRadius,
+     },
+   },
+ },
```

## 变更前后逻辑差异
- **变更前**：Input.Group 中的组件紧密连接，共享边框
- **变更后**：
  1. 新增 `seperate` 属性，开启后每个子组件都有独立的边框
  2. 子组件之间有 8px 的间距
  3. 每个子组件都有独立的圆角

## 逻辑影响范围
- 仅影响使用 Input.Group 的场景
- 不影响原有的紧密连接样式（默认 seperate=false）
- 同时影响 Input.Group 中的 Button 组件样式

## 风险使用场景

### 代码执行风险
- 无直接代码执行风险

### 交互体验差异
- 开启 seperate 后，组件之间有明显的间距
- 每个组件都有独立的边框和圆角，视觉上更加独立

### 注意事项
- 该属性名在后续版本（3.7.1-beta.4）中修正为 `separate`，但原 `seperate` 仍保留兼容