# DatePicker 组件 3.7.7 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.7
- 包含 Beta 版本: 3.7.7-beta.1 ~ 3.7.7-beta.9
- 发布日期: 2025-07-15

## 详细变更

### 3.7.7-beta.2
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `DatePicker` 设置了不包含时间相关的 `format` 格式后，时间面板依然可弹出但无选项的问题
- **PR**: [#1243](https://github.com/sheinsight/shineout-next/pull/1243)
- **影响组件**: DatePicker
- **问题原因**: 当 format 格式不包含时间部分时（如 "yyyy-MM-dd"），时间选择面板不应该显示，但实际上仍可以弹出一个空的时间面板

#### Bug 特征
- 设置了不包含时间的 `format` 格式（如 "yyyy-MM-dd"）
- 时间选择按钮仍然可点击
- 弹出的时间面板没有可选项

**代码模式**：
```jsx
// 容易出现问题的代码结构
<DatePicker
  type="datetime"
  format="yyyy-MM-dd"  // 格式中不包含时间
/>
```

#### 排查规则
- 搜索 `type="datetime"` 但 `format` 不包含时间格式的 DatePicker
- 搜索自定义 format 格式的 DatePicker 组件
- 搜索可能出现时间面板异常的场景

## Breaking Changes

无

## 风险等级

**低**：
- 修复了界面显示异常问题
- 不影响数据和功能的正常使用
- 改善了用户体验

## 版本修复历史

1. **3.7.7-beta.2**：修复 format 不包含时间时仍显示时间面板的问题