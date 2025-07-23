# DatePicker 组件 3.4.0 版本 Diff 报告

## 问题描述
1. `DatePicker` 新增 `needConfirm` 属性：是否开启手动确认按钮，开启后只有点击确认按钮才会提交选择的值
2. `DatePicker` 新增 `clearToUndefined` 属性，点击清除后返回 undefined

## 代码变更文件
- `packages/base/src/date-picker/confirm.tsx` (新增)
- `packages/base/src/date-picker/confirm.type.ts` (新增)
- `packages/base/src/date-picker/date-picker.tsx`
- `packages/base/src/date-picker/date-picker.type.ts`
- `packages/base/src/date-picker/day.tsx`
- `packages/base/src/date-picker/month.tsx`
- `packages/base/src/date-picker/quarter.tsx`
- `packages/base/src/date-picker/year.tsx`
- `packages/base/src/date-picker/picker.tsx`
- `packages/base/src/date-picker/time.tsx`
- `packages/shineout-style/src/date-picker/date-picker.ts`

## 变更代码行
```diff
// date-picker.type.ts - 新增属性
export interface DatePickerProps {
+ /**
+  * @en Whether to enable manual confirmation
+  * @cn 是否开启手动确认按钮  
+  * @default false
+  */
+ needConfirm?: boolean;
+ /**
+  * @cn 是否点击清除图标后，value 置为 undefined
+  * @en Whether value is set to undefined after clicking the clear icon
+  * @default false
+  */
+ clearToUndefined?: boolean;
}

// confirm.tsx - 新增确认组件
+ import React from 'react';
+ import Link from '../link';
+ 
+ const Confirm: React.FC<ConfirmProps> = (props) => {
+   const { jssStyle, onConfirm, onNow } = props;
+   return (
+     <div className={jssStyle.datepicker.confirm}>
+       {onNow && <Link className={jssStyle.datepicker.now} onClick={onNow}>今天</Link>}
+       {onConfirm && <Link className={jssStyle.datepicker.ok} onClick={onConfirm}>确认</Link>}
+     </div>
+   );
+ };

// day.tsx - 添加确认按钮逻辑
- const handleDayClick = (date: Date) => {
-   onDaySelect(date);
-   // range date 的时候，选中第二个日期后，关闭面板
-   if (rangeDate[0] && !rangeDate[1]) onCollapse();
- };
+ const handleDayClick = (date: Date) => {
+   onDaySelect(date);
+   // range date 的时候，选中第二个日期后，关闭面板
+   if (!needConfirm && rangeDate[0] && !rangeDate[1]) onCollapse();
+ };

// picker.tsx - 添加确认组件
+ {needConfirm && (
+   <Confirm
+     jssStyle={jssStyle}
+     onConfirm={handleConfirm}
+     onNow={handleNow}
+   />
+ )}
```

## 变更前后逻辑差异
- **变更前**：
  1. 选择日期后立即关闭面板并提交值
  2. 清除操作返回 null
  3. 没有确认步骤
- **变更后**：
  1. 开启 `needConfirm` 后，选择日期不会立即关闭面板，需要点击确认按钮
  2. 新增"今天"按钮快速选择当前日期
  3. 支持 `clearToUndefined` 返回 undefined 而不是 null
  4. 各种类型的选择器（day、month、quarter、year）都支持确认模式

## 逻辑影响范围
- 新增可选属性，不影响现有功能
- 影响日期选择的交互流程
- 影响清除操作的返回值类型

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：新增的属性都是可选的，现有代码无需修改

### 行为变化说明
1. **needConfirm 属性（新增功能）**：
   - 升级前：选择日期后立即关闭面板并提交值
   - 升级后：可通过 `needConfirm={true}` 开启确认模式
   - 受影响场景：需要用户二次确认的日期选择场景
   - 示例代码：
     ```tsx
     <DatePicker 
       needConfirm
       onChange={(date) => console.log(date)}
     />
     ```
   - 是否需要调整：不需要，这是新增功能，默认关闭

2. **clearToUndefined 属性（新增功能）**：
   - 升级前：清除操作返回 `null`
   - 升级后：可通过 `clearToUndefined={true}` 让清除操作返回 `undefined`
   - 受影响场景：
     - 表单验证中区分 null 和 undefined 的场景
     - 使用 `value === undefined` 判断的逻辑
   - 示例代码：
     ```tsx
     <DatePicker 
       clearToUndefined
       onChange={(date) => {
         // date 可能为 undefined（清除后）
         if (date === undefined) {
           // 处理清除逻辑
         }
       }}
     />
     ```
   - 是否需要调整：不需要，默认行为保持不变（返回 null）