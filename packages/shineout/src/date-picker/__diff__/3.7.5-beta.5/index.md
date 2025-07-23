# DatePicker 组件 3.7.5-beta.5 版本 Diff 报告

## 问题描述
修复 `DatePicker` 的 `formatResult` 属性在 `type` 为 `month` 时，切换月份时展示结果不正确的问题

## 代码变更文件
- `packages/hooks/src/components/use-datepicker/use-datepicker-format.ts`

## 变更代码行
```diff
// use-datepicker-format.ts
const getFormatShowValue = () => {
  if (typeof props.formatResult === 'string') {
    return getFormatValueArr(dateArr, props.formatResult);
  } else if (typeof props.formatResult === 'function') {
-   return dateArr.map((item) => (props.formatResult as (date?: Date) => string)(item));
+   return dateArr.map((item) => {
+     if(!item) return ''
+     return (props.formatResult as (date?: Date) => string)(item)
+   })
  } else {
    return dateArr.map((item) => {
      if (!item) return '';
```

## 变更前后逻辑差异
- **变更前**：当 `formatResult` 为函数时，直接对 dateArr 中的每个元素调用 formatResult 函数，如果元素为 null/undefined 可能导致函数执行异常
- **变更后**：在调用 formatResult 函数前增加空值判断，如果 item 为空则直接返回空字符串，避免传入 undefined 导致的显示异常

## 逻辑影响范围
- 影响使用 `formatResult` 函数格式化显示结果的场景
- 特别是 `type='month'` 时切换月份的显示
- 不影响 formatResult 为字符串格式或未设置的情况

## 升级注意事项

### 代码兼容性
- 无直接代码执行风险

### 行为变化说明
- 修复了月份选择器切换时可能出现的显示异常
- formatResult 函数不再接收到 undefined 参数