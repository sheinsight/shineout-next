# Cascader 组件 3.7.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.0
- 包含 Beta 版本: 3.7.0-beta.1 ~ 3.7.0-beta.44
- 发布日期: 2025-06-13

## 详细变更

### 3.7.0-beta.17
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `TreeSelect`、`Cascader`、`Select` 增强 compressed 能力，支持更灵活的压缩展示配置
- **PR**: [#1098](https://github.com/sheinsight/shineout-next/pull/1098)
- **影响组件**: Cascader, TreeSelect, Select

### 3.7.0-beta.27
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `TreeSelect`、`Cascader` 的 `beforeChange` 不生效的问题
- **PR**: [#1120](https://github.com/sheinsight/shineout-next/pull/1120)
- **影响组件**: Cascader, TreeSelect
- **问题原因**: beforeChange 回调函数在组件内部未正确调用，导致无法拦截或处理值变更

#### Bug 特征
- 设置了 beforeChange 属性但回调函数不执行
- 无法通过 beforeChange 阻止选择或修改选择值
- beforeChange 返回 false 或 Promise.reject 时值仍然改变

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  beforeChange={(value) => {
    // 这个函数不会被调用
    return false; // 期望阻止选择但实际无效
  }}
  onChange={handleChange}
/>
```

#### 排查规则
- 搜索设置了 `beforeChange` 属性的 Cascader 组件
- 搜索设置了 `beforeChange` 属性的 TreeSelect 组件
- 搜索依赖 beforeChange 进行选择控制的场景

### 3.7.0-beta.31
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `Cascader` 新增 `highlight` 属性，支持开启搜索关键字高亮功能
- **PR**: 无
- **影响组件**: Cascader

### 3.7.0-beta.33
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 Cascader 外部受控打开的场景下，从外部修改 value 导致的面板勾选情况没有及时同步
- **PR**: 无
- **影响组件**: Cascader
- **问题原因**: 受控模式下（设置了 open 属性），外部修改 value 时，下拉面板中的勾选状态未能及时更新，造成显示与实际值不一致

#### Bug 特征
- 设置了 open 属性进行受控
- 面板打开状态下，外部修改 value 属性
- 下拉面板中的勾选状态未更新或延迟更新
- 造成视觉上的选中状态与实际 value 不匹配

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  open={isOpen}  // 受控的打开状态
  value={dynamicValue}  // 外部动态修改的值
  onCollapse={handleCollapse}
/>
```

#### 排查规则
- 搜索设置了 `open` 属性的受控 Cascader 组件
- 搜索在面板打开时会动态修改 value 的 Cascader
- 搜索同时控制 open 和 value 的 Cascader 使用场景

## Breaking Changes

无

## 风险等级

**中**：
- beforeChange 修复可能影响原有的值变更逻辑
- 受控模式下的同步修复可能改变原有的更新时机
- 建议重点测试受控模式和 beforeChange 相关功能

## 版本修复历史

1. **3.7.0-beta.17**：增强 compressed 压缩展示能力
2. **3.7.0-beta.27**：修复 beforeChange 不生效的问题
3. **3.7.0-beta.31**：新增 highlight 搜索高亮属性
4. **3.7.0-beta.33**：修复受控模式下值同步问题