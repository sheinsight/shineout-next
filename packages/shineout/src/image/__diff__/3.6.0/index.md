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

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：新增功能为可选属性，现有代码无需修改

### 行为变化说明
1. **新增自定义悬停遮罩功能**：
   - 升级前：只能使用默认的悬停遮罩样式
   - 升级后：支持通过 `renderHoverMask` 自定义遮罩内容
   - 受影响场景：需要自定义图片悬停效果的业务
   - 示例代码：
   ```tsx
   // 升级后新增的能力
   <Image 
     src="product.jpg" 
     href="product-large.jpg"
     renderHoverMask={({ preview }) => (
       <div className="custom-mask">
         <button onClick={preview}>查看大图</button>
         <button>收藏</button>
       </div>
     )}
   />
   ```
   - 是否需要调整：不需要，这是新增功能，不影响现有代码

2. **absolute 定位容器中的懒加载修复**：
   - 升级前：在 absolute 定位容器中，图片懒加载可能失效（图片不会加载）
   - 升级后：懒加载在 absolute 定位容器中正常工作
   - 受影响场景：
     ```tsx
     // 这类场景的懒加载会从失效变为正常
     <div style={{ position: 'absolute' }}>
       <Image src="large-image.jpg" lazy />
     </div>
     ```
   - 行为变化：原本不加载的图片现在会正常懒加载
   - 是否需要调整：不需要，这是缺陷修复

3. **属性名称注意**：
   - 升级前：无此属性
   - 升级后：新增 `renderHoverMask` 属性
   - 受影响场景：无（纯新增）
   - 注意事项：文档中显示为 `customRenderHoverMask`，但实际使用应为 `renderHoverMask`
   - 是否需要调整：使用时注意正确的属性名

4. **懒加载性能提升**：
   - 升级前：只监听 fixed 定位容器
   - 升级后：同时监听 fixed 和 absolute 定位容器
   - 受影响场景：复杂布局（弹窗、下拉菜单等）中的图片
   - 是否需要调整：不需要，性能和兼容性提升