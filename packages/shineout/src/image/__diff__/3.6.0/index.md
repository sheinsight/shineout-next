# Image 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.30
- 发布日期: 2025-03-21

## 详细变更

### 3.6.0-beta.18
- **变更类型**: 新增功能
- **复现示例**: 无
- **变更描述**: Image 新增 `renderHoverMask` 属性，支持自定义渲染鼠标移入组件时的遮罩层内容
- **PR**: [#993](https://github.com/sheinsight/shineout-next/pull/993)
- **影响组件**: Image

### 3.6.0-beta.15
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 Image 在容器为 'absolute' 定位情况下 `lazy` 属性可能失效的问题
- **PR**: [#982](https://github.com/sheinsight/shineout-next/pull/982)
- **影响组件**: Image
- **问题原因**: 懒加载的交叉检测逻辑在绝对定位容器中无法正确计算元素位置，导致图片无法触发加载

#### Bug 特征
- 在 absolute 定位容器中的图片设置 lazy 属性后不会自动加载
- 图片始终显示占位符状态
- 滚动页面时图片仍然无法加载

**代码模式**：
```jsx
// 容易出现问题的代码结构
<div style={{ position: 'absolute' }}>
  <Image 
    src="image.jpg"
    lazy  // 在 absolute 容器中可能失效
  />
</div>
```

#### 排查规则
- 可忽略排查
- 搜索在 `position: absolute` 容器中使用 `lazy` 属性的 Image 组件
- 搜索在弹窗、下拉菜单等绝对定位组件中使用的 Image
- 搜索 `Image` 组件配合 `lazy` 属性的使用场景

## Breaking Changes

无

## 风险等级

**低**：
- 新增功能为可选属性，向后兼容
- Bug 修复提升了组件稳定性
- 不影响现有功能的正常使用

## 版本修复历史

1. **3.6.0-beta.18**：新增 `renderHoverMask` 自定义遮罩功能
2. **3.6.0-beta.15**：修复 absolute 容器下 lazy 失效问题