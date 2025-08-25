# Image 组件 3.5.2 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.2
- 包含 Beta 版本: 3.5.2-beta.1 ~ 3.5.2-beta.11
- 发布日期: 2024-11-28

## 详细变更

### 3.5.2-beta.10
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 Image 组件开启 `lazy` 后在 fixed 定位容器下检查交叉异常的问题
- **PR**: [#820](https://github.com/sheinsight/shineout-next/pull/820)
- **影响组件**: Image
- **问题原因**: fixed 定位容器的交叉检测算法未考虑视口相对位置，导致懒加载判断错误

#### Bug 特征
- 在 fixed 定位容器中的图片设置 lazy 属性后加载时机异常
- 可能出现应该加载时不加载，或不应该加载时提前加载
- 滚动时懒加载行为不符合预期

**代码模式**：
```jsx
// 容易出现问题的代码结构
<div style={{ position: 'fixed' }}>
  <Image 
    src="image.jpg"
    lazy  // 在 fixed 容器中交叉检测异常
  />
</div>
```

#### 排查规则
- 可忽略排查
- 搜索在 `position: fixed` 容器中使用 `lazy` 属性的 Image 组件
- 搜索在固定定位的侧边栏、悬浮窗等组件中使用的 Image
- 搜索 `Image` 组件在固定布局中的使用场景

## Breaking Changes

无

## 风险等级

**低**：
- Bug 修复提升了懒加载的准确性
- 不影响其他场景的正常使用

## 版本修复历史

1. **3.5.2-beta.10**：修复 fixed 容器下 lazy 检测异常问题