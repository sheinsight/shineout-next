将当前分支的所有变更提交并创建 GitHub PR。

步骤：

1. **检查状态**：运行 `git status` 和 `git diff main..HEAD --stat` 了解当前变更情况
2. **确认分支**：如果当前已在非 main 的功能分支上，直接使用该分支；否则根据变更内容自动创建一个语义化的新分支（格式如 `fix/xxx`、`feat/xxx`）
3. **暂存并提交**：`git add .` 暂存所有文件，然后用规范的 commit message 提交（遵循项目已有的 commit 风格）
4. **推送远程**：`git push -u origin <branch-name>`
5. **创建 PR**：使用 `gh pr create --base main`，PR 标题和描述应从用户视角概括变更内容

注意事项：
- 每一步执行前先确认上一步成功
- 如果有未解决的冲突或异常，停下来告知用户
- commit message 遵循项目现有风格（如 fix(component): xxx）
- PR 描述简洁明了，包含 Summary 和 Test plan
