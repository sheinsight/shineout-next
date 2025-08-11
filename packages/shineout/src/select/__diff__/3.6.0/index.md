# Select 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.30
- 发布日期: 2025-03-20

## 详细变更

### 3.6.0-beta.2
- **变更类型**: 性能优化
- **复现示例**: 无
- **变更描述**: 优化 `Select` 和 `TreeSelect` 在大数据量下同时被渲染很多个时的页面初始化性能问题
- **影响组件**: Select, TreeSelect
- **问题原因**: 初始化时渲染了不必要的 AbsoluteList 组件，大数据量场景下多个组件同时渲染导致性能问题

#### 性能问题特征
- 页面同时存在多个 Select/TreeSelect 组件
- 每个组件的数据量较大（数百至数千条）
- 初始化时即使面板未打开也会渲染 AbsoluteList

**代码模式**：
```jsx
// 页面同时渲染多个大数据量的 Select
const LargeDataList = () => {
  const data = Array.from({ length: 5000 }, (_, i) => `Option ${i}`);
  
  return (
    <>
      {[1, 2, 3, 4, 5].map(index => (
        <Select key={index} data={data} />
      ))}
    </>
  );
};
```

#### 排查规则
- 统计单个文件中 Select 或 TreeSelect 组件出现次数 >= 3
- 搜索 Table.Column 或 columns 配置中 render 函数返回 Select
- 搜索 map 循环中渲染 Select 组件的代码模式
- 搜索 data 属性使用变量且注释提到大数据量的 Select

### 3.6.0-beta.2（树形数据搜索优化）
- **变更类型**: 性能优化
- **复现示例**: 无
- **变更描述**: 优化 TreeSelect 和 Select 树形数据的搜索性能
- **影响组件**: Select（树形模式）, TreeSelect
- **问题原因**: 原有的树形数据搜索算法效率低，在大数据量下搜索延迟明显

#### 性能问题特征
- 页面同时存在多个 Select/TreeSelect 组件
- 每个组件的数据量较大（数百至数千条）
- 初始化时即使面板未打开也会渲染 AbsoluteList

**代码模式**：
```jsx
// 树形数据搜索性能问题
const treeData = [
  {
    id: '1',
    title: 'Node 1',
    children: [
      { id: '1-1', title: 'Node 1-1' },
      // ... 大量嵌套数据
    ]
  },
  // ... 数千个节点
];

<Select
  data={treeData}
  onFilter={(text) => (item) => item.title.includes(text)}
  keygen="id"
  renderItem="title"
/>
```

#### 排查规则
- 搜索 data 属性值包含 children 字段的 Select 组件
- 搜索同时有 keygen、renderItem、onFilter 属性的 Select
- 搜索树形数据结构的 Select 或 TreeSelect 组件
- 搜索使用 treeData 属性的 Select

### 3.6.0-beta.26
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 TreeSelect & Select 弹出层在 Table 中使用时，可能遇到弹出层触底滚动后继续滚动时意外的继续滚动导致位置偏移的问题
- **影响组件**: Select, TreeSelect

#### Bug 特征
- Select/TreeSelect 组件在 Table 单元格中使用
- Table 容器有滚动条
- 下拉面板内容较多，有内部滚动
- 当下拉面板滚动到底部后继续滚动，会触发 Table 容器滚动

**代码模式**：
```jsx
// 在 Table 中使用 Select
<Table>
  <Table.Column
    title="选择"
    render={(rowData) => (
      <Select
        data={longDataList}
        value={rowData.selected}
        onChange={(v) => handleChange(rowData.id, v)}
      />
    )}
  />
</Table>
```

#### 排查规则
- 搜索 Table.Column 的 render 函数中包含 Select 组件
- 搜索 Table 设置了 height 或 maxHeight 且内部有 Select
- 搜索 columns 配置中 render 返回 Select 的情况
- 搜索 Table 内 Select 的数据量较大的场景

### 3.6.0-beta.29
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 组件 `onLoadMore` 在加载第二页的时候重新打开面板滚动位置异常的问题
- **PR**: [#1000](https://github.com/sheinsight/shineout-next/pull/1000)
- **影响组件**: Select

#### Bug 特征
- 使用了 `onLoadMore` 属性实现分页加载
- 加载第二页或更多页数据后
- 关闭并重新打开下拉面板
- 滚动位置被重置而不是保持在之前的位置

**代码模式**：
```jsx
// 分页加载场景
const [data, setData] = useState(firstPageData);
const [loading, setLoading] = useState(false);

<Select
  data={data}
  loading={loading}
  onLoadMore={() => {
    setLoading(true);
    loadNextPage().then(newData => {
      setData([...data, ...newData]);
      setLoading(false);
    });
  }}
  value={value}
  onChange={onChange}
/>
// 1. 滚动到底部触发加载第二页
// 2. 关闭面板
// 3. 重新打开面板，滚动位置异常（应保持在用户之前的位置）
```

#### 排查规则
- 搜索设置了 onLoadMore 属性的 Select 组件
- 搜索同时有 onLoadMore 和 loading 属性的 Select
- 搜索 onLoadMore 函数中更新数据的代码模式
- 搜索使用分页变量（hasMore、page、pageSize）的 Select

## Breaking Changes

无

## 风险等级

**中**：
- 性能优化改变了组件初始化逻辑，可能影响依赖原有渲染时机的代码
- 滚动行为的修改可能影响用户体验
- Table 中的滚动问题修复可能影响嵌套滚动场景

## 版本修复历史

1. **3.6.0-beta.2**：优化大数据量下的初始化性能，延迟渲染 AbsoluteList
2. **3.6.0-beta.2**：优化树形数据搜索算法性能
3. **3.6.0-beta.26**：修复 Table 中使用时的滚动穿透问题
4. **3.6.0-beta.29**：修复 onLoadMore 分页加载后滚动位置异常