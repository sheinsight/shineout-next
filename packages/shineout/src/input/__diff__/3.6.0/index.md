# Input 组件 3.6.0 版本 Diff 报告

## 问题描述
修复 `Input.Number` 在输入小数点情况下，退格至小数点前时会将小数点删除的问题（Regression: since v3.4.0）

## 代码变更文件
`packages/hooks/src/components/use-input/use-input-number.ts`

## 变更代码行
```diff
const onInnerChange = usePersistFn((val?: string | number | null) => {
  setInternalInputValue(getStringValue(val));
  if(typeof val === 'string'){
+   if(val.endsWith('.')) return
    const num = parseFloat(val);
    if(val === '') {
      // 如果允许空值，则返回 null，否则返回 undefined
```

## 变更前后逻辑差异
- **变更前**：输入值以小数点结尾时（如 "123."），会被 parseFloat 处理后丢失小数点
- **变更后**：检测到值以小数点结尾时直接返回，不进行后续处理，保留小数点

## 逻辑影响范围
- 修复了输入小数时退格删除数字后小数点消失的问题
- 改善了小数输入的用户体验
- 不影响完整数字的输入和处理

## 风险使用场景

### 代码执行风险
- 无直接代码执行风险

### 交互体验差异
- 输入小数点后退格不会导致小数点消失，符合用户预期