# Checkbox 组件 3.5.8 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.8
- 包含 Beta 版本: 3.5.8-beta.1 ~ 3.5.8-beta.2
- 发布日期: 2025-01-15

## 详细变更

### 3.5.8-beta.2
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Checkbox` 触发两次 `onChange` 的问题（Regression: since v3.5.6）
- **PR**: [#929](https://github.com/sheinsight/shineout-next/pull/929)
- **影响组件**: Checkbox
- **问题原因**: 在 3.5.6 版本修复嵌套问题时引入的 `onRawChange` 机制导致了 onChange 事件的重复触发

#### Bug 特征
- Checkbox 组件的 onChange 事件被触发两次
- 每次点击 Checkbox 会执行两次回调函数
- 可能导致状态更新异常或业务逻辑执行两次
- 该问题是 3.5.6 版本引入的回归问题

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Checkbox 
  onChange={(value, checked) => {
    // 该回调会被触发两次
    updateState(checked);
  }}
>
  选项
</Checkbox>
```

#### 排查规则
- 搜索设置了 `onChange` 属性的 Checkbox 组件
- 搜索 onChange 回调中包含 API 调用的 Checkbox
- 搜索 onChange 回调中包含状态更新操作的 Checkbox
- 搜索 onChange 回调中包含 dispatch 或 setState 的 Checkbox

## Breaking Changes

无

## 风险等级

**高**：
- 影响 Checkbox 的核心功能 onChange 事件
- 是 3.5.6 版本引入的回归问题
- onChange 触发两次可能导致严重的业务逻辑问题
- 影响所有使用 onChange 回调的 Checkbox 场景

## 版本修复历史

1. **3.5.8-beta.2**：修复 onChange 触发两次的问题
2. **相关版本**：
   - 3.5.6 版本引入此回归问题
   - 3.6.0 版本进一步完善修复