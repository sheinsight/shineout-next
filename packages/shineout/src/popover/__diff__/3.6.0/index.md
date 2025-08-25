# Popover 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.30
- 发布日期: 2025-03-21

## 详细变更

### 3.6.0-beta.26
- **变更类型**: 修复问题
- **变更标签**: 布局
- **复现示例**: 无
- **变更描述**: 修复 `Popover` 在滚动容器中的水平用法下，且不给定宽度时，在靠近窗口右侧弹出层宽度被非预期挤压导致内容换行的问题
- **PR**: [#997](https://github.com/sheinsight/shineout-next/pull/997)
- **影响组件**: Popover
- **问题原因**: 原有的水平定位逻辑在处理 `left` 位置时使用了 `translateX(-100%)` 变换，在滚动容器中会导致宽度计算问题，当靠近窗口右侧时弹出层宽度被容器边界挤压

#### Bug 特征
- Popover 在滚动容器内使用水平定位（`left`, `left-top`, `left-bottom`）时
- 未明确设置弹出层宽度且触发元素靠近窗口或容器右侧边界
- 弹出层内容被挤压导致不必要的换行
- 影响用户阅读体验和布局美观

**代码模式**：
```jsx
// 容易出现问题的代码结构
<div style={{ height: 200, overflow: 'auto' }}>
  <div style={{ width: 2000 }}>
    <Popover
      position="left"  // 水平定位
      content="这是一段较长的内容，可能会被挤压换行"
      // 未设置明确的宽度
    >
      <button style={{ marginLeft: 1800 }}>
        {/* 靠近右侧边界的触发元素 */}
        触发按钮
      </button>
    </Popover>
  </div>
</div>
```

#### 排查规则
- 搜索在滚动容器中使用水平定位的 Popover 组件
- 搜索设置了 `position="left"` 或包含 "left" 的位置属性的 Popover

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复特定场景下的布局问题
- 完全向后兼容，无 API 变更
- 改善了滚动容器中 Popover 的显示效果
- 移除了复杂的 transform 计算，性能有所提升