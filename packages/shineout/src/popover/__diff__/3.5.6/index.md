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

## 逻辑影响范围

- 修正了左侧定位时垫片元素的定位逻辑，从使用 `left` 改为 `right`
- 垫片元素正确覆盖箭头和触发元素之间的空隙
- 提升了 hover 触发模式下的交互稳定性

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：纯样式修复，不影响 API
- calc() 函数在现代浏览器都支持

### 行为变化说明

1. **左侧定位 hover 交互修复**：
   - 影响场景：使用 `trigger="hover"` 且 `position="left"` 的 Popover
   - 具体表现：鼠标从触发元素移动到 Popover 内容时不再意外关闭
   - 受影响代码示例：
   ```tsx
   // 之前：鼠标移动过程中 Popover 可能关闭
   // 现在：稳定保持打开状态
   <Popover 
     trigger="hover"
     position="left"
     content={
       <div style={{ width: 200 }}>
         详细信息内容
       </div>
     }
   >
     <Icon type="info" />
   </Popover>
   ```
   - 是否需要调整：不需要，体验优化

2. **所有方向行为一致**：
   - 影响场景：不同方向的 Popover hover 交互
   - 具体表现：左侧定位现在与其他方向（上、下、右）行为一致
   - 受影响代码示例：
   ```tsx
   // 在表格或列表中的应用
   <Table>
     {data.map(item => (
       <tr>
         <td>{item.name}</td>
         <td>
           <Popover 
             trigger="hover" 
             position="left"
             content={item.details}
           >
             <Icon type="more" />
           </Popover>
         </td>
       </tr>
     ))}
   </Table>
   ```
   - 是否需要调整：不需要，一致性提升