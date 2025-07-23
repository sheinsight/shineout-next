# Input 组件 3.5.7 版本 Diff 报告

## 问题描述

1. 修复 `Input` 开启 `coin` 情况下初始化数据不展示千分号的缺陷
2. 修复 `Input` 设置 `type='number'` 且开启 `coin` 属性后值为数字 0 时展示异常的问题
3. 优化 `Input` 在 `type='number'` 开启 `coin` 下输入溢出内容时的交互逻辑

## 代码变更文件

1. `packages/base/src/input/input.tsx`
2. `packages/hooks/src/components/use-input/use-input-format.ts`

## 变更代码行

### packages/hooks/src/components/use-input/use-input-format.ts
```diff
// 修复初始化千分号显示问题
const useInputFormat = (props: InputFormatProps) => {
- const [showCoin, setShowCoin] = React.useState(false);
+ const [showCoin, setShowCoin] = React.useState(coin);

// 优化输入溢出时的小数处理
const handleChange = usePersistFn((v: string) => {
  // ... 格式化逻辑
  value = value.replace(regExp, '$1$2$3');
  
+ // 修正小数位数，防止格式化时丢失小数部分
+ const _value = v.split('.');
+ const __value = value.split('.');
+ if (_value[1] !== undefined && __value[1] === undefined) {
+   value = `${value}.${_value[1]}`;
+ }
});
```

## 变更前后逻辑差异

### 变更前
- `showCoin` 状态初始值为 `false`，导致初始化时即使设置了 `coin` 属性，千分号也不显示
- 值为 0 时的特殊处理不完善，可能显示异常
- 输入超出数字限制的内容时，格式化过程中会丢失小数部分

### 变更后
- `showCoin` 初始值改为 `coin` 属性值，确保初始化时正确显示千分号
- 完善了值为 0 时的处理逻辑
- 增加小数位数修正逻辑，保留用户输入的小数部分，提升输入体验

## 逻辑影响范围
- 修复了 coin 模式下初始值的千分号显示问题
- 修复了值为 0 时的显示异常
- 优化了数字溢出时的输入体验，保留用户输入的小数部分
- 不影响未开启 `coin` 属性的 Input 组件

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：仅修复了显示和交互缺陷，不影响 API 使用

### 行为变化说明

1. **千分号初始化显示修复**：
   - 升级前：设置 `coin` 和初始值后，千分号不显示，需要聚焦后才显示
   - 升级后：初始化时即正确显示千分号
   - 受影响场景：
     ```tsx
     // 金额输入场景
     <Input 
       type="number"
       coin
       value={1234567}  // 升级前：显示 "1234567"，升级后：显示 "1,234,567"
     />
     ```
   - 是否需要调整：不需要，这是缺陷修复

2. **数字 0 的显示修复**：
   - 升级前：值为 0 时可能显示异常或不显示
   - 升级后：正确显示 "0"
   - 受影响场景：初始值或输入值为 0 的金额输入框
   - 是否需要调整：不需要，这是缺陷修复

3. **输入溢出内容的体验优化**：
   - 升级前：输入超长数字后，小数部分可能丢失
   - 升级后：保留完整的小数部分，提升输入体验
   - 受影响场景：
     ```tsx
     // 输入 "123456789.123" 这样的长数字
     <Input 
       type="number"
       coin
       max={9999999}
     />
     ```
   - 行为变化：格式化时不再丢失小数位
   - 是否需要调整：不需要，这是体验优化