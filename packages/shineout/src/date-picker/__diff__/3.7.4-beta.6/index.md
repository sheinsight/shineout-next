# DatePicker 组件 3.7.4-beta.6 版本 Diff 报告

## 问题描述

修复 `DatePicker` 可输入模式下的快速选择，二次选值后不生效的缺陷。该问题是 v3.7.3 版本引入的回归问题（Regression），当同时开启 `inputable` 和 `quickSelect` 时，第二次使用快速选择选取日期时值不会更新。

## 代码变更文件

`packages/base/src/date-picker/date-picker.tsx`

## 变更代码行

```diff
// date-picker.tsx - handleBlur 函数
const handleBlur = usePersistFn((e: React.FocusEvent<HTMLInputElement>, index?: number) => {
  setFocused(false);
  props.onBlur?.(e, index);

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
- }
+ if (props.inputable && !props.quickSelect && index !== undefined) {
+   func.handleInputBlur(e.target.value, index);
+ }

  // 当输入框有值时，失焦时需要立即触发 onChange，否则触控板的轻触模拟出来的click事件就获取不到最新的值
  if(inputArr.some(d => d !== undefined)) {
    func.finishEdit();
  };
});
```

## 变更前后逻辑差异

### 变更前
1. 可输入模式下，无论是否开启快速选择，都会在失焦时调用 `handleInputBlur`
2. 快速选择模式使用 `setTimeout` 延迟处理，试图解决获取不到最新值的问题
3. `setTimeout` 导致时序混乱，在第二次快速选择时值无法正确更新

### 变更后
1. 只有在可输入模式且未开启快速选择时才调用 `handleInputBlur`
2. 快速选择模式下不再在失焦时处理输入值
3. 避免了快速选择和输入处理的逻辑冲突

## 逻辑影响范围
- 仅影响同时开启 `inputable` 和 `quickSelect` 的 DatePicker 组件
- 修复了快速选择二次选值不生效的回归问题
- 不影响单独使用 `inputable` 或 `quickSelect` 的场景
- 不影响普通的日期选择功能

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：这是一个回归缺陷修复，恢复了 v3.7.3 之前的正常行为

### 行为变化说明

1. **快速选择功能恢复正常**：
   - 升级前：同时开启 `inputable` 和 `quickSelect` 时，第二次快速选择不生效
   - 升级后：快速选择可以正常多次使用
   - 受影响场景：
     ```tsx
     <DatePicker
       inputable
       quickSelect={[
         {
           name: '今天',
           value: () => new Date()
         },
         {
           name: '昨天',
           value: () => {
             const date = new Date();
             date.setDate(date.getDate() - 1);
             return date;
           }
         }
       ]}
     />
     // 升级前：点击"今天"后再点击"昨天"，值不会变化
     // 升级后：正常切换
     ```
   - 是否需要调整：不需要，这是缺陷修复

2. **输入框失焦处理逻辑优化**：
   - 升级前：快速选择模式下也会处理失焦事件，导致逻辑冲突
   - 升级后：快速选择和手动输入的处理逻辑分离
   - 受影响场景：同时使用输入和快速选择的复杂交互
   - 是否需要调整：不需要，提升了稳定性

3. **性能优化**：
   - 移除了不必要的 `setTimeout` 调用
   - 减少了异步操作，提升了响应速度