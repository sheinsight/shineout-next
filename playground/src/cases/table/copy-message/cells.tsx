/** 各实现共用的单元格内容（只用原生元素，库自己的组件通过参数传入） */
import type { ReactNode } from 'react';
import { IMG, type RowData } from './shared';

const row = { display: 'flex', gap: 8, alignItems: 'center' } as const;

export const renderProduct = (d: RowData, copyButton: (text: string) => ReactNode) => (
  <div style={{ display: 'flex', gap: 8 }}>
    <img src={IMG} width={60} height={60} alt='' />
    <div>
      <div style={{ ...row, fontWeight: 600 }}>
        {d.name}
        <span data-copy>{copyButton(d.name)}</span>
      </div>
      <div>{d.title}</div>
      <div>
        <span>{d.category}</span> <span>Tag A</span> <span>Tag B</span>
      </div>
    </div>
  </div>
);

export const renderSkc = (d: RowData) => (
  <div>
    {d.skcs.map((s) => (
      <div key={s.skc} style={{ ...row, gap: 6 }}>
        <img src={IMG} width={24} height={24} alt='' />
        <span>{s.skc}</span>
        <span>{s.color}</span>
        <span>{s.size}</span>
      </div>
    ))}
  </div>
);

export const renderPrice = (d: RowData) => <span>{d.price} USD</span>;
export const renderStock = (d: RowData) => <span>{d.stock}</span>;
export const renderTime = (d: RowData) => <span>{d.time}</span>;

export const renderActions = () => (
  <div style={row}>
    <a>编辑</a>
    <a>详情</a>
    <a>下架</a>
    <a>更多</a>
  </div>
);
