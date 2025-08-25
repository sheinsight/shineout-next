# Textarea 组件 3.7.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.1
- 包含 Beta 版本: 3.7.1-beta.1 ~ 3.7.1-beta.9
- 发布日期: 2025-06-13

## 详细变更

### 3.7.1-beta.7
- **变更类型**: 修复问题
- **变更标签**: 类型
- **复现示例**: 无
- **变更描述**: 修复 Textarea 组件的 `onBlur` 和 `onFocus` 事件参数类型错误问题
- **PR**: [#1161](https://github.com/sheinsight/shineout-next/pull/1161)
- **影响组件**: Textarea, Input
- **问题原因**: TypeScript 类型定义不够准确，导致开发时类型检查错误

#### Bug 特征
- `onBlur` 和 `onFocus` 事件处理器的参数类型过于宽泛
- TypeScript 编译时可能出现类型不匹配的警告
- 影响开发体验和类型安全性

**代码模式**：
```tsx
// 修复前：类型不够精确
<Textarea 
  onBlur={(e) => {
    // e 的类型为 React.FocusEvent，需要手动断言
    const target = e.target as HTMLTextAreaElement;
  }}
  onFocus={(e) => {
    // 同样需要手动断言
    const target = e.target as HTMLTextAreaElement;
  }}
/>

// 修复后：类型更精确
<Textarea 
  onBlur={(e) => {
    // e 的类型为 React.FocusEvent<HTMLTextAreaElement>
    const target = e.target; // 不需要手动断言
  }}
  onFocus={(e) => {
    // 类型自动推断为正确的类型
    const target = e.target;
  }}
/>
```

#### 排查规则
- 搜索使用了 `onBlur` 或 `onFocus` 事件的 Textarea 组件
- 搜索在事件处理中需要访问 target 属性的代码

## Breaking Changes

无

## 风险等级

**低**：
- 仅修复 TypeScript 类型定义，无运行时影响
- 完全向后兼容，现有代码无需修改