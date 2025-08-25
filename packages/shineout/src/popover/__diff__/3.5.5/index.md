# Popover 组件 3.5.5 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.5
- 包含 Beta 版本: 3.5.5-beta.1 ~ 3.5.5-beta.7
- 发布日期: 2024-12-24

## 详细变更

### 3.5.5-beta.5
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: 修复 `Popover` 组件受控为 true 但不在视口范围内时无法展示的问题
- **PR**: [#880](https://github.com/sheinsight/shineout-next/pull/880)
- **影响组件**: Popover
- **问题原因**: 当 Popover 受控显示但触发元素不在滚动容器的可视区域内时，视口范围检查逻辑会阻止 Popover 显示

#### Bug 特征
- Popover 组件使用 `visible={true}` 受控显示时，如果触发元素不在可视区域内无法正常显示
- 影响滚动列表中的 Popover 项目的受控显示
- 在复杂布局或嵌套滚动容器中的 Popover 受控显示失效

**代码模式**：
```jsx
// 容易出现问题的代码结构
<div style={{ height: 200, overflow: 'auto' }}>
  <div style={{ height: 1000 }}>
    <Popover
      visible={true}  // 受控显示
      content="弹出内容"
    >
      <button>
        {/* 如果按钮不在滚动容器的可视区域内，Popover 可能无法显示 */}
        触发元素
      </button>
    </Popover>
  </div>
</div>
```

#### 排查规则
- 搜索使用了 `visible` 属性受控显示的 Popover 组件

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复受控显示的特定场景问题
- 完全向后兼容，无 API 变更
- 提升了受控模式下的可靠性和用户体验