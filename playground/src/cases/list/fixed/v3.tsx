import { List } from 'shineout-v3';
import { makePeople, type Person } from '../_shared/data';

const NAMES = makePeople(10000);

// 原示例的头像用 Avatar（2.x 没有 Avatar），这里统一用一个圆形 div，避免把头像组件的开销带进来
const renderItem = ({ id, firstName }: Person) => (
  <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e8ebf0', marginRight: 8, flex: 'none' }} />
    <span style={{ flex: 1 }}>{firstName}</span>
    <span>-{id}</span>
  </div>
);

export default function Demo() {
  return <List height={300} lineHeight={54} fixed keygen='id' bordered colNum={2} data={NAMES} renderItem={renderItem} />;
}
