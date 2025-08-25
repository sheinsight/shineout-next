# Input 组件 3.7.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.7.1
- 包含 Beta 版本: 3.7.1-beta.1 ~ 3.7.1-beta.9
- 发布日期: 2025-06-12

## 详细变更

### 3.7.1-beta.4
- **变更类型**: 修复问题
- **变更标签**: 传参
- **复现示例**: 无
- **变更描述**: 修复 `Input.Group` 的 `seperate` 属性拼写错误，更正为 `separate`，并标记原属性为废弃
- **PR**: [#1158](https://github.com/sheinsight/shineout-next/pull/1158)
- **影响组件**: Input.Group
- **问题原因**: 属性名称存在拼写错误，`seperate` 应为 `separate`

#### Bug 特征
- Input.Group 的 `seperate` 属性名称拼写不正确
- API 命名不规范，影响开发体验
- 需要提供向后兼容的迁移路径

**代码模式**：
```jsx
// 旧的写法（仍可用但已废弃）
<Input.Group seperate>
  <Input />
  <Input />
</Input.Group>

// 推荐的新写法
<Input.Group separate>
  <Input />
  <Input />
</Input.Group>
```

#### 排查规则
- 搜索使用了 `seperate` 属性的 `Input.Group` 组件

### 3.7.1-beta.4
- **变更类型**: 修复问题
- **变更标签**: 样式
- **复现示例**: 无
- **变更描述**: 修复 `Input.Group` 的 `seperate` 在 hover 时层级高过 Table 固定列的问题
- **PR**: [#1158](https://github.com/sheinsight/shineout-next/pull/1158)
- **影响组件**: Input.Group
- **问题原因**: hover 状态下的 z-index 值过高，与 Table 固定列产生层级冲突

#### Bug 特征
- Input.Group 在 hover 时会遮挡 Table 的固定列
- 影响 Table 组件中使用 Input.Group 的场景
- 层级关系异常导致的视觉问题

**代码模式**：
```jsx
// 容易出现问题的代码结构
<Table>
  <Table.Column 
    fixed="left"
    render={() => (
      <Input.Group separate>
        <Input />
        <Button />
      </Input.Group>
    )}
  />
</Table>
```

#### 排查规则
- 搜索在 Table 组件中使用 `Input.Group` 的代码
- 搜索涉及固定列的 Table 与 Input.Group 组合使用场景

### 3.7.1-beta.7
- **变更类型**: 修复问题
- **变更标签**: 传参
- **复现示例**: 无
- **变更描述**: 修复 `Input` 和 `Textarea` 组件的 `onBlur` 和 `onFocus` 事件参数类型错误问题
- **PR**: [#1161](https://github.com/sheinsight/shineout-next/pull/1161)
- **影响组件**: Input, Textarea
- **问题原因**: TypeScript 类型定义不够准确，事件回调函数的泛型参数缺失

#### Bug 特征
- `onBlur` 和 `onFocus` 事件回调的 TypeScript 类型不准确
- 开发时缺少准确的类型提示
- 影响 TypeScript 项目的类型安全性

**代码模式**：
```tsx
// 受影响的代码结构
<Input
  onFocus={(e) => {
    // e 的类型现在更加准确
    console.log(e.target.value);
  }}
  onBlur={(e) => {
    // e 的类型现在更加准确
    console.log(e.target.value);
  }}
/>
```

#### 排查规则
- 可忽略排查

## Breaking Changes

**潜在破坏性变更**：
- `Input.Group` 的 `seperate` 属性被标记为废弃，建议迁移到 `separate`
- 原有的 `seperate` 属性仍然可用，保持向后兼容

## 风险等级

**低**：
- 主要为类型定义改进和属性命名规范化
- 保持了向后兼容性，原有代码仍可正常运行
- 修复了与 Table 组件的层级冲突问题