# Input 组件 3.6.0 版本 Diff 报告

## 问题描述

1. `Input.Group` 新增 `seperate` 属性：组合到一起的组件有独立的边框
2. 修复 `Input.Number` 在输入小数点情况下，退格至小数点前时会将小数点删除的问题（3.4.0 版本引入的回归缺陷）

## 代码变更文件

1. `packages/base/src/input/input-group.type.ts`
2. `packages/shineout-style/src/input/input.ts`
3. `packages/hooks/src/components/use-input/use-input-number.ts`

## 变更代码行

### 1. 新增 seperate 属性
```diff
// input-group.type.ts
export interface InputGroupProps {
+ /**
+  * @en Whether combined components have independent borders
+  * @cn 组合到一起的组件是否有独立的边框
+  * @default false
+  * @version 3.6.0
+  */
+ seperate?: boolean;
}
```

### 2. 修复小数点删除问题
```diff
// use-input-number.ts
const onInnerChange = usePersistFn((val?: string | number | null) => {
  setInternalInputValue(getStringValue(val));
  if(typeof val === 'string'){
+   // 保留末尾的小数点，等待用户继续输入
+   if(val.endsWith('.')) return
    const num = parseFloat(val);
    if(val === '') {
      // 如果允许空值，则返回 null，否则返回 undefined
```

## 变更前后逻辑差异

### 变更前
1. Input.Group 中的组件边框会合并，中间的分隔线被移除
2. Input.Number 输入 "123." 后退格删除 "3"，小数点会一起消失，变成 "12"

### 变更后
1. 通过 `seperate` 属性可以保持组合组件的独立边框
2. Input.Number 输入 "123." 后退格删除 "3"，保留小数点为 "12."，等待继续输入

## 逻辑影响范围
- 新增 `seperate` 属性为可选功能，不影响现有布局
- 修复了小数输入的交互体验问题
- 不影响完整数字的输入和处理逻辑

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：新增属性为可选，修复内容为缺陷修正

### 行为变化说明

1. **Input.Group seperate 属性（新增功能）**：
   - 升级前：组合的输入框边框自动合并
   - 升级后：可通过 `seperate={true}` 保持独立边框
   - 受影响场景：需要视觉上分离但逻辑上组合的输入框组
   - 示例代码：
     ```tsx
     // 保持独立边框的组合输入
     <Input.Group seperate>
       <Input placeholder="区号" style={{ width: 80 }} />
       <Input placeholder="电话号码" style={{ width: 200 }} />
     </Input.Group>
     ```
   - 是否需要调整：不需要，默认行为不变

2. **Input.Number 小数点保留修复**：
   - 升级前：输入 "123." 后退格会变成 "12"（小数点丢失）
   - 升级后：输入 "123." 后退格会变成 "12."（保留小数点）
   - 受影响场景：
     ```tsx
     // 价格、金额等需要输入小数的场景
     <Input.Number 
       placeholder="请输入价格"
       digits={2}
     />
     ```
   - 行为变化：退格时小数点不再意外消失
   - 是否需要调整：不需要，这是体验优化

3. **注意事项**：
   - `seperate` 属性名存在拼写错误（正确应为 separate）
   - 后续版本（3.7.1-beta.4）会修正为 `separate`，但保留 `seperate` 作为废弃属性