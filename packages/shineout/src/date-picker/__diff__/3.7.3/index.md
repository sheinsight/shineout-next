# DatePicker 组件 3.7.3 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.3
- 包含 Beta 版本: 3.7.3-beta.1 ~ 3.7.3-beta.8
- 发布日期: 2025-06-21

## 详细变更

### 3.7.3-beta.2
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `DatePicker` 的可输入模式支持宽松的日期格式，例如"2025-06-16 18:00"和"2025-06-16 18"
- **PR**: [#1180](https://github.com/sheinsight/shineout-next/pull/1180)
- **影响组件**: DatePicker
- **问题原因**: 提升用户输入体验，支持更灵活的日期时间格式输入

### 3.7.3-beta.5
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `DatePicker` 设置 `allowSingle` 后无法点击已选日期取消选中的问题
- **PR**: [#1183](https://github.com/sheinsight/shineout-next/pull/1183)
- **影响组件**: DatePicker
- **问题原因**: allowSingle 模式下的点击事件处理逻辑有误，导致无法通过点击已选日期来取消选中

#### Bug 特征
- 开启 `allowSingle` 属性
- 点击已选中的日期无法取消选中
- 只能通过清空按钮清除选择

**代码模式**：
```jsx
// 容易出现问题的代码结构
<DatePicker
  range
  allowSingle
  value={dateRange}
  onChange={setDateRange}
/>
```

#### 排查规则
- 搜索使用 `allowSingle` 属性的 DatePicker 组件
- 搜索范围选择且允许单选的场景

### 3.7.3-beta.8
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `DatePicker` 在开启 `allowSingle` 时可能引发表单死循环的问题
- **PR**: [#1194](https://github.com/sheinsight/shineout-next/pull/1194)
- **影响组件**: DatePicker, Form
- **问题原因**: 在表单中使用 allowSingle 的 DatePicker 时，值的更新逻辑可能导致无限循环

#### Bug 特征
- 在 Form 中使用 DatePicker
- 开启 `allowSingle` 属性
- 可能导致页面卡死或无响应

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form>
  <Form.Item name="dateRange">
    <DatePicker
      range
      allowSingle
    />
  </Form.Item>
</Form>
```

#### 排查规则
- 搜索在 Form 中使用的带 `allowSingle` 的 DatePicker
- 搜索可能触发循环更新的表单场景

## Breaking Changes

无

## 风险等级

**高**：
- 修复了可能导致死循环的严重问题
- 增强了输入格式的宽松度，可能影响严格的格式验证
- 建议重点测试 allowSingle 在表单中的使用

## 版本修复历史

1. **3.7.3-beta.2**：增强可输入模式，支持宽松的日期格式
2. **3.7.3-beta.5**：修复 allowSingle 模式下无法取消选中的问题
3. **3.7.3-beta.8**：修复 allowSingle 可能引发表单死循环的问题