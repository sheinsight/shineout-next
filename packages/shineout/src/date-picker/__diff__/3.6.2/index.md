# DatePicker 组件 3.6.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.2
- 包含 Beta 版本: 3.6.2-beta.1 ~ 3.6.2-beta.6
- 发布日期: 2025-04-03

## 详细变更

### 3.6.2-beta.1
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `DatePicker` 的 `date` 类型在开启 `inputable` 和 `range` 之后，开始日期输入了比结束日期更大值之后可以回车提交的问题
- **PR**: [#1027](https://github.com/sheinsight/shineout-next/pull/1027)
- **影响组件**: DatePicker
- **问题原因**: 在可输入的日期范围选择模式下，缺少对输入日期范围的有效性验证，导致可以输入并提交非法的日期范围

#### Bug 特征
- 使用 `type="date"` 的日期选择器
- 同时开启 `inputable` 和 `range` 属性
- 手动输入开始日期大于结束日期
- 按回车键可以提交非法的日期范围

**代码模式**：
```jsx
// 容易出现问题的代码结构
<DatePicker
  type="date"
  inputable
  range
  value={dateRange}
  onChange={setDateRange}
/>
```

#### 排查规则
- 搜索同时使用 `inputable` 和 `range` 属性的 DatePicker 组件
- 搜索 `type="date"` 且开启范围选择的 DatePicker
- 搜索允许用户手动输入日期范围的场景

### 3.6.2-beta.3
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `DatePicker` 可输入模式下输入新的日期后，使用触控板的轻触关闭弹出层时获取不到最新值的问题
- **PR**: [#1025](https://github.com/sheinsight/shineout-next/pull/1025)
- **影响组件**: DatePicker
- **问题原因**: 触控板轻触（tap）事件的处理时机与输入值的保存时机存在冲突，导致在弹出层关闭时未能正确保存最新输入的值

#### Bug 特征
- 开启 `inputable` 可输入模式
- 手动输入日期后使用触控板轻触关闭弹出层
- onChange 回调未获取到最新输入的值
- 主要影响 MacBook 触控板用户

**代码模式**：
```jsx
// 容易出现问题的代码结构
<DatePicker
  inputable
  value={date}
  onChange={(value) => {
    // 触控板关闭时可能获取不到最新值
    setDate(value);
  }}
/>
```

#### 排查规则
- 搜索使用 `inputable` 属性的 DatePicker 组件
- 搜索在 onChange 中依赖最新输入值的逻辑
- 搜索触控板操作相关的交互场景

## Breaking Changes

无

## 风险等级

**低**：
- 修复了特定边缘场景的问题
- 仅影响可输入模式的特定操作
- 不影响正常的键盘和鼠标操作

## 版本修复历史

1. **3.6.2-beta.1**：修复日期范围输入验证问题
2. **3.6.2-beta.3**：修复触控板交互时值保存问题