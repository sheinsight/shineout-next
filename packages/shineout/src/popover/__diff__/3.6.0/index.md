# Popover 组件 3.6.0 版本 Diff 报告

## 问题描述

本版本为 `Popover` 组件新增了两个定位相关的属性并修复了一个宽度显示问题：
1. 新增 `offset` 属性，设置弹出层宽度或高度的附加值，允许在原有定位基础上进行像素级微调
2. 新增 `popupGap` 属性，设置弹出层与触发元素的间距，之前该值固定为 0
3. 修复在滚动容器中使用水平定位（position='left'）时，靠近窗口右侧时弹出层宽度被非预期挤压的问题

## 代码变更文件

1. `packages/base/src/popover/popover.type.ts`
2. `packages/base/src/popover/popover.tsx`
3. `packages/hooks/src/common/use-position-style/index.ts`
4. `packages/shineout-style/src/popover/popover.ts`
5. `packages/base/src/absolute-list/use-container.tsx`

## 变更代码行

### 1. packages/base/src/popover/popover.type.ts - 新增属性定义
```diff
export interface PopoverProps {
  // ... 其他属性
+ /**
+  * @en The offset of the pop-up layer
+  * @cn 弹出层偏移量, [x, y]
+  * @example [0, 4]
+  * @default [0,0]
+  * @version 3.6.0
+  */
+ offset?: [number, number];
+ /**
+  * @en The gap between the pop-up layer and the trigger element
+  * @cn 弹出层与触发元素的间距
+  * @default 4
+  * @version 3.6.0
+  */
+ popupGap?: number;
}
```

### 2. packages/base/src/popover/popover.tsx - 应用新属性
```diff
const Popover = (props: PopoverProps) => {
  const {
    // ... 其他属性
+   popupGap = 0,
    // ... 其他属性
  } = props;
  
  return (
    <AbsoluteList
      // ... 其他属性
-     popupGap={0}
+     popupGap={popupGap}
      // ... 其他属性
    />
  );
};
```

### 3. packages/hooks/src/common/use-position-style/index.ts - 实现 offset 计算
```diff
// 水平定位计算
// 左对齐
- style.left = rect.left - containerRect.left + containerScroll.left;
+ style.left = rect.left - containerRect.left + containerScroll.left - (offset ? offset[0] : 0);

// 右对齐
- style.right = containerRect.right - rect.right + containerScrollBarWidth - containerScroll.left;
+ style.right = containerRect.right - rect.right + containerScrollBarWidth - containerScroll.left - (offset ? offset[0] : 0);

// 垂直定位计算
// 顶部定位
- style.top = rect.top - containerRect.top + containerScroll.top;
+ style.top = rect.top - containerRect.top + containerScroll.top - (offset ? offset[1] : 0);

// 底部定位
- style.top = rect.bottom - containerRect.top + containerScroll.top;
+ style.top = rect.bottom - containerRect.top + containerScroll.top + (offset ? offset[1] : 0);
```

### 4. packages/hooks/src/common/use-position-style/index.ts - 修复左侧定位宽度问题
```diff
// 左侧定位计算方式调整
if (position === 'left') {
- style.left = rect.left - containerRect.left + containerScroll.left - popupGap;
- arrayStyle.right = `0px`;
- style.transform += ' translateX(-100%)';
+ style.right = containerRect.right - rect.left;
+ arrayStyle.right = '0px';
+ arrayStyle.left = 'auto';
}
```

### 5. packages/shineout-style/src/popover/popover.ts - 修复左侧定位样式
```diff
'&[data-soui-position^="left"]': {
- '&[dir=ltr]': { marginLeft: `calc((${hideArrowGap} - 2px) * -1)` },
- '&[dir=rtl]': { marginRight: `calc((${hideArrowGap} - 2px) * -1)` },
+ '&[dir=ltr]': { marginRight: `calc((${hideArrowGap} - 2px))` },
+ '&[dir=rtl]': { marginLeft: `calc((${hideArrowGap} - 2px))` },
}
```

## 变更前后逻辑差异

### 变更前
- 弹出层与触发元素的间距固定为 0，无法调整
- 不支持在定位基础上进行额外的偏移调整
- 左侧定位使用 `left + translateX(-100%)` 的方式，在滚动容器中可能导致宽度被压缩

### 变更后
- 通过 `popupGap` 属性可以自定义弹出层与触发元素的间距
- 通过 `offset` 属性可以在 X、Y 轴上进行像素级的位置微调
- 左侧定位改用 `right` 定位方式，避免了宽度压缩问题

## 逻辑影响范围
- 新增的属性为可选配置，不影响现有使用
- 左侧定位的实现方式变更，修复了特定场景下的显示问题
- 所有使用 Popover 的定位计算都支持 offset 偏移

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：新增的属性都是可选的，左侧定位的修复是内部实现优化

### 行为变化说明

1. **新增 offset 属性**：
   - 影响场景：需要微调弹出层位置的场景
   - 具体表现：可以通过 `[x, y]` 数组设置额外偏移
   - 受影响代码示例：
   ```tsx
   // 之前：位置固定，无法微调
   <Popover position="top" content="提示内容">
     <Button>触发按钮</Button>
   </Popover>
   
   // 现在：可以向左偏移 10px，向上偏移 5px
   <Popover position="top" offset={[-10, -5]} content="提示内容">
     <Button>触发按钮</Button>
   </Popover>
   ```
   - 是否需要调整：不需要，这是新增功能

2. **新增 popupGap 属性**：
   - 影响场景：需要调整弹出层与触发元素间距的场景
   - 具体表现：默认值从固定的 0 变为可配置，默认仍为 0
   - 受影响代码示例：
   ```tsx
   // 之前：间距固定为 0
   // 现在：可以设置 8px 的间距
   <Popover position="top" popupGap={8} content="提示内容">
     <Button>触发按钮</Button>
   </Popover>
   ```
   - 是否需要调整：不需要，默认值保持不变

3. **左侧定位显示优化**：
   - 影响场景：在滚动容器中使用 `position="left"` 且靠近容器右边缘
   - 具体表现：弹出层宽度不再被压缩，保持正常显示
   - 受影响代码示例：
   ```tsx
   // 之前：在 Table 等滚动容器右侧使用时，弹出层可能变窄
   // 现在：弹出层保持正常宽度
   <Table>
     {/* 表格最右列的 Popover */}
     <Popover position="left" content="这是一段较长的提示文字">
       <Icon type="info" />
     </Popover>
   </Table>
   ```
   - 是否需要调整：不需要，这是显示问题修复