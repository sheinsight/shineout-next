# Cascader 组件 3.5.8 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.8
- 包含 Beta 版本: 3.5.8-beta.1 ~ 3.5.8-beta.12
- 发布日期: 2025-01-15

## 详细变更

### 3.5.8-beta.12
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Cascader` 开启动态搜索后部分场景下父禁用子而可选的问题
- **PR**: [#942](https://github.com/sheinsight/shineout-next/pull/942)
- **影响组件**: Cascader
- **问题原因**: 动态搜索场景下，父节点被禁用时，子节点的禁用状态未正确继承

#### Bug 特征
- 开启动态搜索（filter 属性）
- 父节点设置为 disabled
- 搜索结果中子节点仍可选中
- 违反了级联选择器的禁用逻辑

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  filter
  data={[
    {
      value: 'parent',
      disabled: true,
      children: [
        { value: 'child' } // 搜索时仍可选
      ]
    }
  ]}
/>
```

#### 排查规则
- 搜索开启了 `filter` 且有禁用节点的 Cascader
- 搜索父节点设置了 disabled 属性的数据结构
- 搜索依赖父子节点禁用继承关系的业务逻辑

### 3.5.8-beta.8
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: `Cascader` 新增 `disabled` 配置模式，支持实时计算 disabled 状态
- **PR**: [#936](https://github.com/sheinsight/shineout-next/pull/936)
- **影响组件**: Cascader

### 3.5.8-beta.4
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Cascader` 禁用状态下的箭头图标颜色不正确的问题
- **PR**: [#930](https://github.com/sheinsight/shineout-next/pull/930)
- **影响组件**: Cascader
- **问题原因**: 禁用状态下箭头图标未应用正确的禁用样式

### 3.5.8-beta.3
- **变更类型**: 性能优化
- **复现示例**: 无
- **变更描述**: `Cascader` 支持非 hover 的多选模式下，末级节点整个节点区域点击选中 Checkbox
- **PR**: [#927](https://github.com/sheinsight/shineout-next/pull/927)
- **影响组件**: Cascader

### 3.5.8-beta.2
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Cascader` 多选模式下搜索时没有自动展开命中结果的问题（Regression: since v3.1.6）
- **PR**: [#926](https://github.com/sheinsight/shineout-next/pull/926)
- **影响组件**: Cascader
- **问题原因**: 3.1.6 版本后，多选模式下搜索命中的结果未自动展开显示完整路径

#### Bug 特征
- 多选模式（multiple 属性）
- 开启搜索功能
- 搜索结果未自动展开显示
- 该问题是 3.1.6 版本引入的回归问题

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  multiple
  filter
  data={nestedData}
/>
```

#### 排查规则
- 搜索同时设置了 `multiple` 和 `filter` 的 Cascader
- 搜索多选模式下使用搜索功能的场景
- 搜索依赖搜索结果自动展开的业务逻辑

## Breaking Changes

无

## 风险等级

**中**：
- 新增的 disabled 配置模式可能改变禁用逻辑
- 修复了多个搜索相关的问题
- 末级节点点击区域扩大可能影响用户交互习惯

## 版本修复历史

1. **3.5.8-beta.2**：修复多选搜索未自动展开的回归问题
2. **3.5.8-beta.3**：优化末级节点点击区域
3. **3.5.8-beta.4**：修复禁用状态图标颜色
4. **3.5.8-beta.8**：新增 disabled 配置模式
5. **3.5.8-beta.12**：修复动态搜索下的禁用继承问题