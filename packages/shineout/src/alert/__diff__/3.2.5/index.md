# Alert 组件 3.2.5 版本 Diff 报告

## 问题描述
修复 Steps Alert 在 Safari 下样式异常的问题

## 代码变更文件
`packages/shineout-style/src/alert/alert.ts`

## 变更代码行
```diff
// close 样式部分
close: {
+ '& svg': {
+   width: '100%',
+ },
},

// icon 样式部分
icon: {
+ '& svg': {
+   width: '100%',
+ },
},
```

## 变更前后逻辑差异
- **变更前**：SVG 图标没有明确宽度，在 Safari 中可能出现尺寸异常
- **变更后**：为 close 和 icon 内的 SVG 元素添加 `width: 100%`，使其继承父容器宽度

## 逻辑影响范围
- Safari 浏览器下 Alert 的关闭按钮和状态图标正常显示
- 其他浏览器保持原有表现
- 只影响 Alert 组件内部的 SVG，不影响全局样式

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：仅修复 Safari 浏览器下的样式兼容性问题

### 行为变化说明
1. **Safari 浏览器图标显示修复**：
   - 升级前：Safari 中 Alert 的关闭按钮和状态图标可能显示异常（尺寸不正确）
   - 升级后：所有浏览器中图标显示一致
   - 受影响场景：使用 Safari 浏览器访问包含 Alert 组件的页面
   - 是否需要调整：不需要，这是兼容性修复

2. **自定义 SVG 图标尺寸**：
   - 升级前：自定义 SVG 图标保持原始尺寸
   - 升级后：SVG 宽度被设置为 100%，继承父容器宽度
   - 受影响场景：
     - 使用自定义 SVG 作为 Alert 图标
     - SVG 有特定宽高比要求
   - 示例代码：
     ```tsx
     <Alert 
       icon={<svg viewBox="0 0 100 50">...</svg>}
     >
       内容
     </Alert>
     ```
   - 是否需要调整：如果自定义图标出现拉伸，需要调整 SVG 的 viewBox 或包裹元素