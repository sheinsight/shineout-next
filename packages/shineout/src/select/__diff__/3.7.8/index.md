# Select 组件 3.7.8 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.8
- 包含 Beta 版本: 3.7.8-beta.1 ~ 3.7.8-beta.12
- 发布日期: 2025-07-16

## 详细变更

### 3.7.8-beta.8
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 过滤过程中受 `trim` 属性影响，表现与老版本不一致的问题
- **PR**: [#1267](https://github.com/sheinsight/shineout-next/pull/1267)
- **影响组件**: Select
- **问题原因**: trim 属性错误地影响了过滤逻辑，导致与预期行为不一致

#### Bug 特征
- 设置了 `trim` 属性用于去除输入值的首尾空格
- 同时设置了 `onFilter` 进行数据过滤
- 用户输入带空格的搜索词时，过滤行为与预期不符
- trim 不应该影响过滤时的搜索词，但实际上被错误地应用

**代码模式**：
```jsx
// trim 影响过滤行为
<Select
  data={data}
  trim
  onFilter={(text) => (item) => item.includes(text)}
  // 输入 " keyword " 时，实际搜索 "keyword"，导致匹配失败
/>
```

#### 排查规则
- 搜索同时设置了 `trim` 和 `onFilter` 的 Select
- 搜索同时设置了 `trim` 和 `prediction` 的 Select
- 搜索设置了 `trim` 且用户可能输入带空格内容的 Select

### 3.7.8-beta.10
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Pagination` 的 `select` 下拉框在限制了高度的 html 或 body 滚动容器中第一次点击不出现的问题
- **PR**: [#1270](https://github.com/sheinsight/shineout-next/pull/1270)
- **影响组件**: Pagination 中的 Select
- **问题原因**: 在特殊滚动容器环境下，Select 下拉框定位计算异常

#### Bug 特征
- Pagination 组件中的页码选择器（Select）
- html 或 body 设置了固定高度和 overflow: auto
- 第一次点击 Select 时下拉框不显示，第二次点击才正常
- 下拉框定位计算在特殊滚动容器中初始化失败

**代码模式**：
```jsx
// 特殊滚动容器环境
<div style={{ height: '100vh', overflow: 'auto' }}>
  <Pagination
    total={100}
    pageSize={10}
    pageSizeList={[10, 20, 30]}
    // 页码选择器第一次点击不显示
  />
</div>
```

#### 排查规则
- 搜索在固定高度滚动容器内使用的 Pagination 组件
- 搜索 html 或 body 设置了 height 和 overflow 的页面中的 Pagination
- 搜索在 Modal、Drawer 等弹出层中使用的 Pagination

### 3.7.8-beta.12
- **变更类型**: 样式调整
- **复现示例**: 无
- **变更描述**: 修复 `Select` 组件在开启 `columns` 时的内边距样式问题
- **PR**: [#1274](https://github.com/sheinsight/shineout-next/pull/1274)
- **影响组件**: Select

## Breaking Changes

无

## 风险等级

**低**：
- 修复了 trim 属性的行为一致性问题
- 调整了 columns 模式的样式

## 版本修复历史

1. **3.7.8-beta.8**：修复 trim 属性影响过滤行为的问题
2. **3.7.8-beta.10**：修复 Pagination 中 Select 在特殊滚动容器中的显示问题
3. **3.7.8-beta.12**：修复 columns 模式的内边距样式问题