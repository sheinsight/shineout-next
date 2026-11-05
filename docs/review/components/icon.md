# Icon

- Review 日期：2026-11-05
- 核实状态：初审过浅
- 涉及文件：
  - packages/shineout/src/icon/icon.tsx
  - packages/base/src/icon/icon.tsx
  - packages/base/src/icon/icon.type.ts
  - packages/shineout-style/src/icon/
- 状态：待优化

## 概要

Icon 组件通过工厂函数 makeIcon 动态生成图标组件，支持 CSS/JS 格式。实现灵活，但 DOM 操作缺少错误处理和管理。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|-----|------|------|------|------|------|
| ICON-001 | P2 | bug | packages/base/src/icon/icon.tsx:74-86 | 动态插入 link/script 标签后未检查加载状态，可能导致资源加载失败但无反馈 | 为 link/script 添加 onerror 回调处理加载失败 |
| ICON-002 | P2 | perf | packages/base/src/icon/icon.tsx:56-61 | links 和 scripts 对象为全局状态，模块卸载时不清理，导致内存泄漏 | 考虑添加清理机制或使用 WeakMap |

## 详细说明

### ICON-001：资源加载缺少错误处理 (P2)

**触发场景**: 传入无效的 CSS/JS 资源 URL，组件无法检测到加载失败，用户界面上看不到任何反馈。

**原因分析**: 第74-86 行创建 link/script 后直接 appendChild，未添加 onerror 监听。

**修复思路**:
```tsx
if (ext === 'css' && !links[url]) {
  const link = document.createElement('link');
  link.onerror = () => devUseWarning.error(`Failed to load icon CSS: ${url}`);
  link.setAttribute('href', url);
  // ...
}
```

### ICON-002：全局缓存泄漏 (P2)

**触发场景**: 应用运行期间加载多个 icon 资源后，links 和 scripts 对象一直保持引用，即使不再使用也不清理。

**原因分析**: 第56-61 行的 links 和 scripts 是模块级全局变量，无清理机制。

**修复思路**: 
- 可考虑在应用销毁时清理这些缓存
- 或使用 WeakMap 自动管理引用生命周期

## 测试覆盖

缺少对加载失败、资源管理的测试。

## TODO

- [ ] 初审一次看了 20 个组件，结论不可靠，需完整阅读源码重新 review
- [ ] 逐条核实现有条目并补全 `packages/...:行号`
