# Select 组件 3.7.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.0
- 包含 Beta 版本: 3.7.0-beta.1 ~ 3.7.0-beta.44
- 发布日期: 2025-05-28

## 详细变更

### 3.7.0-beta.18
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `Select` 新增 `renderCompressed` 属性，支持自定义渲染合并内容
- **PR**: [#1099](https://github.com/sheinsight/shineout-next/pull/1099)
- **影响组件**: Select, TreeSelect

### 3.7.0（具体 beta 版本未标记）
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `Select` 新增 `highlight` 属性，开启搜索关键字高亮功能
- **PR**: [#1126](https://github.com/sheinsight/shineout-next/pull/1126)
- **影响组件**: Select

## Breaking Changes

无

## 风险等级

**低**：
- 新增的功能特性不影响现有功能
- `renderCompressed` 和 `highlight` 均为可选属性

## 版本修复历史

1. **3.7.0-beta.18**：新增 `renderCompressed` 属性
2. **3.7.0**：新增 `highlight` 属性