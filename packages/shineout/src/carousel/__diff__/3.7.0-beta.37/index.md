# Carousel 组件 3.7.0-beta.37 版本 Diff 报告

## 问题描述
`Carousel` 新增 `itemClassName` 属性支持设置轮播项 className，新增 `showIndicator` 属性支持隐藏指示器

## 代码变更文件
- `packages/base/src/carousel/carousel.tsx`
- `packages/base/src/carousel/carousel.type.ts`

## 变更代码行
```diff
// carousel.type.ts
export interface CarouselProps {
+ /**
+  * @en Whether to show the indicator
+  * @cn 是否显示指示器
+  * @default true
+  */
+ showIndicator?: boolean;
+ /**
+  * @en Custom class name for carousel item
+  * @cn 轮播项的自定义类名
+  */
+ itemClassName?: string;
}

// carousel.tsx
// 渲染轮播项时
- className={classNames(carouselStyle.item)}
+ className={classNames(carouselStyle.item, itemClassName)}

// 渲染指示器时
- if (total <= 1) return null;
+ if (total <= 1 || showIndicator === false) return null;
```

## 变更前后逻辑差异
- **变更前**：轮播项类名固定，指示器始终显示（除非只有1条数据）
- **变更后**：支持自定义轮播项类名；可通过 showIndicator=false 隐藏指示器

## 逻辑影响范围
- itemClassName 影响所有轮播项的样式
- showIndicator 控制指示器的显示与隐藏
- 两个属性都是可选的，不影响现有功能

## 升级注意事项

### 代码兼容性
- 无直接代码执行风险

### 行为变化说明
- itemClassName 可能覆盖默认样式，影响轮播项布局
- 隐藏指示器后用户可能不知道有多个轮播项，影响用户体验