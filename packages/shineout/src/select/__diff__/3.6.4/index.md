# Select 组件 3.6.4 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.4
- 包含 Beta 版本: 3.6.4-beta.1 ~ 3.6.4-beta.8
- 发布日期: 2025-04-16

## 详细变更

### 3.6.4-beta.2
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 搜索内容后选项被遮挡的问题
- **PR**: [#1066](https://github.com/sheinsight/shineout-next/pull/1066)
- **影响组件**: Select
- **问题原因**: 搜索后下拉面板的滚动位置计算错误，导致部分选项被遮挡

#### Bug 特征
- 开启搜索功能（onFilter）
- 输入关键字搜索后，搜索结果的首个或末尾选项可能被遮挡
- 需要手动滚动才能看到被遮挡的选项

**代码模式**：
```jsx
// 搜索后选项被遮挡
<Select
  data={largeDataList}
  onFilter={(text) => (item) => item.name.includes(text)}
  renderItem="name"
  // 搜索后第一个匹配项可能被遮挡
/>
```

#### 排查规则
- 搜索同时设置了 `onFilter` 且 `data` 数组长度大于 50 的 Select
- 搜索同时设置了 `onFilter` 且位于 Modal/Drawer/Popover 内的 Select
- 搜索同时设置了 `onFilter` 且父容器有 `overflow: hidden` 或 `overflow: auto` 的 Select

### 3.6.4-beta.3
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 开启过滤后打开面板快速再次聚焦时可能清空输入框文本内容的问题
- **PR**: [#1066](https://github.com/sheinsight/shineout-next/pull/1066)
- **影响组件**: Select
- **问题原因**: onBlur 事件延迟执行（400ms）与重新聚焦的时机冲突，导致输入框内容被错误清空

#### Bug 特征
- 开启过滤功能（onFilter）
- 在输入搜索文本后，点击下拉选项区域（不是选项本身）
- 在 400ms 内再次点击输入框重新聚焦
- 已输入的搜索文本被意外清空
- 单选模式下更容易触发（因为有 defaultValue 或 value 时会回显）

**代码模式**：
```jsx
// onBlur 延迟 400ms 执行，快速重新聚焦会清空文本
<Select
  defaultValue="red"  // 有默认值时更容易触发
  data={['red', 'orange', 'yellow', 'green']}
  onFilter={text => d => d.indexOf(text) > -1}
  clearable
  // 输入搜索文本后，400ms 内快速重新聚焦会清空
/>
```

#### 排查规则
- 搜索同时设置了 `onFilter` 和 `defaultValue` 的单选 Select
- 搜索同时设置了 `onFilter` 和 `clearable` 且有初始值的 Select
- 搜索同时设置了 `onFilter` 且位于 Form 表单内有默认值的 Select
- 搜索同时设置了 `onFilter` 且用户交互频繁的场景（如搜索框、快速筛选等）

## Breaking Changes

无

## 风险等级

**低**：
- 修复了搜索相关的交互问题
- 不影响正常使用场景
- 提升了用户体验

## 版本修复历史

1. **3.6.4-beta.2**：修复搜索后选项被遮挡的问题
2. **3.6.4-beta.3**：修复快速聚焦时搜索文本被清空的问题