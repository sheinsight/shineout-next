# Sticky 组件 3.6.3 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.3
- 包含 Beta 版本: 3.6.3-beta.1 ~ 3.6.3-beta.8
- 发布日期: 2025-04-18

## 详细变更

### 3.6.3-beta.1
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 修复 Sticky 组件的 `onChange` 回调函数不触发的问题
- **PR**: [#1048](https://github.com/sheinsight/shineout-next/pull/1048)
- **影响组件**: Sticky
- **问题原因**: 组件内部缺少对吸附状态变化的监听和回调触发机制

#### Bug 特征
- Sticky 组件的 `onChange` 回调函数从未被调用
- 无法监听组件吸附状态的变化
- 影响需要响应吸附状态变化的业务场景

**代码模式**：
```tsx
// 容易出现问题的代码结构
<Sticky 
  top={200} 
  onChange={(isSticky) => {
    // 这个回调在修复前永远不会被触发
    console.log('Sticky state changed:', isSticky);
  }}
>
  <div>粘性内容</div>
</Sticky>
```

#### 排查规则
- 搜索使用了 `onChange` 属性的 Sticky 组件
- 搜索依赖 Sticky 状态变化来执行业务逻辑的代码

## Breaking Changes

无

## 风险等级

**低**：
- 修复了重要的功能缺陷，完善了组件的回调机制
- 完全向后兼容，现有代码无需修改
- 为依赖状态监听的场景提供了正确的支持