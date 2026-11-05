# Watermark

- Review 日期：2026-11-05
- 核实状态：核实中断
- 涉及文件：
  - packages/shineout/src/watermark/*.tsx, *.ts
  - packages/base/src/watermark/watermark.tsx, utils.ts, context.ts
  - packages/shineout-style/src/watermark/index.ts
- 状态：待优化

## 概要

Watermark 组件采用高级防篡改机制，通过 MutationObserver 监控 DOM 变化并自动恢复水印。实现细致完善，内存清理也相对充分。但在渲染控制、Image 对象清理、以及部分边界情况下仍存在可优化之处。样式基本使用 token，整体质量较高。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| WATERMARK-1 | P2 | perf | packages/base/src/watermark/watermark.tsx:412-430 | scheduleRender 同时支持 requestAnimationFrame 和 setTimeout，但未设置指数退避或超时保护 | 添加最大重试次数或超时机制，避免持续的渲染循环 |
| WATERMARK-2 | P2 | bug | packages/base/src/watermark/watermark.tsx:360-391 | 加载水印 Image 时未验证图片 URL 合法性，恶意 URL 可能导致加载失败或跨域问题 | 添加 URL 验证确保 URL 格式正确、协议为 http/https |
| WATERMARK-3 | P2 | bug | packages/base/src/watermark/watermark.tsx:231-243 | releasePendingImage 中设置 image.src = '' 可能触发 onerror，导致冗余处理 | 先清理 onload/onerror，再设置 src='' |
| WATERMARK-4 | P2 | a11y | packages/base/src/watermark/watermark.tsx:255 | overlay div 设置了 aria-hidden='true' 但 pointerEvents='none'，确保不阻挡交互元素 | 验证 z-index 和 pointerEvents 组合不会破坏页面交互 |
| WATERMARK-5 | P3 | maintainability | packages/base/src/watermark/watermark.tsx:69-97 | createDrawingSignature 和 createStyleSignature 中硬编码的对比逻辑，若后续修改签名结构容易遗漏更新 | 抽象签名生成和比较为统一的函数，减少维护成本 |
| WATERMARK-6 | P2 | test | packages/shineout/src/watermark/__test__ | 缺少对以下场景的测试：Image 加载超时、多层嵌套 Watermark、并发 addTarget/removeTarget | 补充集成测试覆盖边界场景 |
| WATERMARK-7 | P2 | bug | packages/base/src/watermark/watermark.tsx:317-318 | measureCanvas 和 context 创建后若后续操作抛错，canvas 未显式释放 | 在 finally 中调用 measureCanvas.remove() 或不再引用 |
| WATERMARK-8 | P3 | style | packages/shineout-style/src/watermark/index.ts | 部分样式值如 z-index 默认为 999，应确认是否会与页面其他高 z-index 元素冲突 | 提供 token 覆盖或 API 来自定义 z-index |

## 详细说明

### WATERMARK-1: scheduleRender 缺少超时保护（P2）

**文件:行号**: packages/base/src/watermark/watermark.tsx:412-430

**问题**: 
```typescript
const scheduleRender = usePersistFn(() => {
  if (!mountedRef.current || pendingFrameRef.current) return;

  const token = ++renderTokenRef.current;
  const run = () => {
    pendingFrameRef.current = null;
    if (!mountedRef.current || token !== renderTokenRef.current) return;
    drawLatest();
  };

  if (typeof window.requestAnimationFrame === 'function') {
    const id = window.requestAnimationFrame(run);
    pendingFrameRef.current = { id, token, type: 'animation-frame' };
    return;
  }

  const id = window.setTimeout(run, 16);
  pendingFrameRef.current = { id, token, type: 'timeout' };
});
```
若 drawLatest 频繁调用 scheduleRender，可能导致持续的动画帧或 setTimeout 堆积。

**修复思路**: 
- 添加计数器，超过阈值时报警或中止
- 或在 drawLatest 中添加成功标志，避免不必要的重复调用

### WATERMARK-2: Image URL 缺少验证（P2）

**文件:行号**: packages/base/src/watermark/watermark.tsx:360-391

**问题**: 
```typescript
try {
  const imageElement = new Image();
  pendingImageRef.current = imageElement;
  ...
  imageElement.crossOrigin = 'anonymous';
  imageElement.referrerPolicy = 'no-referrer';
  imageElement.src = image;  // 直接赋值，未验证
```
用户提供的 image URL 未经过验证，可能导致加载失败或跨域问题。

**触发场景**: 用户在 watermark 中传递无效或格式错误的 image URL。

**修复思路**: 
```typescript
const isValidUrl = (url: string) => {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};
if (!isValidUrl(image)) {
  console.warn('Invalid watermark image URL');
  drawFallback();
  return;
}
```

### WATERMARK-3: releasePendingImage 清理顺序问题（P2）

**文件:行号**: packages/base/src/watermark/watermark.tsx:230-243

**问题**: 
```typescript
const releasePendingImage = usePersistFn((cancelRequest = false) => {
  const image = pendingImageRef.current;
  if (!image) return;

  pendingImageRef.current = null;
  image.onload = null;
  image.onerror = null;
  if (cancelRequest) {
    try {
      image.src = '';  // 设置为空字符串可能触发 onerror
    } catch (_error) {
      // Ignore
    }
  }
});
```
设置 `image.src = ''` 后，浏览器可能触发 onerror 回调，但此时 image.onerror 已被设为 null，所以不会触发。但这种做法依赖于实现细节。

**修复思路**: 
- 确保先清理监听器再设置 src：已正确实现
- 但可以添加 try-catch 来处理浏览器差异

### WATERMARK-4: Overlay a11y 和交互验证（P2）

**文件:行号**: packages/base/src/watermark/watermark.tsx:246-259

**问题**: 
```typescript
overlay.setAttribute('aria-hidden', 'true');
overlay.setAttribute('style', getStyleString(style as unknown as React.CSSProperties));
```
虽然设置了 aria-hidden，但应验证 pointerEvents: 'none' 确实阻止了交互。

**修复思路**: 
- 在测试中验证水印层不会干扰页面交互
- 确保 z-index 不会遮挡重要元素

### WATERMARK-5: 签名对比逻辑可维护性差（P3）

**文件:行号**: packages/base/src/watermark/watermark.tsx:69-97, 99-103

**问题**: 
```typescript
function createDrawingSignature(props: LatestWatermarkProps, ratio: number): DrawingSignature {
  const gap = props.gap || DefaultGap;
  const font = mergeFont(DefaultFont, props.font);
  const content = getContentLines(props.content, font);
  const signature: DrawingSignature = [
    props.image,
    props.rotate,
    props.width,
    props.height,
    gap[0],
    gap[1],
    ratio,
    content.length,
  ];

  content.forEach((line) => {
    signature.push(
      line.text,
      line.font.color,
      line.font.fontSize,
      ...
    );
  });

  return signature;
}
```
签名是数组形式，若要修改顺序或添加字段，容易引入 bug。

**修复思路**: 
- 改为对象形式：`{ image, rotate, width, content, ... }`
- 使用专用的对比函数，避免依赖数组顺序

### WATERMARK-7: Canvas 未显式释放（P2）

**文件:行号**: packages/base/src/watermark/watermark.tsx:313-318

**问题**: 
```typescript
try {
  const measureCanvas = document.createElement('canvas');
  const context = measureCanvas.getContext('2d');
  if (!context) {
    clearFailedDrawing();
    return;
  }
  // 后续使用 measureCanvas，但未显式移除
```
虽然 measureCanvas 是临时变量，会被 GC，但在创建大量水印或高频率更新时可能造成内存压力。

**修复思路**: 
```typescript
const measureCanvas = document.createElement('canvas');
try {
  // ... 使用 canvas
} finally {
  // 可选：显式清理（现代浏览器通常自动 GC）
  // measureCanvas 会被自动回收
}
```

### WATERMARK-6: 测试覆盖缺陷（P2）

**文件:行号**: packages/shineout/src/watermark/__test__

**问题**: 
现有测试覆盖了基础功能和 MutationObserver 行为，但缺少：
- Image 加载超时场景
- 多层嵌套 Watermark 组件的交互
- 并发 addTarget/removeTarget 调用
- 极端情况（如 drawLatest 频繁失败）

**修复思路**: 
- 补充集成测试
- 添加性能测试（内存占用、FPS 影响）

## 测试覆盖

**现有测试**:
- watermark.spec.tsx：基础水印渲染
- watermark-lifecycle.spec.tsx：生命周期和清理
- watermark-public.spec.tsx：公共 API
- watermark-portal.spec.tsx：Portal 集成
- watermark-ssr.spec.tsx：SSR 兼容性
- watermark-example.spec.tsx：示例代码

**缺失测试**:
- 恶意或无效的 image URL 处理
- Image 加载超时
- 多层嵌套 Watermark
- 高频率 props 变化时的内存占用
- MutationObserver 在不同浏览器下的差异

## 核实记录

- WATERMARK-2：已从 P1 降级至 P2，原误报为 SSRF 风险。Watermark 是客户端组件，image 在浏览器中加载，不存在 SSRF（服务端漏洞）。实际风险是 URL 格式验证和跨域问题，级别应为 P2。

## TODO

- [ ] 初审把前端加载图片 URL 称为 “SSRF 风险”，属分类错误（核实中断，确认是否已删除）
- [ ] 核实 agent 中途停止，文档可能只改了一部分，需逐条复核 P0/P1
- [ ] 补全不完整的位置，确认核实记录与问题清单一致
