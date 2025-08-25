# Badge 组件 3.5.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.2
- 包含 Beta 版本: 3.5.2-beta.6 ~ 3.5.2-beta.11
- 发布日期: 2024-11-28

## 详细变更

### 3.5.2-beta.6
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 Badge 间距 CSS 变量丢失的问题，将小写的 css token 名称修正为正确的大写格式
- **PR**: [#814](https://github.com/sheinsight/shineout-next/pull/814)
- **影响组件**: Badge
- **问题原因**: CSS 变量名称大小写不匹配导致样式变量丢失，`spacing-6` 应为 `Spacing-6`，`spacing-8` 应为 `Spacing-8`

#### Bug 特征
- Badge 组件的计数器部分（count）和文本部分（text）的间距样式失效
- 表现为计数器内边距和文本左边距无法正确应用主题变量
- 影响所有使用了 Badge 组件的场景，特别是带计数或文本的徽标显示

**代码模式**：
```jsx
// 所有 Badge 组件的使用都可能受到影响
<Badge count={5}>
  <Button>按钮</Button>
</Badge>

<Badge text="新">
  <div>内容区域</div>
</Badge>

// 特别是依赖间距样式的自定义主题场景
<Badge count={99} className="custom-badge">
  <Avatar src="/avatar.jpg" />
</Badge>
```

#### 排查规则
- 搜索所有使用 Badge 组件的代码位置
- 搜索包含 count 属性的 Badge 组件
- 搜索包含 text 属性的 Badge 组件
- 搜索有自定义样式覆盖的 Badge 组件

## Breaking Changes

无

## 风险等级

**低**：
- 该修复是针对 CSS 变量引用错误的问题，修正后恢复了正确的间距样式
- 不涉及 API 变更或行为改变
- 仅影响视觉呈现，修复后样式表现更加统一和正确
- 对于使用默认样式的组件，升级后间距可能会有细微调整

## 版本修复历史

1. **3.5.2-beta.6**：修复 Badge 间距 CSS 变量名称大小写错误，将 `spacing-6` 和 `spacing-8` 修正为 `Spacing-6` 和 `Spacing-8`