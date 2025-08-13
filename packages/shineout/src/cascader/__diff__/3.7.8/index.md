# Cascader 组件 3.7.8 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.8
- 包含 Beta 版本: 3.7.8-beta.1 ~ 3.7.8-beta.5
- 发布日期: 2025-07-25

## 详细变更

### 3.7.8-beta.3
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Cascader` 用 `renderOptionList` 做全选的场景下，输入框可能不能聚焦的问题
- **PR**: [#1260](https://github.com/sheinsight/shineout-next/pull/1260)
- **影响组件**: Cascader
- **问题原因**: 使用 renderOptionList 自定义渲染选项列表并实现全选功能时，输入框的焦点管理逻辑存在冲突，导致输入框无法正常获取焦点

#### Bug 特征
- 使用 renderOptionList 属性自定义选项列表
- 在自定义列表中实现全选功能
- 点击输入框无法获取焦点
- 无法进行搜索输入操作

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  multiple
  onFilter={handleFilter}
  renderOptionList={(list) => (
    <div>
      <Button onClick={selectAll}>全选</Button>
      {list}
    </div>
  )}
  data={data}
/>
```

#### 排查规则
- 搜索使用 `renderOptionList` 属性的 Cascader 组件
- 搜索实现全选功能的自定义 Cascader
- 搜索同时使用 renderOptionList 和 onFilter 的 Cascader

## Breaking Changes

无

## 风险等级

**中**：
- 修复了特定场景下的输入框焦点问题
- 仅影响使用 renderOptionList 自定义渲染的场景
- 建议测试自定义渲染和搜索功能的组合使用

## 版本修复历史

1. **3.7.8-beta.3**：修复 renderOptionList 场景下输入框无法聚焦的问题