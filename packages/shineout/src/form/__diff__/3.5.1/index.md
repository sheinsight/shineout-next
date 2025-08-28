# Form 组件 3.5.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.1
- 包含 Beta 版本: 3.5.1-beta.1 ~ 3.5.1-beta.6
- 发布日期: 2024-11-14

## 详细变更

### 3.5.1-beta.2
- **变更类型**: 修复问题
- **变更标签**: 功能/逻辑/数据
- **复现示例**: 无
- **变更描述**: 修复 `Form.FieldSet` 校验返参为 Error 数组时校验异常的问题
- **PR**: [#796](https://github.com/sheinsight/shineout-next/pull/796)
- **影响组件**: Form.FieldSet
- **问题原因**: 当使用自定义校验函数且 callback 接收 Error 数组时，内部处理 FieldSet 情况时未正确处理数组格式的错误，导致解析错误并抛出异常

#### Bug 特征
- 使用 Form.FieldSet 组件进行表单数组校验
- 自定义校验函数通过 callback 返回 Error 数组格式的错误信息
- 校验时出现解析错误，导致 FieldSet 校验异常
- 影响复杂表单的数组字段验证功能

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form.FieldSet
  name="arrayField"
  rules={[
    {
      validator: (values, rule, callback) => {
        const result = [];
        values.forEach(({ name }, i) => {
          if (!name) return;
          if (valueMap[name]) {
            result[i] = { name: new Error(`Name "${name}" is existed.`) };
          }
        });
        callback(result.length > 0 ? result : true); // 返回Error数组时出错
      }
    }
  ]}
>
  {/* 表单数组内容 */}
</Form.FieldSet>
```

#### 排查规则
- 搜索使用了自定义校验规则的 Form.FieldSet 且在自定义校验函数中通过 callback 返回数组格式错误的表单项

### 3.5.1-beta.3
- **变更类型**: 修复问题
- **变更标签**: 功能/逻辑
- **复现示例**: 无
- **变更描述**: 修复 Form 校验失效的问题
- **PR**: [#797](https://github.com/sheinsight/shineout-next/pull/797)
- **影响组件**: Form
- **问题原因**: 在表单控件的错误处理逻辑中，当错误不是数组格式时，缺少对应的错误设置处理，导致基础校验失效

#### Bug 特征
- Form 组件的基础校验功能失效
- 表单控件在验证失败时无法正确设置错误状态
- 主要影响非数组格式错误的处理逻辑
- 可能导致表单验证反馈不准确

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form>
  <Form.Field
    name="username"
    rules={[
      { required: true, message: '请输入用户名' }  // 基础校验规则
    ]}
  >
    <Input />
  </Form.Field>
</Form>
```

#### 排查规则
- 可忽略排查

## Breaking Changes

无

## 风险等级

**中**：
- 包含两个回归问题修复，涉及表单核心的校验功能
- Form.FieldSet 的错误处理修复可能影响使用数组校验的复杂表单
- Form 基础校验的修复涉及表单验证的核心逻辑
- 虽然都是Bug修复，但涉及校验这一关键功能，建议重点测试表单验证相关功能