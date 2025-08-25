# Dropdown 组件 3.7.8 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.8
- 包含 Beta 版本: 3.7.8-beta.1 ~ 3.7.8-beta.5
- 发布日期: 2025-07-25

## 详细变更

### 3.7.8-beta.5
- **变更类型**: 修复问题
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=abc63795-007b-4ee2-ae7c-34815a240f66](https://shineout-playground.sheincorp.cn/#/playground?code=abc63795-007b-4ee2-ae7c-34815a240f66)
- **变更描述**: 修复 Dropdown 的 trigger 为 hover 且设置 absolute 时，鼠标移入下拉框后下拉框自动消失的问题
- **PR**: [#1262](https://github.com/sheinsight/shineout-next/pull/1262)
- **影响组件**: Dropdown
- **问题原因**: 3.7.5-beta.3 版本的修复（PR #1218）在 hover 事件处理中增加了 DOM 包含关系检查，但只检查了触发元素，未考虑鼠标移入下拉框内容区域的情况，导致 absolute 定位的下拉框（非 DOM 父子关系）在鼠标移入时被意外关闭

#### Bug 特征
- 下拉框配置了 `trigger="hover"` 和 `absolute` 属性
- 鼠标悬浮在触发元素上时下拉框正常打开
- 鼠标从触发元素移入下拉框内容区域时，下拉框立即消失
- 问题仅在 absolute 定位模式下出现（因为 absolute 模式下下拉框不在触发元素的 DOM 树中）

**代码模式**：
```jsx
<Dropdown
  trigger="hover"
  absolute  // 关键属性组合
  data={[...]}
>
  <Button>悬浮触发</Button>
</Dropdown>
```

#### 排查规则
- 搜索同时设置了 `trigger="hover"` 和 `absolute` 的 Dropdown 组件
- 搜索在鼠标悬浮交互中使用的 Dropdown 组件
- 搜索 `<Dropdown.*trigger.*hover.*absolute` 代码模式
- 搜索 `<Dropdown.*absolute.*trigger.*hover` 代码模式

## Breaking Changes

无

## 风险等级

**中**：
- 这是一个回归问题修复，影响特定属性组合的用户交互体验
- 仅影响同时使用 `trigger="hover"` 和 `absolute` 的 Dropdown 组件
- 不会导致代码报错，但会影响用户交互体验
- 修复后恢复了正常的 hover 交互行为

## 版本修复历史

1. **3.7.5-beta.3**：修复 Dropdown 组件在开启 hover 模式时鼠标移入非 DOM 包含关系元素导致意外触发打开列表的问题（PR #1218），但引入了新的回归问题
2. **3.7.8-beta.5**：修复上述修复引入的回归问题，在 hover 事件处理中同时检查触发元素和弹出框元素的包含关系