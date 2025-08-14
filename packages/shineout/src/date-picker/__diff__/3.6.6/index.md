# DatePicker 组件 3.6.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.6
- 包含 Beta 版本: 3.6.6-beta.1 ~ 3.6.6-beta.7
- 发布日期: 2025-05-11

## 详细变更

### 3.6.6-beta.6
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `DatePicker` 的 `open` 受控用法下，`onChange` 多了一次调用的问题
- **PR**: [#1107](https://github.com/sheinsight/shineout-next/pull/1107)
- **影响组件**: DatePicker
- **问题原因**: 在 `open` 属性受控时，内部状态管理逻辑导致 onChange 事件被额外触发

#### Bug 特征
- 使用 `open` 属性进行受控
- 选择日期时 onChange 被调用多次
- 可能导致重复的数据更新

**代码模式**：
```jsx
// 容易出现问题的代码结构
<DatePicker
  open={isOpen}
  onCollapse={setIsOpen}
  value={date}
  onChange={(value) => {
    // 此处可能被调用多次
    setDate(value);
  }}
/>
```

#### 排查规则
- 搜索使用 `open` 属性受控的 DatePicker 组件
- 搜索在 onChange 中有副作用操作的场景
- 搜索依赖 onChange 调用次数的业务逻辑

## Breaking Changes

无

## 风险等级

**中**：
- 修复了 onChange 多次调用的问题
- 可能影响依赖多次调用的错误实现
- 建议测试受控模式的日期选择功能

## 版本修复历史

1. **3.6.6-beta.6**：修复 open 受控模式下 onChange 多次调用问题