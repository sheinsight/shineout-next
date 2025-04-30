## 3.6.5-beta.2
2025-04-25

### 💎 Enhancement

- 优化 `Image` 的`fill`实现方式，改善大图片在Chrome浏览器下的性能 ([#1080](https://github.com/sheinsight/shineout-next/pull/1080))


## 3.6.0
2025-03-12

### 🆕 Feature

- `Image` 新增 `renderHoverMask` 属性，支持自定义渲染鼠标移入组件时的遮罩层内容 ([#993](https://github.com/sheinsight/shineout-next/pull/993))

### 🐞 BugFix

- 修复 `Image` 在容器为 'absolute' 定位情况下 `lazy` 属性可能失效的问题 ([#982](https://github.com/sheinsight/shineout-next/pull/982))

## 3.5.8
2025-02-13

### 🐞 BugFix

- 修复 `Image` 在预览大图时的鼠标手势不正确问题 ([#938](https://github.com/sheinsight/shineout-next/pull/938))

## 3.5.4
2024-12-12

### 🐞 BugFix

- 修复 `Image` 在 `fit` 属性为 fill 或 fit 时，图片可能无法加载的问题 ([#847](https://github.com/sheinsight/shineout-next/pull/847))

## 3.5.2
2024-10-28

### 🐞 BugFix

- 修复 `Image` 组件开启 `lazy` 后在 fixed 定位容器下检查交叉异常的问题 ([#820](https://github.com/sheinsight/shineout-next/pull/820))

## 3.4.5
2024-10-31

### 🆕 Feature

- `Image` 新增`inViewOnly`: 仅当图片在视口内时才加载图片，需配合 `lazy` 使用 ([#767](https://github.com/sheinsight/shineout-next/pull/767))


## 3.4.4
2024-10-23

### 🐞 BugFix

- 修复 `Image`  组件实际渲染的高度比设置的height高2像素的问题 ([#744](https://github.com/sheinsight/shineout-next/pull/744))



## 3.4.3
2024-10-14

### 🐞 BugFix

- 修复 `Image`  组件动态 src 场景下组件状态异常的问题 ([#709](https://github.com/sheinsight/shineout-next/pull/709))
- 修复 `Image` 组件默认值错误的问题 ([#708](https://github.com/sheinsight/shineout-next/pull/708))

