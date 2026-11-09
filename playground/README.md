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
| 挂载 · 首帧 | 调用 render 到首帧绘制完成（先等 React 提交，再等下一帧绘制，包含样式、布局、绘制） |
| 挂载 · JS | 调用 render 到 React 提交完成（含 layout effect），分项指标 |
| 挂载 · DOM 稳定 | 调用 render 到 DOM 连续 300ms 无变化（包含挂载后测量尺寸等二次渲染） |
| 主线程 | JS + 渲染，排除了等待 vsync 的空闲时间，波动小，适合横向对比 |
| 点击→绘制 | 从交互到下一帧绘制完成，近似 INP，受帧对齐影响有 0~16ms 的随机波动 |
| JS | 交互任务及其后微任务的耗时 |
| 渲染 | 下一帧 rAF 开始到样式、布局、绘制完成，包含 ResizeObserver 回调及其触发的同步重渲染 |

结果表中最快的值标绿，其余显示相对最快值的倍数。

## 公平性

参考 `benchmark/table-v2-vs-v3/README.md` 的原则，这里的做法：

1. **同一种构建方式**：所有库都是 npm 发布的产物，由同一个 Vite 配置打包，`npm run bench` 时统一是 production 构建
2. **同一份运行时**：同一份 React 18.3.1，根节点 API 在面板上统一选择
3. **等价的写法**：各库 API 不同时，选择渲染结果等价的写法，并用 `check` 校验交互确实生效
4. **隔离运行**：每个库一个 iframe，视口尺寸固定
5. **抵消顺序偏差**：多轮轮换执行顺序，预热后取中位数
6. **保持前台**：测试期间页面进入后台会被标记为不可信。正式数据在有界面的 Chrome 中跑，无头模式的数值只能看趋势

## 已知问题

- `@sheinx/theme` 的 esm 产物用 `require` 引入 CommonJS 文件，生产构建需要 `build.commonjsOptions.transformMixedEsModules`，已在 `vite.config.ts` 中打开
- shineout 2.x 的 `es/config.js` 直接读取 `process.env.CSS_MODULE` 等变量，`vite.config.ts` 用 `define` 给出了默认值
