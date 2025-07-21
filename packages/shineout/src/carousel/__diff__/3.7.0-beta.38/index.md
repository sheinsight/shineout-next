# Carousel 组件 3.7.0-beta.38 版本 Diff 报告

## 问题描述
修复 `Carousel` 自定义指示器时，轮播数量为1条时不渲染的问题

## 代码变更文件
`packages/base/src/carousel/carousel.tsx`

## 变更代码行
```diff
// 在 renderIndicator 方法中
- if (total <= 1 || showIndicator === false) return null;
+ if ((total <= 1 && typeof indicatorType !== 'function') || showIndicator === false) return null;
```

## 变更前后逻辑差异
- **变更前**：只要轮播数量为1条，无论是否使用自定义指示器都不渲染
- **变更后**：使用自定义指示器（indicatorType 为函数）时，即使只有1条数据也会渲染指示器

## 逻辑影响范围
- 只影响使用自定义指示器函数且轮播数量为1的场景
- 默认指示器行为保持不变（1条时不显示）
- 不影响多条数据的轮播

## 风险使用场景

### 代码执行风险
- 自定义指示器函数未处理单条数据情况可能导致运行时错误

### 交互体验差异
- 业务逻辑依赖单条数据不显示指示器的行为，现在使用自定义指示器时会显示