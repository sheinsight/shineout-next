# Select 组件 3.7.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.1
- 包含 Beta 版本: 3.7.1-beta.1 ~ 3.7.1-beta.9
- 发布日期: 2025-06-04

## 详细变更

### 3.7.1-beta.3
- **变更类型**: 修复问题
- **复现示例**: 
```
import React from 'react';
import { Select } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
const styleAbsolute: React.CSSProperties = {
  padding: 100,
  height: 800,
  width: '100%',
  overflow: 'auto',
};

export default () => {
  return (
    <div style={styleAbsolute}>
      <div style={{height: 300}}></div>
      <div style={{height: 300}}></div>
      <div style={{height: 300}}></div>
      <Select width={120} keygen data={data} placeholder='default' clearable />
      <Select
        style={{ marginInlineStart: 16 }}
        width={300}
        absolute
        multiple
        keygen
        data={data}
        placeholder='Select user'
        clearable
      />

      <div style={{height: 400}}></div>
      <div style={{height: 400}}></div>
      <div style={{height: 400}}></div>
    </div>
  );
};
```
- **变更描述**: 修复 `Select` 设置了 `absolute` 用法下，在某些位置打开下拉框时有多余的过渡动画问题
- **PR**: [#1154](https://github.com/sheinsight/shineout-next/pull/1154)
- **影响组件**: Select
- **问题原因**: absolute 定位模式下，弹出层的位置计算和过渡动画存在冲突

#### Bug 特征
- 设置了 `absolute` 属性的 Select 在滚动容器中或页面边缘
- 打开下拉框时出现明显的过渡动画，从错误位置滑动到正确位置
- 特别是父容器滚动后，下拉框会先显示在错误位置再动画移动
- `usePositionStyle` 钩子对 `popupElSize` 依赖项设置不当导致重复计算

**代码模式**：
```jsx
// absolute 定位模式下的过渡动画问题
<Select
  absolute
  data={data}
  // 在某些位置打开时会有多余的过渡动画
/>
```

#### 排查规则
- 搜索设置了 `absolute` 属性的 Select 组件
- 搜索同时设置了 `absolute` 且位于页面边缘区域的 Select
- 搜索同时设置了 `absolute` 且父容器有滚动条的 Select

### 3.7.1-beta.4
- **变更类型**: 修复问题
- **复现示例**: 
```

import React, { useState } from 'react';
import { Select } from 'shineout';

const defaultData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];

export default () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState([])
  const [data, setData] = useState<string[]>(['123']);

  const handleAppend = () => {
    setTimeout(() => {
      setData(defaultData);
    }, 3000);
  };

  const addMore = (
    <div
      style={{
        height: 32,
        backgroundColor: '#197AFA',
        color: '#ffffff',
        padding: '5px 12px',
        boxSizing: 'border-box',
      }}
      onClick={handleAppend}
    >
      + add
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', paddingTop: '80vh' }}>
      <Select
        keygen
        open={open}
        onCollapse={setOpen}
        value={value}
        onChange={(v) => setValue(v)}
        multiple
        onFilter={text => item => item.indexOf(text) >= 0}
        width={300}
        clearable
        data={data}
        placeholder='Select Color'
        renderOptionList={(s) => (
          <div>
            {addMore}
            {/* <input type='text' placeholder='input' /> */}
            <div>{s}</div>
            {/* {addMore} */}
          </div>
        )}
      />
    </div>
  );
};

```
- **变更描述**: 修复 `Select` 组件的动态高度下拉框位置调整问题
- **PR**: [#1157](https://github.com/sheinsight/shineout-next/pull/1157)
- **影响组件**: Select
- **问题原因**: 下拉框高度动态变化时，位置计算没有及时更新

#### Bug 特征
- 使用 `renderOptionList` 自定义渲染且内容高度会动态变化
- 异步加载或搜索过滤导致下拉框高度变化时位置不更新
- Select 位于视口底部时，应向上展开但没有正确调整
- 虚拟滚动的 `keepScrollTop` 属性和尺寸检测模块响应不及时

**代码模式**：
```jsx
// 动态高度导致的位置问题
<Select
  data={dynamicData}
  onFilter={...}
  renderOptionList={(s) => (
    <div>
      {/* 动态内容会改变高度 */}
      {loading ? <Loading /> : s}
    </div>
  )}
  // 搜索后数据量变化导致下拉框高度变化，位置不正确
/>
```

#### 排查规则
- 搜索设置了 `onFilter` 且数据源会动态变化的 Select
- 搜索设置了 `onLoadMore` 的 Select
- 搜索数据源通过状态管理动态更新的 Select

### 3.7.1-beta.5
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 组件在同时设置 `absolute` 和 `optionWidth` 属性时，弹出层右侧溢出位置不自动调整的问题
- **PR**: [#1159](https://github.com/sheinsight/shineout-next/pull/1159)
- **影响组件**: Select
- **问题原因**: absolute 模式下，自定义宽度的弹出层溢出边界检测失效

#### Bug 特征
- 同时设置 `absolute` 和 `optionWidth` 属性
- Select 位于视口右侧时，下拉框按设定宽度展开溢出右边界
- absolute 模式下边界检测失效，不会自动向左调整
- 自定义宽度破坏了原有的溢出检测和位置调整机制

**代码模式**：
```jsx
// absolute + optionWidth 导致的溢出问题
<Select
  absolute
  optionWidth={300}
  data={data}
  // 弹出层可能溢出屏幕右侧
/>
```

#### 排查规则
- 搜索同时设置了 `absolute` 和 `optionWidth` 的 Select
- 搜索同时设置了 `absolute` 和 `optionWidth` 且位于容器右侧的 Select
- 搜索同时设置了 `absolute` 和 `optionWidth` 且 optionWidth 值大于 200 的 Select

### 3.7.1-beta.9
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Select` 组件在 `Drawer` 中使用并开启 compressed 属性时，点击弹出层中的删除第二次无效的问题
- **PR**: 无明确 PR
- **影响组件**: Select
- **问题原因**: 在 Drawer 中的事件冒泡处理异常，导致第二次点击失效

#### Bug 特征
- Select 在 Drawer/Modal 内使用且开启 `compressed` 属性
- 多选合并显示时，点击删除按钮第一次正常，第二次无响应
- Drawer 的事件冒泡处理与 Select 事件处理冲突
- compressed 模式下 Popover 组件事件传播被阻断

**代码模式**：
```jsx
// 在 Drawer 中使用 compressed
<Drawer visible={visible}>
  <Select
    multiple
    compressed
    data={data}
    value={multipleValues}
    // 删除合并项时第二次点击无效
  />
</Drawer>
```

#### 排查规则
- 搜索 Drawer 的 content 或 children 中包含设置了 `compressed` 的 Select
- 搜索同时设置了 `compressed` 和 `multiple` 且位于 Drawer 内的 Select
- 搜索同时设置了 `compressed` 且位于 Modal/Drawer 等弹出层组件内的 Select

## Breaking Changes

无

## 风险等级

**中**：
- 修复了多个定位和交互相关的问题
- 涉及 absolute 定位模式的核心功能
- 可能影响已有的位置补偿逻辑

## 版本修复历史

1. **3.7.1-beta.3**：修复 absolute 模式下的过渡动画问题
2. **3.7.1-beta.4**：修复动态高度下拉框位置调整问题
3. **3.7.1-beta.5**：修复 absolute + optionWidth 的溢出问题
4. **3.7.1-beta.9**：修复在 Drawer 中使用 compressed 时的交互问题