# Radio 组件 3.5.6 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.6
- 包含 Beta 版本: 3.5.6-beta.1 ~ 3.5.6-beta.12
- 发布日期: 2025-01-06

## 详细变更

### 3.5.6-beta.3
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=eaa4aef5-19b2-4a9b-9dce-8e97cebbb36a](https://shineout-playground.sheincorp.cn/#/playground?code=eaa4aef5-19b2-4a9b-9dce-8e97cebbb36a)
- **变更描述**: 修复 `Radio.Group` 传 data 属性用法下，设置 size 属性不生效的问题
- **PR**: [#893](https://github.com/sheinsight/shineout-next/pull/893)
- **影响组件**: Radio.Group
- **问题原因**: 在使用 `data` 属性传入数据时，缺少 `size` 属性向子 Radio 组件的传递，导致尺寸设置无效

#### Bug 特征
- Radio.Group 使用 `data` 属性方式时，`size` 属性不生效
- 直接在 Radio.Group 内部放置 Radio 组件的方式 `size` 属性正常工作
- 影响 API 使用的一致性，两种使用方式行为不同

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Radio.Group 
  size="large"  // size 属性可能不生效
  data={[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 }
  ]} 
/>
```

#### 排查规则
- 搜索使用了 `data` 属性和 `size` 属性的 Radio.Group 组件

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复特定使用方式下的功能问题
- 完全向后兼容，无 API 变更
- 提升了 API 使用的一致性