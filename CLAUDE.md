# Shineout 项目信息

## 版本管理体系

### 版本发布策略
Shineout 采用 Beta 版本迭代发布策略：

1. **Beta 版本**: 每次变更的最小发布单元
   - 格式: `3.x.x-beta.n`
   - 每个功能修复或增强都会发布一个新的 beta 版本
   - 用于快速交付给用户测试

2. **正式版本**: Beta 版本的聚合
   - 格式: `3.x.x`
   - 包含该版本号下所有 beta 版本的内容（从 beta.1 到 beta.last）
   - 例如：3.6.3 包含了 3.6.3-beta.1 至 3.6.3-beta.n 的所有变更

3. **Git Tag 格式**:
   - Beta 版本: `version-3.x.x-beta.n`
   - 正式版本: `version-3.x.x`

### 版本升级影响分析
当用户从一个正式版本升级到另一个正式版本时（如 3.6.3 → 3.6.4），需要分析的内容包括：
- 目标版本的所有 beta 版本变更（3.6.4-beta.1 至 3.6.4-beta.last）
- 每个 beta 版本对应的 git commits
- 相关的代码变更和 API 调整

## Changelog 管理

### Changelog 文件位置
- 组件级 Changelog: `packages/shineout/src/[component]/__doc__/changelog.cn.md`
- 全局 Changelog: `docs/markdown/shineout/changelog-common.md`
- 版本主要更新: `docs/markdown/shineout/changelog-v3.md`

### Changelog 内容特点
1. **简述性质**: Changelog 只简要描述修复或更新的内容
2. **详细信息查找**: 需要查看对应的 git commit 记录获取详细代码变更
3. **多次修复情况**: 同一问题可能存在前后多次修复的情况

### Changelog 格式规范
```markdown
## 版本号
发布日期

### 🐞 BugFix
- 修复描述 ([#PR号](PR链接))

### 💎 Enhancement  
- 功能增强描述

### 🆕 Feature
- 新功能描述

### 💅 Style
- 样式调整描述

### 🎨 Theme
- 主题相关变更

### 🆎 Type
- 类型定义变更
```

## 项目结构

### 主要包结构
- `packages/shineout`: 主组件库
- `packages/base`: 基础组件（无样式）
- `packages/hooks`: React Hooks 库
- `packages/shineout-style`: 样式库
- `packages/theme`: 主题系统

### 组件目录结构
```
packages/shineout/src/[component]/
├── __doc__/           # 文档相关
│   └── changelog.cn.md # 组件 changelog
├── __example__/       # 示例代码
├── __test__/         # 测试文件
├── [component].tsx   # 组件实现
├── [component].type.ts # 类型定义
├── index.ts          # 导出文件
└── interface.ts      # 接口定义
```

### 特殊目录
- `__diff__/`: 版本差异记录目录（目前仅 Select 组件有此目录，但内容为空）

## 自动化工具

### Changelog 编译
- 脚本位置: `scripts/utils/compile-changelog.js`
- 功能: 将 Markdown 格式的 changelog 编译为 JSON 格式
- 输出目录: `docs/chunk/shineout/changelog/`

### 版本发布
- 脚本位置: `scripts/publish.js`
- 支持的发布标签: latest, alpha, beta, rc
- 自动同步所有子包版本

## 组件版本 Diff 报告规范

### 目标
为每个正式版本生成详细的 Diff 报告，用于：
1. 分析代码变更对外部使用的影响
2. 识别每个问题发生的具体场景和用法
3. 提供明确的检查点，便于 AI 工具扫描项目代码
4. 评估升级风险，帮助用户安全升级

### Diff 报告存放位置
```
packages/shineout/src/[component]/__diff__/[version]/index.md
```

### Diff 报告结构规范

#### 1. 版本信息
```markdown
# [组件名] 组件 [版本号] 版本 Diff 报告

## 版本信息
- 正式版本: [x.x.x]
- 包含 Beta 版本: [x.x.x-beta.1] ~ [x.x.x-beta.n]
- 发布日期: [YYYY-MM-DD]
```

#### 2. 变更概要
简要总结本版本的主要变更内容，让读者快速了解版本更新的重点。

#### 3. 详细变更
按 beta 版本列出所有变更：
```markdown
### [版本号-beta.n]
- **修复问题**: [问题描述]
- **PR**: [#PR号](PR链接)
- **影响组件**: [涉及的组件]
- **问题原因**: [简要说明问题产生的技术原因]
```

#### 4. 代码变更分析
展示关键的代码改动，帮助理解修复的本质：
```markdown
### 修改文件
- `packages/[path]/[file].ts`

### 关键改动
```javascript
// 修改前
- oldCode();

// 修改后
+ newCode();
```
```

#### 5. 受影响的使用场景（最重要）
这是报告的核心部分，需要：
- 从更高维度分析问题的本质
- 识别所有可能受影响的使用模式
- 提供具体的代码检查模式

```markdown
### 核心问题分析
[说明问题的本质，不要局限于 changelog 的描述]

### 场景 1: [场景名称]
**检查点**: 查 [具体的检查指令，如 "Form 中所有使用数组 name 的组件"]
```jsx
// 需要检查的代码模式
[展示具体的代码模式]
```

### 场景 2: [场景名称]
**检查点**: 查 [具体的检查指令]
```jsx
// 需要检查的代码模式
[展示具体的代码模式]
```
```

#### 6. Breaking Changes
标识是否存在破坏性变更。如果有，需要详细说明。

#### 7. 风险等级
评估升级风险：
- 低风险：仅修复 bug，不影响正常使用
- 中风险：有行为变化，需要测试验证
- 高风险：有 Breaking Changes 或大范围影响

### 检查点编写原则

1. **具体明确**：使用可操作的检查指令
   - ✅ 好的例子："查 Form 中所有使用数组 name 的组件"
   - ❌ 不好的例子："检查表单组件"

2. **提供搜索模式**：给出具体的搜索方法
   - 正则表达式：`name={[`
   - 组件组合：`<Form.Field name={[`
   - 特定 API：`onChange` 中直接调用 `setFormValue`

3. **覆盖边界情况**：
   - 不只关注 changelog 提到的组件
   - 考虑组件的包装使用（如 Form.Field）
   - 考虑条件渲染、动态渲染等场景

4. **场景化描述**：
   - 并发渲染场景
   - 受控/非受控切换
   - 条件渲染
   - 嵌套使用

### 示例检查点

```markdown
**检查点**: 查 Form 受控模式下在 onChange 回调里直接修改并设置表单值的逻辑
**检查点**: 查 React.StrictMode 或 React 18 并发特性下的 Form 使用
**检查点**: 查 Form.FieldSet 内部使用数组 name 的场景
**检查点**: 使用正则 `name={[` 搜索所有数组 name 的用法
```

### 分析流程

1. **收集信息**：
   - 查看 changelog 了解修复内容
   - 查看相关 PR 和 commit
   - 分析具体的代码变更

2. **提升维度**：
   - 不局限于 changelog 的描述
   - 思考问题的本质和根源
   - 识别所有相关的使用模式

3. **场景枚举**：
   - 列举所有可能受影响的使用场景
   - 考虑组件的各种组合使用
   - 包含边界情况和特殊用法

4. **编写检查点**：
   - 每个场景配备明确的检查指令
   - 提供具体的代码模式示例
   - 确保 AI 工具能准确识别

## 相关命令

### 查看版本信息
```bash
# 查看所有正式版本
git tag | grep -E "version-3\." | grep -v beta | sort -V

# 查看特定版本的所有 beta 版本
git tag | grep -E "version-3\.7\.7-beta" | sort -V

# 查看最近的版本标签
git tag | grep -E "version-3\." | tail -20
```

### 构建和发布
```bash
# 编译 changelog
npm run compile:changelog

# 发布版本
npm run publish
```

### 实际案例参考

查看 `/root/shineout-next/packages/shineout/src/form/__diff__/3.6.1/index.md` 作为标准模板。

---

*最后更新: 2025-08-05*