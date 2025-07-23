# Grid 组件 3.1.22 版本 Diff 报告

## 问题描述

修复 `Grid` 在微前端场景下样式丢失的缺陷。这是一个明确的 bug：在微前端环境中，由于原有的样式存在性检查机制，子应用中的 Grid 组件无法正确加载样式，导致布局完全失效。通过移除样式重复检查逻辑，确保每个应用实例都能独立加载所需样式。

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
- 如果找到相同 id 的样式标签，直接返回，不插入新样式
- 使用 `id` 属性标识样式标签，全局唯一

### 变更后
- 移除了样式存在性检查，每次调用都会创建新的样式标签
- 使用 `data-id` 属性代替 `id` 属性（避免 id 冲突）
- 允许在不同的应用实例中独立插入样式

## 逻辑影响范围
- 修复了微前端场景中子应用 Grid 样式丢失的问题
- 每个应用实例都能独立加载自己的 Grid 样式
- 不影响单应用场景的功能，仅增加了样式标签数量

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：仅涉及样式加载逻辑的优化，不影响组件 API

### 行为变化说明

1. **微前端子应用样式修复**：
   - 升级前：子应用的 Grid 组件样式完全丢失，布局失效
   - 升级后：子应用能正确加载 Grid 样式，布局恢复正常
   - 受影响场景：
     ```tsx
     // 微前端场景
     // 主应用
     <Grid gutter={16}>
       <Grid.Item span={12}>主应用内容</Grid.Item>
     </Grid>
     
     // 子应用（qiankun、micro-app等）
     <Grid gutter={16}>
       <Grid.Item span={8}>子应用内容</Grid.Item>
     </Grid>
     ```
   - 行为变化：子应用从完全无样式（内容堆叠）恢复为正常的网格布局
   - 是否需要调整：不需要，这是缺陷修复

2. **样式标签重复创建**：
   - 升级前：全局只有一个 Grid 样式标签，通过 id 检查避免重复
   - 升级后：每次初始化都会创建新的样式标签
   - 受影响场景：
     - 单页应用中多次创建/销毁包含 Grid 的组件
     - 微前端中多个应用使用 Grid
   - 行为变化：`<head>` 中出现多个相同的样式标签
   - 是否需要调整：不需要，浏览器会自动处理重复样式

3. **开发环境影响**：
   - 升级前：热更新时样式不会重复插入
   - 升级后：每次热更新可能增加样式标签
   - 受影响场景：开发环境频繁修改代码
   - 行为变化：开发时 DOM 中样式标签数量累积
   - 是否需要调整：不需要，刷新页面即可清理

4. **样式标签属性变化**：
   - 升级前：使用 `id="shineout-grid-style"`
   - 升级后：使用 `data-id="shineout-grid-style"`
   - 受影响场景：依赖样式标签 id 的自定义脚本
   - 是否需要调整：如有相关脚本需要更新选择器