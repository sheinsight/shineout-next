# DatePicker 组件 3.6.0 版本 Diff 报告

## 问题描述
1. 修复 `DatePicker` 的 `formatResult` 函数格式的自定义结果展示不生效的问题
2. 修复 `DatePicker` 的 `open` 受控用法下，onCollapse 回调函数可能不触发而导致无法选择的问题
3. 修复 `DatePicker` 仅开启 `needConfirm` 属性情况下不展示今天按钮的问题
4. 修复 `DatePicker` 小尺寸模式下"今天按钮"不上下居中的问题
5. `DatePicker` 周选择器的结果末尾追加"周"字

## 代码变更文件
- `packages/hooks/src/components/use-datepicker/use-datepicker-format.ts`
- `packages/base/src/date-picker/picker.tsx`
- `packages/shineout-style/src/datepicker/datepicker.ts`

## 变更代码行
```diff
// use-datepicker-format.ts - formatResult 函数支持
const getFormatShowValue = () => {
  if (props.formatResult) {
    if (typeof props.formatResult === 'string') {
      return getFormatValueArr(dateArr, props.formatResult);
+   } else if(typeof props.formatResult === 'function'){
+     return dateArr.map(item => (props.formatResult as (date?: Date) => string)(item))
    } else {
      return dateArr.map((item) => {
        if (!item) return '';

// week 类型展示处理
  if (props.type === 'week') {
-   result = getLocale(locale, 'weekdayValues.narrow')[weekStartMy];
+   result = getLocale(locale, 'weekdayValues.narrow')[weekStartMy] + '周';
  }
```

## 变更前后逻辑差异
- **变更前**：
  1. formatResult 函数格式不生效，只支持字符串格式
  2. 周选择器只显示星期缩写
  3. needConfirm 开启时今天按钮不显示
- **变更后**：
  1. 完整支持 formatResult 函数格式，可以自定义日期展示
  2. 周选择器末尾追加"周"字，更符合中文习惯
  3. 修复了 needConfirm 相关的显示问题

## 逻辑影响范围
- 影响使用 formatResult 函数的自定义显示场景
- 影响周选择器的显示格式
- 影响 needConfirm 模式下的按钮显示
- 影响 open 受控模式的回调触发

## 风险使用场景

### 代码执行风险
- 无直接代码执行风险

### 交互体验差异
- 周选择器显示格式变化，原来显示"一"现在显示"一周"
- formatResult 函数开始生效，可能影响已有的显示逻辑