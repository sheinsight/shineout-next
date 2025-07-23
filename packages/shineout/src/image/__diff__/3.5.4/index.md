# Image 组件 3.5.4 版本 Diff 报告

## 问题描述

修复 `Image` 在 `fit` 属性为 fill 或 fit 时，图片可能无法加载的问题。当图片 URL 中包含特殊字符时，CSS 的 `backgroundImage` 属性解析失败导致图片无法显示。

## 代码变更文件

`packages/base/src/image/image.tsx`

## 变更代码行

```diff
// 第 120 行
-const imageDivProps = getImageDivProps({ style: { backgroundImage: `url(${src})` } });
+const imageDivProps = getImageDivProps({ style: { backgroundImage: `url("${src}")` } });
```

## 变更前后逻辑差异

### 变更前
- 使用 `url(${src})` 格式设置背景图片
- 当 URL 中包含空格、括号等特殊字符时，CSS 解析失败
- 导致图片无法加载

### 变更后
- 使用 `url("${src}")` 格式，URL 被双引号包裹
- 即使 URL 中包含特殊字符，CSS 也能正确解析
- 确保图片能正常加载

## 逻辑影响范围
- 仅影响 `fit` 属性为 `fit` 的场景（使用 div + backgroundImage 渲染）
- 不影响其他 fit 模式（使用 img 标签渲染）
- 修复了特殊 URL 的兼容性问题

## 风险使用场景

### 代码执行风险
- 无破坏性变更，仅修复了 CSS 语法问题

### 交互体验差异
1. **图片加载恢复正常**：
   - 影响场景：使用包含特殊字符的图片 URL，且 `fit="fit"`
   - 具体表现：原本无法显示的图片现在能正常加载
   - 受影响代码示例：
   ```tsx
   // URL 中包含空格
   <Image fit="fit" src="https://example.com/image (1).jpg" />
   
   // URL 中包含特殊字符
   <Image fit="fit" src="https://example.com/[image].jpg" />
   ```