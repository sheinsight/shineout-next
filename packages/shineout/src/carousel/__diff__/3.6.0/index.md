# Carousel 组件 3.6.0 版本 Diff 报告

## 问题描述
`Carousel` 的 `indicatorType` 新增一种类型：bar

## 代码变更文件
1. `packages/base/src/carousel/carousel.type.ts`
2. `packages/shineout-style/src/carousel/carousel.ts`
3. `packages/theme/src/carousel/` (主题配置)

## 变更代码行
```diff
// carousel.type.ts
- export type CarouselIndicatorType = 'dot' | 'line' | 'slider' | ((current: number, total: number) => ReactNode);
+ export type CarouselIndicatorType = 'dot' | 'line' | 'bar' | ((current: number, total: number) => ReactNode);

// carousel.ts (样式)
+ indicatorTypeBar: {
+   position: 'relative',
+   borderRadius: token.carouselIndicatorBarBorderRadius,
+   '&::before': {
+     content: '""',
+     position: 'absolute',
+     backgroundColor: token.carouselIndicatorBarBackground,
+     borderRadius: token.carouselIndicatorBarBorderRadius,
+   },
+   '&[data-indicator-position="left"], &[data-indicator-position="right"]': {
+     width: token.carouselIndicatorBarWidth,
+     height: token.carouselIndicatorBarHeight,
+   },
+ },
```

## 变更前后逻辑差异
- **变更前**：indicatorType 支持 'dot'、'line'、'slider' 三种类型
- **变更后**：新增 'bar' 类型，将原有的 'slider' 类型重命名为 'bar'

## 逻辑影响范围
- 新增 bar 类型的指示器样式，具有圆角矩形外观
- 支持水平和垂直方向的不同样式表现
- 使用伪元素实现背景效果

## 风险使用场景

### 代码执行风险
- 使用 'slider' 类型的代码会报错，需要改为 'bar'
- 自定义主题缺少 bar 相关变量可能导致样式异常

### 交互体验差异
- bar 类型指示器的视觉效果与原 slider 类型可能不同