# Tooltip 组件 3.6.4 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.4
- 包含 Beta 版本: 3.6.4-beta.1 ~ 3.6.4-beta.8
- 发布日期: 2025-04-18

## 详细变更

### 3.6.4-beta.5
- **变更类型**: 性能优化
- **变更标签**: 性能
- **复现示例**: 无
- **变更描述**: 优化 Tooltip 在窗口 resize 和父容器滚动后依然能跟随目标的性能
- **PR**: [#1069](https://github.com/sheinsight/shineout-next/pull/1069)
- **影响组件**: Tooltip, Popover
- **问题原因**: 窗口大小变化和容器滚动时，提示框位置更新机制需要优化

#### 性能优化
- 改善了窗口大小变化时的位置重新计算效率
- 优化了父容器滚动时的跟随响应速度
- 减少了不必要的重绘和重排操作
- 提升了在复杂页面布局中的表现

**代码模式**：
```tsx
// 受益的使用场景
<div style={{ height: '100vh', overflow: 'auto' }}>
  <div style={{ height: '200vh' }}>
    <Tooltip tip="滚动时跟随性能更好">
      <Button style={{ position: 'fixed', top: '50%' }}>
        固定位置按钮
      </Button>
    </Tooltip>
  </div>
</div>

// 窗口 resize 场景
<Tooltip tip="窗口大小变化时位置更新更流畅">
  <div style={{ width: '50vw' }}>响应式内容</div>
</Tooltip>
```

#### 排查规则
- 可忽略排查
- 搜索在可滚动容器中使用的 Tooltip
- 搜索在响应式布局中使用的 Tooltip

## Breaking Changes

无

## 风险等级

**低**：
- 仅为性能优化，无功能变更
- 完全向后兼容，现有代码无需修改