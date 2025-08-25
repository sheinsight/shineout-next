# Image 组件 3.6.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.5
- 包含 Beta 版本: 3.6.5-beta.1 ~ 3.6.5-beta.10
- 发布日期: 2025-04-30

## 详细变更

### 3.6.5-beta.2
- **变更类型**: 性能优化
- **复现示例**: 无
- **变更描述**: 优化 Image 的 `fill` 实现方式，改善大图片在 Chrome 浏览器下的性能
- **PR**: [#1080](https://github.com/sheinsight/shineout-next/pull/1080)
- **影响组件**: Image

## Breaking Changes

无

## 风险等级

**低**：
- 性能优化不影响功能
- 改善了大图片在 Chrome 浏览器的显示性能
- 向后兼容

## 版本修复历史

1. **3.6.5-beta.2**：优化 fill 实现方式，改善 Chrome 下大图片性能