# Cascader 组件 3.6.4 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.4
- 包含 Beta 版本: 3.6.4-beta.1 ~ 3.6.4-beta.8
- 发布日期: 2025-04-18

## 详细变更

### 3.6.4-beta.6
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Cascader` 设置了 expandTrigger 为 hover 后切换高亮路径后但不选中值，二次打开面板时高亮路径与选中值不匹配的问题
- **PR**: [#1070](https://github.com/sheinsight/shineout-next/pull/1070)
- **影响组件**: Cascader
- **问题原因**: expandTrigger 为 hover 模式下，鼠标悬停时会改变高亮路径但不会改变选中值，关闭后再打开面板时，高亮路径未正确重置到选中值的路径

#### Bug 特征
- 设置 expandTrigger="hover" 或 expandTrigger="hover-only"
- 鼠标悬停改变高亮路径但不点击选中
- 关闭面板后再次打开，高亮路径显示为上次悬停的位置而非实际选中值的位置
- 造成用户困惑，不清楚当前实际选中的是哪个选项

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  expandTrigger="hover"  // 或 "hover-only"
  value={selectedValue}
  data={cascaderData}
/>
```

#### 排查规则
- 搜索设置了 `expandTrigger="hover"` 的 Cascader 组件
- 搜索设置了 `expandTrigger="hover-only"` 的 Cascader 组件
- 搜索受控模式（设置了 value 属性）的 hover 触发 Cascader

## Breaking Changes

无

## 风险等级

**中**：
- 修复了 hover 模式下的高亮路径与选中值不一致问题
- 可能影响依赖原有高亮行为的交互逻辑
- 建议测试 hover 触发模式下的交互体验

## 版本修复历史

1. **3.6.4-beta.6**：修复 hover 触发模式下高亮路径与选中值不匹配的问题