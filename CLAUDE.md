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
