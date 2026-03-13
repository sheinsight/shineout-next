根据当前分支的代码变更，自动生成组件的 changelog 条目并写入对应文件。

步骤：

1. **查看变更**：运行 `git diff main..HEAD` 和 `git diff`（含未暂存的）获取所有代码变更
2. **识别组件**：根据变更文件路径判断涉及哪些组件（如 `packages/base/src/button/` → Button 组件）
3. **获取下一个 PR 编号**：通过 `gh api repos/sheinsight/shineout-next/pulls?state=all&sort=created&direction=desc&per_page=1 --jq '.[0].number'` 查询当前最新 PR 编号，+1 得到即将创建的 PR 编号
4. **处理版本号**：
   - 先通过 `git diff main..HEAD -- package.json` 检查根目录 `package.json` 的 `version` 字段是否已被修改
   - **如果已修改**：直接使用当前 `package.json` 中的版本号
   - **如果未修改**：自动将版本号的最后一位数字 +1（如 `3.9.10-beta.4` → `3.9.10-beta.5`），并更新根目录 `package.json` 的 `version` 字段
5. **生成 changelog 条目**：用用户视角描述变更，格式如下：

```
## {version}
{YYYY-MM-DD}
### {category}
- {description} ([#{pr-number}](https://github.com/sheinsight/shineout-next/pull/{pr-number}))
```

pr-number的获取方式： 通过 `gh api "repos/sheinsight/shineout-next/pulls?state=all&sort=created&direction=desc&per_page=1" --jq '.[0].number'`

6. **写入文件**：将条目插入到对应组件的 `packages/shineout/src/{component}/__doc__/changelog.cn.md` 文件**最顶部**

格式规范：
- 版本号从 package.json 读取
- 日期使用当天日期（YYYY-MM-DD）
- 分类使用 `### 🐞 BugFix`（bug 修复）、`### 🆕 Feature`（新功能）或 `### 💅 Style`（样式调整），根据 commit message 的前缀（fix/feat）和变更内容判断
- 描述用中文，从用户视角写，组件名用反引号包裹（如 `Button`）
- PR 链接格式：`([#编号](https://github.com/sheinsight/shineout-next/pull/编号))`
- 条目末尾保留一个空行与后续内容分隔

注意事项：
- 不要提及内部实现细节（如变量名、函数名、文件路径）
- 如果涉及多个组件，分别写入各自的 changelog 文件
- 描述语言简洁，参考已有 changelog 条目的风格
