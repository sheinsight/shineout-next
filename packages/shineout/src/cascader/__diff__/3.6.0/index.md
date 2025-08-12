# Cascader 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.30
- 发布日期: 2025-03-18

## 详细变更

### 3.6.0-beta.28
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Cascader` mode=0时，外部动态修改data后导致的选中结果与勾选的显示情况不一致的问题
- **PR**: [#999](https://github.com/sheinsight/shineout-next/pull/999)
- **影响组件**: Cascader
- **问题原因**: mode=0（返回完全选中的节点）模式下，动态修改数据源后，内部状态未正确更新，导致选中结果和勾选状态不同步

#### Bug 特征
- 设置 mode=0（返回完全选中的节点，包含父节点）
- 动态修改 data 属性
- 选中结果显示与实际勾选状态不一致
- 可能出现已选中但未勾选，或已勾选但未选中的情况

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  mode={0}
  multiple
  data={dynamicData} // 动态变化的数据
  value={selectedValue}
/>
```

#### 排查规则
- 搜索设置了 `mode={0}` 的 Cascader 组件
- 搜索 data 属性会动态更新的 Cascader
- 搜索依赖数据源动态变化的多选 Cascader

### 3.6.0-beta.9
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `Cascader` 新增 `emptyText` 属性，支持自定义空数据时的下拉列表内容
- **PR**: [#971](https://github.com/sheinsight/shineout-next/pull/971)
- **影响组件**: Cascader

## Breaking Changes

无

## 风险等级

**中**：
- mode=0 模式下的数据同步问题可能影响多选场景
- 动态数据更新的场景需要重点测试
- 建议升级后验证数据动态变化时的选中状态

## 版本修复历史

1. **3.6.0-beta.9**：新增 emptyText 属性支持自定义空数据提示
2. **3.6.0-beta.28**：修复 mode=0 时动态数据更新导致的状态不一致问题