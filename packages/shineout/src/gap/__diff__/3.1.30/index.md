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

### 交互体验差异

#### 升级前的缺陷表现
在支持 flex gap 的现代浏览器中，`itemStyle` 属性完全不生效：
```tsx
// 缺陷：在 Chrome、Firefox 等现代浏览器中
// background、padding、border 等所有样式都不会应用
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
  <div>Item 3</div>
</Gap>
```

#### 升级后的正确行为
`itemStyle` 在所有浏览器中都正确生效：
```tsx
// 修复后：所有浏览器中样式都正确应用
// 每个子元素都有灰色背景、10px内边距和边框
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
  <div>Item 3</div>
</Gap>
```

#### 使用层面的差异
1. **视觉突变风险**：
   - 升级前：绝大多数用户（使用现代浏览器）看不到 `itemStyle` 效果
   - 升级后：原本"无效"的样式突然生效，可能导致界面外观发生明显变化
   
2. **需要检查的场景**：
   - 如果项目中存在设置了 `itemStyle` 的 Gap 组件
   - 升级后这些样式会突然生效，需要确认视觉效果是否符合预期
   - 特别注意那些可能因为 bug 而"遗留"在代码中的 `itemStyle` 设置

3. **浏览器差异消除**：
   - 升级前：不同浏览器表现不一致（旧浏览器有样式，新浏览器无样式）
   - 升级后：所有浏览器表现一致，消除了跨浏览器的兼容性问题