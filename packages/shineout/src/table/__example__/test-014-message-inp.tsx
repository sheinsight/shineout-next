/**
 * cn - 【性能验证】大表格中点击复制弹出 Message 的 INP
 *    -- 模拟业务商品列表：sticky 非虚拟、单元格 DOM 较重，每行有「复制」按钮，点击后同步复制并调用 Message.success
 *    -- 模式「不弹 Message」是基线；「keepStyleSheet 开启」会调用 setConfig({ keepStyleSheet: true })，Message / Alert 的样式表不随卸载移除
 *    -- 默认模式下两次点击之间要等上一条 Message 关闭（约 3 秒），否则样式表还在，测不到插入样式表的开销
 *    -- 记录中的「style 变动」是点击后 head 里 style 标签的增删次数，「事件耗时」来自 Event Timing（即 INP 的取值，8ms 取整）
 * en - [Perf] INP of Message.success triggered inside a big table
 *    -- Compare baseline / default Message / Message with keepStyleSheet
 */
import React, { useEffect, useRef, useState } from 'react';
import { Table, Radio, Button, Message, setConfig, TYPE } from 'shineout';

interface RowData {
  id: string;
  name: string;
  title: string;
  category: string;
  price: string;
  stock: number;
  time: string;
  skcs: { skc: string; color: string; size: string }[];
}
type TableColumnItem = TYPE.Table.ColumnItem<RowData>;

const IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="%23ddd"/></svg>';

const makeRows = (n: number): RowData[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `r_${i}`,
    name: `SPU_${String(i).padStart(4, '0')}`,
    title: `Product title ${i} some long long description text`,
    category: 'Women / Clothing / Dresses',
    price: (10 + i).toFixed(2),
    stock: 100 + i,
    time: '2026-10-28 12:00:00',
    skcs: Array.from({ length: 4 }, (__, k) => ({ skc: `skc${i}_${k}`, color: 'Black', size: 'S/M/L' })),
  }));

const MODE_NONE = '不弹 Message（基线）';
const MODE_MSG = 'Message.success（默认）';
const MODE_KEEP = 'Message.success（keepStyleSheet 开启）';
const ROWS_LIST = [100, 200, 500, 1000];

let mode = MODE_MSG;

// 模拟 copy-to-clipboard：同步 execCommand 复制
const copyText = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (e) {
    // 复制失败不影响测量
  }
  document.body.removeChild(textarea);
};

const handleCopy = (text: string) => {
  copyText(text);
  if (mode !== MODE_NONE) Message.success(`已复制 ${text}`);
};

const columns: TableColumnItem[] = [
  {
    title: '商品信息',
    width: 340,
    fixed: 'left',
    render: (d) => (
      <div style={{ display: 'flex', gap: 8 }}>
        <img src={IMG} width={60} height={60} alt='' />
        <div>
          <div style={{ fontWeight: 600, display: 'flex', gap: 8, alignItems: 'center' }}>
            {d.name}
            <Button size='small' mode='text' type='primary' data-copy onClick={() => handleCopy(d.name)}>
              复制
            </Button>
          </div>
          <div>{d.title}</div>
          <div>
            <span>{d.category}</span> <span>Tag A</span> <span>Tag B</span>
          </div>
        </div>
      </div>
    ),
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
  { title: '销售价', width: 120, render: (d) => <span>{d.price} USD</span> },
  { title: '库存', width: 120, render: (d) => <span>{d.stock}</span> },
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
  const [currentMode, setCurrentMode] = useState(MODE_MSG);
  const [rows, setRows] = useState(200);
  const [data, setData] = useState(() => makeRows(200));
  const logRef = useRef<HTMLPreElement>(null);
  const logs = useRef<string[]>([]);
  const styleChanges = useRef(0);
  const eventDurations = useRef<number[]>([]);

  mode = currentMode;

  useEffect(() => {
    setConfig({ keepStyleSheet: currentMode === MODE_KEEP });
  }, [currentMode]);

  // 文档站其它示例共用全局配置，离开时恢复默认
  useEffect(() => () => setConfig({ keepStyleSheet: false }), []);

  useEffect(() => {
    const mo = new MutationObserver((ms) => {
      ms.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if ((n as HTMLElement).tagName === 'STYLE') styleChanges.current += 1;
        });
        m.removedNodes.forEach((n) => {
          if ((n as HTMLElement).tagName === 'STYLE') styleChanges.current += 1;
        });
      });
    });
    mo.observe(document.head, { childList: true });
    let po: PerformanceObserver | undefined;
    try {
      po = new PerformanceObserver((list) => {
        list.getEntries().forEach((e) => {
          if (e.name === 'click') eventDurations.current.push(e.duration);
        });
      });
      po.observe({ type: 'event', durationThreshold: 16, buffered: false } as PerformanceObserverInit);
    } catch (e) {
      // 不支持 Event Timing 时只显示点击→绘制
    }
    return () => {
      mo.disconnect();
      po?.disconnect();
    };
  }, []);

  // 记录复制按钮的点击：点击到下一帧绘制的耗时 + Event Timing 耗时 + head 中 style 变动次数
  const handleClickCapture = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('[data-copy]')) return;
    const start = e.nativeEvent.timeStamp;
    styleChanges.current = 0;
    eventDurations.current = [];
    requestAnimationFrame(() => {
      setTimeout(() => {
        const paint = performance.now() - start;
        const styleCount = styleChanges.current;
        // Event Timing 在绘制后才派发，稍等再读
        setTimeout(() => {
          const ev = eventDurations.current.length ? `${Math.max(...eventDurations.current)}ms` : '<16ms';
          const line = `[${mode} | ${rows} 行] 点击→绘制 ${paint.toFixed(1)}ms，事件耗时 ${ev}，style 变动 ${styleCount} 次`;
          logs.current = [line, ...logs.current].slice(0, 20);
          if (logRef.current) logRef.current.textContent = logs.current.join('\n');
        }, 300);
      }, 0);
    });
  };

  return (
    <div onClickCapture={handleClickCapture}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
        <div>
          模式：
          <Radio.Group
            keygen
            data={[MODE_NONE, MODE_MSG, MODE_KEEP]}
            value={currentMode}
            onChange={(v: string) => setCurrentMode(v)}
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
              setData(makeRows(v));
            }}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              logs.current = [];
              if (logRef.current) logRef.current.textContent = '';
            }}
          >
            清空记录
          </Button>
        </div>
        <pre
          ref={logRef}
          style={{ margin: 0, padding: 8, minHeight: 60, maxHeight: 200, overflow: 'auto', background: '#f5f5f5' }}
        />
      </div>
      <Table keygen='id' bordered width={1300} data={data} columns={columns} sticky={{ top: 0, css: true }} />
    </div>
  );
};
