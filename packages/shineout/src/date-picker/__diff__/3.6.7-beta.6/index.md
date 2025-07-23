# DatePicker 组件 3.6.7-beta.6 版本 Diff 报告

## 问题描述

修复 `DatePicker` 在设置了和 `format` 格式不相符的 `defaultValue` 后会触发多次 onChange 的缺陷。例如：当 format 为 "YYYY-MM-DD" 但 defaultValue 传入 Date 对象或时间戳时，组件内部会反复格式化并触发 onChange。

## 代码变更文件

1. `packages/hooks/src/components/use-datepicker/use-datepicker-format.ts`
2. `packages/shineout/src/date-picker/date-picker.tsx`

## 变更代码行

### 1. 导出内部格式化函数
```diff
// use-datepicker-format.ts
-const convertValueToDateArr = (
+export const convertValueToDateArr = (
   value: DatePickerValueType,
   format: string,
   options: {
     timeZone?: string;
     weekStartsOn?: number;
   },
 ) => {
   const valueArr = Array.isArray(value) ? value : [value];
   return valueArr.map((item) => {
     if (!item) return undefined;
     return dateUtil.toDateWithFormat(item, format, undefined, options);
   });
 };

-const getFormat = (format: string | undefined, type: string) => {
+export const getFormat = (format: string | undefined, type: string) => {
   if (typeof format === 'string') return format;
   switch (type) {
     case 'datetime':
       return 'YYYY-MM-DD HH:mm:ss';
     case 'month':
       return 'YYYY-MM';
     case 'time':
       return 'HH:mm:ss';
     case 'week':
       return 'gggg-ww';
     case 'year':
       return 'YYYY';
     case 'quarter':
       return 'YYYY-[Q]Q';
     default:
       return 'YYYY-MM-DD';
   }
 };

+interface FormatValueType {
+  dateArr: (Date | undefined)[];
+  format: string;
+  fmt?: string;
+  type: 'date' | 'datetime' | 'month' | 'time' | 'week' | 'year' | 'quarter';
+  clearWithUndefined?: boolean;
+  options: {
+    timeZone?: string;
+    weekStartsOn?: number;
+  };
+}
+
+export const getFormatValueArr = (opts: FormatValueType) => {
+  const { dateArr, format, clearWithUndefined, options, type } = opts;
+  const fmt = getFormat(format, type);
+  return dateArr.map((item) => {
+    if (!item) return clearWithUndefined ? undefined : '';
+    return dateUtil.format(item, fmt, options);
+  });
+};
```

### 2. 预格式化 defaultValue
```diff
// date-picker.tsx
-import { DatePicker } from '@sheinx/base';
+import { useMemo } from 'react';
+import { DatePicker, getLocale, useConfig } from '@sheinx/base';
+import { convertValueToDateArr, getFormat, getFormatValueArr } from '@sheinx/hooks'

export default <Value extends DatePickerValueType = DatePickerValueType>(
  props: DatePickerProps<Value>,
) => {
+ const { locale } = useConfig();
+
+ // datepicker 默认值需要提前格式化处理，否则内部会根据 format 进行格式化并再次触发 onChange
+ const defaultValue = useMemo(() => {
+   if (props.defaultValue) {
+     const options = {
+       timeZone: props.timeZone,
+       weekStartsOn: Number(getLocale(locale, 'startOfWeek')),
+     }
+     const type = props.type || 'date';
+     const format = getFormat(props.format, type);
+     const dateArr = convertValueToDateArr(props.defaultValue, format, options);
+     const formattedDefaultValue = getFormatValueArr({
+       dateArr,
+       format,
+       type,
+       options
+     });
+
+     return (props.range ? formattedDefaultValue : formattedDefaultValue[0]) as Value;
+   }
+   return props.defaultValue;
+ }, [])
+
- return useFieldCommon(props, BaseDatePicker<Value>);
+ return useFieldCommon({
+   ...props,
+   defaultValue,
+ }, BaseDatePicker<Value>);
};
```

## 变更前后逻辑差异

### 变更前
1. defaultValue 直接传递给内部组件
2. 内部组件检测到值格式与 format 不符时，会进行格式化并触发 onChange
3. 由于格式化后的值与原值不同，可能导致多次循环触发
4. 用户设置的 defaultValue 意外触发了 onChange 事件

### 变更后
1. 在组件外层使用 useMemo 预先格式化 defaultValue
2. 确保传递给内部组件的默认值已经符合指定的 format 格式
3. 避免了内部的重复格式化和 onChange 触发
4. defaultValue 只作为初始值，不会触发 onChange

## 逻辑影响范围
- 修复了格式不匹配的 defaultValue 导致的多次 onChange 问题
- 确保 defaultValue 的行为符合预期（仅作为初始值）
- 不影响正常的 value 受控模式
- 不影响已经传入正确格式的 defaultValue

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：这是一个缺陷修复，恢复了 defaultValue 的正确行为

### 行为变化说明

1. **defaultValue 不再触发 onChange**：
   - 升级前：格式不符的 defaultValue 会触发 1-2 次 onChange
   - 升级后：defaultValue 不会触发 onChange，符合 React 规范
   - 受影响场景：
     ```tsx
     <DatePicker
       format="YYYY-MM-DD"
       defaultValue={new Date()} // Date 对象格式与 format 不符
       onChange={(value) => {
         console.log('changed:', value);
         // 升级前：初始化时会打印 1-2 次
         // 升级后：初始化时不会打印，仅用户操作时打印
       }}
     />
     ```
   - 是否需要调整：如果依赖了错误的 onChange 触发，需要调整逻辑

2. **defaultValue 格式自动转换**：
   - 升级前：传入的值原样使用，可能导致显示异常
   - 升级后：自动转换为符合 format 的格式
   - 受影响场景：
     ```tsx
     <DatePicker
       type="date"
       format="YYYY/MM/DD"
       defaultValue={1234567890000} // 时间戳
     />
     // 升级前：可能显示异常或触发多次 onChange
     // 升级后：正确显示为 "2009/02/14"
     ```
   - 是否需要调整：不需要，这是正确的行为

3. **性能优化**：
   - 升级前：可能存在多次不必要的格式化和渲染
   - 升级后：只在初始化时格式化一次
   - 提升了组件初始化性能