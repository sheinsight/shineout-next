# Transfer 组件 3.6.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.2
- 包含 Beta 版本: 3.6.2-beta.1 ~ 3.6.2-beta.6
- 发布日期: 2025-04-07

## 详细变更

### 3.6.2-beta.6
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: https://shineout-playground.sheincorp.cn/#/playground?code=88961b22-793a-46fc-9ea1-571481b83d15
- **变更描述**: 修复动态设置 loading 不生效问题
- **PR**: [#1035](https://github.com/sheinsight/shineout-next/pull/1035)
- **影响组件**: Transfer
- **问题原因**: renderSourceList 和 renderTargetList 的 useMemo 依赖数组中缺少 loading 参数，导致 loading 状态变化时组件不会重新渲染

#### Bug 特征
- Transfer 组件动态修改 loading 属性时，加载状态不会更新显示
- 通过 setState 或 props 传递动态修改 loading 值时，左右面板的 loading 效果不生效
- 初始设置的 loading 状态正常，但后续动态修改无效
- 影响需要根据异步操作状态动态控制 loading 的场景

**代码模式**：
```jsx
// 容易出现问题的代码结构
const [loading, setLoading] = useState(false);

const handleClick = async () => {
  setLoading(true);  // 这里设置 loading 可能不生效
  try {
    await fetchData();
  } finally {
    setLoading(false);  // 这里取消 loading 可能不生效
  }
};

return (
  <Transfer 
    data={data}
    loading={loading}  // 动态 loading 状态可能不更新
    keygen="id"
  />
);
```

#### 排查规则
- 搜索使用 useState 管理 loading 状态的 Transfer 组件
- 搜索在异步操作中动态切换 loading 状态的场景
- 搜索使用数组形式 loading 属性的 Transfer 组件

## Breaking Changes

无

## 风险等级

**低**：
- 纯 Bug 修复，无 API 变更
- 修复了 loading 状态的响应性问题，提升了组件的可用性
- 不会影响现有正常工作的代码