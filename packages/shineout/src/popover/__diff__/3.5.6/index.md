# Popover 组件左侧定位垫片修复 diff 报告

## 问题描述

修复 Popover 组件在 `position='left'` 模式下三角箭头和 trigger 元素之间的垫片元素不生效的问题。垫片元素（通过 ::after 伪元素实现）用于在箭头和触发元素之间创建一个不可见的区域，防止鼠标移动时意外关闭 Popover。在左侧定位时，垫片元素的位置计算错误，导致功能失效。

## 代码变更文件

- `packages/shineout-style/src/popover/popover.ts`

## 变更代码行

### packages/shineout-style/src/popover/popover.ts（第95行）

```diff
       '&::after': {
         // left: arrowGap * -1,
-        left: `calc(${hideArrowGap} * -1)`,
+        right: `calc(${hideArrowGap} * -1)`,
         top: '0',
         bottom: '0',
         content: '" "',
```

## 变更前后逻辑差异

### 变更前
- 在左侧定位（position='left'）时，垫片元素使用 `left` 属性进行定位
- `left: calc(${hideArrowGap} * -1)` 会将垫片元素向左偏移，导致其位置不在箭头和触发元素之间

### 变更后
- 改为使用 `right` 属性进行定位
- `right: calc(${hideArrowGap} * -1)` 会将垫片元素向右延伸，正确覆盖箭头和触发元素之间的空隙

### 对组件运作逻辑的影响

1. **定位逻辑修正**：
   - 左侧定位时，Popover 在触发元素的左边
   - 垫片需要从 Popover 的右边缘（靠近触发元素的一侧）向右延伸
   - 使用 `right` 负值可以实现向右延伸的效果

2. **交互体验改善**：
   - 修复后，鼠标从触发元素移动到 Popover 内容时不会意外关闭
   - 提升了 hover 触发模式下的用户体验

## 风险使用场景

### 代码执行风险
1. **样式覆盖**：如果有自定义样式覆盖了该伪元素的定位属性，可能会影响修复效果
2. **浏览器兼容性**：calc() 函数在旧版浏览器中可能有兼容性问题，但现代浏览器都支持

### 交互体验差异
1. **修复前的问题**：
   - 左侧定位的 Popover 在 hover 模式下容易意外关闭
   - 用户体验不一致（其他方向正常，只有左侧有问题）

2. **修复后的改善**：
   - 所有定位方向的行为一致
   - hover 交互更加稳定可靠

### 需要注意的场景
1. **hover 触发模式**：主要影响 `trigger="hover"` 的 Popover
2. **左侧定位**：只影响 `position="left"` 的情况
3. **自定义样式**：如果项目中有覆盖 Popover 样式的自定义 CSS，需要检查兼容性
4. **RTL 布局**：在从右到左的布局中，可能需要额外测试
5. **嵌套 Popover**：多层嵌套的 Popover 场景需要验证垫片元素不会相互干扰