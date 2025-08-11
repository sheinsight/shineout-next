# Select 组件 3.5.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.2
- 包含 Beta 版本: 3.5.2-beta.1 ~ 3.5.2-beta.11
- 发布日期: 2024-11-28

## 详细变更

### 3.5.2-beta.2
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 组件在开启 `absolute` 属性后，多选模式下选择内容换行后面板位置不更新的问题
- **PR**: [#804](https://github.com/sheinsight/shineout-next/pull/804)
- **影响组件**: Select
- **问题原因**: 在多选模式下，当选中的标签内容发生换行时，没有触发 AbsoluteList 组件的位置重新计算，导致下拉面板位置与输入框错位

#### Bug 特征
- 设置了 `absolute` 属性且为 `multiple` 模式
- 选中的标签总宽度超过组件宽度导致换行
- 换行后组件高度变化，但 AbsoluteList 的位置没有更新

**代码模式**：
```jsx
// Bug 复现代码
<Select
  absolute
  multiple
  width={200}
  data={['选项一', '选项二', '选项三', '选项四', '选项五']}
  value={['选项一', '选项二', '选项三', '选项四']}
  onChange={handleChange}
/>
```

#### 排查规则
- 搜索同时包含 `absolute` 和 `multiple` 属性的 Select 组件
- 搜索设置了 `multiple` 和 `width` 属性的 Select 组件
- 搜索在 Modal、Drawer、Popover 内部使用的多选 Select
- 搜索父容器有宽度限制的多选 Select 组件

### 3.5.2-beta.3
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 开启创建选项后无法选中创建内容的问题
- **PR**: [#807](https://github.com/sheinsight/shineout-next/pull/807)
- **影响组件**: Select
- **问题原因**: v3.4.4 版本引入的回归问题，在处理 onCreate 创建的选项时，preventDefault 逻辑判断错误，限制了只在 createdData 存在时才阻止默认事件

#### Bug 特征
- 设置了 `absolute` 属性且为 `multiple` 模式
- 选中的标签总宽度超过组件宽度导致换行
- 换行后组件高度变化，但 AbsoluteList 的位置没有更新

**代码模式**：
```jsx
// Bug 复现代码
<Select
  data={['红色', '蓝色', '绿色']}
  onCreate={true}
  onFilter={text => item => item.indexOf(text) >= 0}
  value={value}
  onChange={handleChange}
/>
// 用户输入 "黄色" 后，点击创建的 "黄色" 选项无法选中
```

#### 排查规则
- 搜索设置了 `onCreate` 属性的 Select 组件
- 搜索同时包含 `onCreate` 和 `onFilter` 属性的 Select 组件
- 搜索 Form 组件内部使用 `onCreate` 的 Select
- 搜索 `onCreate={true}` 或 `onCreate` 为函数的用法

### 3.5.2-beta.4
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 默认事件引起的点击异常问题
- **PR**: [#810](https://github.com/sheinsight/shineout-next/pull/810)
- **影响组件**: Select
- **问题原因**: v3.4.4 版本引入的回归问题，preventDefault 函数中错误地添加了 `if (!createdData) return;` 判断，导致在没有创建数据时不阻止默认事件，引发焦点异常

#### Bug 特征
- 设置了 `absolute` 属性且为 `multiple` 模式
- 选中的标签总宽度超过组件宽度导致换行
- 换行后组件高度变化，但 AbsoluteList 的位置没有更新

**代码模式**：
```jsx
// Bug 复现代码
<Select
  data={data}
  onFilter={text => item => item.label.indexOf(text) >= 0}
  value={value}
  onChange={handleChange}
/>
// 点击下拉选项时，输入框意外失去焦点
```

#### 排查规则
- 搜索设置了 `onFilter` 属性的 Select 组件
- 搜索 Modal、Drawer 内包含 `onFilter` 的 Select
- 搜索同一文件中多个带 `onFilter` 的 Select 组件

### 3.5.2-beta.10
- **变更类型**: 修复问题
- **复现示例**: https://shineout-playground.sheincorp.cn/#/playground?code=d3750fdd-9e50-444a-bcf7-bc38921dff92
- **变更描述**: 修复 `Select` 开启 `filterSameChange` 后单选模式下选择重复项无法关闭面板的问题
- **PR**: [#819](https://github.com/sheinsight/shineout-next/pull/819)
- **影响组件**: Select
- **问题原因**: 当 filterSameChange 为 false 时，选择相同的值会触发 onSameChange 回调，但原代码未实现该回调，导致单选模式下重复选择时面板不会关闭

#### Bug 特征
- 设置了 `absolute` 属性且为 `multiple` 模式
- 选中的标签总宽度超过组件宽度导致换行
- 换行后组件高度变化，但 AbsoluteList 的位置没有更新

**代码模式**：
```jsx
// Bug 复现代码
<Select
  data={['选项A', '选项B', '选项C']}
  filterSameChange={false}
  value="选项A"
  onChange={handleChange}
/>
// 再次点击已选中的 "选项A"，面板不会关闭
```

#### 排查规则
- 搜索单选模式下设置了 `filterSameChange={false}` 的 Select
- 搜索有 `filterSameChange` 但没有 `multiple` 属性的 Select 组件
- 检查 `filterSameChange` 与单选模式的组合使用

## Breaking Changes

无

## 风险等级

**中**：
- 包含两个回归问题修复（v3.4.4 引入），说明之前的修改引入了新问题
- absolute + multiple 场景的位置计算逻辑变更可能影响布局
- onCreate 和焦点管理的修改涉及核心交互逻辑
- filterSameChange 的行为变更可能影响依赖原有行为的代码

## 版本修复历史

1. **3.5.2-beta.2**：通过在 onChange 时更新 absoluteListUpdateKey 触发位置重算，修复 absolute 多选换行问题
2. **3.5.2-beta.3**：移除 preventDefault 中的 createdData 判断限制，修复 onCreate 选中问题
3. **3.5.2-beta.4**：完全移除 preventDefault 中的错误判断，修复点击焦点异常
4. **3.5.2-beta.10**：实现 handleSameChange 回调，在单选重复选择时关闭面板