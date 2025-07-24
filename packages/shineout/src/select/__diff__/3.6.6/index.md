# Select 组件 3.6.6 版本 Diff 报告

## 问题描述

本版本包含两个改进。第一，增强 `compressed` 属性功能，新增 `hide-popover` 模式，允许隐藏合并后的选项弹出层，仅展示合并数量。第二，修复 `Select` 组件结果框高度不继承父容器高度的问题，确保组件在设置了固定高度的容器中能正确显示。

## 代码变更文件

1. `packages/base/src/select/result-more.tsx`
2. `packages/base/src/select/select.type.ts`
3. `packages/shineout-style/src/select/select.ts`

## 变更代码行

### packages/base/src/select/result-more.tsx - 支持 hide-popover 模式

```diff
   >
     {shouldShowMore ? '+' : `+${itemsLength}`}
   </Tag>
-  <Popover
-    jssStyle={jssStyle}
-    className={compressedClassName}
-    visible={visible}
-    onVisibleChange={setVisible}
-    getPopupContainer={() => props.morePopoverContainer?.current as HTMLElement}
-  >
-    <div className={styles.moreWrapper} onClick={(e) => e.stopPropagation()}>
-      {compressed === 'no-repeat' ? null : before}
-      {after}
-    </div>
-  </Popover>
+  {compressed !== 'hide-popover' && (
+    <Popover
+      jssStyle={jssStyle}
+      className={compressedClassName}
+      visible={visible}
+      onVisibleChange={setVisible}
+      getPopupContainer={() => props.morePopoverContainer?.current as HTMLElement}
+    >
+      <div className={styles.moreWrapper} onClick={(e) => e.stopPropagation()}>
+        {compressed === 'no-repeat' ? null : before}
+        {after}
+      </div>
+    </Popover>
+  )}
```

### packages/base/src/select/select.type.ts - 扩展 compressed 类型

```diff
 /**
  * @en When compressed is True, the selectd value's label will be rendered by compressed popover.
  * @cn 将选中值合并，只在多选模式下有效; 为 "no-repeat" 时弹出框中不重复展示值
  * @default false
  */
-compressed?: boolean | 'no-repeat';
+compressed?: boolean | 'no-repeat' | 'hide-popover';
```

### packages/shineout-style/src/select/select.ts - 修复高度继承

```diff
 result: {
   display: 'flex',
   flex: '1',
+  height: '100%',
   minWidth: 0,
   alignItems: 'center',
   lineHeight: token.lineHeightDynamic,
```

## 变更前后逻辑差异

### 变更前
- `compressed` 属性只支持 `boolean` 和 `no-repeat` 两种模式
- 结果框没有设置高度，可能导致在固定高度容器中显示异常
- 合并选项始终显示弹出层

### 变更后
- `compressed` 新增 `hide-popover` 模式，仅显示合并数量
- 结果框高度设置为 100%，正确继承父容器高度
- 可选择性隐藏合并选项的弹出层

## 逻辑影响范围

- 影响多选模式下的合并显示行为
- 影响组件在固定高度容器中的显示
- 不影响单选模式
- 不影响选项的选择逻辑

## 风险场景分析

### DOM 结构变更风险

**风险场景**：依赖 compressed 弹出层始终存在的代码
```javascript
// 可能失效的代码（使用 hide-popover 模式时）
const popover = document.querySelector('.soui-select-compressed-popover');
```
**规避方案**：检查 compressed 模式类型后再访问弹出层元素

### 行为逻辑变更风险

无相关风险

### 样式变更风险

**风险场景**：自定义了结果框高度的项目
```css
/* 可能需要调整的样式 */
.soui-select-result {
  height: 30px !important;
}
```
**规避方案**：检查自定义样式，确保与新的高度继承机制兼容

## 升级注意事项

### 代码兼容性

**无破坏性变更** - 该版本新增功能和修复样式问题，完全向后兼容

### 行为变化说明

**1. 新增 hide-popover 模式**
- **影响场景**：需要极简显示合并选项的场景
- **具体表现**：设置 `compressed="hide-popover"` 后，只显示数量，不显示弹出层
- **受影响代码示例**：
  ```tsx
  // 之前：只能选择显示或不显示合并
  <Select multiple compressed data={data} />
  
  // 现在：可以选择隐藏弹出层
  <Select multiple compressed="hide-popover" data={data} />
  ```
- **是否需要调整**：不需要，这是新增功能

**2. 结果框高度继承**
- **影响场景**：Select 组件在固定高度容器中使用
- **具体表现**：之前可能高度不正确，现在正确继承父容器高度
- **受影响代码示例**：
  ```tsx
  // 之前：Select 在 40px 高的容器中可能显示不正确
  // 现在：Select 正确适应容器高度
  <div style={{ height: 40 }}>
    <Select data={data} />
  </div>
  ```
- **是否需要调整**：通常不需要，如有特殊需求可通过 style 覆盖