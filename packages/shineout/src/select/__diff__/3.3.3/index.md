# Select 组件 3.3.3 版本 Diff 报告

## 问题描述

修复 `Select` 选中项最终为假值时渲染异常的问题。当选中值为 `0`、`false` 等假值时，组件会将其过滤掉，导致无法正确显示选中内容。

新增 `Select` 单选搜索时展示非 string 类型值的支持。之前单选模式下搜索框只能显示纯文本，现在支持显示 `renderItem` 返回的复杂 React 元素，如带图标、样式的内容。

## 代码变更文件

1. `packages/base/src/select/result.tsx`
2. `packages/base/src/select/result-input.tsx`
3. `packages/shineout-style/src/select/select.ts`
4. `packages/shineout-style/src/select/index.ts`
5. `packages/shineout-style/src/select/type.ts`
6. `packages/hooks/src/utils/is.ts`

## 变更代码行

### packages/base/src/select/result.tsx - 修复假值处理
```diff
  const getValueArr = () => {
-   if (valueProp === undefined || valueProp === null) return [];
    return isArray(valueProp) ? valueProp : [valueProp];
  };
```

```diff
- const value = (() => {
-   if (isArray(valueProp)) return valueProp;
-   if (valueProp === null || valueProp === undefined || valueProp === '') return [];
-   return [valueProp];
- })();
+ const value = isArray(valueProp) ? valueProp : [valueProp];
```

### packages/base/src/select/result-input.tsx - 新增非字符串 placeholder 支持
```diff
+ const renderResultPlaceholder = () => {
+   const { placeholder } = props;
+   if (!placeholder || typeof placeholder === 'string') return null;
+   return (
+     <div className={selectClasses?.inputPlaceholder} key='input-placeholder'>
+       {placeholder}
+     </div>
+   );
+ };

  return (
    <Fragment>
      <Input
        {...props}
+       placeholder={typeof placeholder === 'string' ? placeholder : undefined}
      />
+     {renderResultPlaceholder()}
    </Fragment>
  );
```

### packages/base/src/select/result.tsx - 单选模式 placeholder 处理
```diff
- const showPlaceholder = 
-   !multiple && 
-   focusInput && 
-   renderResultContent && 
-   typeof renderResultContent === 'string' 
-     ? renderResultContent 
-     : undefined;
+ const showPlaceholder = !multiple && focusInput && renderResultContent ? renderResultContent : undefined;
```

### packages/shineout-style/src/select/select.ts - 新增样式
```diff
+ inputPlaceholder: () => ({
+   position: 'absolute',
+   color: token.colorPlaceholder,
+   inset: 0,
+   display: 'flex',
+   alignItems: 'center',
+   pointerEvents: 'none',
+   paddingLeft: token.selectResultInputPaddingLeft,
+   overflow: 'hidden',
+ }),
```

## 变更前后逻辑差异

### 变更前
- 假值（`0`、`false` 等）会被过滤掉，无法作为有效选中值显示
- 单选搜索模式下，placeholder 只支持字符串类型
- `renderItem` 返回复杂元素时，搜索框会显示 `[object Object]`

### 变更后
- 假值可以正常作为选中值显示
- 单选搜索模式下，placeholder 支持显示任意 React 元素
- `renderItem` 返回的复杂元素可以正确显示在搜索框中

## 逻辑影响范围

1. **假值处理**：影响所有使用假值作为选项值的场景
2. **搜索框显示**：影响单选模式下开启搜索功能的场景
3. **renderItem 渲染**：影响使用自定义渲染函数返回复杂元素的场景
4. **不受影响**：多选模式、不使用假值的场景、不使用自定义渲染的场景

## 风险场景分析

### DOM 结构变更风险

1. **输入框占位符结构变化**：
   - 变更描述：新增了 `inputPlaceholder` 的 div 容器用于显示非字符串类型的占位符
   - 风险场景：依赖原有输入框 DOM 结构进行样式覆盖或 DOM 操作的场景
   - 风险示例：
   ```css
   /* 风险样式：直接定位输入框的兄弟元素 */
   .so-select-result-input + div {
     display: none;
   }
   ```
   - 规避方案：使用更精确的类名选择器或重新评估样式覆盖策略

### 行为逻辑变更风险

1. **假值过滤逻辑变化**：
   - 变更描述：移除了对假值（`0`、`false` 等）的过滤逻辑
   - 风险场景：业务代码依赖组件过滤假值行为的场景
   - 风险示例：
   ```tsx
   // 风险代码：依赖组件自动过滤假值
   const handleChange = (value) => {
     // 之前：value 不会包含 0 或 false
     // 现在：value 可能包含 0 或 false
     if (value.length === 0) {
       // 原本期望所有假值都被过滤
       setNoSelection(true);
     }
   };
   ```
   - 规避方案：在业务代码中显式处理假值逻辑

### 样式变更风险

1. **新增样式类名**：
   - 变更描述：新增 `inputPlaceholder` 样式类
   - 风险场景：全局样式可能与新增类名冲突
   - 风险示例：
   ```css
   /* 风险样式：可能影响新增的 placeholder 容器 */
   div[class*="placeholder"] {
     opacity: 0.5;
   }
   ```
   - 规避方案：检查全局样式规则，避免使用过于宽泛的选择器

## 升级注意事项

### 代码兼容性

**无破坏性变更**

所有变更都是修复和增强功能，不会影响现有代码的正常运行。

### 行为变化说明

1. **假值选中项显示**
   - **影响场景**：选项值为 `0`、`false` 等假值的场景
   - **具体表现**：之前这些值无法正确显示，现在可以正常显示
   - **受影响代码示例**：
     ```tsx
     // 之前：选中值为 0 时不显示
     // 现在：选中值为 0 时正常显示
     <Select value={0} data={[{value: 0, text: '零'}, {value: 1, text: '一'}]} />
     ```
   - **是否需要调整**：无需调整，行为修正

2. **单选搜索框复杂内容显示**
   - **影响场景**：单选模式下使用 `renderItem` 返回非字符串内容
   - **具体表现**：之前显示 `[object Object]`，现在正确显示渲染内容
   - **受影响代码示例**：
     ```tsx
     // 之前：搜索框显示 [object Object]
     // 现在：搜索框显示带图标的内容
     <Select 
       onFilter={true}
       renderItem={(d) => <span><Icon /> {d.text}</span>}
       data={data}
     />
     ```
   - **是否需要调整**：无需调整，功能增强