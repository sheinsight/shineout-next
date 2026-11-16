import { Listy } from 'antd';
import { makePeople, type Person } from '../_shared/data';

const NAMES = makePeople(10000);
// Listy 是单列虚拟列表，没有 colNum：把相邻两条合成一行（5000 行），行高 54，对应 Shineout 的 colNum=2 + lineHeight=54
const ROWS: Person[][] = Array.from({ length: NAMES.length / 2 }, (_, i) => [NAMES[i * 2], NAMES[i * 2 + 1]]);

const Cell = ({ id, firstName }: Person) => (
  <div style={{ flex: 1, height: 30, display: 'flex', alignItems: 'center' }}>
    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e8ebf0', marginRight: 8, flex: 'none' }} />
    <span style={{ flex: 1 }}>{firstName}</span>
    <span>-{id}</span>
  </div>
);

export default function Demo() {
  return (
    <Listy
      virtual
      height={300}
      items={ROWS}
      rowKey={(row) => row[0].id}
      styles={{ item: { height: 54, padding: 0 } }}
      itemRender={(row) => (
        <div style={{ display: 'flex', alignItems: 'center', height: 54, gap: 16, padding: '0 16px' }}>
          {row.map((p) => <Cell key={p.id} {...p} />)}
        </div>
      )}
    />
  );
}
