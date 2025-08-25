# Rule 组件 3.7.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.0
- 包含 Beta 版本: 3.7.0-beta.1 ~ 3.7.0-beta.44
- 发布日期: 2025-06-05

## 详细变更

### 3.7.0-beta.43
- **变更类型**: 修复问题
- **变更标签**: 功能
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=8bc9b12e-b37d-4596-8337-161254d32e74](https://shineout-playground.sheincorp.cn/#/playground?code=8bc9b12e-b37d-4596-8337-161254d32e74)
- **变更描述**: 修复 `Rule` 自定义校验函数无法获取组件上自定义 props 的问题
- **PR**: [#1147](https://github.com/sheinsight/shineout-next/pull/1147)
- **影响组件**: Rule
- **问题原因**: `handleProps` 过滤逻辑过于严格，只保留字符串和数字类型的属性，过滤掉了所有其他类型的自定义属性

#### Bug 特征
- Rule 自定义校验函数的第四个参数 `props` 只能获取到字符串和数字类型的属性
- 其他类型的自定义属性（如函数、对象等）无法传递给校验函数
- 影响复杂校验场景中需要访问组件自定义属性的情况

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Input
  customValidator={() => {}}  // 自定义函数属性
  customConfig={{ key: 'value' }}  // 自定义对象属性
  rules={[
    {
      validator: (value, formValue, callback, props) => {
        // props 中无法获取到 customValidator 和 customConfig
        console.log(props); // 只能看到字符串和数字类型的属性
      }
    }
  ]}
/>
```

#### 排查规则
- 搜索在 Rule 校验函数中使用 `props` 参数访问自定义属性的代码
- 搜索定义了函数或对象类型自定义属性的表单组件

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复功能缺陷，扩展了校验函数可访问的属性范围
- 完全向后兼容，现有代码无需修改
- 为复杂校验场景提供了更好的支持