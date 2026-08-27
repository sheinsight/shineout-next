# Semantic DOM — 剩余工作

> 已完成：基础设施(useSemantic/setConfig)、全部组件改造(47个)、LLM 产物(llms.txt/llms-full.txt)、单测。
> 本文件仅列出尚未启动的收尾工作。

---

## 1. Codemod (`@sheinx/codemod`)

用 jscodeshift 实现自动迁移工具，帮存量用户从旧 prop 迁移到 Semantic DOM API。

### 规则清单

| 旧 prop | 迁移目标 | 涉及组件 |
|---------|---------|---------|
| `bodyStyle` | `styles={{ body: ... }}` | Modal / Drawer / Card |
| `headerStyle` | `styles={{ header: ... }}` | Modal / Drawer |
| `footerStyle` | `styles={{ footer: ... }}` | Modal / Drawer |
| `arrowClass` | `classNames={{ arrow: ... }}` | Popover / Tooltip |
| `dropdownClassName` | `classNames={{ popup: ... }}` | Select / Cascader / Dropdown |
| `popupClassName` | `classNames={{ popup: ... }}` | DatePicker / TreeSelect |

### 扫描规则（warning only）

- 检测全局 CSS 里 `.soui-xxx-{hash}` 选择器，打 warning 引导迁移到 `classNames.xxx`

### 验收标准

- `npx @sheinx/codemod <dir>` 一键完成迁移
- 迁移后代码可编译、测试通过
- README 含使用说明

---

## 2. AI 工具接入指南

为主流 AI 编码工具提供接入配置模板：

| 工具 | 接入方式 |
|------|---------|
| Cursor | `.cursor/rules/shineout.mdc` 模板，引用 llms-full.txt |
| Claude Code | CLAUDE.md 或 docs 配置指向 llms-full.txt |
| Windsurf / Continue.dev | Docs 源配置 |

---

## 3. Snapshot 测试补全

RFC 要求每个组件都有 snapshot 测试验证 `classNames` 透传不串味。检查并补全缺失的组件测试。

---

## 4. 发布收尾

- 确定版本号（3.10.0）
- 写 changelog
- 内部宣讲（30min）
