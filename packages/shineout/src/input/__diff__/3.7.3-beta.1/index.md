# Input 组件 3.7.3-beta.1 版本 Diff 报告

## 问题描述
修复 `Input` 设置了 `digits` 和 `autoFix` 属性时，偶现的精度丢失问题

## 代码变更文件
1. `packages/hooks/src/components/use-input/use-input-format.ts`
2. `packages/hooks/src/utils/number.ts`

## 变更代码行
```diff
// use-input-format.ts
+import { preciseString } from '../../utils/number';

if (digits !== undefined && autoFix) {
  if (digits > 0) {
-   value = parseFloat(value).toFixed(digits);
+   value = preciseString(value, digits);
  } else if (digits === 0) {
    value = parseInt(value, 10).toString();
  }
}

// number.ts - 新增 preciseString 和 roundString 函数
+/**
+ * 在字符串层面实现四舍五入
+ * @param {string} numStr 数字字符串
+ * @param {number} precision 精度
+ * @returns {string} 四舍五入后的字符串
+ */
+function roundString(numStr: string, precision: number) {
+  // 字符串层面的四舍五入实现，避免浮点数精度问题
+  // ... 详细实现代码
+}
+
+/**
+ * 格式化数字字符串到指定小数位
+ * @param {string} value 数字字符串
+ * @param {number} precision 小数位数
+ * @returns {string} 格式化后的字符串
+ */
+export const preciseString = (value: string, precision = -1) => {
+  // 通过字符串操作而非浮点数计算来保证精度
+  // ... 详细实现代码
+}
```

## 变更前后逻辑差异
- **变更前**：使用 `parseFloat(value).toFixed(digits)` 可能因浮点数精度问题导致结果不准确
- **变更后**：使用字符串操作实现精确的四舍五入，避免 JavaScript 浮点数精度问题

## 逻辑影响范围
- 修复了大数字和特殊小数（如 111111111111111.888）的精度问题
- 确保 digits 和 autoFix 属性按预期工作
- 不影响未设置这些属性的 Input 组件

## 升级注意事项

### 代码兼容性
- 无直接代码执行风险

### 行为变化说明
- 数字精度处理更加准确，避免了类似 0.1 + 0.2 = 0.30000000000000004 的问题