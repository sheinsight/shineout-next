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

### 7. 升级注意事项
分为两个子部分：

#### 代码兼容性
- 说明是否存在破坏性变更（Breaking Change）
- 描述可能导致代码报错或功能异常的场景
- 包括类型错误、API 变更、依赖调整等

#### 行为变化说明
- 在现有业务代码不变的情况下，升级组件库后的行为变化
- 需要明确列出升级前后的对比
- 罗列可能受影响的业务场景
- 说明是否需要调整代码

示例：
```markdown
## 升级注意事项

### 代码兼容性
- **无破坏性变更**：`buttonShape` 为新增的可选属性，现有代码无需修改即可正常运行

### 行为变化说明
1. **SVG 图标布局变化**：
   - 升级前：SVG 元素作为内联元素显示，可能不居中
   - 升级后：SVG 元素自动居中显示
   - 受影响场景：在 placeholder 中直接传入 SVG 元素的代码
   - 示例代码：`<Dropdown placeholder={<svg>...</svg>} />`
   - 是否需要调整：不需要，但视觉效果会有变化
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