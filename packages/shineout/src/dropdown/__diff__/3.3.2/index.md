# Dropdown 组件 3.3.2 版本 Diff 报告

## 问题描述

修复 `Dropdown` 不传 placeholder 时，图标不水平居中的问题。当 Dropdown 组件不传 placeholder 属性时，不再渲染 `soui-dropdown-content` 的 DOM 结构，同时调整了箭头图标的 margin 样式实现方式。

## 代码变更文件

1. `packages/base/src/dropdown/dropdownIn.tsx`
2. `packages/shineout-style/src/dropdown/dropdown.ts`
3. `packages/shineout/src/dropdown/__example__/t-002-no-placeholder.tsx`

## 变更代码行

### 1. packages/base/src/dropdown/dropdownIn.tsx
```diff
// 第83-87行：条件渲染 content
-const child = [
-  <span key='text' className={dropdownClasses?.content}>
-    {placeholder}
-  </span>,
-];
+const child = placeholder ? [
+  <span key='text' className={dropdownClasses?.content}>
+    {placeholder}
+  </span>,
+] : [];
```

### 2. packages/shineout-style/src/dropdown/dropdown.ts
```diff
caret: {
  // ... 其他样式
- marginLeft: token.dropdownCaretMarginLeft,
+ // marginLeft: token.dropdownCaretMarginLeft,
},

content: {
  flex: '1',
  minWidth: '0',
+ '& + $caret': {
+   marginLeft: token.dropdownCaretMarginLeft,
+ },
},
```

### 3. packages/shineout/src/dropdown/__example__/t-002-no-placeholder.tsx
```diff
+/**
+ * cn - no-placeholder
+ *    -- no-placeholder
+ * en - no-placeholder
+ *   -- no-placeholder
+ */
+import React from 'react';
+import { Dropdown, TYPE } from 'shineout';
+
+type DropdownItem = TYPE.Dropdown.Item;
+const data: DropdownItem[] = [
+  {
+    content: 'Submenu',
+    children: [
+      {
+        content: 'Link to Google',
+        target: '_blank',
+        url: 'https://google.com',
+      },
+      {
+        content: 'Disabled',
+        disabled: true,
+      },
+    ],
+  },
+  <a key={'link'} href='/'>
+    Home
+  </a>,
+  {
+    content: 'Message',
+    onClick: () => {
+      console.info('Some message.');
+    },
+  },
+];
+
+const App: React.FC = () => {
+  return (
+    <>
+      <Dropdown data={data} onClick={console.log} />
+      <Dropdown data={data} disabled />
+    </>
+  );
+};
+
+export default App;
```

## 变更前后逻辑差异

### 变更前
- 无论是否传入 placeholder，都会渲染 `soui-dropdown-content` 元素
- 箭头图标（caret）始终有左边距，导致不传 placeholder 时图标偏右
- DOM 结构：始终包含 content 元素和 caret 元素

### 变更后
- 只有传入 placeholder 时才渲染 `soui-dropdown-content` 元素
- 箭头图标的左边距通过相邻兄弟选择器 `content + caret` 实现，只在有 content 时生效
- DOM 结构：无 placeholder 时只有 caret 元素，有 placeholder 时包含 content 和 caret

## 逻辑影响范围
- DOM 结构优化：不传 placeholder 时不渲染 content 元素
- 样式计算优化：通过 CSS 相邻选择器实现条件样式
- 修复了箭头图标在没有 placeholder 时的居中问题

## 升级注意事项

### 代码兼容性
1. **无破坏性变更**：优化了 DOM 结构和样式，不影响组件功能

### 行为变化说明
1. **DOM 结构变化**：
   - 影响场景：通过 CSS 选择器或 JavaScript 直接操作 `.soui-dropdown-content` 元素
   - 具体表现：不传 placeholder 时该元素不存在
   - 受影响代码示例：
   ```css
   /* 这种选择器在无 placeholder 时会失效 */
   .soui-dropdown-content { custom-styles }
   ```

2. **样式选择器依赖**：
   - 影响场景：自定义样式依赖原有的 DOM 结构
   - 具体表现：需要更新选择器以适应新的结构
   - 受影响代码示例：
   ```css
   /* 原有样式可能需要调整 */
   .dropdown-wrapper > button > .soui-dropdown-content
   ```

3. **视觉改进**：
   - 影响场景：所有不传 placeholder 的 Dropdown 组件
   - 具体表现：箭头图标从偏右变为居中
   - 正面影响：提升了视觉一致性和美观度