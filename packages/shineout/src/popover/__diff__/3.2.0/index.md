# Popover 组件隐藏箭头样式优化 diff 报告

## 问题描述

优化 Popover 隐藏箭头后弹层距离触发器的高度。之前当设置 `showArrow={false}` 隐藏箭头时，弹层与触发器之间的间距过大（仍保持箭头存在时的 10px 间距），视觉效果不佳。本次修改通过 CSS 变量动态调整间距，隐藏箭头时缩小到 4px。

## 代码变更文件

- `packages/base/src/popover/popover.tsx`
- `packages/base/src/popover/popover.type.ts`
- `packages/shineout-style/src/popover/popover.ts`

## 变更代码行

### packages/base/src/popover/popover.tsx

**在 wrapper 元素上添加 hideArrow 样式类**（第136-141行）
```diff
       <div
-        className={classNames(className, popoverStyle?.wrapper, open && popoverStyle?.wrapperOpen)}
+        className={classNames(
+          className,
+          popoverStyle?.wrapper,
+          open && popoverStyle?.wrapperOpen,
+          !showArrow && popoverStyle?.hideArrow,
+        )}
```

### packages/base/src/popover/popover.type.ts

**在 PopoverClasses 接口中添加 hideArrow 类型**（第15行）
```diff
 export interface PopoverClasses {
   wrapper: string;
   wrapperOpen: string;
   content: string;
   arrow: string;
+  hideArrow: string;
   text: string;
```

### packages/shineout-style/src/popover/popover.ts

1. **定义 CSS 变量和间距**（第7-9行）
   ```diff
   -const arrowGap = 10;
   +const cssvar = '--popover-arrow-gap';
   +const hideArrowGap = `var(${cssvar}, 10px)`;
   ```

2. **添加 hideArrow 样式规则**（第35-37行）
   ```diff
   +    '&$hideArrow': {
   +      [cssvar]: '4px',
   +    },
   ```

3. **将所有硬编码的间距值改为使用 CSS 变量**
   - bottom 方向：`marginTop: calc(${hideArrowGap} - 2px)`
   - top 方向：`marginTop: calc((${hideArrowGap} - 2px) * -1)`
   - left 方向：`marginLeft/marginRight: calc((${hideArrowGap} - 2px) * -1)`
   - right 方向：`marginLeft/marginRight: calc(${hideArrowGap} - 2px)`
   - 所有 ::after 伪元素的定位和尺寸都使用 `hideArrowGap`

## 变更前后逻辑差异

### 变更前
- 所有间距都是硬编码的 10px（`arrowGap`）
- 隐藏箭头时仍保持相同的间距
- 无法根据是否显示箭头动态调整间距

### 变更后
- 使用 CSS 变量 `--popover-arrow-gap` 控制间距
- 默认值为 10px（有箭头时）
- 当 `showArrow={false}` 时，通过 `hideArrow` 类将间距设为 4px
- 所有相关的 margin 和定位都基于这个动态值计算

### 对组件运作逻辑的影响

1. **视觉优化**：隐藏箭头时，弹层更贴近触发器，视觉效果更自然
2. **灵活性提升**：通过 CSS 变量可以更容易地自定义间距
3. **向后兼容**：保持了原有的默认行为，只在隐藏箭头时改变

## 逻辑影响范围

- 通过 CSS 变量动态控制间距，提高了样式的灵活性
- 隐藏箭头时间距从 10px 缩小到 4px，视觉效果更自然
- 所有方向的 margin 和定位计算都基于动态值

## 升级注意事项

### 代码兼容性
- **视觉变更**：使用 `showArrow={false}` 的现有代码会有间距变化
- CSS 变量在 IE 浏览器不支持，但有默认值兜底

### 行为变化说明

1. **隐藏箭头的间距优化**：
   - 影响场景：所有设置了 `showArrow={false}` 的 Popover
   - 具体表现：弹层与触发器的间距从 10px 减少到 4px
   - 受影响代码示例：
   ```tsx
   // 之前：隐藏箭头后仍有 10px 间距
   // 现在：间距缩小到 4px，更紧凑
   <Popover 
     showArrow={false}
     content="提示内容"
   >
     <Button>触发按钮</Button>
   </Popover>
   ```
   - 是否需要调整：如果对间距有精确要求，可能需要调整

2. **CSS 变量的使用**：
   - 影响场景：自定义主题或样式覆盖
   - 具体表现：可以通过 `--popover-arrow-gap` 变量自定义间距
   - 受影响代码示例：
   ```css
   /* 自定义间距 */
   .custom-popover {
     --popover-arrow-gap: 6px;
   }
   ```
   - 是否需要调整：提供了更灵活的定制能力