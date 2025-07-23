# Input 组件 3.5.8 版本 Diff 报告

## 问题描述
修复 `Input` 开启 `digits` 是值为 0 的情况下依然可以输入小数的问题（Regression: since v3.5.7）

## 代码变更文件
`packages/hooks/src/components/use-input/use-input-format.ts`

## 变更代码行
```diff
// 修正小数位数
const _value = v.split('.');
const __value = value.split('.');
-if (_value[1] !== undefined && __value[1] === undefined) {
+if (_value[1] !== undefined && __value[1] === undefined && digits !== 0) {
  value = `${value}.${_value[1]}`;
}
```

## 变更前后逻辑差异
- **变更前**：当 `digits` 设置为 0 时，仍然允许保留小数点和小数部分
- **变更后**：增加 `digits !== 0` 判断，当 `digits` 为 0 时不保留小数部分

## 逻辑影响范围
- 修复了 `digits={0}` 时仍可输入小数的问题
- 确保整数输入模式下不接受小数
- 不影响 `digits` 大于 0 的正常小数输入

## 升级注意事项

### 代码兼容性
- 无直接代码执行风险

### 行为变化说明
- `digits={0}` 时输入小数点会被自动过滤，只允许输入整数