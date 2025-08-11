# Select 组件 3.5.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.6
- 包含 Beta 版本: 3.5.6-beta.1 ~ 3.5.6-beta.12
- 发布日期: 2024-12-27

## 详细变更

### 3.5.6-beta.6
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 多选模式下，开启 `onFilter` 后且使用 `open` 做面板受控打开时，自动聚焦失效的问题
- **PR**: [#891](https://github.com/sheinsight/shineout-next/pull/891)
- **影响组件**: Select

#### Bug 特征
- 组件设置为多选模式（`multiple={true}`）
- 使用 `open` 属性做面板的受控管理
- 设置了 `onFilter` 属性启用过滤功能
- 通过外部状态控制 open 为 true 打开面板时，输入框未自动获得焦点

**代码模式**：
```jsx
const [open, setOpen] = useState(false);

<Select
  multiple
  open={open}
  onCollapse={setOpen}
  onFilter={text => item => item.indexOf(text) >= 0}
  data={['red', 'blue', 'green', 'yellow']}
  value={value}
  onChange={setValue}
/>

// 通过 setOpen(true) 程序化打开面板后，输入框不会自动聚焦
```

#### 排查规则
- 搜索同时包含 `multiple`、`open`、`onFilter` 三个属性的 Select 组件
- 搜索 `open` 属性使用变量控制（非常量）的 Select
- 搜索 Modal、Drawer、Popover 内部的多选 Select 且有 `open` 和 `onFilter`
- 搜索使用 useState 管理 open 状态并调用 setOpen(true) 的代码

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复特定场景下的聚焦问题
- 不影响正常点击打开的交互
- 只影响程序化控制 open 的场景

## 版本修复历史

1. **3.5.6-beta.6**：通过在 useLayoutEffect 中添加聚焦逻辑，修复多选 + open 受控 + onFilter 场景下的自动聚焦问题