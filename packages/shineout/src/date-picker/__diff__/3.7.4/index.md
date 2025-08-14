# DatePicker 组件 3.7.4 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.4
- 包含 Beta 版本: 3.7.4-beta.1 ~ 3.7.4-beta.8
- 发布日期: 2025-06-26

## 详细变更

### 3.7.4-beta.6
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `DatePicker` 可输入模式下的快速选择，二次选值后不生效的问题（Regression: since v3.7.3）
- **PR**: [#1207](https://github.com/sheinsight/shineout-next/pull/1207)
- **影响组件**: DatePicker
- **问题原因**: 3.7.3 版本引入的可输入模式增强功能导致快速选择功能的二次选择失效

#### Bug 特征
- 开启 `inputable` 可输入模式
- 使用快速选择功能
- 第一次选择正常，第二次选择相同或不同的快速选项不生效
- 3.7.3 版本引入的回归问题

**代码模式**：
```jsx
// 容易出现问题的代码结构
<DatePicker
  inputable
  quickSelect={[
    { name: '今天', value: new Date() },
    { name: '昨天', value: /* 昨天日期 */ },
    { name: '最近7天', value: /* 日期范围 */ }
  ]}
/>
```

#### 排查规则
- 搜索同时使用 `inputable` 和 `quickSelect` 的 DatePicker 组件
- 搜索依赖快速选择功能的业务场景
- 搜索从 3.7.3 升级后的 DatePicker 使用

## Breaking Changes

无

## 风险等级

**中**：
- 修复了 3.7.3 版本引入的回归问题
- 仅影响可输入模式下的快速选择功能
- 建议重点测试快速选择的多次使用场景

## 版本修复历史

1. **3.7.4-beta.6**：修复可输入模式下快速选择二次选值失效问题