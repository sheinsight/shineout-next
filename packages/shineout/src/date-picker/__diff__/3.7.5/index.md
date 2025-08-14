# DatePicker 组件 3.7.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.5
- 包含 Beta 版本: 3.7.5-beta.1 ~ 3.7.5-beta.11
- 发布日期: 2025-07-05

## 详细变更

### 3.7.5-beta.5
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `DatePicker` 的 `formatResult` 属性在 `type` 为 `month` 时，切换月份时展示结果不正确的问题
- **PR**: [#1220](https://github.com/sheinsight/shineout-next/pull/1220)
- **影响组件**: DatePicker
- **问题原因**: 月份选择器在切换月份时，formatResult 函数的调用时机或参数传递有误，导致显示结果不正确

#### Bug 特征
- 使用 `type="month"` 的月份选择器
- 设置了 `formatResult` 属性进行自定义显示
- 切换月份时显示结果不符合预期

**代码模式**：
```jsx
// 容易出现问题的代码结构
<DatePicker
  type="month"
  formatResult={(date) => {
    // 自定义月份显示格式
    return moment(date).format('YYYY年MM月');
  }}
/>
```

#### 排查规则
- 搜索 `type="month"` 且使用 `formatResult` 的 DatePicker 组件
- 搜索自定义月份显示格式的场景
- 搜索月份选择器的使用

## Breaking Changes

无

## 风险等级

**低**：
- 修复了特定场景下的显示问题
- 仅影响月份选择器的自定义显示
- 不影响数据的实际值

## 版本修复历史

1. **3.7.5-beta.5**：修复月份选择器 formatResult 显示不正确的问题