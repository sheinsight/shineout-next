# Diff 报告编写指南

本目录包含了 Shineout-next 项目中 diff 报告的编写规范、工具和模板。

## 📋 文件说明

### 1. [diff-report-standard.md](./diff-report-standard.md)
**标准操作流程和规范**
- 详细的章节结构说明
- 各章节编写规范
- 标准化模板
- 质量检查清单

### 2. [diff-report-checklist.md](./diff-report-checklist.md)
**编写检查清单**
- 信息收集步骤
- 内容编写要点
- 格式规范检查
- 常见错误示例

### 3. [diff-report-ai-prompt.md](./diff-report-ai-prompt.md)
**AI 生成提示词模板**
- 标准提示词格式
- 不同类型的示例
- 补充信息模板
- 批量生成指南

### 4. [diff-report-quick-reference.md](./diff-report-quick-reference.md)
**快速参考卡片**
- 7 个标准章节一览
- 常用命令速查
- 必须包含的内容模板
- 禁止事项提醒

### 5. [/scripts/diff-report-template.js](../../scripts/diff-report-template.js)
**交互式模板生成器**
- 自动生成标准模板
- 引导式信息收集
- 自动创建文件结构

## 🚀 快速开始

### 1. 生成新的 diff 报告

```bash
# 使用交互式生成器
node scripts/diff-report-template.js

# 手动查看 changelog
cat packages/shineout/src/<component>/__doc__/changelog.cn.md

# 查找相关 commit
git log --oneline --grep="<keyword>" -i

# 查看具体变更
git show <commit-hash> --stat
git show <commit-hash> -- <file-path>
```

### 2. 编写 diff 报告

1. **收集信息**：版本号、PR 编号、commit hash、变更文件
2. **使用模板**：参考 `diff-report-standard.md` 中的标准模板
3. **填充内容**：按照 7 个标准章节逐一编写
4. **质量检查**：使用 `diff-report-checklist.md` 进行检查

### 3. 更新导入

```bash
# 完成报告编写后，更新 diff-imports.ts
pnpm run generate:diff-imports
```

## ✅ 标准章节结构

1. **标题**：`# [组件名] 组件 [版本号] 版本 Diff 报告`
2. **问题描述**
3. **代码变更文件**
4. **变更代码行**
5. **变更前后逻辑差异**
6. **逻辑影响范围**
7. **升级注意事项**
   - 代码兼容性
   - 行为变化说明

## ❌ 禁止事项

- 不使用编号的章节标题（如 `## 1. 问题描述`）
- 不添加"测试建议"章节
- 不在结尾添加"总结"章节（除非是多功能综合版本）
- 不使用 emoji（除非是 commit message 中的）

## 📝 参考示例

优秀的 diff 报告示例：
- `checkbox` 组件 3.4.3 版本
- `dropdown` 组件 3.3.2 版本

这些示例展示了标准的格式和内容组织方式。

## 🔧 常用命令

```bash
# 查看组件的所有版本变更
ls packages/shineout/src/<component>/__diff__/

# 查看特定版本的 diff 报告
cat packages/shineout/src/<component>/__diff__/<version>/index.md

# 搜索包含特定关键词的 commits
git log --all --grep="<keyword>" --oneline

# 查看 PR 相关的所有 commits
git log --oneline --grep="#<pr-number>"
```

## 💡 最佳实践

1. **保持一致性**：所有 diff 报告应该有相同的结构和风格
2. **用户视角**：从使用者角度描述变化，而非实现细节
3. **具体示例**：提供真实的代码示例，展示前后对比
4. **明确指导**：清楚告知用户是否需要修改代码
5. **版本追踪**：准确记录版本号和相关 PR/commit 信息

## 🤝 贡献指南

在编写新的 diff 报告时：
1. 先阅读本目录下的所有指南文件
2. 使用提供的工具和模板
3. 参考现有的优秀示例
4. 确保通过所有检查项
5. 提交前运行 `pnpm run generate:diff-imports`

如有疑问，请参考现有的 diff 报告或咨询团队成员。