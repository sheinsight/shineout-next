import { defineCase } from '../../../core/define';
import { domChangeScenario, rowText, visibleRowCount, virtualBox, scrollToggle } from '../_shared/scenarios';

export default defineCase({
  title: '表格 行展开',
  description: '来自 shineout 示例 table/15-01-expand，100 行，其中部分行有展开内容（点击加号展开，展开内容是该行的 JSON），点击展开 / 收起',
  scenarios: [
    domChangeScenario({
      key: 'expand-row',
      name: '展开 / 收起第 1 行',
      target: (ctx) =>
        ctx.query(
          ctx.lib === 'v2'
            ? 'tbody tr:first-child .so-table-expand-indicator'
            : ctx.lib === 'v3'
              ? 'tbody tr:first-child [data-role="expand-icon"]'
              : '.ant-table-row-expand-icon',
        ),
      probe: (ctx) => String(visibleRowCount(ctx)),
    }),
  ],
  notes: [
    '数据是 _shared/data.ts 的确定性数据，另外每 3 行把 salary 调到 30 万以上，让这些行可以展开（原示例用随机数据，salary 高于 30 万的行才有展开内容）；四个库用同一份',
    'Shineout 的 row-expand 是一个特殊列（type: row-expand），render 返回 undefined 的行没有展开按钮；antd 用 expandable.expandedRowRender + rowExpandable，写法对应；antd 的展开按钮是内置列，没有占用 columns 里的位置',
    '「点击展开」场景：点第一个可展开行（第 1 行）的展开图标，展开 / 收起交替；校验可见行数变了（展开会多出一行展开内容）',
    '展开后可见行数 100 → 101，四个库一致；但收起时不同（实测）：2.x 和 3.x 把展开行的 tr 从 DOM 里移除，antd 5/6 保留 tr 只是隐藏（tr 数停在 101）。所以反复展开收起时，antd 第一次展开会新建 tr，之后只切换显隐，Shineout 每次展开都新建、每次收起都销毁，两边的工作量不同；校验用「可见行数」，不是 tr 总数',
    '原示例有 onRowClick 打日志，没迁；原示例的 expand 列 width: 10，这里 Shineout 用 40（太窄会让图标被裁），antd 内置列宽度由库决定，所以展开列宽不同',
    'antd 的 Table 默认每页 10 行并带分页器，这里全部关掉分页（pagination={false}），和 Shineout 一样一次渲染全部数据',
    '2.x 的 Td 组件在开发模式下会在控制台报 defaultProps 的 React 警告，会让 smoke 标红但不影响渲染和数据',
  ],
});
