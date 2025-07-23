# Gap 组件 3.1.30 版本 Diff 报告

## 问题描述

修复 `Gap` 组件的 `itemStyle` 属性不生效的缺陷。这是一个明确的 bug：在支持 flex gap 的现代浏览器中，组件错误地将 `itemStyle` 设置为 `undefined`，导致用户传入的所有自定义样式被完全忽略。

## 代码变更文件

`packages/base/src/gap/gap.tsx`

## 变更代码行

```diff
const itemStyle = supportFlexGap
-  ? undefined
+  ? itemStyleProps
  : {
      ...itemStyleProps,
      marginBottom: row,
```

## 变更前后逻辑差异

### 变更前
- 当浏览器支持 flex gap（`supportFlexGap` 为 true）时，`itemStyle` 被强制设置为 `undefined`
- 用户传入的 `itemStyleProps` 被完全忽略，相当于属性失效
- 只有在不支持 flex gap 的旧浏览器中 `itemStyle` 才会生效

### 变更后
- 无论浏览器是否支持 flex gap，都会正确传递用户的 `itemStyleProps`
- 在支持 flex gap 的浏览器中，直接使用用户传入的样式
- 在不支持 flex gap 的浏览器中，在用户样式基础上添加间距处理

## 逻辑影响范围
- 修复了现代浏览器（Chrome、Firefox、Safari 等主流浏览器）中 `itemStyle` 完全失效的问题
- 保持了对旧浏览器的兼容性处理逻辑不变
- 不影响组件的间距功能，flex gap 机制继续正常工作

## 风险使用场景

### 代码执行风险
- 无破坏性变更，仅修复了属性传递的缺陷

### 升级影响分析

1. **itemStyle 样式生效变化**：
   - 升级前：在支持 flex gap 的现代浏览器（Chrome、Firefox、Safari等）中，`itemStyle` 完全不生效，样式被忽略
   - 升级后：`itemStyle` 在所有浏览器中都正确生效，子元素会应用设置的样式
   - 受影响场景：
     ```tsx
     // 现有代码
     <Gap 
       gap={16}
       itemStyle={{ 
         background: '#f0f0f0', 
         padding: '10px',
         border: '1px solid #ddd'
       }}
     >
       <div>Item 1</div>
       <div>Item 2</div>
     </Gap>
     ```
   - 行为变化：子元素从无样式变为有灰色背景、内边距和边框
   - 是否需要调整：需要检查视觉效果是否符合预期，可能需要移除或调整 `itemStyle`

2. **浏览器兼容性差异**：
   - 升级前：旧浏览器（不支持 flex gap）显示样式，新浏览器不显示样式
   - 升级后：所有浏览器表现一致，都会显示样式
   - 受影响场景：跨浏览器测试时发现的样式不一致问题
   - 是否需要调整：不需要，这是正向修复

3. **遗留代码影响**：
   - 升级前：开发者可能因为样式不生效而放弃使用，但代码未清理
   - 升级后：这些"遗留"的 `itemStyle` 会突然生效
   - 受影响场景：项目中存在但未生效的 `itemStyle` 配置
   - 是否需要调整：需要全局搜索并检查所有使用 `itemStyle` 的 Gap 组件