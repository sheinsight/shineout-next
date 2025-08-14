# DatePicker 组件 3.6.7 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.7
- 包含 Beta 版本: 3.6.7-beta.1 ~ 3.6.7-beta.7
- 发布日期: 2025-05-27

## 详细变更

### 3.6.7-beta.6
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `DatePicker` 在设置了和 `format` 格式不相符的 `defaultValue` 后会触发多次 onChange 的问题
- **PR**: [#1125](https://github.com/sheinsight/shineout-next/pull/1125)
- **影响组件**: DatePicker
- **问题原因**: 当 defaultValue 的格式与 format 属性不匹配时，内部格式化逻辑会多次触发值的更新，导致 onChange 被重复调用

#### Bug 特征
- defaultValue 格式与 format 属性不一致
- 组件初始化时 onChange 被调用多次
- 可能导致意外的数据更新或性能问题

**代码模式**：
```jsx
// 容易出现问题的代码结构
<DatePicker
  format="yyyy-MM-dd"
  defaultValue="2025/05/27"  // 格式不匹配
  onChange={(value) => {
    // 可能被调用多次
    console.log('onChange', value);
  }}
/>
```

#### 排查规则
- 搜索 defaultValue 和 format 同时使用的 DatePicker 组件
- 搜索 defaultValue 使用非标准格式的场景
- 搜索在 onChange 中有副作用操作的 DatePicker

## Breaking Changes

无

## 风险等级

**中**：
- 修复了初始化时 onChange 多次触发的问题
- 可能影响依赖多次触发的错误实现
- 建议检查 defaultValue 的格式是否正确

## 版本修复历史

1. **3.6.7-beta.6**：修复 defaultValue 格式不匹配时 onChange 多次触发问题