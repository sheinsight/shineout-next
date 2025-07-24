# Select 组件 3.4.7 版本 Diff 报告

## 问题描述

修复 `Select` 在 value 为空对象时 placeholder 失效的问题。当 `renderResult` 返回 `undefined`（通常是因为传入了空对象或无效数据）时，组件不会显示 placeholder，而是显示为空白，影响用户体验。

## 代码变更文件

1. `packages/base/src/select/result.tsx`

## 变更代码行

### packages/base/src/select/result.tsx - 修复空对象时的 placeholder 显示
```diff
  if (!multiple && valueProp && valueProp !== 0) {
    const result = getDataByValues(value);
    _placeholder = renderResultContent(result[0]);
+   if (_placeholder === undefined) _placeholder = placeholder;
  }
```

```diff
  // 单选场景下，焦点时自动选中input文本
- if(!multiple && focus && showInput && mounted.current){
-     const result = getDataByValues(value);
-     if(result.length > 0){
-       const inputTmpText = renderResultContent(result[0]);
-       inputTmpText && props.setInputText(inputTmpText);
-     }
+ if (!multiple && focus && showInput && mounted.current) {
+   const result = getDataByValues(value);
+   if (result.length > 0) {
+     const inputTmpText = renderResultContent(result[0]);
+     inputTmpText && props.setInputText(inputTmpText);
+   }
```

## 变更前后逻辑差异

### 变更前
- 当 `renderResult` 返回 `undefined` 时，placeholder 也被设置为 `undefined`
- 导致输入框显示为空白，没有任何提示信息
- 用户无法区分是否已选择了值

### 变更后
- 当 `renderResult` 返回 `undefined` 时，回退使用原始的 placeholder
- 确保始终有占位文本提示用户
- 改善了空对象或无效数据的显示效果

## 逻辑影响范围

1. **空对象处理**：影响 value 为空对象或 `renderResult` 返回 `undefined` 的场景
2. **placeholder 显示**：确保 placeholder 在各种边界情况下都能正确显示
3. **不受影响**：正常的数据选择、多选模式、有效值的显示

## 升级注意事项

### 代码兼容性

**无破坏性变更**

此修复改善了边界情况的处理，不会影响正常使用。

### 行为变化说明

1. **空对象时的 placeholder 显示**
   - **影响场景**：value 为空对象或 `renderResult` 返回 `undefined`
   - **具体表现**：之前显示空白，现在显示 placeholder
   - **受影响代码示例**：
     ```tsx
     // 之前：value 为空对象时显示空白
     // 现在：value 为空对象时显示 placeholder
     <Select 
       value={{}}
       placeholder="请选择"
       renderResult={(d) => d?.name}
       data={options}
     />
     ```
   - **是否需要调整**：无需调整，显示优化