# Input 组件 3.5.7 版本 Diff 报告

## 问题描述
1. 修复 `Input` 开启 `coin` 情况下初始化数据不展示千分号的问题
2. 优化 `Input` 在 `type='number'` 开启 `coin` 下输入溢出内容时的交互逻辑

## 代码变更文件
1. `packages/base/src/input/input.tsx`
2. `packages/hooks/src/components/use-input/use-input-format.ts`

## 变更代码行
```diff
// use-input-format.ts
const useInputFormat = (props: InputFormatProps) => {
  // ...
- const [showCoin, setShowCoin] = React.useState(false);
+ const [showCoin, setShowCoin] = React.useState(coin);

  // 在格式化逻辑中新增小数位数修正
  const handleChange = usePersistFn((v: string) => {
    // ...
    value = value.replace(regExp, '$1$2$3');
+
+   // 修正小数位数
+   const _value = v.split('.');
+   const __value = value.split('.');
+   if (_value[1] !== undefined && __value[1] === undefined) {
+     value = `${value}.${_value[1]}`;
+   }
  });
```

## 变更前后逻辑差异
- **变更前**：
  1. showCoin 初始值为 false，导致初始化时千分号不显示
  2. 输入超出限制的内容时，小数部分可能丢失
- **变更后**：
  1. showCoin 初始值改为 coin 属性值，初始化时正确显示千分号
  2. 增加小数位数修正逻辑，防止格式化时丢失小数部分

## 逻辑影响范围
- 修复了 coin 模式下初始值的千分号显示问题
- 优化了数字溢出时的输入体验，保留用户输入的小数部分
- 不影响未开启 coin 属性的 Input

## 风险使用场景

### 代码执行风险
- 无直接代码执行风险

### 交互体验差异
- 初始化时千分号正确显示
- 输入溢出内容时小数部分不再丢失