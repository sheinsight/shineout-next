# Textarea 组件 3.6.0 版本 Diff 报告

## 版本信息
- 正式版本: 3.6.0
- 包含 Beta 版本: 3.6.0-beta.1 ~ 3.6.0-beta.30
- 发布日期: 2025-02-25

## 详细变更

### 3.6.0-beta.25 & 3.6.0-beta.26
- **变更类型**: 新增功能
- **变更标签**: 功能
- **复现示例**: 无
- **变更描述**: Textarea 新增 `limit` 属性支持限制输入字符长度，新增 `clearable` 属性支持一键清除内容
- **PR**: [#998](https://github.com/sheinsight/shineout-next/pull/998)
- **影响组件**: Textarea
- **问题原因**: 扩展组件功能，满足字符限制和快速清除的使用需求

#### 新增特性
- 新增 `limit` 属性：支持数字类型限制字符数量，或函数类型自定义显示内容
- 新增 `clearable` 属性：显示清除按钮，支持一键清空输入内容
- 自动字符截断：当输入超过 limit 数值时，自动截断多余字符
- 字符计数显示：实时显示当前字符数与限制数的比例

**代码模式**：
```tsx
// 字符数量限制
<Textarea limit={100} placeholder="最多输入100个字符" />

// 自定义限制显示
<Textarea 
  limit={(value) => (
    <span style={{ color: value.length > 50 ? 'red' : 'gray' }}>
      {value.length}/100
    </span>
  )} 
/>

// 清除功能
<Textarea clearable placeholder="输入内容后显示清除按钮" />
```

### 3.6.0-beta.12
- **变更类型**: 修复问题
- **变更标签**: 样式
- **复现示例**: 无
- **变更描述**: 修复 Textarea 开启 autosize 时，也显示右下角的 resize 图标的问题
- **PR**: 包含在 #998 中
- **影响组件**: Textarea
- **问题原因**: autosize 模式下 resize 图标显示逻辑错误

#### Bug 特征
- Textarea 启用 `autosize` 时，右下角 resize 图标仍然显示
- 导致用户困惑，因为 autosize 模式下手动调整大小无效
- 影响组件的用户体验一致性

**代码模式**：
```tsx
// 修复前：resize 图标错误显示
<Textarea autosize rows={3} />

// 修复后：autosize 模式下不显示 resize 图标
<Textarea autosize rows={3} />
```

#### 排查规则
- 可忽略排查
- 搜索使用了 `autosize` 属性的 Textarea 组件
- 搜索对 resize 图标显示有特定要求的场景

## Breaking Changes

无

## 风险等级

**低**：
- 新增功能属性，完全向后兼容
- 现有代码无需修改，可选择性使用新功能
- 修复了样式显示问题，改善用户体验