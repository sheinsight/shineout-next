# Image

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - packages/shineout/src/image/*.tsx
  - packages/base/src/image/image.tsx, image-gallery.tsx, image-event.tsx, image-group.tsx
  - packages/hooks/src/components/use-image/use-image.ts, use-image-gallery.ts, use-image-magnify.ts
  - packages/shineout-style/src/image/index.ts
- 状态：待优化

## 概要

Image 组件实现了懒加载、预览、图库等功能，结构分层清晰。但存在多个事件监听未清理、图片对象 onerror 处理不一致、以及 gallery modal 中的 keydown 监听可能重复注册等问题。a11y 方面缺少 alt 属性验证，ImageGroup 状态管理也有待完善。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| IMAGE-2 | P1 | bug | packages/hooks/src/components/use-image/use-image.ts:90-99 | 创建的 Image 对象在加载中止时未清理 onload/onerror 监听器，图片仍保留在内存中 | 需要在组件卸载或换源时显式清理监听器和 src |
| IMAGE-3 | P1 | bug | packages/hooks/src/components/use-image/use-image.ts:164-185 | useEffect 依赖数组仅含 src，若 container 变化不会更新注册；且 lazy observer 的 cleanup 不完整 | 补充 container、lazy 等到依赖数组；验证 removeStack 完全清理了 observer |
| IMAGE-4 | P2 | a11y | packages/base/src/image/image.tsx:49 | alt 属性没有校验机制，若用户未提供 alt 会导致无障碍问题 | 添加 devUseWarning 提醒开发者提供 alt；为 img 标签强制渲染 alt |
| IMAGE-5 | P2 | types | packages/base/src/image/image.tsx:133 | backgroundImage 使用字符串拼接 `url("${src}")` 可能包含特殊字符导致 CSS 注入 | 使用 CSS.escape() 对 src 进行转义 |
| IMAGE-6 | P2 | perf | packages/base/src/image/image-gallery.tsx:45-48 | 图库弹窗使用 setTimeout(..., 0) 延迟渲染，可能导致视觉闪烁和性能问题 | 改为 requestAnimationFrame 或直接渲染 |
| IMAGE-7 | P2 | bug | packages/hooks/src/components/use-image/use-image.ts:32-41 | handleError 递归调用时若 alt 也加载失败，会反复创建 Image 对象 | 添加最大递归深度限制或标志位避免无限递归 |
| IMAGE-8 | P3 | maintainability | packages/base/src/image/image-event.tsx:8-18 | 使用全局 container 变量管理 gallery DOM，若多个 Image 组件同时打开 gallery 可能冲突 | 改为使用 Portal 或为每个 gallery 创建独立容器 |
| IMAGE-9 | P2 | a11y | packages/base/src/image/image-gallery.tsx:36-40 | gallery 中的 close 按钮无 aria-label，屏幕阅读器无法识别其功能 | 添加 aria-label="Close gallery" 或类似标签 |
| IMAGE-10 | P2 | bug | packages/base/src/image/image.tsx:133 | backgroundImage URL 包含特殊字符（`)` 或引号）时可能破坏 url() 语法，导致图片加载失败 | 使用 CSS.escape() 对 src 进行转义 |
| IMAGE-11 | P2 | test | packages/shineout/src/image/__test__ | 缺少对以下场景的测试：alt fallback 加载失败、container 变化、多次快速打开 gallery、懒加载 unobserve | 补充集成测试覆盖 |

## 详细说明

### IMAGE-2: Image 对象未清理监听器（P1）

**文件:行号**: packages/hooks/src/components/use-image/use-image.ts:90-99

**问题**: 
```typescript
const markToRender = () => {
  if (!src) {
    handleAlt();
    return;
  }
  const img = new window.Image();
  img.onload = () => { setStatus(SRC); ... };
  img.onerror = (e) => handleError(SRC, e as Event);
  img.src = getUrl(src);
};
```
创建的 Image 对象若加载中止（如用户快速切换 src），onload/onerror 监听器会保留，图片在内存中继续。

**触发场景**: 用户快速切换图片源或卸载组件，导致多个待加载的 Image 对象堆积。

**修复思路**: 
- 保存 img 引用到 ref 中
- 在 cleanup 时调用 `img.onload = null; img.onerror = null; img.src = '';`
- 或使用 AbortController 控制图片加载

### IMAGE-3: useEffect 依赖数组不完整（P1）

**文件:行号**: packages/hooks/src/components/use-image/use-image.ts:164-185

**问题**: 
```typescript
useEffect(() => {
  if (!lazy) {
    markToRender();
  } else {
    if (elementRef.current) {
      lazyId = addStack({...});
    }
  }
  return () => {
    if (lazyId) removeStack(lazyId);
  };
}, [src]);  // 缺少 container, lazy 等
```
依赖数组仅包含 src，若 container 或 lazy 属性变化不会触发重新注册。

**修复思路**: 
- 完整依赖数组：`[src, lazy, container]`
- 需要测试 removeStack 是否正确清理了所有 observer 引用

### IMAGE-4: Alt 属性缺少验证（P2）

**文件:行号**: packages/base/src/image/image.tsx:49

**问题**: 若用户未提供 alt 属性，img 标签会没有替代文本，无障碍性差。

**修复思路**: 
- 在开发模式添加 devUseWarning：`if (!alt) util.devUseWarning.warn('Image requires alt property...')`
- 确保在所有 img 渲染时都有 alt 或默认值

### IMAGE-5: backgroundImage CSS 注入风险（P2）

**文件:行号**: packages/base/src/image/image.tsx:133

**问题**: 
```typescript
const imageDivProps = getImageDivProps({ style: { backgroundImage: `url("${src}")` } });
```
若 src 包含特殊字符（如 `'` 或 `)` ）可能破坏 CSS 语句或导致加载失败。

**触发场景**: 用户提供包含特殊字符的图片 URL。

**修复思路**: 
```typescript
const escapedSrc = CSS.escape(src);
backgroundImage: `url("${escapedSrc}")`
```

### IMAGE-6: setTimeout 延迟渲染可能闪烁（P2）

**文件:行号**: packages/base/src/image/image-event.tsx:44-48

**问题**: 
```typescript
setTimeout(() => {
  ReactRender(..., container);
}, 0);
```
使用 setTimeout(..., 0) 会在下一个任务队列中渲染，可能导致用户看到短暂的空白或闪烁。

**修复思路**: 
- 直接调用 ReactRender，或使用 requestAnimationFrame
- 若需要异步仅为了让 DOM 挂载，可改为 microtask（Promise）

### IMAGE-7: handleError 递归风险（P2）

**文件:行号**: packages/hooks/src/components/use-image/use-image.ts:32-41

**问题**: 
```typescript
const handleError = (type: number, e: Event) => {
  if (onError) onError(e, type);
  if (type === SRC) {
    const img = new window.Image();
    img.onload = () => setStatus(ALT);
    img.onerror = (e) => handleError(ALT, e as Event);  // 递归调用
    img.src = getUrl(alt || '');
  } else if (type === ALT) setStatus(ERROR);
};
```
若 alt 也加载失败，会继续递归，虽然通常只会两层，但理论上可能出现无限循环。

**修复思路**: 
- 添加深度计数器限制
- 或改为 if-else 结构避免递归

### IMAGE-9: gallery 中的 close 按钮无 aria-label（P2）

**现有测试**:
- image.spec.tsx：基础渲染、加载状态、错误处理

**缺失测试**:
- alt fallback 链式加载失败
- 快速切换 src，验证内存清理
- 快速打开/关闭多个 gallery，验证 keydown 监听器数量
- container 变化时的行为
- 懒加载的 observer cleanup
- URL 特殊字符处理

## 核实记录

- IMAGE-1：已删除，浏览器自动对重复的 (type, listener) 去重，showGallery 中多次调用 addEventListener 不会导致累积监听器；close() 函数正确清理了监听器。

## TODO

- [ ] IMAGE-1 是误报：`image-event.tsx:42` 的 keyClose 是模块级同一引用，addEventListener 自动去重（核实中断，确认是否已删除）
- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
