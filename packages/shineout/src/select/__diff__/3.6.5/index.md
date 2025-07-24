# Select 组件 3.6.5 版本 Diff 报告

## 问题描述

修复 `Select` 组件在 `Popover` 中使用并开启 `compressed` 属性后，点击 compressed 弹出层中的删除条目时会引起样式异常的问题。当 Select 组件嵌套在 Popover 内部时，compressed 模式下的更多选项弹出层定位不正确，导致样式显示异常。

## 代码变更文件

1. `packages/base/src/select/result-more.tsx`
2. `packages/base/src/select/result-more.type.ts`
3. `packages/base/src/select/result.tsx`
4. `packages/base/src/select/result.type.ts`
5. `packages/base/src/select/select.tsx`
6. `packages/shineout-style/src/select/select.ts`

## 变更代码行

### packages/base/src/select/result-more.tsx - 指定弹出层容器

```diff
 <Popover
   className={compressedClassName}
   visible={visible}
   onVisibleChange={setVisible}
+  getPopupContainer={() => props.morePopoverContainer?.current as HTMLElement}
 >
   <div className={styles.moreWrapper} onClick={(e) => e.stopPropagation()}>
     {compressed === 'no-repeat' ? null : before}
```

### packages/shineout-style/src/select/select.ts - 优化弹出层宽度

```diff
 moreWrapper: {
+  width: 'max-content',
   maxWidth: 400,
   maxHeight: 160,
   overflow: 'auto',
```

## 变更前后逻辑差异

### 变更前
- compressed 弹出层默认挂载到 document.body
- 弹出层宽度由内容撑开，可能导致宽度计算异常
- 在 Popover 等浮层组件中使用时，层级关系可能错乱

### 变更后
- compressed 弹出层挂载到指定的容器元素
- 弹出层宽度使用 `max-content`，确保正确显示
- 保证在嵌套浮层场景下的正确层级关系

## 逻辑影响范围

- 影响 compressed 模式下更多选项弹出层的挂载位置
- 影响弹出层的宽度计算方式
- 不影响非 compressed 模式的行为
- 不影响选项的选择和删除逻辑

## 风险场景分析

### DOM 结构变更风险

**风险场景**：依赖 compressed 弹出层挂载在 body 下的代码
```javascript
// 可能失效的代码
document.body.querySelector('.soui-select-compressed-popover')
```
**规避方案**：使用组件提供的 API 或事件来访问弹出层

### 行为逻辑变更风险

无相关风险

### 样式变更风险

**风险场景**：自定义了 `.soui-select-more-wrapper` 宽度的项目
```css
/* 可能需要调整的样式 */
.soui-select-more-wrapper {
  width: 300px !important;
}
```
**规避方案**：检查自定义样式，确保与 `max-content` 兼容

## 升级注意事项

### 代码兼容性

**无破坏性变更** - 该版本仅修复嵌套场景下的显示问题，不影响 API 使用

### 行为变化说明

**1. Compressed 弹出层挂载位置**
- **影响场景**：Select 在 Popover、Modal、Drawer 等浮层组件中使用
- **具体表现**：之前挂载到 body，现在挂载到就近的合适容器
- **受影响代码示例**：
  ```tsx
  // 之前：弹出层可能被 Popover 遮挡或位置错误
  // 现在：弹出层正确显示在 Popover 内部
  <Popover content={
    <Select compressed multiple value={values} data={data} />
  }>
    <Button>Open</Button>
  </Popover>
  ```
- **是否需要调整**：不需要调整，这是 bug 修复

**2. 弹出层宽度表现**
- **影响场景**：compressed 模式下选项内容较长时
- **具体表现**：之前可能宽度异常，现在根据内容自适应（最大 400px）
- **受影响代码示例**：
  ```tsx
  // 之前：长内容可能导致布局异常
  // 现在：内容正确显示，超出部分出现滚动条
  <Select compressed data={longTextOptions} />
  ```
- **是否需要调整**：不需要调整，这是体验优化