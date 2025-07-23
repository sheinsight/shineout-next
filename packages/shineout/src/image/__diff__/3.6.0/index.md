# Image 组件 3.6.0 版本 Diff 报告

## 问题描述

1. `Image` 新增 `renderHoverMask` 属性，支持自定义渲染鼠标移入组件时的遮罩层内容
2. 修复 `Image` 在容器为 'absolute' 定位情况下 `lazy` 属性可能失效的问题

## 代码变更文件

1. `packages/base/src/image/image.tsx`
2. `packages/base/src/image/image.type.ts`
3. `packages/shineout/src/image/image.type.ts`
4. `packages/hooks/src/utils/dom/element.tsx`
5. `packages/hooks/src/utils/lazyload.ts`

## 变更代码行

### 1. packages/base/src/image/image.type.ts
```diff
+export interface CustomRenderHoverMaskOptions {
+  preview: () => void;
+}

export interface ImageProps extends Pick<React.ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
  // ... 其他属性
+  /**
+   * @cn 自定义渲染鼠标移入组件时的遮罩层内容
+   * @en Custom render hover mask content when mouse enter
+   * @version 3.6.0
+   */
+  customRenderHoverMask?: (options: CustomRenderHoverMaskOptions) => React.ReactNode;
}
```

### 2. packages/base/src/image/image.tsx
```diff
// 在 renderHoverMask 方法中
+if (customRenderHoverMask) {
+  return customRenderHoverMask({ preview: handlePreview });
+}

if (renderContent) {
  return renderContent(src as string);
}
```

### 3. packages/hooks/src/utils/dom/element.tsx
```diff
-export const getClosestFixedContainer = (element: HTMLElement | null) => {
+export const getClosestPositionedContainer = (element: HTMLElement | null, positionTypes: string[] = ['fixed']) => {
  let currentElement = element?.parentElement;
  while (currentElement && currentElement !== document.body) {
    const style = window.getComputedStyle(currentElement);
-   if (style.position === 'fixed') {
+   if (positionTypes.includes(style.position)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
};
```

### 4. packages/hooks/src/utils/lazyload.ts
```diff
// 检测 fixed 定位容器
-const fixedContainer = getClosestFixedContainer(element);
+const fixedContainer = getClosestPositionedContainer(element, ['fixed']);
if (fixedContainer) {
  observerManager.createObserver(fixedContainer);
  elementObserverMap.set(element, fixedContainer);
}

// 新增：检测 absolute 定位容器
+const absoluteContainer = getClosestPositionedContainer(element, ['absolute']);
+if (absoluteContainer && absoluteContainer !== fixedContainer) {
+  observerManager.createObserver(absoluteContainer);
+  elementObserverMap.set(element, absoluteContainer);
+}
```

## 变更前后逻辑差异

### 变更前
- Image 组件只支持 `renderContent` 属性自定义内容，功能相对有限
- lazy 加载只检测 fixed 定位的容器，absolute 定位容器中的图片可能无法正确触发懒加载

### 变更后
- 新增 `customRenderHoverMask` 属性，提供更灵活的悬停遮罩自定义能力，并传入 `preview` 方法供调用
- lazy 加载同时检测 fixed 和 absolute 定位容器，确保在各种定位场景下都能正常工作

## 逻辑影响范围
- 新增自定义悬停遮罩功能，不影响现有的 `renderContent` 功能
- 增强了 lazy 加载的兼容性，支持更多布局场景
- 保持向后兼容，现有代码无需修改

## 风险使用场景

### 代码执行风险
- 无破坏性变更，新增功能为可选属性

### 交互体验差异
1. **新增自定义能力**：
   - 影响场景：需要自定义图片悬停效果的场景
   - 具体表现：可以通过 `customRenderHoverMask` 完全控制悬停时的遮罩内容
   - 使用示例：
   ```tsx
   <Image 
     src="..." 
     customRenderHoverMask={({ preview }) => (
       <div onClick={preview}>自定义预览按钮</div>
     )}
   />
   ```

2. **lazy 加载改进**：
   - 影响场景：在 absolute 定位容器中使用 lazy 加载的图片
   - 具体表现：原本可能不触发的懒加载现在能正常工作
   - 正面影响：提升了组件在复杂布局中的可用性