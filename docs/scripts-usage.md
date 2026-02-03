# Changelog 和 GitHub Releases 管理脚本使用说明

## 概述

项目现在提供了两个脚本来管理 changelog 和 GitHub Releases:

1. **`build-changelog.js`** - 将运行时的 changelog 数据编译成静态 markdown 文件
2. **`sync-github-releases.js`** - 将 changelog 同步到 GitHub Releases

## 1. 生成静态 Changelog

### 命令

```bash
npm run build:changelog
```

### 功能

该脚本会:
- 读取 `docs/chunk/shineout/changelog/` 目录下所有组件的 changelog 数据
- 合并相同版本的更新记录
- 按版本号排序
- 生成静态 markdown 文件:
  - `docs/markdown/shineout/changelog-release.md` - 仅包含正式版本(用于 GitHub Releases)

### 输出示例

```
Loading changelogs...
Found 718 changelog entries
Generating release changelog (正式版本, 不包含 beta)...
✓ Generated: /path/to/changelog-release.md
✓ Changelog compilation completed!
```

---

## 2. 同步 Changelog 到 GitHub Releases

### 前置要求

1. 安装 GitHub CLI:
   ```bash
   brew install gh  # macOS
   # 或访问 https://cli.github.com/ 查看其他平台安装方式
   ```

2. 登录 GitHub:
   ```bash
   gh auth login
   ```

### 使用方式

#### 2.1 同步版本范围(推荐)

```bash
npm run release:github -- --from 3.7.8 --to 3.9.8
```

这将:
- 检查已存在的 GitHub Releases
- 自动创建指定范围内缺失的正式版本(不包含 beta 版本)
- 跳过已经存在的版本
- **注意**: tag 格式为 `version-3.x.x`

#### 2.2 预览模式(推荐先运行)

```bash
npm run release:github -- --from 3.7.8 --to 3.9.8 --dry-run
```

这将显示哪些版本会被创建,但不会实际创建 Release。

#### 2.3 同步指定版本

```bash
npm run release:github -- 3.9.9
```

只同步指定的单个版本。

#### 2.4 强制重新同步指定版本

```bash
npm run release:github -- 3.9.9 --force
```

删除已存在的 Release 并重新创建。

### 示例输出

```
📦 开始同步 Changelog 到 GitHub Releases...

📖 解析 changelog-release.md...
✓ 找到 156 个版本

🔍 检查已存在的 GitHub Releases...
✓ 找到 45 个已存在的 release

📝 需要创建 111 个 Release:

  - 3.9.9 (2026-02-02)
  - 3.9.8 (2026-01-23)
  - 3.9.7 (2026-01-13)
  ...

处理版本: 3.9.9
  ✓ 已创建 release: v3.9.9

==================================================
📊 同步完成统计:
  ✓ 成功: 111
==================================================

💡 提示: 可以访问 https://github.com/sheinsight/shineout-next/releases 查看
```

---

## 工作流程建议

### 正常发布流程

1. **开发完成后**,在各组件的 changelog 文件中添加更新记录
2. **发布前**,生成静态 changelog:
   ```bash
   npm run build:changelog
   ```
3. **提交代码**,包含生成的 markdown 文件
4. **发布到 npm** (使用现有的 release 脚本)
5. **同步到 GitHub Releases**:
   ```bash
   # 先预览
   npm run release:github -- --dry-run

   # 确认无误后正式同步(需指定版本范围)
   npm run release:github -- --from 3.9.0 --to 3.9.9
   ```

### 批量补充历史版本

如果需要将 3.7.8 到 3.9.8 之间的所有版本同步到 GitHub:

```bash
# 1. 先生成 changelog
npm run build:changelog

# 2. 预览要创建的 Release
npm run release:github -- --from 3.7.8 --to 3.9.8 --dry-run

# 3. 确认无误后执行
npm run release:github -- --from 3.7.8 --to 3.9.8
```

### 修正某个版本的 Release

如果某个版本的 Release 内容有误:

```bash
# 1. 更新对应组件的 changelog 文件
# 2. 重新生成 changelog
npm run build:changelog

# 3. 强制重新创建该版本的 Release
npm run release:github -- 3.9.9 --force
```

---

## 注意事项

1. **Tag 格式**: GitHub Release 的 tag 格式为 `version-3.x.x`(例如 `version-3.9.8`)
2. **beta 版本**: `sync-github-releases.js` 默认不会为 beta 版本创建 Release,只处理正式版本
3. **版本范围**: 使用 `--from` 和 `--to` 参数时,会包含起始和结束版本(闭区间)
4. **时间限制**: 如果一次创建大量 Release(>5个),脚本会提示确认并等待 5 秒
5. **速率限制**: 脚本在创建多个 Release 时会自动延迟 1 秒,避免触发 GitHub API 速率限制

---

## 故障排查

### 问题: "gh: command not found"
**解决**: 安装 GitHub CLI
```bash
brew install gh
```

### 问题: "authentication required"
**解决**: 登录 GitHub
```bash
gh auth login
```

### 问题: changelog-release.md 文件不存在
**解决**: 先运行 changelog 生成脚本
```bash
npm run build:changelog
```

### 问题: Release 创建失败
**可能原因**:
- tag 已存在: 使用 `--force` 参数重新创建
- 权限不足: 确保 GitHub 账号有 repo 权限
- 网络问题: 检查网络连接

---

## 相关文件

- `scripts/build-changelog.js` - Changelog 编译脚本
- `scripts/sync-github-releases.js` - GitHub Releases 同步脚本
- `docs/chunk/shineout/changelog/` - 各组件的 changelog 源数据
- `docs/markdown/shineout/changelog-release.md` - 编译后的正式版本 changelog
