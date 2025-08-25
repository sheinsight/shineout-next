# Tag 组件 3.6.3 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.3
- 包含 Beta 版本: 3.6.3-beta.1 ~ 3.6.3-beta.8
- 发布日期: 2025-04-18

## 详细变更

### 3.6.3-beta.8
- **变更类型**: 样式优化
- **变更标签**: 样式
- **复现示例**: 无
- **变更描述**: 调整 Tag 默认样式层级，新增 Brown 色系 token，纠正 Tag 中 Orange 色系为 Brown
- **PR**: [#1060](https://github.com/sheinsight/shineout-next/pull/1060)
- **影响组件**: Tag
- **问题原因**: 原有 Orange 色系与设计规范不符，且默认样式权重过高影响自定义样式覆盖

#### 样式特征
- Brown 色系的 Tag 组件颜色会从 Orange 色调变为真正的 Brown 色调
- 默认（亮色）样式权重降低，便于老版本的 className 覆盖
- 样式架构重构为四个独立的样式生成函数，结构更清晰
- 填充风格的 Tag 图标悬浮效果得到增强

**代码模式**：
```tsx
// 受影响的代码结构
<Tag type="brown">
  {/* 颜色会从 Orange 色系变为 Brown 色系 */}
  褐色标签
</Tag>

// 自定义样式现在更容易覆盖
<Tag className="custom-tag">
  {/* 自定义样式现在可以正常覆盖默认样式 */}
  自定义标签
</Tag>
```

#### 排查规则
- 搜索使用了 `type="brown"` 的 Tag 组件
- 搜索依赖 Orange 色调的 brown 类型 Tag 的视觉设计

## Breaking Changes

无

## 风险等级

**低**：
- 仅为样式和色彩系统的规范化调整
- 完全向后兼容，现有 API 无变化
- 改善了样式权重和色彩准确性
- 便于自定义样式的覆盖