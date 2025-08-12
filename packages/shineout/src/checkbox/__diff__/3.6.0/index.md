# Checkbox 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.30
- 发布日期: 2025-02-14

## 详细变更

### 3.6.0（正式版本合并）
- **变更类型**: 修复问题
- **复现示例**: 无
- **变更描述**: 修复 `Checkbox` 在Form中使用且传了name时, Checkbox的onChange会触发两次的问题（Regression: since v3.4.3）
- **PR**: [#955](https://github.com/sheinsight/shineout-next/pull/955)
- **影响组件**: Checkbox
- **问题原因**: 在 3.4.3 版本引入的修复中，为了兼容 Checkbox 在 createPortal 中使用时无法改变勾选状态的问题，添加了 `onInputableCheckboxChange` 的调用。但这导致了在 Form 中使用时，onChange 事件会被触发两次

#### Bug 特征
- Checkbox 组件在 Form 组件内部使用
- Checkbox 设置了 `name` 属性
- onChange 事件会被触发两次，导致状态更新异常
- 该问题是 3.4.3 版本引入的回归问题

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form>
  <Form.Item name="agree">
    <Checkbox 
      onChange={(value, checked) => {
        console.log('onChange triggered'); // 会打印两次
      }}
    >
      同意条款
    </Checkbox>
  </Form.Item>
</Form>
```

#### 排查规则
- 搜索 Form.Item 内部包含 Checkbox 的代码
- 搜索 Checkbox 设置了 name 属性且在 Form 中使用的场景
- 搜索 Checkbox 的 onChange 回调中有副作用操作的代码
- 搜索使用 Form 的 value 控制 Checkbox 状态的代码

## Breaking Changes

无

## 风险等级

**高**：
- 该问题是从 3.4.3 版本引入的回归问题，影响时间较长
- 影响 Checkbox 在 Form 中的核心使用场景
- onChange 触发两次可能导致状态更新异常，影响业务逻辑
- 修复方式通过添加 `ignoreOnChange` 参数控制，避免重复触发

## 版本修复历史

1. **3.4.3**：修复 Checkbox 在 createPortal 中使用时无法改变勾选状态的问题（引入了回归问题）
2. **3.5.6**：修复 Checkbox.Group 在嵌套情况下影响内部选中状态的问题
3. **3.5.8**：修复 Checkbox 触发两次 onChange 的问题（部分修复）
4. **3.6.0**：完全修复 Checkbox 在 Form 中使用且传了 name 时 onChange 触发两次的问题