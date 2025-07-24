# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

Shineout-next 是一个 React 组件库，提供了一套完整的 UI 组件。项目使用 pnpm workspaces 的 monorepo 结构。

## 开发命令

### 常用命令
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm start
# 或
pnpm dev

# 构建所有包
pnpm build:pkg

# 构建文档站点
pnpm build:doc

# 运行所有测试
pnpm test

# 运行特定测试文件
pnpm test -- path/to/test.spec.tsx

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 打开 Cypress 进行 E2E 测试
pnpm cypress:open

# 运行代码检查
pnpm lint

# 从模板创建新组件
pnpm dev:create

# 发布包
pnpm release
```

## 架构

### Monorepo 包结构
- `packages/base/` - 无样式的基础组件，包含核心逻辑
- `packages/shineout/` - 带样式的主组件库（包装基础组件）
- `packages/shineout-style/` - 基于 JSS 的样式系统
- `packages/theme/` - 主题令牌和配置
- `packages/hooks/` - 共享的 React hooks 和工具函数
- `packages/mock/` - 开发/测试用的模拟数据

### 站点文档内容结构
- `packages/shineout/[component]/__doc__` - 版本 changelog 概览
- `packages/shineout/[component]/__example__` - 文档站点组件示例
- `packages/shineout/[component]/__changelog__/[version]/[pr].md` - changelog 明细
- `packages/shineout/[component]/__diff__/[version]/index.md` - diff 报告，记录变更带来的逻辑上的差异和对组件上下文逻辑的影响

### 组件开发模式
组件遵循三层架构：
1. **基础组件** (`packages/base/src/[component]/`): 不含样式的核心逻辑
2. **样式层** (`packages/shineout-style/src/[component]/`): JSS 样式
3. **导出组件** (`packages/shineout/src/[component]/`): 组合基础组件 + 样式

### TypeScript 路径别名
```typescript
// 开发中使用这些导入方式：
import { Button } from 'shineout'  // → packages/shineout/src
import { useButton } from 'base'   // → packages/base/src
import { buttonStyle } from '@sheinx/shineout-style'  // → packages/shineout-style/src
import { token } from '@sheinx/theme'  // → packages/theme/src
```

### 测试策略
- 单元测试：位于组件旁边的 `*.spec.tsx` 文件
- 使用 Jest 和 React Testing Library
- E2E 测试：位于 `cypress/e2e/`
- 运行特定测试：`pnpm test -- Button.spec.tsx`

### 代码风格要求
- ESLint 配置：`@umijs/lint`
- Prettier：单引号、尾随逗号、100 字符行宽、2 空格缩进
- TypeScript：启用严格模式
- 提交前始终运行 `pnpm lint`

### 构建系统
- 开发环境：Webpack 热重载
- 包构建：Father（支持打包和非打包模式）
- 文档：Webpack 静态站点生成

### 关键开发注意事项
- 组件必须支持 SSR
- 所有组件需要完整的 TypeScript 类型
- 样式使用 JSS 和来自 `@sheinx/theme` 的主题变量
- API 文档从 TypeScript 接口自动生成
- 文档中的示例是实时可编辑的

### 文档结构
- `docs/pages/` - 文档站点页面
- `docs/api/` - 组件 API 文档
- `docs/markdown/` - 附加文档
- `docs/theme/` - 文档站点组件

添加新功能或修复 bug 时，请确保：
1. 如需要，同时更新基础组件和样式包装器
2. 添加/更新测试
3. 更新 TypeScript 类型
4. 如果公共 API 发生变化，更新 API 文档
5. 提交前运行 `pnpm lint` 和 `pnpm test`

### 组件使用注意事项
任何使用到组件的地方，包括 demo、测试用例、伪代码、changelog 等，需要遵循以下约定：
- 必须使用 Shineout 组件中存在的属性
- 组件可使用的属性位于 packages/shineout/src/[component]/interface.ts 中查看
- 书写组件后必须检查组件上的属性是否存在
- 必须使用 Shineout 中暴露给外部且存在的组件，位于 packages/shineout/src/[component]/index.ts 中查看

### diff 报告书写规范
diff 报告用于记录组件版本间的具体变更内容，需要根据 changelog 概览中描述的版本，结合该版本的 commit 以及前后相关的 commit 记录来生成。

#### 一、标准章节结构（严格按顺序）
1. **标题**：`# [组件名] 组件 [版本号] 版本 Diff 报告`
2. **问题描述**
3. **代码变更文件**
4. **变更代码行**
5. **变更前后逻辑差异**
6. **逻辑影响范围**
7. **风险场景分析**（必须包含"DOM 结构变更风险"、"行为逻辑变更风险"和"样式变更风险"三个子章节）
8. **升级注意事项**（必须包含"代码兼容性"和"行为变化说明"两个子章节）

**重要**：
- 不使用编号的章节标题（如 `## 1. 问题描述`），直接使用 `## 问题描述`
- 不添加"测试建议"、"总结"等额外章节
- 严格遵循上述 8 个章节，不多不少

#### 二、各章节编写规范

##### 2.1 问题描述
- 第一句话概括核心变更（新功能/缺陷修复/优化改进）
- 使用反引号标记组件名和属性名
- 说明变更的背景和原因
- 示例：
  ```markdown
  修复 `Component` 在特定场景下的显示错误问题。当组件在...情况下，会出现...问题，导致...。
  
  `Component` 新增 `property` 属性，支持...功能。之前...，现在可以...。
  ```

##### 2.2 代码变更文件
- 使用完整相对路径
- 按逻辑顺序排列（类型定义 → 实现 → 样式）
- 示例：
  ```markdown
  1. `packages/base/src/component/component.type.ts`
  2. `packages/base/src/component/component.tsx`
  3. `packages/shineout-style/src/component/component.ts`
  ```

##### 2.3 变更代码行
- 每个文件单独一个子标题，格式：`### 文件路径 - 变更说明`
- 使用标准 diff 格式，只展示关键变更
- 示例：
  ```markdown
  ### packages/base/src/component/component.tsx - 修复条件判断
  ```diff
  - if ('title' in props && title !== undefined) {
  + if (title) {
      renderTitle(title);
  }
  ```

##### 2.4 变更前后逻辑差异
- 使用"变更前"和"变更后"两个子标题
- 描述行为变化，而非代码变化
- 每个要点一行，使用短横线开头
- 示例：
  ```markdown
  ### 变更前
  - 组件在...情况下会...
  - 无法处理...场景
  
  ### 变更后
  - 组件正确处理...
  - 支持...场景
  ```

##### 2.5 逻辑影响范围
- 列出受影响的功能点
- 明确指出不受影响的部分
- 评估对现有用户的影响

##### 2.6 风险场景分析
必须包含以下三个子章节，用于分析升级可能带来的风险：

###### DOM 结构变更风险
- 分析 DOM 结构的变化
- 列出用户可能依赖的 DOM 选择器
- 提供风险代码示例
- 给出规避方案
- 如无风险，标注"无相关风险"

###### 行为逻辑变更风险
- 分析行为逻辑的变化
- 识别可能触发异常的场景
- 提供依赖原行为的风险示例
- 给出适配方案
- 如无风险，标注"无相关风险"

###### 样式变更风险
- 检查样式类名或规则变化
- 分析对自定义样式的影响
- 提供可能失效的样式示例
- 给出样式迁移方案
- 如无风险，标注"无相关风险"

##### 2.7 升级注意事项
必须包含以下两个子章节：

###### 代码兼容性
- 明确标注：**无破坏性变更** 或 **破坏性变更**
- 说明具体影响

###### 行为变化说明
每个变化点必须包含四个要素：
1. **变化点标题**
2. **影响场景**：具体使用场景
3. **具体表现**：变化前后的对比
4. **受影响代码示例**：
   ```tsx
   // 之前：[旧行为]
   // 现在：[新行为]
   <Component prop="value" />
   ```
5. **是否需要调整**：明确告知用户

#### 三、信息收集步骤

```bash
# 1. 查看 changelog
cat packages/shineout/src/[component]/__doc__/changelog.cn.md

# 2. 查找相关 commit
git log --oneline --grep="[关键词]" -i
git log --oneline --grep="#[PR编号]"

# 3. 查看 commit 详情
git show [commit-hash] --stat

# 4. 查看具体文件变更
git show [commit-hash] -- [file-path]

# 5. 生成/更新 diff-imports.ts
pnpm run generate:diff-imports
```

#### 四、自动化工具

1. **交互式模板生成器**：
   ```bash
   node scripts/diff-report-template.js
   ```

2. **使用 AI 生成时的提示词模板**：
   ```
   根据以下信息生成 [组件名] 组件 [版本号] 的 diff 报告：
   1. 变更描述：[从 changelog 复制]
   2. PR 编号：#[编号]
   3. Commit hash：[hash]
   
   要求：
   - 严格按照 8 个标准章节生成
   - 不使用编号的章节标题
   - 不添加测试建议或总结
   - 风险场景分析必须包含三个子章节
   - 参考 checkbox 3.4.3 或 dropdown 3.3.2 的格式
   ```

#### 五、质量检查清单

- [ ] 包含且仅包含 8 个指定章节
- [ ] 章节顺序正确
- [ ] 没有使用编号的章节标题
- [ ] 风险场景分析包含三个子章节（DOM、行为逻辑、样式）
- [ ] 每个风险都有具体的风险示例和规避方案
- [ ] 代码示例包含"之前/现在"对比
- [ ] 升级注意事项完整（兼容性+行为变化）
- [ ] 明确告知用户是否需要调整代码
- [ ] 语言简洁专业

#### 六、参考示例
- `checkbox` 组件 3.4.3 版本
- `dropdown` 组件 3.3.2 版本

详细指南请参考：
- `docs/guides/diff-report-standard.md` - 完整规范
- `docs/guides/diff-report-checklist.md` - 检查清单
- `docs/guides/diff-report-ai-prompt.md` - AI 提示词