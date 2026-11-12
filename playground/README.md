# 组件库横评平台

在同一套场景下对比多个组件库的表现：左右并排看渲染效果、手动操作，或者自动跑性能测试并输出 Markdown 报告。

第一批参与对比的库：

| key | 库 | 来源 |
| --- | --- | --- |
| `v2` | Shineout 2.x | npm `shineout@2.0.32`（包名别名为 `shineout-v2`） |
| `v3` | Shineout 3.x | npm `shineout@3.10.3`（包名别名为 `shineout-v3`） |
| `antd5` | antd 5.x | npm `antd@5.29.3`（包名别名为 `antd-v5`） |
| `antd` | antd 6.x | npm `antd@6.7.0` |

所有库都使用 npm 发布的产物，不使用本仓库源码，避免开发模式下源码不经预构建、按模块逐个加载带来的偏差。要测本地改动，可以先在仓库根目录构建并 `npm pack`，再把 `shineout-v3` 指向生成的 tgz。统一使用 React 18.3.1。Shineout 2.x 的 Message、Modal、Tooltip、Image 依赖 `ReactDOM.render`，React 19 已经删除了这个 API，所以这里不使用 React 19。原来的 React 19 兼容性测试移到了 [`react19/`](./react19)，单独安装依赖、单独启动。

## 启动

```bash
cd playground
npm install

npm run dev     # 开发模式 http://localhost:5280 ，改用例会热更新，适合对照查看
npm run bench   # 生产构建后预览 http://localhost:5281 ，正式的性能数据在这里测
npm run smoke   # 另开终端，对 5281 上的预览做冒烟检查，见「冒烟检查」
```

开发模式下 React 和各库都是 development 构建，性能数据只能看趋势。页面上会提示「开发模式」。

## 添加用例

每个用例对应 `src/cases/<组件>/<用例>/` 下的一个目录，平台会自动发现，不需要在其它地方注册：

```
src/cases/checkbox/group-500/
├── index.ts     用例描述，必须有
├── shared.ts    可选，各实现共用的数据和状态逻辑
├── v2.tsx       Shineout 2.x 实现
├── v3.tsx       Shineout 3.x 实现
├── antd5.tsx    antd 5.x 实现
└── antd.tsx     antd 6.x 实现
```

- 实现文件按库的 key 命名，默认导出一个组件。缺少某个库的实现时，界面上显示「未实现」
- `index.ts` 和 `shared.ts` 会被主页面加载，**不能 import 任何组件库**，否则会把库的代码和样式带进主页面
- 各库分别从 `shineout-v2`、`shineout-v3`、`antd-v5`、`antd` 导入。antd 5 和 6 的 API 大部分相同，`antd5.tsx` 通常复制 `antd.tsx` 后改掉导入路径即可

### 只做视觉对照

```ts
// index.ts
import { defineCase } from '../../../core/define';

export default defineCase({
  title: '基础按钮',
  description: '类型、尺寸、禁用、加载态',
});
```

没有 `scenarios` 时，性能测试只测挂载耗时。示例见 `src/cases/button/basic`。

`index.ts` 里可以用 `notes` 写出各库实现之间**有意保留的差异**（默认布局不同、某个库多包了一层 Provider 等），会显示在用例标题下，也会写进导出的报告，避免读数据的人误以为完全等价：

```ts
notes: ['antd 的 Table 默认每页 10 行，这里关掉了分页，四个库都渲染 200 行'],
```

各库实现一律使用**默认配置**，不要开启任何只有某个库才有的调优开关；确实要比较调优效果时，单独做一个用例并在 `notes` 里写明。

### 带交互场景的性能测试

示例见 `src/cases/checkbox/group-500`，包含三步：

1. 实现里用 `useBenchState(state)` 上报状态，供场景校验
2. 外部操作按钮用 `BenchToolbar`（原生 `button`，带 `data-bench` 属性），避免把某个库的 Button 算进测量结果
3. 在 `index.ts` 的 `scenarios` 里定义场景

```ts
scenarios: [
  {
    key: 'toggle-all',
    name: '全选/清空',
    // 要交互的元素。可以按库区分：ctx.lib === 'antd' ? ... : ...
    target: (ctx) => ctx.byBench('all'),
    // 可选，默认是模拟一次完整点击；也可以传函数自己派发事件（必须同步触发）
    // action: (el, ctx) => { ... },
    // 校验交互确实生效，失败次数会显示在结果里
    check: ({ before, after }) => after.checked !== before.checked,
    // 可选，只在部分库里运行
    // libs: ['v3', 'antd'],
    // 可选，只测一次、不预热，用来测冷启动的第一次交互（样式、懒初始化等只在第一次付出的开销）
    // once: true,
    // 可选，每次测量后等到它返回 true 再进行下一次（最长 10 秒），用来等 Message 之类会自行消失的元素离开
    // settleUntil: (ctx) => !ctx.query('.some-message'),
  },
],
// 可选，自动测试时 frame 的尺寸，默认 1280×800
viewport: { width: 1280, height: 800 },
```

`ctx` 上的工具：

| 字段 | 说明 |
| --- | --- |
| `lib` | 当前库的 key |
| `root` | 用例的挂载节点 |
| `byBench(name)` | 查找 `[data-bench="name"]` |
| `query(selector)` / `queryAll(selector)` | 在整个 frame 文档中查找，弹出层通常挂在 body 上，也能找到 |
| `before` / `after` | 仅 `check` 中可用，交互前后 `useBenchState` 上报的状态 |

## 添加组件库

1. `package.json` 中加依赖，与已有包同名时用 npm 别名（如 `"shineout-v2": "npm:shineout@2.0.32"`）
2. `src/core/types.ts` 的 `LibKey` 中加上 key
3. `src/libs/index.ts` 的 `LIBS` 和 `PROVIDERS` 中注册，新建 `src/libs/<key>.tsx` 默认导出一个 Provider，在里面引入全局样式、设置语言
4. `vite.config.ts` 的 `META.libs` 中加上版本信息
5. 用例目录中添加 `<key>.tsx`

## 工作方式

```
index.html（主页面：用例列表、对照视图、性能测试调度）
  └─ iframe frame.html?lib=v2&case=checkbox/group-500&mode=view|auto
       只加载一个库的 Provider 和这个用例的实现
```

- 每个库在独立的 iframe 中运行，全局样式（2.x 的 `theme.default.css`）、CSS-in-JS 和全局变量互不影响
- 对照查看：iframe 高度跟随内容变化（含挂在 body 上的弹出层），可以调整 frame 宽度和最小高度
- 性能测试：切到「性能测试」时会卸载对照视图的 iframe，避免互相抢主线程。按轮次逐个加载 `mode=auto` 的 frame，每轮轮换各库的先后顺序，每次都是新的 iframe（冷启动挂载），汇总后取中位数

frame 的 URL 参数：

| 参数 | 说明 |
| --- | --- |
| `lib` | `v2` / `v3` / `antd5` / `antd` |
| `case` | `<组件>/<用例>` |
| `mode` | `view`（默认，手动查看）/ `auto`（自动测试，结果 `postMessage` 给主页面） |
| `root` | `concurrent`（`createRoot`，默认）/ `legacy`（`ReactDOM.render`） |
| `iter` / `warmup` | 每个场景的测量次数 / 预热次数 |
| `profile` | 有这个参数时用 `console.profile` 录制挂载区间，DevTools 的 JavaScript Profiler 或 CDP 的 `Profiler.consoleProfileFinished` 可以拿到 |

对照视图里每个面板都有「新标签打开」，可以单独打开一个库的 frame，配合 DevTools Performance 面板分析。

## 指标

测量代码移植自 `benchmark/table-v2-vs-v3`，含义相同：

| 指标 | 含义 |
| --- | --- |
| 挂载 · 主线程占用 | **挂载对比以它为准，默认展示。** 调用 render 到首帧绘制完成之间，主线程实际在干活的时间（渲染、提交、提交后的副作用、样式、布局、绘制），排除等 vsync 的空闲。波动小 |
| 挂载 · 首帧 | 分项指标，勾选「显示分项指标」后可见。调用 render 到首帧绘制完成的墙钟时间，包含等 vsync 的空闲。小用例受帧对齐影响，同一份代码会在整帧（约 16ms）的两个值之间跳（实测同一用例连跑两遍，2.x 的首帧从 16.1 变成 3.9），不要用它下结论 |
| 挂载 · JS（render + commit） | React 开始渲染到提交完成（含 layout effect），分项指标 |
| 挂载 · DOM 稳定 | 调用 render 到 DOM 连续 300ms 无变化（包含挂载后测量尺寸等二次渲染），分项指标 |
| 主线程（交互） | JS + 渲染，排除了等待 vsync 的空闲时间，波动小，适合横向对比 |
| 点击→绘制 | 从交互到下一帧绘制完成，近似 INP，受帧对齐影响有 0~16ms 的随机波动 |
| JS | 交互任务及其后微任务的耗时 |
| 渲染 | 下一帧 rAF 开始到样式、布局、绘制完成，包含 ResizeObserver 回调及其触发的同步重渲染 |

结果表每格是**中位数**，下面的小字是 **25%~75% 分位**。最快的值标绿，其余显示相对最快值的倍数；如果某个值的分位范围和最快值的范围有重叠，说明差距可能只是噪声，这时显示 `≈` 而不是倍数。

### 可信度判断

跑完后结果上方会给出「可信度」：

- **不可信**（红）：测试期间页面进过后台，或者有的库没拿到数据。必须重测
- **仅供参考**（黄）：能用，引用时要带上限制。常见原因：开发模式、无头浏览器、轮数太少、轮数不是库数的整数倍、有交互校验失败
- **未发现问题**（绿）：只代表浏览器能检测到的问题没有出现。CPU 是否降速、其它程序是否占用 CPU 检测不到，需要自己保证

### 得到可靠结论的做法

1. `npm run bench` 构建，用预览地址（5281）测，不要用开发服务器
2. 用**有界面的 Chrome**，页面保持在前台，关掉其它标签页和占 CPU 的程序，笔记本接电源
3. 轮数取库数的整数倍（默认 4 轮配 4 个库），首次建议 8 轮以上；每个场景每轮 10 次
4. 对比以「主线程占用」/「主线程」为准，分位范围有重叠的差距不下结论
5. 想验证结论是否稳定，再测一遍；两次结论不一致就加轮数
6. 点「导出 JSON」保存结果，里面有每个样本的原始数据和环境信息，用来对比优化前后（见下一节）

### 对比优化前后

1. 改动前：在「性能测试」里跑一次，导出 JSON 作为**基线**
2. 改动后：在**同一台机器、同样的浏览器和参数**下再跑一次，导出 JSON
3. 切到「结果对比」标签，分别导入两份文件

判断规则：某个指标 25%~75% 分位范围**不重叠**才标为「变快 / 变慢」，重叠的标为「无明显变化」，因为这样的差距可能只是噪声。分位范围缺失时也按无变化处理，宁可漏报也不误报。

两份结果在浏览器、设备、开发/生产模式、根节点方式、React 版本、轮数上不一致，或可信度不是「未发现问题」时，页面会列出提示。有提示的对比只能看趋势。只在一份里出现的库不参与对比。

导出格式带 `schema` 字段，目前是 1。改导出字段时同步升版本，并在 `src/core/compare.ts` 的 `parseReport` 里兼容旧文件。

## 冒烟检查

改完平台代码或新增用例后，确认没有弄坏：

```bash
npm run bench                       # 构建并起预览（5281）
npm run smoke                       # 另开终端：每个用例的每个库都能渲染，页面没有报错
npm run smoke -- --perf             # 额外跑一遍性能测试流程：能出结果、交互校验全部通过
npm run smoke -- --case=table/copy-message --perf   # 只检查某个用例
npm run smoke -- http://localhost:5280              # 指定地址，例如开发服务器
```

脚本只检查流程是否通畅，不判断数值。失败时退出码为 1，可以接 CI。需要本机装有 Chrome。

## 公平性

参考 `benchmark/table-v2-vs-v3/README.md` 的原则，这里的做法：

1. **同一种构建方式**：所有库都是 npm 发布的产物，由同一个 Vite 配置打包，`npm run bench` 时统一是 production 构建
2. **同一份运行时**：同一份 React 18.3.1，根节点 API 在面板上统一选择
3. **等价的写法**：各库 API 不同时，选择渲染结果等价的写法，并用 `check` 校验交互确实生效
4. **隔离运行**：每个库一个 iframe，视口尺寸固定
5. **抵消顺序偏差**：多轮轮换执行顺序，预热后取中位数
6. **保持前台**：测试期间页面进入后台会被标记为不可信。正式数据在有界面的 Chrome 中跑，无头模式的数值只能看趋势
7. **默认配置**：各库实现都不开启调优开关；每个用例的 `notes` 列出了有意保留的差异

### 口径上已知的偏差

这些不是平台能消除的，读数据时要带上：

- **全局样式 vs 运行时样式**：2.x 的样式是一份约 310KB 的全局 CSS，在计时开始前就加载解析完了，挂载指标里它的样式解析开销是 0；3.x 和 antd 在渲染时生成样式，开销全部算进挂载。平台不测库的加载开销（下载、脚本和样式的解析），所以挂载指标对 2.x 偏有利，评价「谁的首屏更快」时要带上这一点
- **默认布局不同**：同样的 500 个选项，Shineout 每行 2 个、antd 每行 3 个，页面高度不同，布局开销因此不完全可比
- **antd 多包了一层 `ConfigProvider`**：用来设置中文，Shineout 默认就是中文，不需要。这层的开销没有单独测过
- **无头浏览器的数值**只能看趋势，和有界面的 Chrome 的排名可能不同

## 已知问题

- `@sheinx/theme` 的 esm 产物用 `require` 引入 CommonJS 文件，生产构建需要 `build.commonjsOptions.transformMixedEsModules`，已在 `vite.config.ts` 中打开
- shineout 2.x 的 `es/config.js` 直接读取 `process.env.CSS_MODULE` 等变量，`vite.config.ts` 用 `define` 给出了默认值
