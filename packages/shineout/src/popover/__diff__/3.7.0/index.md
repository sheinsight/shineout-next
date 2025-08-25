# Popover 组件 3.7.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.0
- 包含 Beta 版本: 3.7.0-beta.1 ~ 3.7.0-beta.44
- 发布日期: 2025-06-05

## 详细变更

### 3.7.0-beta.7
- **变更类型**: 新增功能
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 优化 `Popover` 在窗口 resize 和父容器滚动后依然能跟随目标的定位机制
- **PR**: [#1069](https://github.com/sheinsight/shineout-next/pull/1069)
- **影响组件**: Popover
- **问题原因**: 无

#### 功能特征
- 新增动态更新机制，添加 `updateKey` 状态来触发位置重新计算
- 监听窗口 resize 事件，确保窗口大小变化时 Popover 能实时调整位置
- 监听父容器滚动事件，当父级滚动容器滚动时 Popover 能跟随目标元素移动
- 完善事件清理机制，在组件卸载时正确移除所有事件监听器

**代码模式**：
```jsx
// 受益场景示例
<div style={{ height: 300, overflow: 'auto' }}>
  <div style={{ height: 1000 }}>
    <Popover
      content="弹出内容"
      trigger="hover"
    >
      <button>
        {/* 现在在滚动和窗口大小变化时都能正确跟随 */}
        触发元素
      </button>
    </Popover>
  </div>
</div>
```

## Breaking Changes

无

## 风险等级

**低**：
- 功能增强，无 API 变更
- 完全向后兼容，现有代码无需修改
- 提升了复杂布局和滚动容器中的 Popover 定位准确性