# Select 组件 3.5.7 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.7
- 包含 Beta 版本: 3.5.7-beta.1 ~ 3.5.7-beta.7
- 发布日期: 2025-01-08

## 详细变更

### 3.5.7-beta.2
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 单选模式下设置了 value 为数组类型，此时开启 `onFilter` 后组件渲染报错的问题
- **PR**: [#910](https://github.com/sheinsight/shineout-next/pull/910)
- **影响组件**: Select
- **问题原因**: 单选模式下错误地将 value 设置为数组类型，当开启 onFilter 时，组件内部处理逻辑不兼容导致报错

#### Bug 特征
- 单选模式（未设置 `multiple` 属性或 `multiple={false}`）
- value 属性被错误地设置为数组类型而非单个值
- 设置了 `onFilter` 属性启用过滤功能

**代码模式**：
```jsx
// Bug 复现代码 - 错误用法
const [value, setValue] = useState(['option1']); // 错误：单选模式使用数组

<Select
  data={['option1', 'option2', 'option3']}
  value={value}  // 单选模式下错误地传入数组
  onFilter={text => item => item.indexOf(text) >= 0}
  onChange={handleChange}
/>

// 组件渲染时会报错：
// TypeError: Cannot read property 'indexOf' of undefined
// 或其他类型错误
```

#### 排查规则
- 搜索单选 Select 的 value 属性使用数组类型
- 搜索 value 使用 useState([]) 初始化但没有 multiple 属性的 Select
- 搜索 multiple 属性使用条件判断动态设置的 Select
- 搜索有 onFilter 且 value 为数组但无 multiple 的 Select

## Breaking Changes

无

## 风险等级

**低**：
- 只修复错误用法导致的报错
- 不影响正确使用的代码
- 增加了类型检查和容错处理

## 版本修复历史

1. **3.5.7-beta.2**：增加类型检查，修复单选模式下错误使用数组 value 导致的报错问题