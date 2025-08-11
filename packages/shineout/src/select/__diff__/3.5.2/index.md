# Select 组件 3.5.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.2
- 包含 Beta 版本: 3.5.2-beta.1 ~ 3.5.2-beta.11
- 发布日期: 2024-11-28

## 变更概要

本版本修复了 Select 组件在开启 `filterSameChange` 属性后，单选模式下选择重复项无法关闭面板的问题。

## 详细变更

### 3.5.2-beta.9
- **修复问题**: 修复 Select 开启 `filterSameChange` 后单选模式下选择重复项无法关闭面板的问题
- **PR**: [#819](https://github.com/sheinsight/shineout-next/pull/819)
- **影响组件**: Select
- **问题原因**: 当 `filterSameChange` 为 true 时，选择相同项不会触发 onChange，但面板关闭逻辑依赖于 onChange 的触发

## 代码变更分析

### 修改文件
- `packages/hooks/src/components/use-list-select/use-list-select.ts`

### 关键改动
修复了在 `filterSameChange` 开启时的面板关闭逻辑，确保即使选择相同项时面板也能正确关闭。

## 受影响的使用场景

### 核心问题分析
`filterSameChange` 属性用于过滤掉相同的选择，避免触发不必要的 onChange 事件。但在单选模式下，用户可能会点击已选中的选项来关闭下拉面板，这时需要确保面板能正确关闭。

### 场景 1: 单选模式下重复选择
**检查点**: 查使用 filterSameChange 且为单选模式的 Select 组件
```jsx
// 需要检查的代码模式
const [value, setValue] = useState('option1');

<Select
  data={['option1', 'option2', 'option3']}
  keygen
  value={value}
  onChange={setValue}
  filterSameChange
  placeholder="Select an option"
/>

// 在表单中使用
<Form>
  <Form.Item label="Category">
    <Select
      name="category"
      data={categories}
      keygen="id"
      format="id"
      renderItem="name"
      filterSameChange
      placeholder="Select category"
    />
  </Form.Item>
</Form>
```

### 场景 2: 带自定义渲染的单选
**检查点**: 查使用 filterSameChange 并有自定义渲染的场景
```jsx
// 需要检查的代码模式
interface DataItem {
  id: string;
  name: string;
  icon: string;
}

<Select
  data={data}
  keygen="id"
  format="id"
  value={selectedId}
  onChange={setSelectedId}
  filterSameChange
  renderItem={(d) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={d.icon} style={{ width: 20, marginRight: 8 }} />
      <span>{d.name}</span>
    </div>
  )}
  placeholder="Select item"
/>
```

### 场景 3: 受控模式下的重复选择
**检查点**: 查完全受控模式下使用 filterSameChange 的场景
```jsx
// 需要检查的代码模式
const [value, setValue] = useState<string>();
const [open, setOpen] = useState(false);

<Select
  data={options}
  keygen
  value={value}
  onChange={(v) => {
    // v3.5.1 版本选择相同项时面板不会关闭
    // v3.5.2 版本已修复
    setValue(v);
    // 可能需要手动控制面板关闭
    setOpen(false);
  }}
  open={open}
  onOpenChange={setOpen}
  filterSameChange
  placeholder="Controlled select"
/>
```

### 场景 4: 搜索过滤模式下的重复选择
**检查点**: 查同时使用 onFilter 和 filterSameChange 的场景
```jsx
// 需要检查的代码模式
<Select
  data={data}
  keygen="value"
  format="value"
  value={value}
  onChange={setValue}
  filterSameChange
  onFilter={(text, d) => d.value.toLowerCase().includes(text.toLowerCase())}
  placeholder="Type to search"
/>

// 异步搜索场景
<Select
  data={searchResults}
  keygen="id"
  value={selectedId}
  onChange={setSelectedId}
  filterSameChange
  onFilter={(text) => {
    // 异步搜索
    handleSearch(text);
    return true;
  }}
  loading={isSearching}
/>
```

### 场景 5: 表单验证场景
**检查点**: 查在表单验证中使用 filterSameChange 的场景
```jsx
// 需要检查的代码模式
<Form
  onSubmit={handleSubmit}
  value={formValue}
  onChange={setFormValue}
>
  <Form.Item 
    label="Status" 
    required
    rules={[{ required: true, message: 'Please select status' }]}
  >
    <Select
      name="status"
      data={['Active', 'Inactive', 'Pending']}
      keygen
      filterSameChange
      placeholder="Select status"
      clearable
    />
  </Form.Item>
  
  <Form.Item label="Priority">
    <Select
      name="priority"
      data={[
        { value: 1, label: 'Low' },
        { value: 2, label: 'Medium' },
        { value: 3, label: 'High' }
      ]}
      keygen="value"
      format="value"
      renderItem="label"
      filterSameChange
      defaultValue={2}
    />
  </Form.Item>
</Form>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了交互体验问题，不影响功能逻辑