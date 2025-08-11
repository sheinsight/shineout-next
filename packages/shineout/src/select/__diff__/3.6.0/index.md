# Select 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.27
- 发布日期: 2025-03-19

## 变更概要

本版本对 Select 组件进行了重要的性能优化和缺陷修复，主要包括：修复 onLoadMore 滚动位置异常、修复 reFocus 属性失效，以及大幅优化大数据量场景下的性能表现。

## 详细变更

### 3.6.0-beta.27
- **修复问题**: 修复 Select 的 onLoadMore 在加载第二页的时候重新打开面板滚动位置异常的问题
- **PR**: [#1000](https://github.com/sheinsight/shineout-next/pull/1000)
- **影响组件**: Select
- **问题原因**: 分页加载后重新打开面板时，滚动位置没有正确恢复到用户之前的浏览位置，影响用户体验

### 3.6.0-beta.20
- **修复问题**: 修复 Select 的 reFocus 属性失效的问题
- **PR**: [#971](https://github.com/sheinsight/shineout-next/pull/971)
- **影响组件**: Select
- **问题原因**: reFocus 属性用于控制选择后是否重新聚焦，但该功能在某些情况下失效

### 3.6.0-beta.10 & 3.6.0-beta.11
- **性能优化**: 优化 Select 大数据量下的树形数据搜索性能
- **性能优化**: 优化 Select 在大数据量下同时被渲染很多个时的页面初始化性能问题
- **PR**: [#877](https://github.com/sheinsight/shineout-next/pull/877)
- **影响组件**: Select
- **优化内容**: 针对大数据量场景进行了算法优化，提升搜索和初始化性能

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-list-select/use-list-select.ts`
- `packages/shineout/src/select/select.tsx`
- 相关性能优化文件

### 关键改动
1. **滚动位置恢复**: 修复了分页加载后面板重新打开时的滚动位置记忆问题
2. **聚焦控制**: 修复了 reFocus 属性的控制逻辑
3. **性能优化**: 优化了大数据量下的虚拟滚动和搜索算法

## 受影响的使用场景

### 核心问题分析
本版本主要解决了三个关键问题：分页加载的用户体验、选择后的焦点控制，以及大数据量场景下的性能问题。这些改进对于企业级应用中的复杂选择场景具有重要意义。

### 场景 1: 分页加载数据的滚动位置
**检查点**: 查使用 onLoadMore 进行分页加载的场景
```jsx
// 需要检查的代码模式
const [data, setData] = useState([]);
const [hasMore, setHasMore] = useState(true);
const [loading, setLoading] = useState(false);

const handleLoadMore = async () => {
  if (loading) return;
  
  setLoading(true);
  try {
    const newData = await fetchMoreData(data.length);
    setData(prev => [...prev, ...newData]);
    setHasMore(newData.length > 0);
  } finally {
    setLoading(false);
  }
};

<Select
  data={data}
  keygen="id"
  format="id"
  renderItem="name"
  onLoadMore={handleLoadMore}
  threshold={10}
  loading={loading}
  placeholder="分页加载选择器"
  // v3.5.x: 加载第二页后重新打开面板，滚动位置重置到顶部
  // v3.6.0: 重新打开面板时能恢复到之前的滚动位置
  style={{ width: 300 }}
/>
```

### 场景 2: 虚拟列表分页场景
**检查点**: 查大数据量虚拟滚动配合分页的场景
```jsx
// 需要检查的代码模式
const [itemList, setItemList] = useState([]);
const [currentPage, setCurrentPage] = useState(1);

<Select
  data={itemList}
  keygen="id"
  format="id"
  renderItem={(item) => `${item.name} (${item.category})`}
  onLoadMore={async () => {
    const nextPageData = await loadPage(currentPage + 1);
    setItemList(prev => [...prev, ...nextPageData]);
    setCurrentPage(prev => prev + 1);
  }}
  // 虚拟滚动配置
  virtual={{
    height: 200,
    itemHeight: 32,
  }}
  // 分页阈值
  threshold={20}
  placeholder="大数据分页选择"
  // 改进：滚动位置在重新打开时保持一致
/>
```

### 场景 3: reFocus 控制场景
**检查点**: 查使用 reFocus 属性控制选择后焦点行为的场景
```jsx
// 需要检查的代码模式
const [selectedValue, setSelectedValue] = useState();
const [shouldRefocus, setShouldRefocus] = useState(true);

<div>
  <label>
    <input 
      type="checkbox" 
      checked={shouldRefocus} 
      onChange={(e) => setShouldRefocus(e.target.checked)} 
    />
    选择后重新聚焦
  </label>
  
  <Select
    data={options}
    keygen="value"
    value={selectedValue}
    onChange={(val) => {
      setSelectedValue(val);
      // 根据业务需求控制是否重新聚焦
    }}
    reFocus={shouldRefocus}
    placeholder="焦点控制选择器"
    // v3.5.x: reFocus 属性可能失效
    // v3.6.0: reFocus 属性正常工作
  />
  
  <input placeholder="下一个输入框" style={{ marginLeft: 10 }} />
</div>
```

### 场景 4: 表单中的焦点流转
**检查点**: 查表单中多个 Select 的焦点流转场景
```jsx
// 需要检查的代码模式
<Form>
  <Form.Item label="省份">
    <Select
      name="province"
      data={provinces}
      keygen="code"
      format="code"
      renderItem="name"
      reFocus={false} // 选择后不重新聚焦，让焦点流转到下一个字段
      onChange={(val) => {
        // 联动加载城市数据
        loadCities(val);
      }}
    />
  </Form.Item>
  
  <Form.Item label="城市">
    <Select
      name="city"
      data={cities}
      keygen="code"
      format="code" 
      renderItem="name"
      reFocus={false}
      placeholder="请先选择省份"
    />
  </Form.Item>
  
  <Form.Item label="区域">
    <Select
      name="district"
      data={districts}
      keygen="code"
      format="code"
      renderItem="name"
      reFocus={true} // 最后一个字段选择后可以重新聚焦
    />
  </Form.Item>
</Form>
```

### 场景 5: 大数据量树形结构搜索
**检查点**: 查大数据量树形数据搜索的场景
```jsx
// 需要检查的代码模式
interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  path: string[];
}

const [treeData] = useState<TreeNode[]>(() => {
  // 生成大量树形数据（如组织架构）
  return generateLargeTreeData(10000); // 1万个节点
});

<Select
  data={treeData}
  keygen="id"
  format="id"
  renderItem={(node) => `${node.path.join(' / ')} / ${node.name}`}
  onFilter={(text, node) => {
    // 树形搜索：在节点名称和路径中搜索
    return node.name.includes(text) || 
           node.path.some(p => p.includes(text));
  }}
  placeholder="搜索组织架构"
  // v3.5.x: 大数据量搜索性能较差
  // v3.6.0: 搜索性能显著提升
  style={{ width: 400 }}
/>
```

### 场景 6: 多个 Select 同时渲染的性能场景
**检查点**: 查页面中同时渲染多个大数据 Select 的场景
```jsx
// 需要检查的代码模式
const [configData] = useState(() => ({
  departments: generateLargeData(5000),
  employees: generateLargeData(10000),
  projects: generateLargeData(3000),
  skills: generateLargeData(2000),
}));

<div className="form-grid">
  {/* 多个大数据量 Select 同时渲染 */}
  <div className="form-row">
    <Select
      data={configData.departments}
      keygen="id"
      placeholder="选择部门"
      virtual={{ height: 200 }}
    />
    <Select
      data={configData.employees}  
      keygen="id"
      placeholder="选择员工"
      virtual={{ height: 200 }}
    />
  </div>
  
  <div className="form-row">
    <Select
      data={configData.projects}
      keygen="id"
      placeholder="选择项目"
      virtual={{ height: 200 }}
    />
    <Select
      data={configData.skills}
      keygen="id"
      placeholder="选择技能"
      virtual={{ height: 200 }}
    />
  </div>
  
  {/* v3.5.x: 页面初始化时性能问题明显 */}
  {/* v3.6.0: 页面初始化性能大幅提升 */}
</div>
```

### 场景 7: 动态数据更新与滚动位置
**检查点**: 查动态更新数据时的滚动位置保持场景
```jsx
// 需要检查的代码模式
const [searchResults, setSearchResults] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const handleSearch = async (keyword) => {
  setIsLoading(true);
  try {
    // 第一页数据
    const firstPage = await searchData(keyword, 1);
    setSearchResults(firstPage);
  } finally {
    setIsLoading(false);
  }
};

const handleLoadMore = async () => {
  const nextPage = await searchData(lastKeyword, currentPage + 1);
  setSearchResults(prev => [...prev, ...nextPage]);
};

<Select
  data={searchResults}
  keygen="id"
  format="id"
  renderItem="title"
  onFilter={handleSearch}
  onLoadMore={handleLoadMore}
  loading={isLoading}
  placeholder="搜索并分页加载"
  // 用户在搜索结果中滚动浏览
  // 关闭面板后重新打开，应该记住滚动位置
/>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 性能优化和缺陷修复，提升用户体验和组件稳定性