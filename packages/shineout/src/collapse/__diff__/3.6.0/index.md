# Collapse 组件 3.6.0 版本 Diff 报告

## 问题描述
1. `Collapse` 新增 `animation` 属性，支持关闭折叠动画
2. 优化 `Collapse` 初始化动画，在组件首次挂载后不会触发动画效果，挂载结束后正常添加折叠动画

## 代码变更文件
- `packages/base/src/collapse/collapse-item.tsx`
- `packages/base/src/collapse/collapse.tsx`
- `packages/base/src/collapse/collapse.type.ts`

## 变更代码行
```diff
// collapse.type.ts
export interface CollapseProps {
  // ...
+ /**
+  * @en Whether to enable collapse animation
+  * @cn 是否开启折叠动画
+  * @default true
+  */
+ animation?: boolean;
}

// collapse.tsx
const Collapse = (props: CollapseProps) => {
  const {
    // ...
    border = true,
+   animation = true,
  } = props;

  return (
    <groupContext.Provider value={{
      // ...
      border,
+     animation,
    }}>
      {children}
    </groupContext.Provider>
  );
}

// collapse-item.tsx
+import React, { useContext, useEffect, useState } from 'react';

const CollapseItem = (props: CollapseItemProps) => {
  const {
    // ...
+   animation: animationProp,
  } = useContext(groupContext);

+ const [animation, setAnimation] = useState(false);

+ useEffect(() => {
+   if (animationProp) {
+     setAnimation(true);
+   }
+ }, []);

  // 渲染内容部分
  <AnimationList
    show={judgeExpanded}
    type={'collapse'}
+   animation={animation}
    duration='fast'
    className={collapseItemContentClassName}
  >
    {/* 内容 */}
  </AnimationList>
}
```

## 变更前后逻辑差异
- **变更前**：
  1. Collapse 组件始终带有折叠动画效果
  2. 组件初次挂载时也会触发动画
- **变更后**：
  1. 新增 `animation` 属性，允许用户控制是否启用动画，默认为 true
  2. 使用 useState 和 useEffect 控制动画状态，首次挂载时 animation 为 false，避免初始化动画
  3. 挂载完成后才将 animation 设置为 true，确保后续交互有正常动画效果

## 逻辑影响范围
- 新增了可选的 `animation` 属性，不影响现有使用
- 优化了初始化体验，避免页面加载时的不必要动画
- 只影响 Collapse 组件的展开/收起动画效果

## 风险使用场景

### 代码执行风险
- 无直接代码执行风险

### 交互体验差异
- 首次渲染时不再有动画效果，提升了初始加载的视觉体验
- 设置 `animation={false}` 后所有展开/收起操作都不会有动画过渡