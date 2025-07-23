# DatePicker 组件 3.7.5-beta.5 版本 Diff 报告

## 问题描述

修复 `DatePicker` 的 `formatResult` 属性在 `type` 为 `month` 时，切换月份时展示结果不正确的缺陷。当 formatResult 为函数时，在月份选择器切换过程中可能传入 undefined 值导致显示异常。

## 代码变更文件

`packages/hooks/src/components/use-datepicker/use-datepicker-format.ts`

## 变更代码行

```diff
// use-datepicker-format.ts - getResultValueArr 函数
const getResultValueArr = (dateArr: (Date | undefined)[]) => {
  if (props.formatResult) {
    if (typeof props.formatResult === 'string') {
      return getFormatValueArr(dateArr, props.formatResult);
    } else if (typeof props.formatResult === 'function') {
-     return dateArr.map((item) => (props.formatResult as (date?: Date) => string)(item));
+     return dateArr.map((item) => {
+       if(!item) return ''
+       return (props.formatResult as (date?: Date) => string)(item)
+     })
    } else {
      return dateArr.map((item) => {
        if (!item) return '';
        return dateUtil.format(item, format, options) || '';
      });
    }
  }
  return getFormatValueArr(dateArr);
};
```

## 变更前后逻辑差异

### 变更前
1. 当 `formatResult` 为函数时，直接将 dateArr 数组中的每个元素传递给 formatResult 函数
2. 如果数组元素为 `undefined` 或 `null`，会直接传递给用户定义的函数
3. 在 `type="month"` 切换月份过程中，dateArr 可能包含空值，导致显示异常

### 变更后
1. 在调用 formatResult 函数前增加了空值检查
2. 如果 item 为空值，直接返回空字符串，不调用用户函数
3. 确保 formatResult 函数只接收有效的 Date 对象
4. 与其他分支（字符串格式和默认处理）保持一致的空值处理逻辑

## 逻辑影响范围
- 影响所有使用函数式 `formatResult` 的 DatePicker 组件
- 特别修复了 `type="month"` 时切换月份的显示问题
- 不影响 `formatResult` 为字符串格式或未设置的情况
- 提升了组件的健壮性和容错性

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：这是一个缺陷修复，增强了容错处理

### 行为变化说明

1. **月份选择器显示修复**：
   - 升级前：切换月份时可能出现显示异常或 JavaScript 错误
   - 升级后：切换月份时正常显示
   - 受影响场景：
     ```tsx
     <DatePicker
       type="month"
       formatResult={(date) => {
         // 升级前：可能接收到 undefined，导致错误
         // 升级后：保证只接收到有效的 Date 对象
         return date ? `${date.getFullYear()}年${date.getMonth() + 1}月` : '';
       }}
     />
     ```
   - 是否需要调整：不需要，这是缺陷修复

2. **formatResult 函数参数变化**：
   - 升级前：函数可能接收到 `undefined` 参数
   - 升级后：函数保证只接收到有效的 Date 对象
   - 受影响场景：
     ```tsx
     // 之前需要在函数内部处理空值
     formatResult={(date) => {
       if (!date) return ''; // 升级后这个判断不再必要
       return customFormat(date);
     }}
     ```
   - 是否需要调整：不需要，但可以简化代码逻辑

3. **空值处理一致性**：
   - 升级前：函数式 formatResult 缺少空值处理
   - 升级后：所有格式（字符串、函数、默认）都有统一的空值处理
   - 提升了整体代码质量