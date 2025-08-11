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

# Diff 报告编写规范

## 通用模板规范
- 详细规范文档: `.claude/diff/index.md`
- 包含7个标准章节：标题、版本信息、详细变更、受影响场景、Breaking Changes、风险等级、版本修复历史
- 每个章节都有明确的内容格式和编写要求