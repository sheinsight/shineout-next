# Select 组件 3.7.0 版本 Diff 报告

## 问题描述

`Select` 组件新增两个重要功能。第一，新增 `highlight` 属性，支持在搜索时高亮显示匹配的关键字，提升用户在大量选项中快速定位目标的体验。第二，新增 `renderCompressed` 属性，允许开发者自定义合并选项的渲染内容，提供更灵活的多选展示方式。

## 代码变更文件

1. `packages/base/src/select/select.type.ts`
2. `packages/base/src/select/select.tsx`
3. `packages/base/src/select/list-option.tsx`
4. `packages/base/src/select/list.tsx`
5. `packages/base/src/tree-select/tree-select.type.ts`
6. `packages/base/src/tree-select/tree-select.tsx`
7. `packages/hooks/src/utils/highlight.tsx`
8. `packages/hooks/src/common/use-filter/use-filter-context.ts`
9. `packages/shineout-style/src/common/common.ts`
10. `packages/shineout/src/select/select.tsx`

## 变更代码行

### packages/base/src/select/select.type.ts - 新增属性类型定义

```diff
 export type JssStyleType = {
   select?: () => SelectClasses;
   tree?: () => TreeClasses;
   spin?: () => SpinClasses;
   input?: () => InputClasses;
+  common?: () => CommonClasses;
 };

 export interface BaseListProps<DataItem, Value>
   extends Pick<
     SelectPropsBase<DataItem, Value>,
     | 'columnsTitle'
     | 'hideCreateOption'
     | 'onLoadMore'
+    | 'highlight'
   > {

 export interface SelectPropsBase<DataItem, Value>
   extends CommonType,
+  /**
+   * @cn 是否开启高亮功能
+   * @en Whether to enable highlight feature
+   * @version 3.7.0
+   */
+  highlight?: boolean;
```

### packages/base/src/select/select.tsx - 集成 highlight 功能

```diff
 function Select<DataItem, Value>(props0: SelectPropsBase<DataItem, Value>) {
   const {
     filterSameChange,
     noCache,
+    highlight,
     trigger = 'click',
   } = props;

   const {
     onCreate,
     onClearCreatedData,
     rawData,
+    FilterProvider,
   } = useFilter({

   const listProps: BaseListProps<DataItem, Value> = {
     closePop,
     optionListRef,
     onOptionClick: handleOptionClick,
+    highlight,
   };

   return (
+    <FilterProvider value={{ filterText }}>
     <div
       ref={targetRef}
       tabIndex={disabled === true || showInput ? undefined : 0}
       // ... 其他属性
     >
       {/* 组件内容 */}
     </div>
+    </FilterProvider>
   );
```

### packages/base/src/select/list-option.tsx - 实现高亮渲染

```diff
 import { ListOptionProps } from './list-option.type';
+import { highlight as highlightUtil } from '@sheinx/hooks';
+import { useFilterContext } from '@sheinx/hooks';

 const ListOption = <DataItem, Value>(props: ListOptionProps<DataItem, Value>) => {
+  const filterContext = useFilterContext();
+  const highlightText = filterContext?.filterText;
   
   const renderContent = () => {
     const content = renderItem(data, index);
+    if (highlight && highlightText && typeof content === 'string') {
+      return highlightUtil(content, highlightText, {
+        highlightClassName: jssStyle?.common?.()?.highlight,
+      });
+    }
     return content;
   };
```

### packages/base/src/select/select.tsx - 支持 renderCompressed

```diff
 function Select<DataItem, Value>(props0: SelectPropsBase<DataItem, Value>) {
   const {
     compressed,
     compressedBound,
     compressedClassName,
+    renderCompressed,
     placeholder,
   } = props;

   <Result
     reFocus={reFocus}
     convertBr={convertBr}
     compressed={compressed}
+    renderCompressed={renderCompressed}
     compressedBound={compressedBound}
     compressedClassName={compressedClassName}
     multiple={multiple}
```

### packages/base/src/tree-select/tree-select.type.ts - renderCompressed 类型定义

```diff
+export interface RenderCompressedOption<DataItem> {
+  /**
+   * @en The current selected data
+   * @cn 当前选中的数据
+   */
+  data: DataItem[];
+  /**
+   * @en Method to remove the option
+   * @cn 删除选项的方法
+   */
+  onRemove: (item: DataItem) => void;
+}

 export interface TreeSelectProps<DataItem, Value>
   extends Pick<
+  /**
+   * @en Custom render compressed content
+   * @cn 自定义渲染折叠内容，其中 data 为选中的数据，onRemove 为删除事件
+   * @version 3.7.0
+   */
+  renderCompressed?: (options: RenderCompressedOption<DataItem>) => React.ReactNode;
```

### packages/hooks/src/utils/highlight.tsx - 高亮工具函数

```diff
+import React from 'react';
+import { escapeRegExp } from './string';
+
+export const highlight = (
+  content: string,
+  keyword: string,
+  options?: { highlightClassName?: string }
+) => {
+  if (!keyword) return content;
+  
+  const escapedKeyword = escapeRegExp(keyword);
+  const regex = new RegExp(`(${escapedKeyword})`, 'gi');
+  const parts = content.split(regex);
+  
+  return parts.map((part, index) => {
+    if (part.toLowerCase() === keyword.toLowerCase()) {
+      return (
+        <span key={index} className={options?.highlightClassName}>
+          {part}
+        </span>
+      );
+    }
+    return part;
+  });
+};
```

### packages/shineout-style/src/common/common.ts - 高亮样式

```diff
+export const commonStyle: JsStyles<CommonClassType> = {
+  highlight: {
+    color: token.dangerColor,
+    backgroundColor: 'transparent',
+  },
+};
```

## 变更前后逻辑差异

### 变更前
- 搜索时无法区分匹配和非匹配内容
- 多选合并显示方式固定，无法自定义
- 搜索功能仅过滤选项，不提供视觉反馈

### 变更后
- 搜索时匹配的关键字以红色高亮显示
- 可通过 `renderCompressed` 完全自定义合并内容的展示
- 通过 `FilterProvider` 实现组件内部的搜索状态共享

## 逻辑影响范围

- 影响搜索过滤时的选项显示
- 影响多选模式下的合并内容展示
- 新增对搜索关键字的视觉反馈
- 不影响选项的选择逻辑
- 不影响数据过滤逻辑

## 风险场景分析

### DOM 结构变更风险

**风险场景**：依赖选项文本为纯文本节点的代码
```javascript
// 可能失效的代码（开启 highlight 后）
const optionText = optionElement.textContent; // 可能包含 <span> 标签
```
**规避方案**：使用 `innerText` 或处理嵌套的 DOM 结构

### 行为逻辑变更风险

无相关风险

### 样式变更风险

**风险场景**：自定义了选项文本颜色的项目
```css
/* 可能与高亮样式冲突 */
.soui-select-option {
  color: blue !important;
}
/* 高亮部分使用 .soui-common-highlight 类 */
.soui-select-option .soui-common-highlight {
  color: red; /* 默认高亮颜色 */
}
```
**规避方案**：调整选择器优先级或通过覆盖 `.soui-common-highlight` 自定义高亮样式

## 升级注意事项

### 代码兼容性

**无破坏性变更** - 该版本仅新增功能，完全向后兼容

### 行为变化说明

**1. 搜索高亮功能**
- **影响场景**：开启 `highlight` 属性并使用搜索功能
- **具体表现**：搜索关键字在选项中以红色高亮显示
- **受影响代码示例**：
  ```tsx
  // 之前：搜索 "admin" 时只过滤选项
  // 现在：搜索 "admin" 时，选项中的 "admin" 文字高亮显示
  <Select 
    data={['admin', 'administrator', 'user']} 
    onFilter={handleFilter}
    highlight 
  />
  ```
- **是否需要调整**：不需要，这是可选功能

**2. 自定义合并渲染**
- **影响场景**：多选模式下需要自定义合并内容展示
- **具体表现**：可完全控制合并内容的渲染方式
- **受影响代码示例**：
  ```tsx
  // 新功能：自定义合并内容
  <Select 
    multiple 
    compressed
    renderCompressed={({ data, onRemove }) => (
      <div>
        已选择 {data.length} 项
        <button onClick={() => onRemove(data[0])}>删除第一项</button>
      </div>
    )}
  />
  ```
- **是否需要调整**：不需要，这是新增的可选功能