# Table 2.x vs 3.x 性能对比

对比 shineout 2.x 与 3.x（含 `rowMemo`）的 `Table` 在非虚拟、sticky、固定列、勾选场景下的交互性能。新的 benchmark 可以参考本目录的结构和原则编写。

## 快速开始

```bash
# 1. 构建 3.x（在本仓库根目录；bundle 需要 Node 18，Node 24 会因 http_parser 报错）
fnm exec --using=18.19.1 pnpm run build:pkg
# 构建会改写 packages/shineout-style/src/version.ts 和 packages/shineout/src/index.ts 中的版本号，测完记得还原
git checkout -- packages/shineout-style/src/version.ts packages/shineout/src/index.ts

# 2. 构建 2.x（在 2.x 仓库；publish/dist 已是最新时可跳过，prepare.js 会提示是否过期）
npm run build

# 3. 复制构建产物到 vendor/（已加入 .gitignore）
node benchmark/table-v2-vs-v3/prepare.js [2.x 仓库路径，默认 ../shineout]

# 4. 起静态服务，浏览器打开 http://localhost:8765/
cd benchmark/table-v2-vs-v3 && python3 -m http.server 8765
```

- **自动测试**：在 `index.html` 中选择版本、行数、React 根节点类型和次数，然后点「开始自动测试」，结果会以表格和 Markdown 两种形式输出
- **手动测试**：通过 `index.html` 里的链接，在新标签页打开单个版本，自己点击，页面顶部会记录浏览器 Event Timing（INP 的数据来源）。可以配合 DevTools Performance 面板一起分析

测试期间保持页面在前台，不要操作。后台标签页的 rAF 会被节流，结果会被标记为不可信。正式数据请在有界面的 Chrome 中跑，无头模式的数值只能用来看趋势。

## 目录结构

| 文件 | 作用 |
| --- | --- |
| `prepare.js` | 把 React 生产包和两个版本的 UMD 产物复制到 `vendor/`，生成 `vendor/meta.js`（版本、commit、构建时间、过期检查） |
| `bench.html` / `bench.js` | 被测页面，每次只加载一个版本，通过 URL 参数控制配置，执行场景后把结果 `postMessage` 给 runner |
| `index.html` / `runner.js` | 调度页面，按轮次用 iframe 逐个加载 `bench.html`，汇总并展示结果 |
| `vendor/` | 构建产物，不入库 |

`bench.html` 的 URL 参数：

| 参数 | 说明 |
| --- | --- |
| `lib=v2\|v3` | 被测版本 |
| `memo=1` | 开启 `rowMemo`，仅 v3 生效 |
| `rows=100` | 行数 |
| `root=concurrent\|legacy` | 用 `createRoot` 还是 `ReactDOM.render` 挂载 |
| `auto=1` | 自动模式；不传则为手动模式 |
| `iter` / `warmup` | 每个场景的测量次数 / 预热次数 |

## 公平性原则

写新的 benchmark 时，下面几条都要满足，否则结论不可信：

1. **同一种产物形态**：要么都用 src 源码，要么都用构建产物，不能混用。src 在 dev 模式下会多出开发期警告和校验逻辑，babel 配置也不同。本目录统一使用**生产模式的 UMD 产物**（`shineout.min.js`）
2. **同一份运行时**：React 版本、生产/开发模式、根节点 API 保持一致
3. **同一份测试代码**：数据、列定义、组件 props、测量代码完全一致。只有被测特性本身（如 `rowMemo`）可以不同
4. **等价的功能配置**：两个版本 API 不同时，选择渲染结果等价的写法，并在页面上校验。例如 2.x 不传 `fixed="x"` 就不支持固定列，所以两边都传 `fixed="x"`，并输出实际渲染的行数做核对
5. **隔离运行**：两个版本都会暴露全局 `Shineout`，每个配置必须在独立的 iframe 中加载，视口尺寸固定
6. **抵消顺序偏差**：多轮执行，每轮轮换版本的执行顺序，取中位数，并预热若干次
7. **校验交互生效**：每次测量后检查状态或 DOM 确实变化（勾选数、单元格内容等），失败次数要显示出来，避免因为选择器不对而白测
8. **产物不过期**：`prepare.js` 会对比产物的构建时间与源码的最后一次提交和未提交改动，过期时给出提示

## 指标

| 指标 | 含义 |
| --- | --- |
| 主线程 | JS + 渲染，排除了等待 vsync 的空闲时间，波动小，适合横向对比 |
| 点击→绘制 | 从派发点击到下一帧绘制完成的总耗时，近似 INP，受帧对齐影响会有 0~16ms 的随机波动 |
| JS | 点击任务加上其后的微任务的耗时。React 18 中按钮等元素的点击更新在微任务中 flush，所以只测同步部分会漏掉渲染 |
| 渲染 | 下一帧 rAF 开始到样式、布局、绘制完成的耗时，包含 ResizeObserver 回调及其触发的同步重渲染 |
| render 次数 | 「商品信息」列 render 的调用次数，约等于重渲染的行数 |
| 挂载（首帧 / DOM 稳定） | 挂载到首帧绘制完成的耗时 / 到 DOM 连续 300ms 无变化的耗时（包含挂载后测量列宽等二次渲染） |

## 场景

| key | 场景 | 校验 |
| --- | --- | --- |
| `parent` | 父组件无关 state 更新（列对象每次 `map` 出新对象，render 引用不变） | tick +1 |
| `check-row` | 勾选/取消第 1 行 | 勾选数变化 |
| `check-all` | 全选/取消全选 | 勾选数在 0 和全部之间切换 |
| `update-row` | 第 1 行库存 +1（不可变更新） | 第 1 行单元格出现新值 |
| `next-page` | 下一页（整页换数据） | 第 1 行出现新页数据 |

## 扩展

**新增场景**：在 `bench.js` 的 `SCENARIOS` 中添加 `{ key, name, target, check }`。`target` 返回要点击的元素；`check(before)` 根据交互前的状态校验交互结果。然后在 `runner.js` 的 `SCENARIO_ORDER` 和 `SCENARIO_NAMES` 中加上同样的 key。

**新增配置**：在 `runner.js` 的 `CONFIGS` 中添加 URL 参数组合，在 `bench.js` 中解析参数并映射到组件 props，在 `index.html` 的「版本」中添加对应的勾选项。

**新的 benchmark**（如其他组件，或其他版本之间的对比）：复制本目录，然后：

1. 修改 `prepare.js` 中要复制的产物和过期检查涉及的源码目录
2. 在 `bench.js` 中替换被测组件、数据和场景，保留测量工具（`measureOnce`、`settle`、`waitDomStable`、`simulateClick`）和 `postMessage` 协议
3. 在 `runner.js` 中修改 `CONFIGS` 和场景名称
4. 在 `.gitignore` 中加入新目录的 `vendor/`
