# Carousel 组件 3.6.0-beta.1 版本 Diff 报告

## 问题描述
`Carousel` 的 `indicatorType` 新增一种类型：bar（原 slider 类型重命名为 bar）

## 代码变更文件
- `packages/base/src/carousel/carousel.tsx`
- `packages/base/src/carousel/carousel.type.ts`
- `packages/shineout-style/src/carousel/carousel.ts`
- `packages/theme/src/carousel/carousel.ts`
- `packages/theme/src/carousel/token.ts`
- `packages/theme/src/carousel/type.ts`

## 变更代码行
```diff
// carousel.type.ts
export interface CarouselClasses {
  // ...
-  indicatorTypeSlider?: string;
+  indicatorTypeBar?: string;
  // ...
}

export interface CarouselProps {
  /**
   * @en indicator type
   * @cn 指示器类型
   * @default 'circle'
   */
  indicatorType?:
    | 'circle'
    | 'number'
    | 'line'
-   | 'slider';
+   | 'bar';
}

// carousel.ts (样式文件)
- indicatorTypeSlider: {
+ indicatorTypeBar: {
    // 新增 bar 类型的样式
    position: 'relative',
    width: '30px',
    height: '3px',
    backgroundColor: token.carouselIndicatorBarBackgroundColor,
    // ...
  }
```

## 变更前后逻辑差异
- **变更前**：indicatorType 支持 'circle'、'number'、'line'、'slider' 四种类型
- **变更后**：将 'slider' 类型重命名为 'bar'，功能保持不变，但名称更加语义化

## 逻辑影响范围
- 影响使用 `indicatorType='slider'` 的现有代码
- 新代码需要使用 `indicatorType='bar'` 来实现条形指示器
- 样式类名从 `indicatorTypeSlider` 变更为 `indicatorTypeBar`

## 升级注意事项

### 代码兼容性
- 使用 `indicatorType='slider'` 的代码将无法正常工作，需要改为 `indicatorType='bar'`

### 行为变化说明
- 功能保持不变，仅是属性值名称变更