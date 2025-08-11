# Select 组件 3.5.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.6
- 包含 Beta 版本: 3.5.6-beta.1 ~ 3.5.6-beta.5
- 发布日期: 2025-01-06

## 变更概要

本版本修复了 Select 组件在多选模式下，开启过滤功能且使用受控模式时，自动聚焦失效的问题。

## 详细变更

### 3.5.6-beta.5
- **修复问题**: 修复 Select 多选模式下，开启 onFilter 后且使用 open 做面板受控打开时，自动聚焦失效的问题
- **PR**: [#891](https://github.com/sheinsight/shineout-next/pull/891)
- **影响组件**: Select
- **问题原因**: 在多选模式下，当同时使用 onFilter 和 open 属性进行受控时，组件的自动聚焦机制被破坏，导致用户无法正常进行搜索输入

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-list-select/use-list-select.ts`

### 关键改动
修复了多选模式下受控面板与过滤搜索的交互逻辑，确保在面板受控打开时输入框能正确获得焦点。

## 受影响的使用场景

### 核心问题分析
在多选模式下，用户期望能够搜索过滤选项。当使用 `open` 属性控制面板显示状态，并且开启了 `onFilter` 搜索功能时，输入框应该在面板打开时自动获得焦点，便于用户立即开始输入搜索内容。

### 场景 1: 多选受控面板搜索
**检查点**: 查多选模式下同时使用 onFilter 和 open 属性的场景
```jsx
// 需要检查的代码模式
const [selectedValues, setSelectedValues] = useState<string[]>([]);
const [open, setOpen] = useState(false);
const [searchText, setSearchText] = useState('');

<Select
  multiple
  data={data}
  keygen="id"
  format="id"
  renderItem="name"
  value={selectedValues}
  onChange={setSelectedValues}
  open={open}
  onOpenChange={setOpen}
  onFilter={(text, d) => {
    setSearchText(text);
    return d.name.toLowerCase().includes(text.toLowerCase());
  }}
  placeholder="多选搜索"
/>

// 手动控制面板打开
const handleOpenPanel = () => {
  setOpen(true);
  // 3.5.5 版本：面板打开后输入框不会自动聚焦
  // 3.5.6 版本：面板打开后输入框会自动聚焦
};
```

### 场景 2: 表单中的多选搜索
**检查点**: 查表单中使用多选搜索且受控面板的场景
```jsx
// 需要检查的代码模式
const [formValue, setFormValue] = useState({ tags: [] });
const [panelOpen, setPanelOpen] = useState(false);

<Form value={formValue} onChange={setFormValue}>
  <Form.Item label="标签">
    <Select
      name="tags"
      multiple
      data={tagOptions}
      keygen="value"
      format="value"
      renderItem="label"
      open={panelOpen}
      onOpenChange={setPanelOpen}
      onFilter={(text, d) => d.label.includes(text)}
      placeholder="选择标签"
      clearable
    />
  </Form.Item>
  
  {/* 外部按钮控制面板打开 */}
  <Button onClick={() => setPanelOpen(true)}>
    打开标签选择器
  </Button>
</Form>
```

### 场景 3: 复杂数据结构的多选搜索
**检查点**: 查使用复杂对象数据且开启多选搜索的受控场景
```jsx
// 需要检查的代码模式
interface User {
  id: string;
  name: string;
  department: string;
  email: string;
}

const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
const [open, setOpen] = useState(false);

<Select<User, string>
  multiple
  data={users}
  keygen="id"
  format="id"
  value={selectedUsers}
  onChange={setSelectedUsers}
  open={open}
  onOpenChange={setOpen}
  onFilter={(text, user) => {
    // 支持按姓名、部门、邮箱搜索
    return user.name.includes(text) ||
           user.department.includes(text) ||
           user.email.includes(text);
  }}
  renderItem={(user) => (
    <div>
      <div style={{ fontWeight: 'bold' }}>{user.name}</div>
      <div style={{ fontSize: '12px', color: '#666' }}>
        {user.department} - {user.email}
      </div>
    </div>
  )}
  placeholder="选择用户"
/>
```

### 场景 4: 动态数据加载的多选搜索
**检查点**: 查异步数据加载配合多选搜索的受控场景
```jsx
// 需要检查的代码模式
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [open, setOpen] = useState(false);
const [selectedItems, setSelectedItems] = useState([]);

const handleFilter = async (text) => {
  if (!text) return true;
  
  setLoading(true);
  try {
    const results = await searchAPI(text);
    setData(results);
  } finally {
    setLoading(false);
  }
  return true;
};

<Select
  multiple
  data={data}
  keygen="id"
  format="id"
  value={selectedItems}
  onChange={setSelectedItems}
  open={open}
  onOpenChange={setOpen}
  onFilter={handleFilter}
  loading={loading}
  placeholder="搜索并选择"
  renderItem="name"
/>

// 条件触发面板打开
const handleConditionalOpen = () => {
  if (data.length > 0) {
    setOpen(true);
    // 期望面板打开后能立即搜索
  }
};
```

### 场景 5: 键盘操作优化场景
**检查点**: 查依赖键盘操作的多选搜索场景
```jsx
// 需要检查的代码模式
const [open, setOpen] = useState(false);
const [value, setValue] = useState([]);

<Select
  multiple
  data={options}
  keygen="value"
  value={value}
  onChange={setValue}
  open={open}
  onOpenChange={setOpen}
  onFilter={(text, d) => d.label.includes(text)}
  onKeyDown={(e) => {
    // 快捷键打开面板
    if (e.key === 'Enter' && !open) {
      setOpen(true);
      // 期望面板打开后输入框立即获得焦点
      // 用户可以马上开始搜索，无需额外点击
    }
  }}
  placeholder="按 Enter 打开并搜索"
/>

// 全局快捷键控制
useEffect(() => {
  const handleGlobalKey = (e) => {
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      setOpen(true);
      // 期望自动聚焦到搜索框
    }
  };
  
  document.addEventListener('keydown', handleGlobalKey);
  return () => document.removeEventListener('keydown', handleGlobalKey);
}, []);
```

### 场景 6: 条件渲染与搜索结合
**检查点**: 查条件渲染情况下的多选搜索场景
```jsx
// 需要检查的代码模式
const [showAdvanced, setShowAdvanced] = useState(false);
const [open, setOpen] = useState(false);

{showAdvanced && (
  <Select
    multiple
    data={advancedOptions}
    keygen="id"
    open={open}
    onOpenChange={setOpen}
    onFilter={(text, item) => item.name.includes(text)}
    placeholder="高级选项搜索"
    // 组件首次渲染时就打开面板
    // 期望立即可以搜索
  />
)}

// 切换到高级模式时自动打开搜索
const handleToggleAdvanced = () => {
  setShowAdvanced(true);
  // 延迟确保组件已渲染
  setTimeout(() => setOpen(true), 0);
};
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了用户体验问题，改善了多选搜索的交互流畅性