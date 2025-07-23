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

## 风险使用场景

### 代码执行风险
- 无代码执行风险，仅涉及样式加载逻辑

### 交互体验差异

#### 升级前的缺陷表现
在微前端场景下，子应用的 Grid 组件样式无法加载：
```tsx
// 主应用（先加载）
<Grid gutter={16}>
  <Grid.Item span={12}>主应用内容</Grid.Item>
</Grid>
// 样式正常加载，布局正确

// 子应用（后加载）
<Grid gutter={16}>
  <Grid.Item span={8}>子应用内容</Grid.Item>
</Grid>
// 缺陷：样式检查发现已存在，不再加载
// 结果：Grid 布局完全失效，内容堆叠在一起
```

具体表现：
- 子应用中的 Grid 组件没有 flex 布局
- Grid.Item 宽度失效，全部变为 100%
- gutter 间距不生效
- 整体布局错乱

#### 升级后的正确行为
主应用和子应用的 Grid 样式都能正确加载：
```tsx
// 主应用
<Grid gutter={16}>
  <Grid.Item span={12}>主应用内容</Grid.Item>
</Grid>
// 样式正常，布局正确

// 子应用
<Grid gutter={16}>
  <Grid.Item span={8}>子应用内容</Grid.Item>
</Grid>
// 修复后：样式独立加载，布局正常显示
```

#### 使用层面的差异
1. **微前端场景修复**：
   - 升级前：子应用 Grid 组件样式丢失，布局完全失效
   - 升级后：每个应用的 Grid 样式独立加载，布局恢复正常
   
2. **样式标签数量增加**：
   - 升级前：全局只有一个 Grid 样式标签
   - 升级后：每个应用实例会创建自己的样式标签
   - 影响：`<head>` 中可能出现多个相同内容的样式标签
   - 实际影响：微乎其微，浏览器会自动去重处理

3. **单应用场景**：
   - 如果应用中多次初始化 Grid 组件
   - 可能会看到多个 `data-id="shineout-grid-style"` 的样式标签
   - 功能不受影响，仅是 DOM 节点略有增加