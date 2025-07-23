# Popover 组件 3.7.7-beta.4 版本 Diff 报告

## 问题描述

修复 `Popover` 嵌套使用时，当父子的 position 不相同时，子元素的箭头位置不正确的问题。

在嵌套使用 Popover 组件的场景中，当父级 Popover 和子级 Popover 设置了不同的 `position` 属性（如父级为 "top"，子级为 "right"）时，子级 Popover 的箭头样式会被父级的样式规则影响，导致箭头定位错误。这是因为原有的 CSS 选择器使用了后代选择器，会穿透到所有嵌套层级的子元素。

## 代码变更文件

1. `packages/shineout-style/src/popover/popover.ts`

## 变更代码行

### packages/shineout-style/src/popover/popover.ts - 修改 CSS 选择器

```diff
 const popoverStyle: JsStyles<PopoverClassType> = {
   // ... 其他样式
   wrapper: {
     // ... 其他样式
-    '& $arrow': {
+    '& > $arrow': {
       'z-index': 1,
       position: 'absolute',
       content: '" "',
       // ... 箭头基础样式
     },
     '&[data-soui-position^="bottom"]': {
       marginTop: `calc(${hideArrowGap} - 2px)`,
-      '& $arrow': {
+      '& > $arrow': {
         top: '0',
         transform: 'translate(0, -50%) rotate(-45deg)',
         // ... 底部箭头样式
       },
     },
     '&[data-soui-position^="top"]': {
       marginTop: `calc((${hideArrowGap} - 2px) * -1)`,
-      '& $arrow': {
+      '& > $arrow': {
         bottom: '0',
         transform: 'translate(0, 50%) rotate(135deg)',
         // ... 顶部箭头样式
       },
     },
     '&[data-soui-position^="left"]': {
       // ... 左侧间距样式
-      '& $arrow': {
+      '& > $arrow': {
         right: token.popoverBorderWidth,
         transform: 'translate(50%, 0) rotate(45deg)',
         // ... 左侧箭头样式
       },
     },
     '&[data-soui-position^="right"]': {
       // ... 右侧间距样式
-      '& $arrow': {
+      '& > $arrow': {
         left: '0',
         transform: 'translate(-50%, 0) rotate(-135deg)',
         // ... 右侧箭头样式
       },
     },
-    '&&[data-soui-position$="-left"] $arrow': { left: arrowMargin, right: 'auto' },
-    '&&[data-soui-position$="-right"] $arrow': { right: arrowMargin, left: 'auto' },
-    '&&[data-soui-position$="-top"] $arrow': { top: arrowMargin, bottom: 'auto' },
-    '&&[data-soui-position$="-bottom"] $arrow': { bottom: arrowMargin, top: 'auto' },
+    '&&[data-soui-position$="-left"] > $arrow': { left: arrowMargin, right: 'auto' },
+    '&&[data-soui-position$="-right"] > $arrow': { right: arrowMargin, left: 'auto' },
+    '&&[data-soui-position$="-top"] > $arrow': { top: arrowMargin, bottom: 'auto' },
+    '&&[data-soui-position$="-bottom"] > $arrow': { bottom: arrowMargin, top: 'auto' },
   },
   // ... 其他样式
 };
```

## 变更前后逻辑差异

### 变更前
- 使用 `& $arrow` 后代选择器，会选中所有层级的箭头元素
- 父级 Popover 的箭头样式会穿透影响到嵌套的子 Popover 的箭头
- 导致嵌套场景下子 Popover 的箭头位置异常

### 变更后  
- 使用 `& > $arrow` 直接子元素选择器，只选中当前层级的箭头元素
- 父级 Popover 的箭头样式只作用于自身的箭头，不会影响嵌套的子元素
- 每个 Popover 的箭头样式保持独立，互不干扰

## 逻辑影响范围

### 组件内部影响
- 修改了 Popover 组件的箭头样式选择器，从后代选择器改为直接子元素选择器
- 确保每个 Popover 实例的箭头样式独立，不受父级影响
- 不影响 Popover 的其他功能和逻辑

### 组件外部影响
- 对单层 Popover 使用没有任何影响，箭头样式保持不变
- 修复了嵌套 Popover 场景下的箭头定位问题
- 提升了组件在复杂嵌套场景下的可靠性

## 风险使用场景

### 代码执行风险
- **无代码执行风险**：本次修改仅涉及 CSS 选择器，不涉及 JavaScript 逻辑变更

### 交互体验差异

1. **嵌套 Popover 箭头修复**：
   - 影响场景：在同一页面中嵌套使用多个 Popover，且父子 position 不同
   - 具体表现：子 Popover 的箭头将正确显示在指定位置，不再受父级样式影响
   - 受影响代码示例：
   ```tsx
   // 修复前：子 Popover 箭头位置可能错误
   <Popover content="父级内容" position="top">
     <Popover content="子级内容" position="right">
       <Button>嵌套按钮</Button>
     </Popover>
   </Popover>
   
   // 修复后：子 Popover 箭头正确显示在右侧
   ```
   - 是否需要调整：不需要，属于 bug 修复

2. **自定义样式覆盖**：
   - 影响场景：如果项目中有自定义样式覆盖了 Popover 箭头样式
   - 具体表现：需要相应调整自定义样式的选择器
   - 受影响代码示例：
   ```css
   /* 如果有类似的自定义样式，需要同步修改 */
   .custom-popover .so-popover__arrow { }  /* 可能需要改为 */
   .custom-popover > .so-popover__arrow { }
   ```
   - 是否需要调整：极少数情况可能需要，但一般不会有此类自定义

### 升级建议
- 本次变更为 bug 修复，不涉及 API 变更
- 建议有嵌套 Popover 使用场景的项目升级，以获得正确的箭头显示效果
- 升级后无需修改代码，箭头位置将自动修复