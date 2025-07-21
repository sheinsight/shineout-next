# Alert 组件 3.7.0-beta.35 版本 Diff 报告

## 问题描述
修复 `Alert` 只有 `title` 没有 `children` 的样式问题

## 代码变更文件
1. `packages/base/src/alert/alert.tsx`
2. `packages/base/src/alert/alert.type.ts`
3. `packages/shineout-style/src/alert/alert.ts`

## 变更代码行
```diff
// alert.tsx
+ [alertStyle.noChildren]: !children,

// alert.type.ts
export interface AlertClasses {
+ noChildren: string;
}

// alert.ts
+ noChildren: {
+   '&&$confirmwarning': {
+     marginBottom: 0,
+   }
+ },
```

## 变更前后逻辑差异
- **变更前**：只有 title 的 Alert 在 confirmwarning 类型时有多余的底部边距
- **变更后**：通过 `!children` 检测并添加 noChildren 类，针对 confirmwarning 类型移除 marginBottom

## 逻辑影响范围
- 仅影响 `type="confirmwarning"` 且没有 children 的 Alert
- 有 children 的 Alert 保持原有样式不变
- 其他类型的 Alert（info、success、warning、danger）不受影响

## 风险使用场景
- 如果业务中依赖了 confirmwarning 类型只有 title 时的底部边距，可能需要调整布局