# Radio 组件 3.7.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.0
- 包含 Beta 版本: 3.7.0-beta.1 ~ 3.7.0-beta.44
- 发布日期: 2025-06-05

## 详细变更

### 3.7.0-beta.31
- **变更类型**: 修复问题
- **变更标签**: 样式
- **复现示例**: 无
- **变更描述**: 修复小尺寸的 Radio 与 Form.Item 的 label 垂直不对齐的问题
- **PR**: 无
- **影响组件**: Radio
- **问题原因**: 小尺寸 Radio 组件在 Form.Item 中与 label 文本存在垂直对齐偏差

#### Bug 特征
- 小尺寸 Radio 组件在表单中与 label 文本垂直不对齐
- 影响表单布局的视觉一致性
- 仅影响 `size="small"` 的 Radio 组件

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Form.Item label="选择项">
  <Radio.Group size="small">
    <Radio>选项1</Radio>
    <Radio>选项2</Radio>
  </Radio.Group>
</Form.Item>
```

#### 排查规则
- 搜索在 Form.Item 中使用了 `size="small"` 的 Radio 组件

### 3.7.0-beta.36
- **变更类型**: 修复问题
- **变更标签**: 样式
- **复现示例**: [https://shineout-playground.sheincorp.cn/#/playground?code=136cb86b-08cc-40a2-a216-07cc57426f98](https://shineout-playground.sheincorp.cn/#/playground?code=136cb86b-08cc-40a2-a216-07cc57426f98)
- **变更描述**: 修复 `Radio.Group` 在文案过长情况下小圆点选择器样式被挤压异常的问题
- **PR**: [#1135](https://github.com/sheinsight/shineout-next/pull/1135)
- **影响组件**: Radio.Group
- **问题原因**: 缺少最小宽度保护，导致长文本内容挤压圆点选择器的显示区域

#### Bug 特征
- Radio.Group 文案过长时，小圆点选择器被挤压变形
- 影响各个尺寸（small、default、large）的 Radio 组件
- 在复杂布局中圆点选择器显示不稳定

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Radio.Group>
  <Radio>这是一段很长很长很长的文本内容，可能会挤压圆点选择器</Radio>
  <Radio>另一段长文本</Radio>
</Radio.Group>
```

#### 排查规则
- 可忽略排查
- 搜索使用了长文本内容的 Radio.Group 组件
- 搜索在受限宽度容器中使用的 Radio 组件

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复样式显示问题，无功能变更
- 完全向后兼容，无 API 变更
- 提升了组件在复杂布局和表单中的显示稳定性