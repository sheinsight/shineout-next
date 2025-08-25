# Sticky 组件 3.5.4 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.4
- 包含 Beta 版本: 3.5.4-beta.1 ~ 3.5.4-beta.17
- 发布日期: 2024-12-11

## 详细变更

### 3.5.4-beta.2
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=dfab1632-a2fc-453b-8404-b0efc164ae5b](https://shineout-playground.sheincorp.cn/#/playground?code=dfab1632-a2fc-453b-8404-b0efc164ae5b)
- **变更描述**: 修复 Sticky 组件设置负值 `top` 或 `bottom` 值时组件报错的问题
- **PR**: [#848](https://github.com/sheinsight/shineout-next/pull/848)
- **影响组件**: Sticky
- **问题原因**: IntersectionObserver 的 rootMargin 字符串拼接在处理负数时会产生无效值（如 `--5px`），导致组件创建失败报错

#### Bug 特征
- 当为 Sticky 组件的 `top` 或 `bottom` 属性传入负数值时组件直接崩溃
- 错误信息与 IntersectionObserver 的 rootMargin 参数相关
- 影响三个观察器实例：固定位置观察器、目标位置观察器、父元素可见性观察器

**代码模式**：
```tsx
// 容易出现问题的代码结构
<Sticky top={-10} bottom={-20}>
  <div>粘性内容</div>
</Sticky>
```

#### 排查规则
- 搜索设置了负值 `top` 或 `bottom` 属性的 Sticky 组件

## Breaking Changes

无

## 风险等级

**中**：
- 修复了可能导致应用崩溃的严重问题
- 完全向后兼容，现有代码无需修改
- 提升了组件在边界情况下的稳定性