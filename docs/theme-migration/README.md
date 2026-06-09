# Shineout v2 主题迁移到 v3

把 v1/v2 系统用的旧主题包（FSP/MRP/...）一键转成 v3 可用的 token 配置。

## 用法

输入支持本地路径或 https URL，输出路径**可省略**，省略时自动从 input 派生命名到 `output/` 目录。

```bash
# URL 形态 —— 一行搞定，自动按 pkg@hash 命名（需要 Node 18+）
node migrate-v2-theme.js \
  https://assets.dotfashion.cn/unpkg/@shein-components/shineout-theme@0.0.0-b3qq6B/index.js
# → output/shineout-theme-0.0.0-b3qq6B_v3_theme.ts
# → output/shineout-theme-0.0.0-b3qq6B_v3_theme.json

# 本地文件
node migrate-v2-theme.js ./fsp_v2_theme.js
# → output/fsp_v2_theme_v3_theme.ts (+.json)

# 显式指定输出
node migrate-v2-theme.js <input> ./custom-output.ts
```

脚本会同时产出两份等价文件（同名、不同扩展）：

| 文件 | 用途 |
|---|---|
| `xxx_v3_theme.ts` | ES module，带注释/REVIEW 标记/skipped 报告，给 review 和直接 import 用 |
| `xxx_v3_theme.json` | 纯净的 `{ tokenName: value }` 对象，可 `JSON.parse` 后传给 `setToken`，适合后台配置中心、动态加载、跨语言场景 |

### 用法 A：TS / ES module

```ts
import { setToken } from 'shineout';
import { theme } from './fsp_v3_theme';

setToken({ token: theme });
```

### 用法 B：动态加载 JSON

```ts
import { setToken } from 'shineout';

const theme = await fetch('/api/theme/fsp.json').then(r => r.json());
setToken({ token: theme });
```

## 迁移策略

| v2 类别 | v3 处理 |
|---|---|
| `color.primary` / `danger` / `warning` / `success` | 算法推导 10 阶色板（Brand-1~10 等），全局生效 |
| `color.gray100~900` | 1:1 映射到 `Neutral-fill-*` |
| `color.infoColor` / `color.secondary` | v3 无对应原子 token，列入 skipped |
| 各组件 `borderRadius` / `padding` / `color` 等 | 通过映射字典 1:1 转为对应 v3 组件 token，**目标 token 必须在 v3 白名单中**（脚本启动时强校验） |
| 复合值字段（如 `padding: "10px 16px"`） | 按 CSS shorthand 规则自动拆为 X/Y（或 top/right/bottom/left）写入对应 token |
| `common.fontSize` / `fontFamily` / `lineHeight` | v3 无等价 token，列入 skipped，请在业务 CSS 中手动设置 |
| v3 未支持的 v2 字段 | 列在文件底部"未迁移列表"，**绝不输出 v3 不认的假 key** |

## 产物示例片段

```ts
export const theme = {
  // 全局原子 token
  'Brand-1': '#F0FFFB', // REVIEW: 由 v2.color.primary 算法推导（i=1/10）
  'Brand-6': '#33CCBD', // v2.color.primary 原色
  // ...

  // 组件 token
  'tableTheadBackgroundColor': 'rgb(245, 252, 252)', // from v2.table.headBg
  'inputBorderRadius': '2px', // from v2.input.borderRadius
  // ...
};
```

## ⚠️ 必读：上线前需要 review 的点

产物中带 `REVIEW:` 注释的条目都需要人工 review。常见情况：

1. **色阶推导可能与设计稿有 ±5% 明度差**
   算法是 antd-colors 风格的 HSV 衰减，跟设计师手调的色阶不可能完全一致。
   建议：让设计师对照 v2 原色和产出的 1~10 阶过一遍，把不满意的几阶手改。

2. **多 v2 字段映射到同一 v3 token**
   如 v2 的 `color.gray800` / `gray900` 都映射到 `Neutral-fill-9`，
   后写覆盖前写（注释里会标 `OVERRIDE by`），需确认是否符合预期。

3. **`fontFamily` / `lineHeight` / `fontSize` 全局基准**
   v3 没有暴露这些为 token，会进 skipped 列表。请在业务全局 CSS 中处理：
   ```css
   body {
     font-family: <v2 fontFamily 值>;
     /* font-size 由 v3 Font-12/14/16 控制，按需调整 */
   }
   ```

4. **复合值已自动按 CSS shorthand 拆分**
   如 v2 `table.smallCellPadding: '10px 16px'` 会自动拆为：
   ```ts
   'tableSmallCellPaddingX': '16px',  // shorthand x of "10px 16px"
   'tableSmallCellPaddingY': '10px',  // shorthand y of "10px 16px"
   ```
   遵循 CSS 1/2/3/4 值规则；含 `calc()` / `var()` 等无法拆的会进 skipped。

## 工程化建议

- **第一次迁移**：跑脚本 → review 产物 → 在 demo 环境对比视觉 → 微调 → 上线
- **后续 v2 主题更新**：直接重跑脚本，diff 产物即可知道哪些 token 变了
- **多业务系统复用**：每个业务一份输入 → 每个业务一份输出，互不影响

## 字段映射字典在哪？

脚本顶部的 `FIELD_MAP` 常量，约 200+ 条。如果发现某个 v2 字段没被处理（出现在底部"未迁移列表"），
请向 shineout 团队反馈，我们补到字典里，所有后续迁移会自动受益。
