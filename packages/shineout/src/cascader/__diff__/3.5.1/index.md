# Cascader 组件 3.5.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.1
- 包含 Beta 版本: 3.5.1-beta.1 ~ 3.5.1-beta.6
- 发布日期: 2024-11-14

## 详细变更

### 3.5.1-beta.6
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Cascader` 在开启 `unmatch` 情况下指定 renderItem 为 string 类型时渲染异常的问题（Regression: since v3.5.0）
- **PR**: [#800](https://github.com/sheinsight/shineout-next/pull/800)
- **影响组件**: Cascader
- **问题原因**: 3.5.0 版本引入 renderCompressed 功能时，对 renderItem 的类型处理不当，导致 string 类型的 renderItem 在 unmatch 模式下渲染异常

#### Bug 特征
- 开启 `unmatch` 属性
- `renderItem` 返回 string 类型
- 选中的值在数据源中不存在时，渲染显示异常
- 该问题是 3.5.0 版本引入的回归问题

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  unmatch
  renderItem="value"  // 或 renderItem={(d) => d.value}
  value={unmatchedValue}
  data={data}
/>
```

#### 排查规则
- 搜索设置了 `unmatch` 属性的 Cascader 组件
- 搜索 `renderItem` 返回 string 类型的 Cascader
- 搜索 `renderItem` 属性直接设置为字符串的 Cascader

### 3.5.1-beta.4
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Cascader` 非虚拟列表情况下搜索内容溢出列表的问题
- **PR**: [#798](https://github.com/sheinsight/shineout-next/pull/798)
- **影响组件**: Cascader
- **问题原因**: 搜索结果列表没有正确处理高度限制，导致内容溢出

#### Bug 特征
- 非虚拟列表模式（未开启 virtual）
- 搜索结果较多时，列表内容溢出容器
- 无法滚动查看全部搜索结果

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  filter  // 开启搜索
  data={largeData}  // 大量数据
  // 未设置 virtual
/>
```

#### 排查规则
- 搜索开启了 `filter` 但未设置 `virtual` 的 Cascader
- 搜索处理大量数据的 Cascader 组件
- 搜索设置了固定高度的 Cascader

### 3.5.1-beta.4（新增功能）
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `Cascader` 单选模式下搜索结果列表支持虚拟列表
- **PR**: [#798](https://github.com/sheinsight/shineout-next/pull/798)
- **影响组件**: Cascader

## Breaking Changes

无

## 风险等级

**中**：
- 修复了 3.5.0 引入的回归问题
- 影响使用 unmatch 配合 string 类型 renderItem 的场景
- 搜索结果列表虚拟化可能改变渲染行为

## 版本修复历史

1. **3.5.1-beta.4**：修复搜索内容溢出问题，新增搜索结果虚拟列表支持
2. **3.5.1-beta.6**：修复 unmatch 模式下 string 类型 renderItem 渲染异常