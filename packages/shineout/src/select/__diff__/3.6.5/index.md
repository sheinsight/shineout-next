# Select 组件 3.6.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.5
- 包含 Beta 版本: 3.6.5-beta.1 ~ 3.6.5-beta.12
- 发布日期: 2025-04-23

## 详细变更

### 3.6.5-beta.1
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 在 `Popover` 中使用并且开启了 compressed 属性后，点击 compressed 弹出层中的删除条目时会引起样式异常的问题
- **PR**: [#1079](https://github.com/sheinsight/shineout-next/pull/1079)
- **影响组件**: Select
- **问题原因**: 弹出层嵌套时，事件冒泡和样式层级导致的渲染异常

#### Bug 特征
- Select 组件在 Popover 内部使用
- 同时开启了 compressed 属性（合并多选项）
- 点击合并弹出层中的删除按钮删除选项
- 导致 Popover 或 Select 的样式错乱、位置偏移

**代码模式**：
```jsx
// 在 Popover 中使用 compressed Select
<Popover 
  content={
    <div>
      <Select
        multiple
        compressed
        data={data}
        value={multipleValues}
        onChange={handleChange}
        // 删除合并项时可能引起样式异常
      />
    </div>
  }
>
  <Button>打开</Button>
</Popover>
```

#### 排查规则
- 搜索 Popover/Tooltip 的 `content` 属性中包含 Select 且 Select 设置了 `compressed` 的代码
- 搜索同时设置了 `compressed` 和 `multiple` 且位于 Modal/Drawer 内的 Select
- 搜索同时设置了 `compressed` 且 `value` 数组长度可能大于 3 的多选 Select
- 搜索嵌套在自定义弹出层组件内且设置了 `compressed` 和 `multiple` 的 Select

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复特定场景下的样式问题
- 不影响组件的功能逻辑
- 只影响在 Popover 中使用 compressed 的场景

## 版本修复历史

1. **3.6.5-beta.1**：修复在 Popover 中使用 compressed 时的样式异常问题