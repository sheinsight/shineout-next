# Table 改动前后（A/B）对比

用同一份测试代码分别加载「基线」和「改动后」两个 3.x 构建产物，对比 `Table` 挂载和容器宽度变化时的耗时与 render 次数。用于验证「挂载时行只渲染一遍」这类只影响内部渲染次数的优化，文档站示例 `__example__/test-013-mount-render-once` 只能看到当前代码，无法直接对照。

公平性原则同 `../table-v2-vs-v3/README.md`：两边都用生产模式 UMD 产物 + 同一份 React，每个配置在独立 iframe 中运行，多轮轮换先后顺序取中位数。

## 快速开始

```bash
# 在仓库根目录执行；bundle 需要 Node 18（Node 24 会因 http_parser 报错）

# 1. 基线：在改动前的代码上构建（可以 git stash 暂存改动，或在 git worktree 中构建）
fnm exec --using=18.19.1 pnpm run build:pkg
node benchmark/table-mount-ab/prepare.js base
#    也可以直接复用已有的产物：node benchmark/table-mount-ab/prepare.js base <产物路径>

# 2. 改动后：恢复改动后再构建一次
fnm exec --using=18.19.1 pnpm run build:pkg
node benchmark/table-mount-ab/prepare.js current

# 构建会改写版本号，测完还原
git checkout -- packages/shineout-style/src/version.ts packages/shineout/src/index.ts

# 3. 起静态服务，浏览器打开 http://localhost:8766/
cd benchmark/table-mount-ab && python3 -m http.server 8766
```

- **自动测试**：在 `index.html` 中选择行数、渲染模式和配置，点「开始自动测试」，结果以表格和 Markdown 输出。页面会检查两个槽位加载的实现（基线应为「内联偏移」，改动后应为「CSS 变量」），放错时给出提示
- **手动测试**：通过 `index.html` 的链接在两个标签页分别打开基线和改动后，点「重新挂载」「改变容器宽度」对照日志，可配合 DevTools Performance 面板分析

## 指标

| 指标 | 含义 |
| --- | --- |
| 挂载 JS | `flushSync` 挂载的同步耗时，包含 layout effect 中测量列宽后的同步重渲染，以及测量触发的强制样式计算、布局 |
| 挂载→首帧 | 从挂载到首帧绘制完成 |
| 挂载 render 次数 | 首帧绘制时「商品信息」列 render 的调用次数，约等于渲染的行数 |
| 容器宽度变化→稳定 | 容器宽度在 1300px / 1200px 之间切换后，到最后一次 render 之后那一帧绘制完成的耗时 |
| 容器宽度变化 render 次数 | 同上期间的 render 次数 |

## 目录结构

| 文件 | 作用 |
| --- | --- |
| `prepare.js` | 把产物复制到 `vendor/shineout-<base\|current>.min.js`，生成 `vendor/meta.js` |
| `bench.html` / `bench.js` | 被测页面，每次只加载一个产物，通过 URL 参数控制配置（参数见 `bench.js` 头部注释） |
| `index.html` / `runner.js` | 调度页面，按轮次用 iframe 逐个加载 `bench.html`，汇总结果 |
| `vendor/` | 构建产物，不入库 |
