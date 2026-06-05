# Semantic DOM 执行计划

> 配套 `0001-semantic-dom.md`。本文档是「下周一开始干、每天打开就知道今天要做什么」的可执行版。
>
> - **起点**：2026-06-08（周一）
> - **预计完结**：2026-07-17（周五），约 6 个工作周
> - **负责人**：Tom Zhai
> - **协作分支**：`feat/semantic-dom-rfc`（基础设施 + Popover PoC 已就绪）

---

## 0. 总体节奏

| 周次 | 日期 | 阶段 | 关键产出 |
|---|---|---|---|
| W1 | 06-08 ~ 06-12 | **P0 基础设施收尾 + RFC 评审** | RFC 合并 / `useSemantic` 单测 / `setConfig` 全局兜底接入点 / Popover PoC PR 合并 |
| W2 | 06-15 ~ 06-19 | **P1 高优先组件 (一)** | Modal / Drawer / Tooltip 改造 |
| W3 | 06-22 ~ 06-26 | **P1 高优先组件 (二)** | Form.Item / Select / Cascader |
| W4 | 06-29 ~ 07-03 | **P2 复杂组件** | Table（点号嵌套 key 验证）/ DatePicker |
| W5 | 07-06 ~ 07-10 | **P3 剩余组件 + P5 AI 物料 (启动)** | Button/Input/Card/Alert 等 + `llms-full.txt` 脚手架 |
| W6 | 07-13 ~ 07-17 | **P6 Codemod + 收尾** | `@sheinx/codemod` 发布 / 文档 / Cursor 接入指南 |

> ⚠️ 节奏假设：每周净投入 ≈ 3 个工作日（剩余两天处理本职 bug fix / review）。如实际节奏更慢，整体顺延，**P5/P6 不要砍**——它们是与竞品拉开差距的关键。

---

## 1. 完成定义（DoD）

每个组件改造必须满足 **6 条**才算 done：

1. ✅ `XxxSemanticKey` 类型已定义，key 列表写进 `.type.ts`，附 JSDoc 中英双语说明
2. ✅ `XxxProps` 新增 `classNames?: SemanticClassNames<K>` 和 `styles?: SemanticStyles<K>`，挂 `@version next`
3. ✅ 组件实现内所有对应节点已通过 `useSemantic` 接入（用 `sem('key', [...内部 class])` 模式）
4. ✅ 现有 `headerStyle` / `bodyStyle` / `arrowClass` / `dropdownClassName` 等老 prop **保留不删**，标 `@deprecated 推荐使用 classNames.xxx / styles.xxx`
5. ✅ 新增 `__example__/NN-semantic.tsx` demo，文件头注释格式标准（cn/en 双语，构建脚本会自动收录到文档）
6. ✅ snapshot 测试：传入 `classNames={{ x: 'test-x' }}` 时，对应节点 DOM 上有 `test-x` 这个 class（防 antd v6 早期"slot 串味"那种 bug）

---

## 2. 通用 Semantic Key 词表（一锤定音版）

> 这是本 RFC **最重要**的一个表。一旦发布即承诺向后兼容。下周一第一件事是把这张表团队过一遍。

### 2.1 顶级通用 key（所有组件优先使用这些命名）

| key | 含义 | 示例组件 |
|---|---|---|
| `root` | 组件最外层 DOM（与 `className` 等价） | 所有组件 |
| `wrapper` | 根与内容之间的包裹层 | Select / Input |
| `mask` | 遮罩层 | Modal / Drawer / Spin |
| `header` | 头部区 | Modal / Card / Drawer / Collapse |
| `body` | 主体区 | Modal / Card / Drawer |
| `footer` | 尾部区 | Modal / Card / Drawer / Form |
| `title` | 标题文字 | Modal / Card |
| `extra` | 标题旁/项右侧的额外区 | Card / List.Item |
| `content` | 主要内容区（与 body 二选一） | Popover / Tooltip / Tabs |
| `arrow` | 箭头 | Popover / Tooltip |
| `icon` | 图标区 | Alert / Tag / Button |
| `label` | 标签文字 | Form.Item / Checkbox |
| `popup` | 弹层容器 | Select / DatePicker / Dropdown |
| `option` | 列表项 | Select / Cascader |
| `prefix` | 前置元素 | Input / Select |
| `suffix` | 后置元素 | Input / Select |
| `close` | 关闭按钮 | Modal / Alert / Tag |

### 2.2 状态修饰禁止作为 key

❌ 不允许：`wrapperOpen` / `wrapperDisabled` / `optionActive`
✅ 替代做法：状态体现在用户自己写的 CSS 选择器里（如 `.my-option:hover`），semantic key 只暴露**结构**不暴露**状态**。

理由：状态组合爆炸，写进 key 词表后无法增删。

### 2.3 嵌套 key（仅复杂组件使用）

用点号分隔，二级最多两层：

```
header.row    header.cell
body.row      body.cell
pagination.root   pagination.item
```

仅 Table / Transfer / TreeSelect / DatePicker 这类多区组件使用，**普通组件禁止嵌套**。

---

## 3. 周历明细

### W1（06-08 ~ 06-12）P0 基础设施 + RFC 评审

| 日期 | 事项 | 验收 |
|---|---|---|
| 06-08 周一 | 上午：把 §2 词表 + RFC 主体发到组里发起评审；下午：补 `useSemantic` 单测 | 评审会议邀请发出 / `use-semantic.test.ts` 合并 |
| 06-09 周二 | 评审会（30min），收意见改 RFC；准备给 `ConfigOption` 各 sub-config 扩 `classNames`/`styles` 字段的类型设计（沿用现有 `setConfig`，不新增组件） | 会议纪要 / `ConfigOption` 改造方案 1 页 |
| 06-10 周三 | 改 `useSemantic` 接受第三个"全局兜底"参数；改 Popover 让它消费 `useConfig().popover` | Popover demo 加一个 `setConfig` 全局覆盖示例 |
| 06-11 周四 | 把 `feat/semantic-dom-rfc` 整理成 2 个 commit 推 PR：`feat(rfc): introduce Semantic DOM` + `feat(popover): support Semantic DOM API` | PR 链接 / CI 通过 |
| 06-12 周五 | PR review 修改 / 合入 main / 写 W2 启动文档 | PR merged |

**W1 风险预案**：如果 RFC 评审有大改（>2 处词表变动），W1 顺延到 06-15，W2 ~ W6 全部右移一周。

---

### W2（06-15 ~ 06-19）P1 高优先组件 (一)：Modal / Drawer / Tooltip

| 日期 | 事项 |
|---|---|
| 06-15 周一 | **Modal** 改造 + demo + snapshot 测试（PR-1） |
| 06-16 周二 | Modal PR review；**Drawer** 改造（PR-2） |
| 06-17 周三 | Drawer 合入；**Tooltip** 改造（PR-3，因为是 Popover 的弱化版，可以直接复制 PoC 模式） |
| 06-18 周四 | Tooltip 合入；review 三个 PR 的 key 设计是否一致 |
| 06-19 周五 | 周回顾：是否有需要回写到 RFC §2 词表的发现？必要时小版本号 RFC v1.1 |

**Modal 预计 key**：`root` / `mask` / `panel` / `header` / `title` / `body` / `footer` / `close` / `resizeX`
**Drawer 预计 key**：`root` / `mask` / `panel` / `header` / `body` / `footer` / `close`
**Tooltip 预计 key**：`root` / `arrow` / `content`（与 Popover 完全一致，强制对齐）

---

### W3（06-22 ~ 06-26）P1 高优先组件 (二)：Form.Item / Select / Cascader

| 日期 | 事项 |
|---|---|
| 06-22 周一 | **Form.Item** 改造（PR-4）—— 预计 key：`root` / `label` / `control` / `help` / `extra` / `required` |
| 06-23 周二 | Form.Item review；启动 **Select** 改造（Select 是 P1 最复杂的） |
| 06-24 周三 | **Select** 继续（PR-5）—— 预计 key：`root` / `wrapper` / `selector` / `prefix` / `suffix` / `popup` / `option` / `optionGroup` / `empty` |
| 06-25 周四 | Select 合入；**Cascader** 改造（结构与 Select 类似，直接借鉴）（PR-6） |
| 06-26 周五 | Cascader 合入；周回顾 |

**Select 的特别注意点**：`popup` 是渲染在 body 下的 portal，必须保证 portal 后的 DOM 上 `classNames.popup` 仍然生效（PoC 已验证 Popover 的 portal 行为是正确的，但 Select 走另一套路径，需单独 snapshot）。

---

### W4（06-29 ~ 07-03）P2 复杂组件：Table / DatePicker

| 日期 | 事项 |
|---|---|
| 06-29 周一 | **Table** 设计：把 §2.3 嵌套 key 落到 Table 上，写 key 表草案找团队确认（不直接动代码） |
| 06-30 周二 | Table 改造（PR-7） —— key：`root` / `header.wrapper/row/cell` / `body.wrapper/row/cell` / `footer` / `pagination.root/item` |
| 07-01 周三 | Table 继续 + snapshot |
| 07-02 周四 | **DatePicker** 改造（PR-8） —— key：`root` / `popup` / `header` / `body` / `footer` / `cell` / `cellInner` |
| 07-03 周五 | DatePicker 合入；周回顾 |

**Table 风险**：现有 Table 有大量内部 hook 和 ref 传递，重构 `useSemantic` 接入需要小心**不破坏现有 virtual scroll 与 expand row 逻辑**。这条单独留一天 buffer。

---

### W5（07-06 ~ 07-10）P3 剩余组件 + P5 AI 物料启动

#### P3 组件清单（按价值排序，时间不够可截断）

> 注意：以下清单基于今天对 `packages/base/src/` 的盘点，下周开始前需快速复盘哪些组件无内部 DOM 节点可暴露（如 Divider/Gap）则跳过。

| 组件 | 是否纳入 | 备注 |
|---|---|---|
| Button | ✅ | key: `root` / `icon` / `loading` |
| Input | ✅ | key: `root` / `wrapper` / `prefix` / `suffix` / `clear` |
| Textarea | ✅ | 与 Input 复用模式 |
| Card / Card-Group | ✅ | key: `root` / `header` / `title` / `extra` / `body` / `footer` / `cover` |
| Alert | ✅ | key: `root` / `icon` / `title` / `content` / `close` |
| Tag | ✅ | key: `root` / `icon` / `close` |
| Tabs | ✅ | key: `root` / `header` / `tab` / `panel` / `extra` |
| Menu | ✅ | key: `root` / `item` / `submenu` / `icon` |
| Dropdown | ✅ | 与 Popover 复用 |
| Checkbox / Radio | ✅ | key: `root` / `inner` / `label` |
| Switch | ✅ | key: `root` / `handle` / `inner` |
| Avatar / Badge | ✅ | key: `root` / `content` / `dot` |
| Progress | ✅ | key: `root` / `track` / `bar` / `text` |
| Steps | ✅ | key: `root` / `item` / `title` / `description` / `tail` |
| Skeleton | ✅ | key: `root` / `image` / `paragraph` / `title` |
| Collapse | ✅ | key: `root` / `header` / `body` / `icon` |
| List | ✅ | key: `root` / `item` / `header` / `footer` |
| Rate / Slider | ✅ | key: `root` / `handle` / `track` |
| Pagination | ✅ | key: `root` / `item` / `prev` / `next` / `jumper` |
| Tree / TreeSelect | ✅ | key: `root` / `node` / `nodeContent` / `expandIcon` |
| Transfer | ✅ | key: `source.root/header/body/footer` / `target.root/header/body/footer` |
| Upload | ✅ | key: `root` / `trigger` / `list` / `item` |
| Carousel | ✅ | key: `root` / `slide` / `indicator` / `arrow` |
| Empty | ✅ | key: `root` / `image` / `description` |
| Spin | ✅ | key: `root` / `indicator` / `mask` |
| Image | ✅ | key: `root` / `img` / `mask` / `preview` |
| Descriptions | ✅ | key: `root` / `header` / `body` / `row` / `label` / `content` |
| Breadcrumb | ✅ | key: `root` / `item` / `separator` |
| Sticky | ⏭ skip | 无 inner DOM |
| Divider / Gap / Grid / Link / Icon / Editable-Area / Message | ⏭ skip 或最简版 | 仅暴露 root |

**节奏**：W5 头三天集中清扫 ✅ 组件（每天 4~6 个组件，借助统一改造模板）；后两天启动 AI 物料。

#### P5 AI 物料（W5 后半周启动，W6 收尾）

| 日期 | 事项 |
|---|---|
| 07-09 周四 | 写 `scripts/build-llms-txt.js`：扫描 `packages/shineout/src/**/__doc__/index.md` 与 semantic 章节，生成单文件 `llms-full.txt` |
| 07-10 周五 | 生成 `llms-semantic.md` / `llms.txt`（索引） |

---

### W6（07-13 ~ 07-17）P6 Codemod + 全面收尾

| 日期 | 事项 |
|---|---|
| 07-13 周一 | 启动 `@sheinx/codemod`：jscodeshift 脚手架 + 第一条规则 `bodyStyle → styles.body` |
| 07-14 周二 | 扩展规则：`headerStyle/footerStyle/arrowClass/dropdownClassName/popupClassName` 全转换 |
| 07-15 周三 | 添加扫描规则：检测全局 CSS 里 `.soui-xxx-{hash}` 选择器并打 warning 引导迁移 |
| 07-16 周四 | 写 README + 接入指南：Cursor `.cursor/rules/shineout.mdc` 模板 / Claude Code / Continue.dev 配置示例 |
| 07-17 周五 | 整体发布：版本号 / changelog / 公司内部宣讲（30min） |

---

## 4. 改造模板（每个组件都按这个套路走）

> 把这段贴到每个组件的 PR description 里作为 checklist。

```md
## Semantic DOM 改造 checklist

- [ ] 在 `xxx.type.ts` 新增 `XxxSemanticKey` 类型联合
- [ ] 在 `xxx.type.ts` 的 `XxxProps` 新增 `classNames?: SemanticClassNames<XxxSemanticKey>` 和 `styles?: SemanticStyles<XxxSemanticKey>`，挂 `@version next` JSDoc
- [ ] 旧的 `headerStyle` / `dropdownClassName` 等 prop 标 `@deprecated`，行为保留
- [ ] 在 `xxx.tsx` 内 `const sem = useSemantic<XxxSemanticKey>(props.classNames, props.styles)`
- [ ] 每个对应节点改为 `<div {...sem('key', [...原有 class]).className} style={{ ...原有 style, ...sem('key').style }}>`
- [ ] 新增 `__example__/NN-semantic.tsx` demo（cn/en 头注释格式标准）
- [ ] 新增 snapshot 测试：传 `classNames={{ x: 'gen-x' }}` 后 DOM 上必须有 `gen-x`
- [ ] 运行 `pnpm test -- xxx` 全绿
- [ ] PR description 列出本组件的全部 key 列表（review 重点）
```

---

## 5. 横向治理（贯穿全程，不属于任何单周）

- **每周五写一份 W{n} 周报**贴在 RFC 文档下方：本周改了哪些组件、收到哪些反馈、key 词表是否调整
- **每完成一个 P1/P2 组件就回写到 RFC §2 词表**：如果出现新的通用 key（如发现多个组件都用 `clear` 这个 key），提升到通用表
- **保护现有 PR `fix/popover-arrow-min-width`**：那条独立合入，不与本计划混淆
- **保留所有老 prop**：本计划全程**不删任何现有 prop**。废弃在 v5 大版本统一处理

---

## 6. 看板：今天/本周状态

> 每天开始工作前先扫一遍这里。这一节我会在每次工作时自己更新。

| 项 | 状态 |
|---|---|
| RFC 主文档 | ✅ 已起草，待评审 |
| 执行计划文档 | ✅ 本文档 |
| `useSemantic` hook | ✅ 已实现，待单测 |
| `setConfig` 全局兜底接入点 | ⏳ W1 周三 |
| Popover PoC | ✅ 已实现，待 PR |
| `feat/semantic-dom-rfc` 分支 | ✅ 已建 |
| **当前阻塞** | 无 |

---

## 7. 失败 / 终止条件（提前定好，避免上头）

如果出现以下任一情况，**立即停下**走重新讨论流程：

1. RFC 评审中团队对 §2 通用词表有 >5 处分歧，且 1 周内无法收敛
2. P1 改造时发现某个核心组件（Modal/Select）的 DOM 结构无法在不重写组件的前提下接入 `useSemantic`
3. Snapshot 测试出现 >3 个 "slot 串味" bug（说明 useSemantic 的实现需要重构）
4. 公司内有其他组件库统一战略（如要求统一迁到 shadcn-style headless 架构），本方案变成沉没成本

---

## 8. 成功标准（W6 结束时回头看）

- ✅ shineout 全量组件支持 `classNames` / `styles` Semantic DOM API
- ✅ `llms-full.txt` 发布到文档站，Cursor 一键可接入
- ✅ `@sheinx/codemod` 发布，老用户 5 分钟内可完成迁移
- ✅ 至少 2 个内部业务线接入 PoC 并给反馈
- ✅ 写一篇技术博客（公司内部）总结整个改造，作为下次架构决策的参考

---

**起飞 ✈️ —— 2026-06-08 周一上午把 RFC 评审邀请发出去。**
