# Dropdown 组件 3.3.3 版本 Diff 报告

## 问题描述

修复 `Dropdown` 的 `data` 的 content 传了 onClick 时，点击后弹出层不消失的问题。当用户在 data 项的 content 中传入带有 onClick 的 React 元素时，点击该元素后下拉菜单不会自动关闭。

## 代码变更文件

1. `packages/base/src/dropdown/Item.tsx`
2. `packages/shineout/src/dropdown/__doc__/changelog.cn.md`

## 变更代码行

### 1. packages/base/src/dropdown/Item.tsx
```diff
// 第70行：解构 content.props 时新增提取 onClick
-const { className: contentPropsClassName = '', ...otherContentProps } =
+const { className: contentPropsClassName = '', onClick: contentPropsOnClick, ...otherContentProps } =
  content.props as Props;

// 第79-82行：新增 onClick 合并逻辑
return React.cloneElement(
  content,
  Object.assign(otherProps, otherContentProps, {
    className,
+   onClick: (e: React.MouseEvent) => {
+     if (contentPropsOnClick) contentPropsOnClick(e);
+     if (props.onClick) props.onClick(e);
+   }
  }),
);
```

## 变更前后逻辑差异

### 变更前
- 当 content 是 React 元素且带有 onClick 时，原有的 onClick 会被 Item 组件的 props 覆盖
- 导致 content 元素的 onClick 失效，同时 Item 的默认关闭行为也不会触发
- 点击带有 onClick 的 content 元素后，下拉菜单保持打开状态

### 变更后
- 从 content.props 中单独提取 onClick 属性
- 创建新的 onClick 处理函数，依次执行 content 的 onClick 和 Item 的 onClick
- 保证了 content 元素的自定义点击事件和下拉菜单的关闭行为都能正常执行

## 逻辑影响范围
- 修复了 content 元素带 onClick 时的事件处理逻辑
- 事件执行顺序：先执行 content 的 onClick，再执行 Item 的 onClick
- 不影响没有在 content 中设置 onClick 的场景

## 升级注意事项

### 代码兼容性
1. **无破坏性变更**：修复了原有的 bug，不会影响正常使用场景

### 行为变化说明
1. **行为变化**：
   - 影响场景：在 data 的 content 中传入带有 onClick 的 React 元素
   - 具体表现：点击后下拉菜单会自动关闭（之前不会关闭）
   - 受影响代码示例：
   ```tsx
   const data = [{
     content: <Button onClick={() => console.log('clicked')}>Action</Button>,
     key: '1'
   }]
   <Dropdown data={data} />
   ```

2. **事件执行顺序**：
   - 影响场景：content 和 Item 都有 onClick 处理函数
   - 具体表现：content 的 onClick 先执行，Item 的 onClick 后执行
   - 可能的影响：如果 content 的 onClick 中有异步操作或状态更新，可能会在下拉菜单关闭前执行

3. **阻止事件传播**：
   - 影响场景：content 的 onClick 中调用 `e.stopPropagation()`
   - 具体表现：不会阻止 Item 的 onClick 执行，下拉菜单仍会关闭
   - 注意事项：如果需要阻止下拉菜单关闭，需要在 content 的 onClick 中调用 `e.preventDefault()`