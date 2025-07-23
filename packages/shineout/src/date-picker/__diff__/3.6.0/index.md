# DatePicker 组件 3.6.0 版本 Diff 报告

## 问题描述

1. 修复 `DatePicker` 的 `formatResult` 函数格式的自定义结果展示不生效的缺陷
2. 修复 `DatePicker` 的 `open` 受控用法下，`onCollapse` 回调函数可能不触发而导致无法选择的问题
3. 修复 `DatePicker` 仅开启 `needConfirm` 属性情况下不展示"今天"按钮的缺陷
4. 修复 `DatePicker` 小尺寸模式下"今天"按钮不上下居中的样式问题
5. `DatePicker` 周选择器的结果末尾追加"周"字，优化中文显示

## 代码变更文件

1. `packages/hooks/src/components/use-datepicker/use-datepicker-format.ts`
2. `packages/base/src/date-picker/picker.tsx`
3. `packages/base/src/date-picker/confirm.tsx`
4. `packages/shineout-style/src/datepicker/datepicker.ts`

## 变更代码行

### 1. 修复 formatResult 函数支持
```diff
// use-datepicker-format.ts
const getFormatShowValue = () => {
  if (props.formatResult) {
    if (typeof props.formatResult === 'string') {
      return getFormatValueArr(dateArr, props.formatResult);
+   } else if (typeof props.formatResult === 'function') {
+     // 支持函数格式的 formatResult
+     return dateArr.map(item => (props.formatResult as (date?: Date) => string)(item))
    } else {
      return dateArr.map((item) => {
        if (!item) return '';
```

### 2. 周选择器显示优化
```diff
// use-datepicker-format.ts
if (props.type === 'week') {
- result = getLocale(locale, 'weekdayValues.narrow')[weekStartMy];
+ // 在周缩写后追加"周"字
+ result = getLocale(locale, 'weekdayValues.narrow')[weekStartMy] + '周';
}
```

### 3. 修复 needConfirm 下的"今天"按钮显示
```diff
// confirm.tsx
const Confirm: React.FC<ConfirmProps> = (props) => {
  const { jssStyle, onConfirm, onNow } = props;
  return (
    <div className={jssStyle.datepicker.confirm}>
-     {onNow && <Link className={jssStyle.datepicker.now} onClick={onNow}>今天</Link>}
+     {/* 始终显示今天按钮，而不依赖 onNow 的存在 */}
+     <Link className={jssStyle.datepicker.now} onClick={onNow}>今天</Link>
      {onConfirm && <Link className={jssStyle.datepicker.ok} onClick={onConfirm}>确认</Link>}
    </div>
  );
};
```

### 4. 修复小尺寸样式
```diff
// datepicker.ts
confirm: {
  // ... 其他样式
+ '&[data-soui-size="small"]': {
+   lineHeight: token.lineHeightDynamic,
+   '& $now, & $ok': {
+     verticalAlign: 'middle',
+   }
+ }
}
```

## 变更前后逻辑差异

### 变更前
1. `formatResult` 传入函数时不生效，只支持字符串格式
2. 周选择器只显示星期缩写（如"一"、"二"）
3. 仅开启 `needConfirm` 时，"今天"按钮不显示
4. 小尺寸模式下按钮垂直对齐不正确
5. `open` 受控模式下可能导致选择功能失效

### 变更后
1. 完整支持 `formatResult` 的函数格式，可以灵活自定义日期显示
2. 周选择器显示优化为"一周"、"二周"等，更符合中文习惯
3. `needConfirm` 模式下正确显示"今天"按钮
4. 修复了小尺寸模式的样式对齐问题
5. 修复了受控模式的回调触发逻辑

## 逻辑影响范围
- 影响所有使用 `formatResult` 函数格式的日期显示
- 影响所有周选择器的显示文本
- 影响 `needConfirm` 模式下的按钮布局
- 影响小尺寸 DatePicker 的视觉效果
- 修复了受控模式下的交互可靠性

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：主要为缺陷修复和显示优化

### 行为变化说明

1. **formatResult 函数生效**：
   - 升级前：函数格式的 `formatResult` 被忽略
   - 升级后：函数格式正常工作，自定义显示生效
   - 受影响场景：
     ```tsx
     <DatePicker
       formatResult={(date) => {
         // 升级前：这个函数不会被调用
         // 升级后：正常调用并显示返回值
         return date ? `选中：${date.toLocaleDateString()}` : '';
       }}
     />
     ```
   - 是否需要调整：检查是否有依赖原有"不生效"行为的代码

2. **周选择器显示变化**：
   - 升级前：显示"一"、"二"、"三"等
   - 升级后：显示"一周"、"二周"、"三周"等
   - 受影响场景：
     ```tsx
     <DatePicker type="week" />
     ```
   - 是否需要调整：通常不需要，但如有特殊样式或宽度限制需要确认

3. **needConfirm 模式按钮显示**：
   - 升级前：仅显示"确认"按钮
   - 升级后：同时显示"今天"和"确认"按钮
   - 受影响场景：
     ```tsx
     <DatePicker needConfirm />
     ```
   - 是否需要调整：不需要，功能增强

4. **小尺寸样式修复**：
   - 升级前：按钮可能上下不居中
   - 升级后：按钮正确垂直居中
   - 受影响场景：
     ```tsx
     <DatePicker size="small" needConfirm />
     ```
   - 是否需要调整：不需要，视觉优化

5. **受控模式可靠性**：
   - 升级前：`open` 受控时可能无法正常选择日期
   - 升级后：受控模式正常工作
   - 受影响场景：
     ```tsx
     <DatePicker 
       open={open}
       onCollapse={(collapse) => setOpen(!collapse)}
     />
     ```
   - 是否需要调整：不需要，缺陷修复