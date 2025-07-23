# Image 组件 3.5.4 版本 Diff 报告

## 问题描述

修复 `Image` 在 `fit` 属性为 fill 或 fit 时图片无法加载的缺陷。这是一个明确的 bug：当图片 URL 中包含特殊字符（如空格、括号、中文等）时，由于 CSS `backgroundImage` 属性值未正确转义，导致样式解析失败，图片完全无法显示。

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
- 使用 `url(${src})` 格式设置背景图片，URL 未加引号
- 当 URL 包含空格、括号、中文等特殊字符时，CSS 解析失败
- 导致 `backgroundImage` 属性无效，图片无法显示

### 变更后
- 使用 `url("${src}")` 格式，URL 被双引号包裹
- 符合 CSS 规范，即使 URL 包含特殊字符也能正确解析
- 确保所有合法的图片 URL 都能正常加载

## 逻辑影响范围
- 仅影响 `fit` 属性为 `fit` 的场景（使用 div + backgroundImage 渲染）
- 不影响其他 fit 模式（fill、center、stretch 等使用 img 标签渲染）
- 修复了特殊 URL 的 CSS 兼容性问题

## 风险使用场景

### 代码执行风险
- 无破坏性变更，仅修复了 CSS 语法错误

### 交互体验差异

#### 升级前的缺陷表现
当图片 URL 包含特殊字符且使用 `fit="fit"` 时，图片完全无法显示：
```tsx
// 缺陷：以下场景图片都无法加载

// URL 包含空格
<Image fit="fit" src="https://example.com/image (1).jpg" />
// CSS 生成：background-image: url(https://example.com/image (1).jpg)
// 结果：CSS 解析错误，图片不显示

// URL 包含中文
<Image fit="fit" src="https://example.com/图片.jpg" />
// 结果：图片不显示

// URL 包含特殊字符
<Image fit="fit" src="https://example.com/[image].jpg" />
// 结果：图片不显示
```

具体表现：
- 图片区域完全空白
- 浏览器控制台可能显示 CSS 解析警告
- 仅占位符显示，实际图片无法加载

#### 升级后的正确行为
所有合法的图片 URL 都能正常加载：
```tsx
// 修复后：所有场景图片都能正常显示

// URL 包含空格
<Image fit="fit" src="https://example.com/image (1).jpg" />
// CSS 生成：background-image: url("https://example.com/image (1).jpg")
// 结果：图片正常显示

// URL 包含中文
<Image fit="fit" src="https://example.com/图片.jpg" />
// 结果：图片正常显示

// URL 包含特殊字符
<Image fit="fit" src="https://example.com/[image].jpg" />
// 结果：图片正常显示
```

#### 使用层面的差异
1. **图片显示恢复正常**：
   - 升级前：特殊 URL 的图片无法显示，用户看到空白区域
   - 升级后：所有合法 URL 的图片都能正常加载和显示
   
2. **受影响的具体场景**：
   - 仅影响使用 `fit="fit"` 属性的 Image 组件
   - 且图片 URL 包含空格、括号、中括号、中文等特殊字符
   - 其他 fit 模式不受影响（因为使用 img 标签而非背景图）

3. **无需代码修改**：
   - 这是一个纯粹的 bug 修复
   - 用户无需修改任何代码
   - 原本不显示的图片会自动恢复显示