# Select 组件 3.7.7 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.7
- 包含 Beta 版本: 3.7.7-beta.1 ~ 3.7.7-beta.9
- 发布日期: 2025-07-09

## 详细变更

### 3.7.7-beta.9
- **变更类型**: 修复问题
- **复现示例**: 
```
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = Array.from({ length: 224 }, () => Math.random().toString(36).substring(2, 15));
  data.unshift('PayU-GooglePay');
  return (
    <div>
      <Select
        width={221}
        defaultValue={data}
        multiple
        onChange={(v) => console.log(v)}
        data={data}
        keygen
        placeholder='Select Color'
        compressed
        clearable
      />
    </div>
  );
};
```
- **变更描述**: 修复 `Select` compressed 初始化时第一项结果都不显示，而是显示 more 的 Tag
- **PR**: [#1251](https://github.com/sheinsight/shineout-next/pull/1251)
- **影响组件**: Select
- **问题原因**: compressed 功能的显示逻辑在特定条件下计算错误

#### Bug 特征
- 多选 Select 设置 `compressed` 属性用于合并显示选中项
- 初始化时有大量默认选中值（特别是全选状态）
- 第一项选中值不显示，直接显示 "+N More" 标签
- compressed 计数逻辑在初始化时错误地包含了第一项

**代码模式**：
```jsx
// compressed 显示异常
<Select
  multiple
  compressed
  defaultValue={data} // 默认全选
  data={data}
  // 初始化时不显示第一项，直接显示 "+224 More"
/>
```

#### 排查规则
- 搜索设置了 `compressed` 且有初始值的多选 Select
- 搜索设置了 `compressed` 且 `value` 数组长度等于 3 的 Select
- 搜索设置了 `compressed` 且位于 Form 表单内有默认值的 Select

## Breaking Changes

无

## 风险等级

**低**：
- 修复了 compressed 显示逻辑问题
- 不影响功能逻辑

## 版本修复历史

1. **3.7.7-beta.9**：修复 compressed 初始化显示异常问题