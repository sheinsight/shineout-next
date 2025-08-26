# Tooltip 组件 3.7.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.5
- 包含 Beta 版本: 3.7.5-beta.1 ~ 3.7.5-beta.11
- 发布日期: 2025-07-11

## 详细变更

### 3.7.5-beta.1
- **变更类型**: 修复问题
- **变更标签**: 样式
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=bbabf2ea-944c-42b6-87ca-eff88071586c](https://shineout-playground.sheincorp.cn/#/playground?code=bbabf2ea-944c-42b6-87ca-eff88071586c)
- **变更描述**: 修复 Tooltip 在 Dropdown 中使用时，'soui-dropdown-item' 的 className 被传递到 Tooltip 的问题
- **PR**: [#1216](https://github.com/sheinsight/shineout-next/pull/1216)
- **影响组件**: Tooltip
- **问题原因**: 组件间的 className 传递机制存在泄漏，导致不相关的样式类被意外应用

#### Bug 特征
- Tooltip 在 Dropdown 组件内使用时会继承不相关的样式类名
- `soui-dropdown-item` 类名被错误地传递给 Tooltip 组件
- 可能导致样式冲突或不期望的视觉效果
- 影响组件间的样式隔离性

**代码模式**：
```tsx
// 容易出现问题的代码结构
<Dropdown>
  <Dropdown.Item>
    <Tooltip tip="提示内容">
      {/* 修复前：Tooltip 会意外获得 soui-dropdown-item 类名 */}
      <span>菜单项内容</span>
    </Tooltip>
  </Dropdown.Item>
</Dropdown>

// 嵌套使用场景
<Dropdown>
  {menuItems.map(item => (
    <Dropdown.Item key={item.id}>
      <Tooltip tip={item.description}>
        <Icon type={item.icon} />
        {item.label}
      </Tooltip>
    </Dropdown.Item>
  ))}
</Dropdown>
```

#### 排查规则
- 搜索在 Dropdown 组件内使用的 Tooltip
- 搜索 Tooltip 的样式异常问题

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复样式类名传递问题，无功能变更
- 完全向后兼容，现有代码无需修改
- 改善了组件间的样式隔离性
- 解决了组件嵌套使用时的样式污染问题