# DatePicker 组件 3.6.7-beta.6 版本 Diff 报告

## 问题描述
修复 `DatePicker` 在设置了和 `format` 格式不相符的 `defaultValue` 后会触发多次 onChange 的问题

## 代码变更文件
- `packages/hooks/src/components/use-datepicker/index.ts`
- `packages/hooks/src/components/use-datepicker/use-datepicker-format.ts`
- `packages/shineout/src/date-picker/date-picker.tsx`

## 变更代码行
```diff
// use-datepicker-format.ts
- const convertValueToDateArr = (
+ export const convertValueToDateArr = (
  value: DatePickerValueType,
  format: string,
  options: {
    weekStartsOn?: number;
    timeZone?: string;
  },
) => {
  // ...
};

- const getFormat = (format: string | undefined, type: string) => {
+ export const getFormat = (format: string | undefined, type: string) => {
  if (typeof format === 'string') return format;
  // ...
};

+ interface FormatValueType {
+   dateArr: (Date | undefined)[];
+   format: string;
+   fmt?: string;
+   type: 'date' | 'datetime' | 'month' | 'time' | 'week' | 'year' | 'quarter';
+   clearWithUndefined?: boolean;
+   options: {
+     timeZone?: string;
+     weekStartsOn?: number;
+   };
+ }
+ 
+ export const getFormatValueArr = (opts: FormatValueType) => {
+   const { dateArr, format, clearWithUndefined, options, type } = opts;
+   const fmt = getFormat(format, type);
+   return dateArr.map((item) => {
+     if (!item) return clearWithUndefined ? undefined : '';
+     return dateUtil.format(item, fmt, options);
+   });
+ };

// date-picker.tsx - 新增格式化验证逻辑
+ import { convertValueToDateArr, getFormat, getFormatValueArr } from '@sheinx/hooks';

+ // 在组件中添加 defaultValue 格式验证
+ const checkDefaultValue = () => {
+   if (!defaultValue) return;
+   const dateArr = convertValueToDateArr(defaultValue, format, options);
+   const formatArr = getFormatValueArr({
+     dateArr,
+     format,
+     type,
+     clearWithUndefined,
+     options,
+   });
+   // 检查格式化后的值是否与原值一致
+   // 如果不一致，说明 defaultValue 格式不符合 format
+ };
```

## 变更前后逻辑差异
- **变更前**：
  1. 当 defaultValue 的格式与 format 不匹配时，组件内部会多次尝试格式化，导致 onChange 被多次触发
  2. 内部格式化函数未导出，无法在外部进行格式验证
- **变更后**：
  1. 导出了 `convertValueToDateArr`、`getFormat` 和新增的 `getFormatValueArr` 函数
  2. 在组件初始化时验证 defaultValue 格式，避免多次触发 onChange
  3. 提供了统一的格式化方法，确保格式转换的一致性

## 逻辑影响范围
- 修复了不符合 format 格式的 defaultValue 导致的多次 onChange 触发问题
- 不影响符合格式要求的正常使用场景
- 导出的工具函数可供外部使用，增强了灵活性

## 风险使用场景

### 代码执行风险
- 无直接代码执行风险

### 交互体验差异
- 原本会触发多次 onChange 的场景现在只会触发一次
- 提升了组件初始化的性能