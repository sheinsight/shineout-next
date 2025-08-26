# Tooltip 组件 3.6.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.1
- 包含 Beta 版本: 3.6.1-beta.1 ~ 3.6.1-beta.7
- 发布日期: 2025-03-28

## 详细变更

### 3.6.1-beta.7
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 修复 Tooltip 的 `persistent` 配置优先级问题，优化箭头在动态内容变化后的位置处理
- **PR**: [#1019](https://github.com/sheinsight/shineout-next/pull/1019), [#1020](https://github.com/sheinsight/shineout-next/pull/1020)
- **影响组件**: Tooltip
- **问题原因**: 配置优先级逻辑不符合就近原则，动态内容变化后箭头位置计算不准确

#### Bug 特征
- `persistent` 属性无法正确覆盖全局配置设置
- 动态修改提示内容后，箭头位置可能偏移
- 影响组件在复杂交互场景下的表现

**代码模式**：
```tsx
// 修复前：局部配置无法覆盖全局配置
setConfig({ tooltip: { persistent: true } });
<Tooltip persistent={false} tip="应该不持久化">
  {/* 但实际仍会持久化 */}
</Tooltip>

// 修复后：局部配置正确优先
<Tooltip persistent={false} tip="正确的不持久化">
  <Button>按预期工作</Button>
</Tooltip>

// 动态内容变化场景
const [content, setContent] = useState("短内容");
<Tooltip tip={content}>
  <Button onClick={() => setContent("这是一个很长的动态内容")}>
    {/* 修复后：内容变化时箭头位置正确 */}
  </Button>
</Tooltip>
```

#### 排查规则
- 搜索项目中使用了 setConfig 并设置 tooltip 的 persistent 属性 且 Tooltip 使用了 `persistent` 属性的场景
- 搜索动态修改提示内容的 Tooltip 使用、Tooltip 内存在动态内容（内容为变量）的场景

## Breaking Changes

无

## 风险等级

**低**：
- 修复了配置优先级和动态内容处理问题
- 完全向后兼容，现有代码无需修改