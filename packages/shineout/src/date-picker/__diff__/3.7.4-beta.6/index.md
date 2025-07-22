# DatePicker 组件 3.7.4-beta.6 版本 Diff 报告

## 问题描述
修复 `DatePicker` 可输入模式下的快速选择，二次选值后不生效的问题（Regression: since v3.7.3）

## 代码变更文件
- `packages/base/src/date-picker/date-picker.tsx`

## 变更代码行
```diff
// date-picker.tsx - handleResultBlur 函数
if(props.needConfirm) return;

- if (props.inputable && index !== undefined) {
-   if (props.quickSelect) {
-     // why: 快速选择时，需要加上timeout，否则e.target.value 获取不到最新的值
-     setTimeout(() => {
-       func.handleInputBlur(e.target.value, index);
-     });
-   } else {
-     func.handleInputBlur(e.target.value, index);
-   }
+ if (props.inputable && !props.quickSelect && index !== undefined) {
+   func.handleInputBlur(e.target.value, index);
}

// 当输入框有值时，失焦时需要立即触发 onChange
```

## 变更前后逻辑差异
- **变更前**：
  1. 可输入模式下，无论是否开启快速选择都会调用 handleInputBlur
  2. 快速选择模式下使用 setTimeout 延迟处理，试图获取最新值
- **变更后**：
  1. 只有在可输入模式且未开启快速选择时才调用 handleInputBlur
  2. 移除了 setTimeout 的处理逻辑
  3. 快速选择模式下不再在失焦时处理输入值

## 逻辑影响范围
- 影响同时开启 `inputable` 和 `quickSelect` 的 DatePicker
- 修复了快速选择二次选值不生效的问题
- 避免了快速选择和输入处理的冲突

## 风险使用场景

### 代码执行风险
- 无直接代码执行风险

### 交互体验差异
- 快速选择模式下不再处理输入框失焦事件
- 恢复了快速选择的正常功能