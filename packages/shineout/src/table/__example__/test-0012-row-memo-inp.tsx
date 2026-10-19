/**
 * cn - 【性能验证】rowMemo 行级 memo 前后对比
 *    -- 模拟业务商品列表：sticky 非虚拟、勾选、左右固定列、单元格 DOM 较重，且 columns 每次渲染都新建对象（render 引用不变）
 *    -- 切换「rowMemo」开关（表格会重新挂载），分别点击勾选框、下一页、修改第 1 行，观察下方统计与 DevTools Performance 的 INP
 *    -- 统计中的「render 次数」是「商品信息」列 render 的调用次数，约等于本次交互重渲染的行数
 *    -- 外部 state 演示：正确写法（render 放进 useMemo 依赖）开启 rowMemo 后仍会更新；错误写法（render 直接读 ref）开启后不会更新
 * en - [Perf] rowMemo before/after comparison
 *    -- Toggle rowMemo and compare render count / click-to-paint time of check, page change and single row update
 */
import React, { useMemo, useRef, useState } from 'react';
import { Table, Radio, Button, Input, TYPE } from 'shineout';

interface RowData {
  id: string;
  name: string;
  title: string;
  category: string;
  status: number;
  price: string;
  stock: number;
  time: string;
  skcs: { skc: string; color: string; size: string }[];
}
type TableColumnItem = TYPE.Table.ColumnItem<RowData>;

const IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="%23ddd"/></svg>';

const makeRows = (n: number, page: number): RowData[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `p${page}_${i}`,
    name: `SPU_${page}_${String(i).padStart(4, '0')}`,
    title: `Product title ${page}-${i} some long long description text`,
    category: 'Women / Clothing / Dresses',
    status: i % 3,
    price: (10 + i).toFixed(2),
    stock: 100 + i,
    time: '2026-10-16 12:00:00',
    skcs: Array.from({ length: 4 }, (__, k) => ({ skc: `skc${i}_${k}`, color: 'Black', size: 'S/M/L' })),
  }));

const MEMO_OFF = '关闭（优化前）';
const MEMO_ON = '开启（优化后）';
const MODE_RIGHT = '正确：render 放进 useMemo 依赖';
const MODE_WRONG = '错误：render 直接读 ref';
const ROWS_LIST = [30, 100, 200, 500];

// 本次交互期间「商品信息」列 render 的调用次数
let renderCount = 0;

const createColumns = (getKeyword: () => string): TableColumnItem[] => [
  { type: 'checkbox', width: 50, fixed: 'left' },
  {
    title: '商品信息',
    width: 320,
    fixed: 'left',
    render: (d) => {
      renderCount += 1;
      const keyword = getKeyword();
      return (
        <div style={{ display: 'flex', gap: 8 }}>
          <img src={IMG} width={60} height={60} alt='' />
          <div>
            <div style={{ fontWeight: 600 }}>
              {keyword && <span style={{ color: '#f5222d' }}>[{keyword}] </span>}
              {d.name}
            </div>
            <div>{d.title}</div>
            <div>
              <span>{d.category}</span> <span>Tag A</span> <span>Tag B</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    title: 'SKC',
    width: 300,
    render: (d) => (
      <div>
        {d.skcs.map((s) => (
          <div key={s.skc} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <img src={IMG} width={24} height={24} alt='' />
            <span>{s.skc}</span>
            <span>{s.color}</span>
            <span>{s.size}</span>
          </div>
        ))}
      </div>
    ),
  },
  { title: '销售价', group: '销售信息', width: 120, render: (d) => <span>{d.price} USD</span> },
  { title: '库存', group: '销售信息', width: 120, render: (d) => <span>{d.stock}</span> },
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
        <a>更多</a>
      </div>
    ),
  },
];

export default () => {
  const [memo, setMemo] = useState(MEMO_OFF);
  const [rows, setRows] = useState(100);
  const [page, setPage] = useState(0);
  const [data, setData] = useState(() => makeRows(100, 0));
  const [selected, setSelected] = useState<RowData[]>([]);
  const [keyword, setKeyword] = useState('');
  const [mode, setMode] = useState(MODE_RIGHT);
  const [, forceUpdate] = useState(0);
  const keywordRef = useRef('');
  keywordRef.current = keyword;
  const logRef = useRef<HTMLPreElement>(null);
  const logs = useRef<string[]>([]);

  // 正确写法：外部 state 作为依赖，变化时 render 引用跟着变
  const rightColumns = useMemo(() => createColumns(() => keyword), [keyword]);
  // 错误写法：render 引用永远不变，内部读可变的 ref
  const wrongColumns = useMemo(() => createColumns(() => keywordRef.current), []);
  // 模拟业务包装层：每次渲染都 map 出新的列对象（render 引用不变）
  const columns = (mode === MODE_RIGHT ? rightColumns : wrongColumns).map((c) => ({ ...c }));

  // 记录每次点击：render 次数 + 点击到下一帧绘制的耗时（近似 INP，不受 Event Timing 取整影响）
  const handleClickCapture = (e: React.MouseEvent) => {
    if (logRef.current && logRef.current.contains(e.target as Node)) return;
    renderCount = 0;
    const start = e.nativeEvent.timeStamp;
    const target = e.target as HTMLElement;
    const label = target.closest('button')?.textContent || (target.closest('td') ? '表格内点击' : '其它');
    requestAnimationFrame(() => {
      setTimeout(() => {
        const cost = performance.now() - start;
        const line = `[rowMemo ${memo === MEMO_ON ? '开' : '关'} | ${rows} 行] ${label}：render ${renderCount} 次，点击→绘制 ${cost.toFixed(1)}ms`;
        logs.current = [line, ...logs.current].slice(0, 20);
        if (logRef.current) logRef.current.textContent = logs.current.join('\n');
      }, 0);
    });
  };

  const reset = (n: number, p: number) => {
    setData(makeRows(n, p));
    setSelected([]);
  };

  return (
    <div onClickCapture={handleClickCapture}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
        <div>
          rowMemo：
          <Radio.Group
            keygen
            data={[MEMO_OFF, MEMO_ON]}
            value={memo}
            onChange={(v: string) => {
              setMemo(v);
              setSelected([]);
            }}
          />
        </div>
        <div>
          行数：
          <Radio.Group
            keygen
            data={ROWS_LIST}
            value={rows}
            onChange={(v: number) => {
              setRows(v);
              reset(v, page);
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button
            onClick={() => {
              setPage(page + 1);
              reset(rows, page + 1);
            }}
          >
            下一页（整页换数据）
          </Button>
          <Button onClick={() => setData(data.map((d, i) => (i === 0 ? { ...d, stock: d.stock + 1 } : d)))}>
            第 1 行库存 +1（不可变更新）
          </Button>
          <Button
            onClick={() => {
              // 错误示范：直接改原对象，行数据引用不变，开启 rowMemo 后该行不会更新
              data[0].stock += 1;
              forceUpdate((n) => n + 1);
            }}
          >
            第 1 行库存 +1（直接修改原对象，错误示范）
          </Button>
          <Button
            onClick={() => {
              logs.current = [];
              if (logRef.current) logRef.current.textContent = '';
            }}
          >
            清空记录
          </Button>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          外部 state（会显示在「商品信息」列）：
          <Input style={{ width: 160 }} value={keyword} onChange={(v) => setKeyword(v || '')} clearable />
          <Radio.Group keygen data={[MODE_RIGHT, MODE_WRONG]} value={mode} onChange={(v: string) => setMode(v)} />
        </div>
        <div>已勾选：{selected.length} 行</div>
        <pre
          ref={logRef}
          style={{ margin: 0, padding: 8, minHeight: 60, maxHeight: 200, overflow: 'auto', background: '#f5f5f5' }}
        />
      </div>
      <Table
        key={`${memo}-${rows}`}
        keygen='id'
        bordered
        width={1700}
        data={data}
        columns={columns}
        sticky={{ top: 0, css: true }}
        value={selected}
        onRowSelect={setSelected}
        rowMemo={memo === MEMO_ON}
      />
    </div>
  );
};
