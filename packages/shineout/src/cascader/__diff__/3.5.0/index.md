# Cascader 组件 3.5.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.0
- 包含 Beta 版本: 3.5.0-beta.1 ~ 3.5.0-beta.4
- 发布日期: 2024-11-11

## 详细变更

### 3.5.0-beta.4
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `Cascader` 新增 `renderCompressed` 属性，自定义渲染折叠展示内容
- **PR**: [#751](https://github.com/sheinsight/shineout-next/pull/751)
- **影响组件**: Cascader

### 3.5.0-beta.2
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `Cascader` 新增 `virtual` 属性，支持虚拟列表
- **PR**: [#746](https://github.com/sheinsight/shineout-next/pull/746)
- **影响组件**: Cascader

## Breaking Changes

无

## 风险等级

**低**：
- 新增功能不影响现有功能
- `renderCompressed` 属性为可选项，不使用不影响原有逻辑
- `virtual` 属性默认关闭，需要主动开启才会生效
- 虚拟列表主要优化大数据量场景的性能

## 版本修复历史

1. **3.5.0-beta.2**：新增 `virtual` 属性支持虚拟列表
2. **3.5.0-beta.4**：新增 `renderCompressed` 属性支持自定义折叠内容渲染