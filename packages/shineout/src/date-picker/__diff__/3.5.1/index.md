# DatePicker 组件 3.5.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.1
- 包含 Beta 版本: 3.5.1-beta.1 ~ 3.5.1-beta.5
- 发布日期: 2025-02-01

## 详细变更

### 3.5.1-beta.5
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `DatePicker` 组件 `align` 属性失效的问题
- **PR**: [#799](https://github.com/sheinsight/shineout-next/pull/799)
- **影响组件**: DatePicker
- **问题原因**: 组件内部未正确处理 align 属性，导致文本对齐方式设置无效

#### Bug 特征
- 设置 align 属性为 "left"、"center" 或 "right"
- 日期文本显示的对齐方式未按预期改变
- 始终保持默认对齐方式

**代码模式**：
```jsx
// 容易出现问题的代码结构
<DatePicker
  align="center"  // 对齐属性不生效
  value={date}
  onChange={handleChange}
/>
```

#### 排查规则
- 搜索设置了 `align` 属性的 DatePicker 组件

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复样式对齐问题
- 不影响功能逻辑
- 恢复了 align 属性的正常功能

## 版本修复历史

1. **3.5.1-beta.5**：修复 align 属性失效的问题