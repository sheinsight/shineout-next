# Transfer 组件 3.6.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.5
- 包含 Beta 版本: 3.6.5-beta.1 ~ 3.6.5-beta.12
- 发布日期: 2025-04-16

## 详细变更

### 3.6.5-beta.11
- **变更类型**: 修复问题
- **变更标签**: 功能/类型
- **复现示例**: https://shineout-playground.sheincorp.cn/#/playground?code=7d8a6132-2f3d-4fb3-af7f-e21e30644168
- **变更描述**: 修复自定义 children 时左右勾选互斥问题
- **PR**: [#1089](https://github.com/sheinsight/shineout-next/pull/1089)
- **影响组件**: Transfer
- **问题原因**: 在自定义 children 时，onSelectChange 回调逻辑不正确，导致左右面板选中状态互斥；同时 TypeScript 类型定义不统一

#### Bug 特征
- 使用自定义 children 渲染时，左侧面板选中项会清空右侧面板的选中状态
- 右侧面板选中项会清空左侧面板的选中状态，选中行为呈现互斥特性
- onSelect 回调函数的 TypeScript 类型定义不一致，造成类型错误
- 影响使用 children 自定义渲染内容的 Transfer 组件

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Transfer
  data={data}
  keygen="id"
  value={value}
  onChange={onChange}
>
  {(props) => {
    return (
      <CustomList 
        {...props}
        onSelected={props.onSelected} // 选中会导致左右互斥
      />
    );
  }}
</Transfer>
```

#### 排查规则
- 搜索使用了 Transfer children 函数的组件实现
- 搜索 Transfer 与 Table 或其他列表组件结合使用的场景
- 搜索在 onSelected 回调中直接传递选中键值的代码

## Breaking Changes

无

## 风险等级

**低**：
- 纯 Bug 修复，无 API 变更
- 修复了自定义 children 时左右选中互斥的问题
- 统一了 TypeScript 类型定义
- 不会影响现有正常工作的代码