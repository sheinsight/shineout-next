# Cascader 组件 3.5.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.6
- 包含 Beta 版本: 3.5.6-beta.1 ~ 3.5.6-beta.12
- 发布日期: 2025-01-06

## 详细变更

### 3.5.6-beta.10
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Cascader` 在输入搜索过程中点击选项后 `onChange` 第二参数未返回的问题
- **PR**: [#904](https://github.com/sheinsight/shineout-next/pull/904)
- **影响组件**: Cascader
- **问题原因**: 在搜索模式下点击选项时，onChange 回调的第二个参数（选中项的完整数据）未正确传递

#### Bug 特征
- 开启搜索功能（filter 属性）
- 在搜索结果中点击选项
- onChange 回调的第二个参数为 undefined 或缺失
- 影响依赖第二个参数获取选中项数据的业务逻辑

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  filter
  onChange={(value, selectedData) => {
    console.log(selectedData); // 搜索模式下点击时为 undefined
  }}
  data={data}
/>
```

#### 排查规则
- 搜索设置了 `filter` 属性的 Cascader 组件
- 搜索 onChange 回调使用了第二个参数的 Cascader
- 搜索在搜索模式下依赖选中项数据的业务逻辑

### 3.5.6-beta.9
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Cascader` 选择结果后箭头和关闭 icon 展示异常的问题
- **PR**: [#903](https://github.com/sheinsight/shineout-next/pull/903)
- **影响组件**: Cascader
- **问题原因**: 选择结果后，下拉箭头和清除图标的显示逻辑异常，可能同时显示或都不显示

#### Bug 特征
- 选择值后箭头图标显示异常
- 清除图标和箭头图标可能重叠
- hover 状态下图标切换不正确

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Cascader
  clearable
  value={selectedValue}
  data={data}
/>
```

#### 排查规则
- 搜索设置了 `clearable` 属性的 Cascader 组件
- 搜索有值选中状态的 Cascader 组件
- 搜索自定义了图标样式的 Cascader

## Breaking Changes

无

## 风险等级

**中**：
- onChange 第二参数缺失可能影响依赖该参数的业务逻辑
- 图标显示异常影响用户体验
- 建议升级后测试搜索场景下的 onChange 回调

## 版本修复历史

1. **3.5.6-beta.9**：修复选择结果后图标显示异常
2. **3.5.6-beta.10**：修复搜索模式下 onChange 第二参数缺失问题