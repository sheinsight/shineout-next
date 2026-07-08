# RFC 0001: Semantic DOM

- **状态**: Draft
- **作者**: Tom Zhai
- **创建日期**: 2026-06-05
- **工作分支**: `feat/semantic-dom-rfc`（独立分支，与 popover bug fix 已无关联）

---

## 1. 摘要

为 shineout-next 所有组件引入 **Semantic DOM**：把组件内部 DOM 结构以一组稳定的「语义 key」（`root` / `header` / `body` / `footer` / `arrow` / ...）作为公开契约暴露出来，统一通过 `classNames` 和 `styles` 两个 prop 让用户精准定制内部任一节点。设计与 antd v6 对齐，便于用户（尤其是 AI Agent）以最低心智成本完成深度样式覆盖。

## 2. 动机

### 2.1 现状的不足

shineout-next 当前的 DOM 定制能力相对薄弱：

| 组件 | 根节点 | 子节点定制 |
|---|---|---|
| Modal | `className` / `style` | 仅 `headerStyle` / `bodyStyle` / `footerStyle` |
| Table / Select / Form / Popover / Drawer 等 | `className` / `style` | **无任何子节点 className/style 透传** |

用户想覆盖内部样式时，只能依赖 JSS 哈希化后的 class（如 `.soui-popover-xxxx-arrow`）写全局 CSS。这套 class 不是公开 API，版本升级随时可能失效，且经常需要 `!important` 才能覆盖内部样式。

### 2.2 AI 协作场景的真实痛点

随着 Cursor / Claude Code 等 IDE 接入开发流，组件库用户写代码的方式正在变化：

1. **AI 不知道内部结构**：模型只能从 props 类型推断 DOM；没有公开 key 时，它会胡乱生成 `.soui-xxx-yyy` 选择器，几乎全错。
2. **AI 生成的选择器特异性不够**：写出的 CSS 常常被组件内部样式压制，模型只能加 `!important` 兜底。
3. **AI 无法用 Tailwind 等原子化 CSS 精准命中节点**：缺少 `classNames={{ header: 'p-4 bg-gray-50' }}` 这类 API。

antd v6 的实践已经证明，Semantic DOM 是这套问题的标准答案。其官方博客（《语义化发现组件精致的美》，2025-11）和配套发布的 `llms-semantic.md` 都把"AI 友好"放在第一动机。

### 2.3 与 antd 的差距

| 维度 | antd v6 | shineout 现状 |
|---|---|---|
| `classNames` / `styles` 对象 prop | ✅ 全组件 | ❌ |
| 每组件 `semantic.md` 文档 | ✅ | ❌ |
| `llms.txt` / `llms-semantic.md` LLM 索引 | ✅ | ❌ |
| `ConfigProvider` 全局注入 classNames | ✅ | ❌（仅 token） |

## 3. 设计目标

1. **零破坏**：现有 `className` / `style` / `headerStyle` 等 prop 全部保留语义不变。
2. **类型安全**：每个组件的 key 词表是强类型，编辑器自动补全。
3. **与 antd 对齐**：`classNames` / `styles` 命名与心智模型一致，迁移成本低。
4. **AI 友好**：产出可被 LLM 直接索引的结构化文档（`semantic.md` + `llms.txt`）。
5. **可渐进推进**：按组件分批落地，每个组件改造可独立 ship。

## 4. API 设计

### 4.1 组件级 prop

每个组件新增两个可选 prop：

```ts
interface SemanticProps<K extends string> {
  className?: string;                       // 仍然只作用于根节点（与 classNames.root 等价、二选一）
  style?: CSSProperties;
  classNames?: Partial<Record<K, string>>;  // 新增
  styles?: Partial<Record<K, CSSProperties>>;
}
```

> **Popover 的历史兼容例外**：在绝大多数组件中 `style` prop 等价于 `styles.root`，但 **Popover 的 `style` 历来作用于 content 节点**（弹层内容区）而非 root（外层浮层容器）。为避免破坏存量用户行为，这一映射保持不变。新用户推荐统一使用 `styles.content` 以获得更清晰的语义。

**使用示例**（Popover）：

```tsx
<Popover
  classNames={{
    root:    'my-popover',
    arrow:   'my-arrow',
    content: 'my-content',
  }}
  styles={{
    content: { padding: 16, borderRadius: 8 },
    arrow:   { background: '#fafafa' },
  }}
>
  Hello
</Popover>
```

### 4.2 key 词表规范

| 通用 key | 含义 |
|---|---|
| `root` | 组件最外层 DOM（与 `className` 等价） |
| `header` / `body` / `footer` | 三段式结构组件（Modal / Card / Drawer / Collapse） |
| `mask` | 遮罩层（Modal / Drawer / Spin） |
| `title` | 标题区 |
| `extra` | 额外内容区（标题旁、列表项右侧等） |
| `wrapper` | 包裹层（位于 root 与内容之间） |
| `content` | 主要内容区 |
| `arrow` | 箭头（Popover / Tooltip / Dropdown） |
| `icon` | 图标区 |
| `label` | 标签文字 |
| `popup` | 弹层容器（Select / DatePicker / Dropdown） |
| `option` | 列表项 |
| `prefix` / `suffix` | 前置/后置元素（Input / Select） |

复杂组件（Table、Form）允许使用**点号嵌套 key**：

```ts
type TableSemanticKey =
  | 'root' | 'title' | 'footer'
  | 'header.wrapper' | 'header.row' | 'header.cell'
  | 'body.wrapper'   | 'body.row'   | 'body.cell'
  | 'pagination.root' | 'pagination.item';
```

### 4.3 与现有 `headerStyle/bodyStyle/footerStyle` 的关系

并存，**不废弃**。当两者同时存在时：

```
最终 style = { ...styles?.header, ...headerStyle }
```

即旧 prop 优先级更高（保持原有行为），新 prop 作为补充。下一个大版本（v5）再考虑标记软废弃。

### 4.4 全局配置：扩展现有 `setConfig`

shineout 当前**没有** `<ConfigProvider>` 组件，全局配置走的是 `@sheinx/base` 的 `setConfig`（基于 `@shined/reactive` 的全局 store），见 `packages/base/src/config/index.ts`。

我们**继续沿用这套机制**，不引入 React Context 风格的 ConfigProvider——少一层嵌套、少一个新组件、与现有 `setConfig({ popover: { animation: false } })` 心智一致。

落地做法是给每个组件的 sub-config 类型扩两个字段：

```ts
// packages/base/src/config/index.ts
export type PopoverConfig = {
  animation?: boolean;
  classNames?: SemanticClassNames<PopoverSemanticKey>;  // 新增
  styles?: SemanticStyles<PopoverSemanticKey>;         // 新增
};
```

用户端：

```ts
import { setConfig } from 'shineout';

setConfig({
  popover: { classNames: { arrow: 'corp-popover-arrow' } },
  modal:   { styles:     { body: { padding: 24 } } },
});
```

**优先级**：组件级 prop > `setConfig` 全局注入 > 组件内部默认值。

`useSemantic` 需要支持第三个"全局兜底"参数，在每个组件内通过 `useConfig()` 拿到对应 sub-config 后传入：

```ts
const sem = useSemantic<PopoverSemanticKey>(
  props.classNames,
  props.styles,
  useConfig().popover,  // 全局兜底
);
```

### 4.5 不做的事

- ❌ 不注入 `data-semantic="header"` 这类 `data-*` 属性（与竞品对齐，保持 DOM 干净；测试钩子继续走 `data-testid` 透传；文档站 hover 高亮通过 §6.1 的"文档站包装层注入 mark class"方案解决）
- ✅ ~~一期不支持函数式 `classNames`~~ **已实现**（Popover PoC 阶段即落地，见 commit `9442300eb`）。实际粒度比最初设想更细：不是"整体一个函数返回 `Record<K, string>`"，而是 **每个 key 的 value 可以单独是静态字符串或 `(info: Info) => string` 函数**。`Info` 是组件级状态快照接口（由各组件自行定义），`useSemantic` 泛型签名为 `useSemantic<K, Info>`，第 4 个参数传入当前渲染帧的 `info` 对象，hook 内部自动 dispatch 函数/字符串二态。Popover 的 `Info` 为 `PopoverClassNamesInfo { open, position, type }`，用法示例：
  ```tsx
  <Popover
    classNames={{
      root: ({ open }) => open ? 'my-pop--open' : 'my-pop',
      arrow: 'static-class',   // 纯字符串仍有效
    }}
  />
  ```
- ❌ 不改 JSS 命名前缀 `soui-` 与现有 hash 机制
- ❌ 不废弃任何现有 prop

## 5. 实现机制

### 5.1 useSemantic hook（新增）

`packages/base/src/common/use-semantic.ts`：

```ts
import classnames from 'classnames';
import type { CSSProperties } from 'react';

export type SemanticAccessor<K extends string> = (
  key: K,
  internalClass?: string | (string | false | undefined)[],
) => { className: string; style?: CSSProperties };

export function useSemantic<K extends string>(
  userClassNames?: Partial<Record<K, string>>,
  userStyles?: Partial<Record<K, CSSProperties>>,
): SemanticAccessor<K> {
  return (key, internalClass) => ({
    className: classnames(internalClass, userClassNames?.[key]),
    style: userStyles?.[key],
  });
}
```

### 5.2 组件改造模式

以 Popover 为例：

```tsx
const sem = useSemantic<PopoverSemanticKey>(props.classNames, props.styles);

// root
<div {...sem('root', [popoverStyle?.rootClass, popoverStyle?.wrapper, className])}
     style={{ ...containerStyle, ...style, ...sem('root').style }}>
  {showArrow && (
    <div {...sem('arrow', [popoverStyle?.arrow, props.arrowClass])} />
  )}
  <div {...sem('content', [popoverStyle?.content])}
       style={{ ...contentStyle, ...sem('content').style }}>
    {children}
  </div>
</div>
```

要点：
- 内部 JSS class 与用户 class 拼接，用户 class 排在后面，特异性自然胜出
- `className` / `style` 仍然只作用于 `root`，与 `classNames.root` / `styles.root` 并存（合并）

## 6. 文档与 AI 物料

> **定位声明**：本节产物面向的是「开发者在 Cursor / Claude Code / Windsurf / Cline / Continue.dev 等 agentic IDE 中编写 shineout 代码」的场景，**不是面向 SEO 或让 ChatGPT 在公开问答中引用 shineout**。Google Search Relations（John Mueller）已多次公开把 `llms.txt` 类比为已死的 `keywords` meta tag，主流搜索/答案引擎请求 `/llms.txt` 的实测比例 < 0.1%。
>
> 但作为 IDE 工具协议，2026 年 `llms.txt` 已是事实标准：上述五大 agentic IDE 全部原生支持。同期 Svelte 5 公开数据显示，喂 `llms-full.txt` 后模型在新语法上的 pass rate 从 < 50% 提升到 90%+。**shineout 与 Svelte 5 同属"模型训练语料里覆盖少"的库**，预期收益甚至比对 antd 更显著。

### 6.1 组件文档新增「Semantic DOM」交互式 Tab

~~原方案：静态三段式 markdown（Parts 列表 / Usage Example / Abstract DOM）。~~ 实际落地采用了体验更优的 **交互式独立 Tab**（见 commit `f8984dd3b`）：

**实现方式**：

1. 文档站 Tabs 新增 `Semantic` tab（仅当组件导出了 `<comp>.semantic.tsx` 时显示）
2. 每个组件提供 `SemanticSchema<K>`（key 列表含中英说明 + demo 组件），放在 `packages/shineout/src/<comp>/<comp>.semantic.tsx`
3. Tab 内左右双栏布局：
   - **左侧渲染舞台**：渲染 `schema.demo` 组件的真实 DOM；切到该 tab 时通过 `setConfig` 注入 mark class 到目标组件
   - **右侧 key 列表**：列出所有 semantic key 名 + 中英文说明；hover 任意 key 时，左侧对应节点实时高亮（覆盖半透明矩形，支持 portal 渲染的节点）
4. 离开 Semantic tab 时恢复原 config，不影响其他 tab

**优势对比原方案**：
- 开发者无需脑补"key 对应哪个 DOM"，直接看高亮
- 无需手写 Abstract DOM HTML 片段（维护成本高且容易过期）
- 交互体验与 antd v6 文档站对齐

### 6.2 LLM 索引产物

发布到文档站根路径，**主交付物是 `llms-full.txt`，索引文件 `llms.txt` 为副产物**（agentic IDE 实测偏好前者）：

| 产物 | 角色 | 内容 |
|---|---|---|
| **`/llms-full.txt`** | **主** | 所有组件的 API + Semantic DOM 章节 + 关键示例，**全量打平**为单个 markdown，供 IDE 一次性灌入上下文 |
| `/llms-semantic.md` / `/llms-semantic-cn.md` | 副 | 仅 Semantic DOM 的精简聚合，供只关心样式定制场景 |
| `/llms.txt` | 副 | 遵循 [llms.txt 规范](https://llmstxt.org/) 的入口清单，指向上述文件 |
| `/components/<comp>/semantic.md` | 副 | 单组件级 markdown，便于 RAG 按需检索 |

Cursor 用户可在 `.cursor/rules/*.mdc` 中引用；Claude Code / Windsurf / Continue.dev / Cline 用户可把上述 URL 添加为 Docs 源。

### 6.3 不承诺的 KPI

- ❌ "让 shineout 出现在 ChatGPT/Gemini 公开答案里"——Google 已判死，不做对外承诺
- ❌ 专属对照测试报告（目前业界没有 antd-Semantic-DOM-vs-No 的公开对照实验，做了也证伪不掉）
- ✅ 对外口径："行业标准做法 + Svelte 5 / Convex 案例旁证"

## 7. 分阶段落地

| 阶段 | 内容 | 预估 |
|---|---|---|
| **P0 基础设施** | `useSemantic` hook、类型工具、`setConfig` 全局兜底接入点、文档站 `semantic.md` 模板 | 0.5 周 |
| **P1 PoC（本 RFC 附带）** | Popover + Modal 试点，验证改动量、API 体感、文档形态 | 0.5 周 |
| **P2 高优先组件** | Drawer / Form.Item / Select / Cascader / Tooltip | 1.5 周 |
| **P3 复杂组件** | Table（点号嵌套 key）/ DatePicker / Transfer / TreeSelect | 1.5 周 |
| **P4 剩余基础组件** | Button / Input / Card / Alert / Tag / Tabs / Menu / ... | 1 周 |
| **P5 AI 物料** | 生成 `llms-full.txt`（主） / `llms-semantic.md` / `llms.txt` / 每组件 `semantic.md`；五大 agentic IDE 接入指南 | 0.5 周 |
| **P6 Codemod** ★ | 发布 `@sheinx/codemod` 包：旧 `headerStyle`/`bodyStyle`/`arrowClass` 等 → `styles.header`/`styles.body`/`classNames.arrow`；以及 `.soui-xxx-{hash}` 选择器 → semantic key 用法的扫描提示 | 0.5 周 |

**总周期 ≈ 6 周**，可与正常迭代并行。

★ P6 是从 antd v6 失分点反学的结果：antd 因为 codemod 覆盖不全（v4→v5 之后明显退步）+ 旧 prop 直接 deprecate，被存量用户骂了一年。**shineout 在两个动作上都能反超：保留老 prop 一个大版本 + 自动 codemod**。

## 8. 风险与权衡

### 8.1 从 antd v6 的真实失分点反学

调研社区对 antd v6 Semantic DOM 落地的反馈（2026-06），把所有"被骂过"的点列出来作为本 RFC 的避坑清单：

| antd v6 失分点 | 我们的应对 |
|---|---|
| 6.0 ~ 6.3 多个 minor 反复加 / 改 slot key，存量代码反复迁 | **本 RFC §4.2 通用词表 + 每组件 PR 单独 review key 列表，给团队/外部用户一周反馈窗口后再合并** |
| 早期 Tooltip 样式串到 Popover 等"slot 串味"bug | PoC 阶段每组件配 snapshot 测试，确保 `classNames.x` 不会泄漏到子组件 |
| 旧 prop（`bodyStyle`/`headStyle`/`dropdownClassName`/`popupClassName`/`wrapClassName`）直接 deprecate，存量项目噪音巨大 | **本 RFC §4.3 并存且不废弃，下个大版本（v5）再标 deprecated** |
| 官方 codemod 覆盖率不足，存量项目手工迁移成本高 | **P6 阶段提供 `@sheinx/codemod`**（见 §7） |
| Less 完全移除 + token 系统重写，老 CSS 选择器大面积失效 | 本 RFC 不动 JSS 命名前缀与 hash 机制；样式覆盖路径只新增不替换 |

### 8.2 内在风险

1. **key 词表稳定性**：一旦发布即承诺向后兼容，词表设计需谨慎（应对见 §8.1 第 1 行）。
2. **JSS hash class 暴露**：当前用户大量靠 `.soui-modal-{hash}` 写覆盖，这是脆弱的私有 API。Semantic DOM 上线后文档明确"hash 化 class 不是公开 API"，并在 changelog 引导迁移。
3. **跨组件组合不渗透**：Modal 内嵌 Button 时，`classNames.footer` 不会影响 Footer 内部 Button。这是符合预期的隔离，需在文档讲清楚。
4. **包体积**：`useSemantic` 极轻量（< 20 行），可忽略。

## 9. 未在本 RFC 范围内

- CSS 变量导出（运行时主题切换） — 另起 RFC 讨论
- 函数式 `classNames`（状态相关动态 class）— 二期再考虑
- `data-semantic` 属性 — 暂不引入，保持 DOM 干净

## 10. 决议事项（待 review）

- [ ] 通用 key 词表是否需要扩充/精简？
- [ ] `headerStyle` 等旧 prop 是否在 v5 直接软废弃？建议先保留一个大版本（参考 §8.1 antd 失分点）。
- [x] 是否同步扩展 `setConfig` 支持全局 classNames 注入？**结论：是**。在 `@sheinx/base` 的 `ConfigOption` 各组件 sub-config 类型上扩 `classNames` / `styles` 两个字段。复用现有全局 store，不引入 `<ConfigProvider>` 组件。
- [ ] Popover PoC 实现是否符合预期（见同分支 PoC 改动）？
- [ ] P6 codemod 的范围：是否纳入"`.soui-xxx-{hash}` 全局选择器 → semantic key 推荐"扫描？还是仅做 prop 重写？
- [ ] `llms-full.txt` 全量打平后预计体积（参考 antd 是 ~800KB）是否要做分卷？

## 附录 A：参考资料

**antd 一手设计**
- antd RFC #40221 — [Semantic DOM Structure for all Components](https://github.com/ant-design/ant-design/discussions/40221)
- antd RFC #51885 — [Semantic DOM Structure with classNames or styles](https://github.com/ant-design/ant-design/discussions/51885)
- antd v6 落地 tracker #54995 — https://github.com/ant-design/ant-design/issues/54995
- antd v6 主任务清单 #52115 — https://github.com/ant-design/ant-design/issues/52115
- antd v6 博客 — [语义化发现组件精致的美](https://ant.design/docs/blog/semantic-beauty-cn.md)
- antd LLM 索引 — [llms.txt](https://ant.design/llms.txt) / [llms-semantic-cn.md](https://ant.design/llms-semantic-cn.md)

**生态对照（2026-06）**
- MUI v7 slots — https://mui.com
- Mantine v9（明确以"AI 友好"为卖点之一，含 llms.txt）— https://mantine.dev/llms.txt
- HeroUI v3（含 "AI-ready metadata" + Tailwind v4） — https://heroui.com
- Park UI / Ark UI — https://park-ui.com
- shadcn/ui — 你 own 源码 + slot 内建，2026 新项目默认

**LLM / AI 工具生态**
- llms.txt 规范 — https://llmstxt.org/
- Cursor `.cursor/rules` — https://docs.cursor.com
- Windsurf / Devin Desktop — https://devin.ai
- Continue.dev `docs` provider — https://docs.continue.dev
- Cline — https://github.com/cline/cline
- Svelte 5 + llms-full.txt 案例：模型 pass rate 从 < 50% 提升至 90%+ — https://svelte.dev/llms.txt
- Google John Mueller 关于 llms.txt 的公开表态（类比已死的 keywords meta tag，实测请求率 < 0.1%）— Google Search Central + 公开 X/Mastodon 帖（2025-2026）
