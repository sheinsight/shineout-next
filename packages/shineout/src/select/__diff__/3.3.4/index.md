# Select 组件 3.3.4 版本 Diff 报告

## 问题描述

支持 `Select` 的树形数据展开时，弹出层的位置自适应。之前当树形选项展开或收起时，弹出层的位置不会自动调整，可能导致内容被遮挡或位置不当。

修复 `Select` 的树形数据展开时，设置的 `autoAdapt`（下拉列表宽度根据内容自由展开）不生效的问题。树形节点展开后，弹出层宽度无法正确适应新的内容宽度。

## 代码变更文件

1. `packages/base/src/select/select.tsx`
2. `packages/hooks/src/components/use-popup.ts`
3. `packages/base/src/select/select.type.ts`
4. `packages/shineout-style/src/tree/tree.ts`

## 变更代码行

### packages/base/src/select/select.tsx - 新增展开时位置更新机制
```diff
+ const [absoluteListUpdateKey, setAbsoluteListUpdateKey] = useState(0);

+ const onExpandWrap = (keys: any[]) => {
+   setAbsoluteListUpdateKey((prev) => prev + 1);
+   onExpand?.(keys);
+ };

  const list = (
    <OptionList
      renderOptionList={renderOptionList}
      renderPending={renderTreePending}
+     onExpand={onExpandWrap}
+     updateKey={absoluteListUpdateKey}
    />
  );
```

### packages/hooks/src/components/use-popup.ts - 添加弹出层尺寸监听
```diff
+ useEffect(() => {
+   if (!open || !contentRef.current || !position) return;
+   const ro = new ResizeObserver(() => {
+     updatePos(targetRef.current);
+   });
+   ro.observe(contentRef.current);
+   return () => {
+     ro.disconnect();
+   };
+ }, [open, position, contentRef.current]);
```

### packages/base/src/select/select.type.ts - 扩展 position 类型
```diff
- position?: 'auto' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
+ position?: 
+   | 'auto' 
+   | 'top-left' 
+   | 'top-right' 
+   | 'bottom-left' 
+   | 'bottom-right'
+   | 'top-left-corner'
+   | 'top-right-corner'
+   | 'bottom-left-corner'
+   | 'bottom-right-corner'
+   | 'left-top'
+   | 'left-bottom'
+   | 'right-top'
+   | 'right-bottom';
```

### packages/shineout-style/src/tree/tree.ts - 移除多余样式
```diff
- '&::before': {
-   content: '""',
-   position: 'absolute',
-   width: 1,
-   [startName]: 15,
-   top: -7,
-   bottom: '50%',
-   borderInlineStart: '1px solid',
-   borderColor: token.colorBorder,
- },
```

## 变更前后逻辑差异

### 变更前
- 树形数据展开/收起时，弹出层位置固定不变
- 弹出层宽度不会根据展开后的内容自动调整
- 可能出现内容被遮挡或位置不合理的情况

### 变更后
- 树形数据展开/收起时，自动更新弹出层位置
- 通过 ResizeObserver 监听内容变化，实时调整位置和宽度
- 支持更多的弹出层位置选项

## 逻辑影响范围

1. **树形 Select**：主要影响使用 `treeData` 属性的 Select 组件
2. **位置自适应**：影响设置了 `absolute` 和 `autoAdapt` 属性的场景
3. **弹出层定位**：新增了更多位置选项，扩展了定位能力
4. **不受影响**：非树形数据的普通 Select、未设置 `absolute` 的场景

## 风险场景分析

### DOM 结构变更风险

1. **树形节点伪元素移除**：
   - 变更描述：移除了树形节点的 `::before` 伪元素（用于显示连接线）
   - 风险场景：依赖原有伪元素进行样式定制的场景
   - 风险示例：
   ```css
   /* 风险样式：依赖伪元素进行样式覆盖 */
   .so-tree-node::before {
     border-color: red !important;
   }
   ```
   - 规避方案：检查自定义样式，移除对该伪元素的依赖

### 行为逻辑变更风险

1. **弹出层位置更新频率增加**：
   - 变更描述：新增 ResizeObserver 监听，展开/收起时触发位置更新
   - 风险场景：依赖弹出层位置稳定性的场景（如截图、自动化测试）
   - 风险示例：
   ```tsx
   // 风险代码：假设弹出层位置固定不变
   const captureDropdown = async () => {
     await openSelect();
     // 之前：位置固定，可以立即截图
     // 现在：位置可能在调整中
     await takeScreenshot();
   };
   ```
   - 规避方案：在位置更新后添加适当延迟或等待动画结束

2. **展开回调函数包装**：
   - 变更描述：`onExpand` 回调被包装以触发位置更新
   - 风险场景：在 `onExpand` 中依赖同步执行顺序的场景
   - 风险示例：
   ```tsx
   // 风险代码：依赖 onExpand 的同步执行
   const handleExpand = (keys) => {
     // 之前：直接执行
     // 现在：先更新位置，再执行原回调
     immediateAction();
   };
   ```
   - 规避方案：确保回调函数不依赖严格的执行顺序

### 样式变更风险

- **无相关风险**：本次变更主要涉及逻辑调整，样式变更仅移除了未使用的伪元素

## 升级注意事项

### 代码兼容性

**无破坏性变更**

所有变更都是功能增强和修复，不会影响现有代码的正常运行。

### 行为变化说明

1. **树形数据展开时的位置调整**
   - **影响场景**：使用树形数据的 Select 组件
   - **具体表现**：之前展开节点后位置不变，现在会自动调整到最佳位置
   - **受影响代码示例**：
     ```tsx
     // 之前：展开节点后弹出层位置可能不合适
     // 现在：展开节点后弹出层位置自动调整
     <Select 
       treeData={treeData}
       absolute
       autoAdapt
     />
     ```
   - **是否需要调整**：无需调整，体验优化

2. **autoAdapt 属性生效**
   - **影响场景**：树形 Select 设置了 `autoAdapt` 属性
   - **具体表现**：之前展开节点后宽度不变，现在会根据内容自动调整宽度
   - **受影响代码示例**：
     ```tsx
     // 之前：展开长文本节点时宽度不变，可能显示不全
     // 现在：展开长文本节点时宽度自动适应
     <Select 
       treeData={treeData}
       autoAdapt
     />
     ```
   - **是否需要调整**：无需调整，功能修复

3. **新增位置选项**
   - **影响场景**：需要更精确控制弹出层位置的场景
   - **具体表现**：新增了 8 个角落和边缘位置选项
   - **受影响代码示例**：
     ```tsx
     // 之前：只支持 4 个基本位置
     // 现在：支持 12 个位置选项
     <Select position="left-top" />
     ```
   - **是否需要调整**：可选使用新位置选项