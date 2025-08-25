# Input 组件 3.7.3 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.3
- 包含 Beta 版本: 3.7.3-beta.1 ~ 3.7.3-beta.8
- 发布日期: 2025-06-20

## 详细变更

### 3.7.3-beta.1
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 修复 Input 组件 `digits` 和 `autoFix` 属性精度丢失问题
- **PR**: [#1178](https://github.com/sheinsight/shineout-next/pull/1178)
- **影响组件**: Input
- **问题原因**: 使用 `parseFloat(value).toFixed(digits)` 处理数字精度时，在处理大数字时会出现精度丢失问题

#### Bug 特征
- Input.Number 组件在处理大数字时出现精度丢失
- 使用 `digits` 和 `autoFix` 属性时数值不准确
- 影响数字输入框的数据精度和准确性

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Input
  type="number"
  digits={2}
  autoFix
  value="111111111111111.888"  // 大数字可能出现精度问题
/>
```

#### 排查规则
- 搜索设置了 `digits` 和 `autoFix` 属性的 Input 组件
- 搜索处理大数字的数字输入场景

### 3.7.3-beta.3
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 修复 Form `scrollToError` 功能导致 Input `onEnterPress` 事件不触发的问题
- **PR**: [#1181](https://github.com/sheinsight/shineout-next/pull/1181)
- **影响组件**: Input, Form
- **问题原因**: Form 的原生 submit 事件在 keydown 中触发，submit 校验后触发 scrollToError 会导致当前焦点的 input 立即失焦，导致 input 的回车事件无法触发

#### Bug 特征
- 在开启 Form `scrollToError` 功能后，Input 的 `onEnterPress` 事件不触发
- 影响表单提交后的交互体验
- 表单校验和输入框事件的时序冲突

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form scrollToError>
  <Input
    onEnterPress={(value) => {
      // 可能不会触发
      console.log('Enter pressed:', value);
    }}
  />
</Form>
```

#### 排查规则
- 搜索在 Form 中使用了 `scrollToError` 和 Input `onEnterPress` 的组合

### 3.7.3-beta.4
- **变更类型**: 修复问题
- **变更标签**: 交互
- **复现示例**: 无
- **变更描述**: 修复 Input 组件的 `onEnterPress` 事件在开启 Form 的 `scrollToError` 后偶现无法触发的问题
- **PR**: [#1182](https://github.com/sheinsight/shineout-next/pull/1182)
- **影响组件**: Input
- **问题原因**: beta.3 的修复虽然改善了时序问题，但在某些场景下仍然存在 onEnterPress 事件丢失的情况

#### Bug 特征
- Input 的 `onEnterPress` 事件在特定场景下仍可能不触发
- 表单校验和输入框失焦的时序问题
- 影响用户的回车提交体验

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form scrollToError>
  <Input
    onEnterPress={(value, e) => {
      // 在某些时序下可能不会触发
      handleSubmit(value);
    }}
  />
</Form>
```

#### 排查规则
- 搜索在 Form 中使用了 `scrollToError` 和 Input `onEnterPress` 的组合

## Breaking Changes

无

## 风险等级

**低**：
- 主要为 Bug 修复，提升组件稳定性和数据准确性
- 修复了数字精度丢失和事件触发时序问题
- 无 API 变更，现有代码无需修改即可受益