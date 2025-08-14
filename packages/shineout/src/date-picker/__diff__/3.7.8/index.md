# DatePicker 组件 3.7.8 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.8
- 包含 Beta 版本: 3.7.8-beta.1 ~ 3.7.8-beta.12
- 发布日期: 2025-07-25

## 详细变更

### 3.7.8-beta.2
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `DatePicker` 增强 `disabledTime` 在开启 `range` 且为函数模式下的返回参数
- **PR**: [#1259](https://github.com/sheinsight/shineout-next/pull/1259)
- **影响组件**: DatePicker
- **问题原因**: 在范围选择模式下，disabledTime 函数需要更多的上下文信息来正确禁用时间选项

## Breaking Changes

无

## 风险等级

**低**：
- 增强了现有功能，提供更多参数信息
- 向后兼容，不影响现有代码
- 仅在特定场景（range + disabledTime 函数）下生效

## 版本修复历史

1. **3.7.8-beta.2**：增强 disabledTime 函数在范围选择模式下的参数