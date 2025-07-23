# Grid 组件 3.1.22 版本 Diff 报告

## 问题描述

优化 `Grid` 动态插入样式的逻辑来适配微前端场景。在微前端环境中，原有的样式检查机制可能导致样式丢失，需要确保每个应用实例都能正确加载样式。

## 代码变更文件

`packages/base/src/grid/util.ts`

## 变更代码行

```diff
const createStyle = () => {
-  let styleTag = document.getElementById(id) as HTMLStyleElement;
-  if (styleTag) return;
-  styleTag = document.createElement('style');
-  styleTag.id = id;
+  const styleTag = document.createElement('style');
+  styleTag.setAttribute('data-id', id);
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
};
```

## 变更前后逻辑差异

### 变更前
- 通过 `document.getElementById(id)` 检查样式是否已存在
- 如果样式标签已存在，直接返回，不重复插入
- 使用 `id` 属性标识样式标签

### 变更后
- 移除了样式存在性检查，每次调用都会创建新的样式标签
- 使用 `setAttribute('data-id', id)` 代替 `id` 属性
- 允许在不同的应用实例中重复插入样式

## 逻辑影响范围
- 适配了微前端场景中的样式隔离需求
- 解决了子应用中 Grid 样式可能丢失的问题
- 不影响单应用场景的正常使用

## 风险使用场景

### 代码执行风险
- 无直接的代码执行风险

### 交互体验差异
1. **样式标签重复**：
   - 影响场景：多次创建 Grid 组件实例
   - 具体表现：`<head>` 中会出现多个相同的样式标签
   - 性能影响：轻微增加 DOM 节点数量，但不影响渲染性能

2. **微前端兼容性提升**：
   - 影响场景：在 qiankun、micro-app 等微前端框架中使用
   - 具体表现：子应用的 Grid 组件样式能正确加载
   - 正面影响：解决了样式丢失问题