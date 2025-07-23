# Diff 报告快速参考

## 📋 7 个标准章节（必须按此顺序）

```markdown
# [组件名] 组件 [版本号] 版本 Diff 报告

## 问题描述

## 代码变更文件

## 变更代码行

## 变更前后逻辑差异

## 逻辑影响范围

## 升级注意事项
### 代码兼容性
### 行为变化说明
```

## ⚡ 快速命令

```bash
# 生成模板
node scripts/diff-report-template.js

# 查看 changelog
cat packages/shineout/src/[component]/__doc__/changelog.cn.md

# 查找 commit
git log --oneline --grep="#[PR号]"

# 查看变更
git show [commit] --stat

# 更新导入
pnpm run generate:diff-imports
```

## ✅ 必须包含的内容

### 升级注意事项 - 行为变化说明
```markdown
1. **[变化点]**：
   - 影响场景：[场景]
   - 具体表现：[前后对比]
   - 受影响代码示例：
   ```tsx
   // 之前：[旧行为]
   // 现在：[新行为]
   <Component />
   ```
   - 是否需要调整：[是/否，说明]
```

## ❌ 禁止

- `## 1. 问题描述` ❌ → `## 问题描述` ✅
- 添加"测试建议"章节 ❌
- 添加"总结"章节 ❌
- 使用 emoji ❌（除非 commit message 中有）

## 📝 参考示例

- checkbox 3.4.3
- dropdown 3.3.2