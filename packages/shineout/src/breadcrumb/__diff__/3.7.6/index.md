# Breadcrumb 组件 3.7.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.6
- 包含 Beta 版本: 3.7.6-beta.1 ~ 3.7.6-beta.12
- 发布日期: 2025-07-14

## 详细变更

### 3.7.6-beta.3
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: Breadcrumb 设置 `max` 属性后，新增 Popover 展示完整菜单路径，同时新增 BreadcrumbItem 组件处理面包屑项的溢出显示
- **PR**: [#1234](https://github.com/sheinsight/shineout-next/pull/1234)
- **影响组件**: Breadcrumb
- **功能说明**: 
  1. 当设置 `max` 属性限制显示数量时，省略号部分会显示 Popover，展示被省略的完整路径
  2. 新增内部 BreadcrumbItem 组件，处理单个面包屑项的渲染和溢出
  3. 面包屑项宽度超过 150px 时自动截断，并通过 Tooltip 显示完整内容

## Breaking Changes

无

## 风险等级

**低**：
- 纯新增功能，完全向后兼容
- 只有使用 `max` 属性的场景才会激活新功能
- 不影响现有面包屑的使用方式

## 版本修复历史

1. **3.7.6-beta.3**：新增 Popover 展示完整路径功能，优化长文本显示体验