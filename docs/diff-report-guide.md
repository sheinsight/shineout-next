# Diff 报告书写规范

## 文件命名规范
- 路径：`packages/shineout/src/[component]/__diff__/[version]/index.md`
- 示例：`packages/shineout/src/dropdown/__diff__/3.6.0/index.md`

## 报告结构规范

### 1. 标题
```markdown
# [组件名] 组件 [版本号] 版本 Diff 报告
```
示例：`# Dropdown 组件 3.6.0 版本 Diff 报告`

### 2. 问题描述
- 简明扼要描述本次变更的核心内容
- 可以是新增功能、修复问题、优化性能等
- 如有相关 PR 或 Issue，建议在括号中标注

示例：
```markdown
## 问题描述
`Dropdown` 新增 `buttonShape` 属性，功能同 `Button` 组件的 `shape` 属性。此功能允许用户自定义占位按钮的形状，特别是在需要创建圆形按钮（如更多操作按钮）时非常有用。
```

### 3. 代码变更文件
- 列出所有涉及变更的文件路径
- 使用列表形式，路径使用反引号包裹
- 如果文件较多，可以添加简短说明

示例：
```markdown
## 代码变更文件
1. `packages/base/src/dropdown/dropdown.type.ts`
2. `packages/base/src/dropdown/dropdownIn.tsx`
3. `packages/shineout-style/src/dropdown/dropdown.ts`
```

### 4. 变更代码行
- 使用标准 diff 格式展示代码变更
- 使用 `+` 标记新增行，`-` 标记删除行
- 每个文件的变更单独展示
- 添加必要的上下文代码
- 可以添加行号或位置说明的注释

示例：
```markdown
## 变更代码行

### 1. packages/base/src/dropdown/dropdown.type.ts
```diff
// 第5行：新增导入
+import { ButtonShape } from '@sheinx/hooks';

// 第172-177行：新增属性定义
+/**
+ * @en The shape of placeholder button
+ * @cn 占位按钮的shape
+ * @version 3.6.0
+ */
+buttonShape?: ButtonShape
```

### 5. 变更前后逻辑差异
- 使用"变更前"和"变更后"小节清晰对比
- 描述功能、行为或逻辑的具体变化
- 突出关键差异点

示例：
```markdown
## 变更前后逻辑差异

### 变更前
- Dropdown 组件的占位按钮只能使用默认形状
- 当不传 placeholder 时，如果内容是图标，图标可能不会水平居中

### 变更后
- Dropdown 组件支持通过 `buttonShape` 属性自定义占位按钮形状
- 占位按钮内的 SVG 图标会自动水平居中显示
- `buttonShape` 属性直接传递给内部的 Button 组件的 `shape` 属性
```

### 6. 逻辑影响范围
- 描述变更对组件内部逻辑的影响
- 说明属性传递、事件处理、样式计算等方面的变化
- 指出兼容性和默认行为

示例：
```markdown
## 逻辑影响范围
- 新增 `buttonShape` 属性传递链路，从 Dropdown 组件传递到内部 Button 组件
- SVG 居中样式仅作用于 `.content` 类下的直接子 SVG 元素
- 复用 Button 组件的 shape 逻辑，保持组件库 API 一致性
```

### 7. 风险使用场景
分为两个子部分：

#### 代码执行风险
- 描述可能导致代码报错或功能异常的场景
- 包括类型错误、缺少依赖、Breaking Change 等

#### 交互体验差异
- 描述视觉或交互行为的变化
- 列出具体的影响场景和表现
- 提供受影响的代码示例

示例：
```markdown
## 风险使用场景

### 代码执行风险
1. **无破坏性变更**：`buttonShape` 为新增的可选属性，现有代码无需修改即可正常运行

### 交互体验差异
1. **SVG 图标布局变化**：
   - 影响场景：在 placeholder 中直接传入 SVG 元素的现有代码
   - 具体表现：SVG 元素会从原本的内联元素变为块级元素并自动居中
   - 受影响代码示例：`<Dropdown placeholder={<svg>...</svg>} />`
```

## 书写要点

1. **准确性**：所有代码变更必须准确无误，行号和文件路径要正确
2. **完整性**：涵盖所有相关的代码变更，不遗漏重要修改
3. **清晰性**：使用简洁明了的语言，避免冗余描述
4. **实用性**：重点关注对使用者的影响，提供具体的场景和示例
5. **一致性**：保持格式和术语的统一，便于阅读和理解

## 特殊情况处理

1. **纯样式调整**：重点描述视觉变化和受影响的使用场景
2. **性能优化**：说明优化点和预期效果
3. **Bug 修复**：描述问题现象、原因和修复方案
4. **Breaking Change**：突出警示，详细说明迁移方案