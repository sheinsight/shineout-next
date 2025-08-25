# Carousel 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.30
- 发布日期: 2025-03-21

## 详细变更

### 3.6.0-beta.13
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `indicatorType` 属性新增 `bar` 类型，提供进度条样式的轮播指示器
- **PR**: [#975](https://github.com/sheinsight/shineout-next/pull/975)
- **影响组件**: Carousel
- **问题原因**: 功能增强，为用户提供更多指示器样式选择

## Breaking Changes

无

## 风险等级

**低**：
- 新增功能，不影响现有代码
- 向后兼容，原有 `indicatorType` 值仍然有效
- 仅增加了新的样式选项，不改变现有行为

## 版本修复历史

1. **3.6.0-beta.13**：新增 `indicatorType` 的 `bar` 类型支持，增加进度条样式的轮播指示器选项