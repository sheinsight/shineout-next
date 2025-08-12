# Select 组件 3.7.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.6
- 包含 Beta 版本: 3.7.6-beta.1 ~ 3.7.6-beta.4
- 发布日期: 2025-07-02

## 详细变更

### 3.7.6-beta.2
- **变更类型**: 修复问题
- **复现示例**: 
```
import React from 'react';
import { Form, Select, Switch, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<string, string>;

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  const handleFilter: SelectProps['onFilter'] = (v) => (d) => d.indexOf(v) >= 0;
  const [highlight, setHighlight] = React.useState(true);

  return (
    <div>
      <Form>
        <Form.Item label='高亮关键字' labelWidth={72}>
          <Switch value={highlight} onChange={setHighlight} />
        </Form.Item>
      </Form>

      <Select
        width={200}
        data={data}
        keygen
        placeholder='Select Color'
        onFilter={handleFilter}
        clearable
        renderItem={(d) => {
          return (
            <div>
              <span>{d}</span>
            </div>
          );
        }}
        highlight={highlight}
      />
    </div>
  );
};
```
- **变更描述**: 修复 `Select` 开启 `highlight` 后在 `renderItem` 中渲染非单层 dom 结构功能失效的问题
- **PR**: [#1232](https://github.com/sheinsight/shineout-next/pull/1232)
- **影响组件**: Select
- **问题原因**: highlight 功能的 DOM 遍历逻辑没有正确处理嵌套结构

#### Bug 特征
- 待补充复现示例

**代码模式**：
```jsx
// highlight + 复杂 renderItem
<Select
  data={data}
  highlight
  onFilter={(text) => (item) => item.name.includes(text)}
  renderItem={(item) => (
    <div>
      <span>{item.name}</span>
      <span>{item.description}</span>
    </div>
  )}
  // 嵌套 DOM 结构时高亮失效
/>
```

#### 排查规则
- 搜索同时设置了 `highlight` 和 `renderItem` 返回 JSX 元素的 Select
- 搜索同时设置了 `highlight` 且 `renderItem` 返回包含多个子元素的 Select
- 搜索同时设置了 `highlight` 且 `renderItem` 使用自定义组件的 Select

### 3.7.6-beta.4
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 开启 `onLoadMore` 加载新数据时列表重置到第一条的问题
- **PR**: [#1237](https://github.com/sheinsight/shineout-next/pull/1237)
- **影响组件**: Select
- **问题原因**: 加载更多数据后，滚动位置被错误重置

#### Bug 特征
- 待补充复现示例

**代码模式**：
```jsx
// onLoadMore 滚动位置重置问题
<Select
  data={data}
  onLoadMore={handleLoadMore}
  // 加载更多数据后，列表会跳回顶部
/>
```

#### 排查规则
- 搜索设置了 `onLoadMore` 的 Select
- 搜索同时设置了 `onLoadMore` 和 `virtual` 的 Select
- 搜索同时设置了 `onLoadMore` 且数据源会动态追加的 Select

## Breaking Changes

无

## 风险等级

**低**：
- 修复了特定功能的问题
- 不影响基础功能使用

## 版本修复历史

1. **3.7.6-beta.2**：修复 highlight 在复杂 renderItem 下失效的问题
2. **3.7.6-beta.3**：修复 onLoadMore 加载数据后列表位置重置的问题