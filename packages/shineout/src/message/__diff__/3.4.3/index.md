# Message 组件 3.4.3 版本 Diff 报告

## 问题描述

修复 `Message` 样式生成异常的问题。Message 组件在响应式媒体查询的 JSS 样式定义中存在语法错误，导致样式无法正确生成，影响了小屏幕设备上的显示效果。

## 代码变更文件

1. `packages/shineout-style/src/message/message.ts`

## 变更代码行

### packages/shineout-style/src/message/message.ts - 修正媒体查询语法
```diff
const messageStyle: JsStyles<MessageClassType> = {
  wrapper: {
    position: 'fixed',
    zIndex: 1060,
    maxWidth: '50%',
-   '@media screen and (max-width: 992px) &': {
-     'max-width': 'none',
+   '@media screen and (max-width: 992px)': {
+     '&': {
+       maxWidth: 'none',
+     },
    },
    margin: 'auto',
  },
};
```

## 变更前后逻辑差异

### 变更前
- 使用了错误的 JSS 语法 `@media ... &`
- 属性名使用了带连字符的形式 `'max-width'`
- 样式可能无法正确应用到元素上

### 变更后
- 正确嵌套媒体查询和选择器
- 使用驼峰命名的属性 `maxWidth`
- 符合 JSS 的语法规范

## 逻辑影响范围
- 修复了响应式布局的样式生成
- 确保小屏幕设备上 Message 宽度正确显示
- 不影响功能逻辑

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：纯样式语法修复

### 行为变化说明

1. **响应式显示恢复正常**：
   - 影响场景：屏幕宽度小于 992px 的设备
   - 具体表现：Message 组件宽度不再受 50% 限制
   - 视觉效果示例：
   ```tsx
   // 小屏幕设备上的表现
   // 之前：可能保持 50% 宽度，导致内容被截断
   // 现在：自适应宽度，完整显示内容
   Message.show('这是一条较长的提示消息，在小屏幕上应该完整显示');
   ```
   - 是否需要调整：不需要，恢复了预期行为

2. **大屏幕不受影响**：
   - 宽度大于 992px 的设备继续保持最大 50% 宽度
   - 视觉效果与之前一致