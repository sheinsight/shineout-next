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

### 升级影响分析

1. **特殊 URL 图片显示修复**：
   - 升级前：URL 包含特殊字符的图片完全无法显示（空白区域）
   - 升级后：所有合法 URL 的图片都能正常显示
   - 受影响场景：
     ```tsx
     // 以下代码在升级前图片不显示，升级后正常显示
     
     // URL 包含空格
     <Image fit="fit" src="https://example.com/image (1).jpg" />
     
     // URL 包含中文
     <Image fit="fit" src="https://example.com/产品图片.jpg" />
     
     // URL 包含括号、中括号等
     <Image fit="fit" src="https://example.com/[2024]/image.jpg" />
     ```
   - 行为变化：从完全不显示变为正常显示图片
   - 是否需要调整：不需要，纯粹的缺陷修复

2. **用户上传图片场景**：
   - 升级前：用户上传的文件名包含特殊字符时，预览失败
   - 升级后：支持各种文件名的图片预览
   - 受影响场景：
     - 文件上传组件的图片预览
     - 用户头像显示（文件名可能包含用户名）
     - 产品图片展示（可能包含型号、日期等特殊字符）
   - 是否需要调整：不需要，提升了用户体验

3. **CDN 或第三方图片服务**：
   - 升级前：某些 CDN 生成的 URL 包含查询参数或特殊字符时失效
   - 升级后：兼容各种 CDN 的 URL 格式
   - 受影响场景：
     ```tsx
     // 带查询参数的 CDN URL
     <Image fit="fit" src="https://cdn.example.com/img?size=large&name=产品 (1).jpg" />
     ```
   - 是否需要调整：不需要

4. **仅影响 fit="fit" 模式**：
   - 升级前后：其他 fit 模式（fill、center、stretch）不受影响
   - 原因：只有 fit="fit" 使用背景图方式渲染
   - 受影响场景：明确使用 `fit="fit"` 的图片组件
   - 是否需要调整：不需要，其他模式本身就正常工作