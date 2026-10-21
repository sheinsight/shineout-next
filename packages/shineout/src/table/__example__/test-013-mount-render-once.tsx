/**
 * cn - 【性能验证】挂载时行只渲染一遍
 *    -- 列宽测量、横向滚动状态在挂载后才确定，原先 Table 会在首帧绘制前把所有行完整渲染两遍
 *    -- 「挂载 render 次数」是「商品信息」列 render 的调用次数：优化前约为行数的 2 倍，勾选 rowMemo 后等于行数（虚拟列表下为可见行数）；未开启 rowMemo 时保持原来的渲染次数
 *    -- 有展开列时展开行需要读取容器宽度，仍保持原来的渲染次数
 *    -- 固定列（表头 / 表体 / 合计行）横向、纵向滚动时需保持吸附位置不变：可切换渲染模式、合计行、「不出现横向滚动」的宽度，或用文档站顶部的 rtl 开关对照
 * en - [Perf] Rows render only once on mount
 *    -- With rowMemo on, compare the mount render count (about 2x rows before, 1x rows after) and fixed cells should stay in place in every render mode
 */
import React, { useMemo, useRef, useState } from 'react';
import { Table, Radio, Button, Checkbox, TYPE } from 'shineout';

interface RowData {
  id: string;
  name: string;
  title: string;
  price: string;
  stock: number;
  status: number;
  time: string;
}
type TableColumnItem = TYPE.Table.ColumnItem<RowData>;

const IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="%23ddd"/></svg>';

const makeRows = (n: number): RowData[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `r_${i}`,
    name: `SPU_${String(i).padStart(4, '0')}`,
    title: `Product title ${i} some long long description text`,
    price: (10 + i).toFixed(2),
    stock: 100 + i,
    status: i % 3,
    time: '2026-10-20 12:00:00',
  }));

const ROWS_LIST = [100, 200, 500, 1000];
const WIDTH_SCROLL = '1700（出现横向滚动）';
const WIDTH_AUTO = '不设置（不出现横向滚动）';
const MODE_NORMAL = '普通';
const MODE_STICKY_CSS = 'sticky（css）';
const MODE_STICKY_JS = 'sticky（js）';
const MODE_VIRTUAL = '虚拟列表';
const MODES = [MODE_NORMAL, MODE_STICKY_CSS, MODE_STICKY_JS, MODE_VIRTUAL];

const summary = [
  [{ render: () => '合计', colSpan: 2 }, { render: () => '-', colSpan: 5 }, { render: () => '-' }],
];

// 「商品信息」列 render 的调用次数
let renderCount = 0;

const baseColumns: TableColumnItem[] = [
  { type: 'checkbox', width: 50, fixed: 'left' },
  {
    title: '商品信息',
    width: 320,
    fixed: 'left',
    render: (d) => {
      renderCount += 1;
      return (
        <div style={{ display: 'flex', gap: 8 }}>
          <img src={IMG} width={40} height={40} alt='' />
          <div>
            <div style={{ fontWeight: 600 }}>{d.name}</div>
            <div>{d.title}</div>
          </div>
        </div>
      );
    },
  },
  { title: 'SKC', width: 300, render: 'title' },
  { title: '销售价', width: 120, render: (d) => <span>{d.price} USD</span> },
  { title: '库存', width: 120, render: 'stock' },
  { title: '状态', width: 120, render: (d) => <span>{['待审核', '在售', '下架'][d.status]}</span> },
  { title: '更新时间', width: 180, render: 'time' },
  {
    title: '操作',
    width: 200,
    fixed: 'right',
    render: () => (
      <div style={{ display: 'flex', gap: 8 }}>
        <a>编辑</a>
        <a>详情</a>
        <a>下架</a>
      </div>
    ),
  },
];

const expandColumn: TableColumnItem = {
  type: 'expand',
  width: 48,
  fixed: 'left',
  render: (d) => () => <div style={{ padding: 16 }}>展开内容：{d.title}</div>,
};

export default () => {
  const [rows, setRows] = useState(500);
  const [rowMemo, setRowMemo] = useState(false);
  const [expand, setExpand] = useState(false);
  const [width, setWidth] = useState(WIDTH_SCROLL);
  const [mode, setMode] = useState(MODE_NORMAL);
  const [showSummary, setShowSummary] = useState(false);
  const [mountKey, setMountKey] = useState(0);
  const [selected, setSelected] = useState<RowData[]>([]);
  const logRef = useRef<HTMLPreElement>(null);
  const logs = useRef<string[]>([]);

  const data = useMemo(() => makeRows(rows), [rows]);
  const columns = useMemo(() => (expand ? [expandColumn, ...baseColumns] : baseColumns), [expand]);

  const desc = [
    `${rows} 行`,
    mode,
    rowMemo && 'rowMemo',
    expand && '展开列',
    showSummary && '合计行',
    width === WIDTH_AUTO && '无横向滚动',
  ]
    .filter(Boolean)
    .join(' | ');

  // 重新挂载并统计：从开始挂载到首帧绘制后的 render 次数与耗时
  const remount = () => {
    renderCount = 0;
    setSelected([]);
    const start = performance.now();
    setMountKey((k) => k + 1);
    requestAnimationFrame(() => {
      setTimeout(() => {
        const cost = performance.now() - start;
        const line = `[${desc}] 挂载 render ${renderCount} 次（行数 ${rows}，${(
          renderCount / rows
        ).toFixed(1)} 倍），挂载→绘制 ${cost.toFixed(1)}ms`;
        logs.current = [line, ...logs.current].slice(0, 20);
        if (logRef.current) logRef.current.textContent = logs.current.join('\n');
      }, 0);
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
        <div>
          行数：
          <Radio.Group keygen data={ROWS_LIST} value={rows} onChange={setRows} />
        </div>
        <div>
          宽度：
          <Radio.Group keygen data={[WIDTH_SCROLL, WIDTH_AUTO]} value={width} onChange={setWidth} />
        </div>
        <div>
          模式：
          <Radio.Group keygen data={MODES} value={mode} onChange={setMode} />
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Checkbox checked={showSummary} onChange={(_, checked) => setShowSummary(checked)}>
            合计行
          </Checkbox>
          <Checkbox checked={rowMemo} onChange={(_, checked) => setRowMemo(checked)}>
            rowMemo
          </Checkbox>
          <Checkbox checked={expand} onChange={(_, checked) => setExpand(checked)}>
            展开列
          </Checkbox>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button type='primary' onClick={remount}>
            重新挂载并统计（修改上方选项后点击）
          </Button>
        </div>
        <pre
          ref={logRef}
          style={{ margin: 0, padding: 8, minHeight: 60, background: '#f5f5f5', fontSize: 12 }}
        >
          点击「重新挂载并统计」开始
        </pre>
      </div>

      {mountKey > 0 && (
        <Table<RowData, RowData[]>
          key={mountKey}
          keygen='id'
          bordered
          data={data}
          columns={columns}
          width={width === WIDTH_SCROLL ? 1700 : undefined}
          sticky={
            mode === MODE_STICKY_CSS
              ? { top: 0, css: true }
              : mode === MODE_STICKY_JS
              ? { top: 0 }
              : undefined
          }
          virtual={mode === MODE_VIRTUAL}
          height={mode === MODE_VIRTUAL ? 500 : undefined}
          summary={showSummary ? summary : undefined}
          rowMemo={rowMemo}
          value={selected}
          onRowSelect={setSelected}
        />
      )}
    </div>
  );
};
