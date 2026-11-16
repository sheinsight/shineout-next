import { useState } from 'react';
import { Button, List } from 'shineout-v3';
import { makePeople, type Person } from '../_shared/data';

const ALL = makePeople(50);

function Item({ d }: { d: Person }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: 14 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#E8EBF0', flex: 'none' }} />
      <div style={{ flex: 1, minWidth: 0, margin: '0 12px' }}>
        <div style={{ fontWeight: 500 }}>List Title</div>
        <div>{d.position}</div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <a>Preview</a>
        <a>Edit</a>
        <a>Delete</a>
      </div>
    </div>
  );
}

export default function Demo() {
  const [count, setCount] = useState(5);
  const footer = (
    <div style={{ padding: 16, display: 'flex', lineHeight: '22px', alignItems: 'center', justifyContent: 'center' }}>
      <Button onClick={() => setCount(count + 5)} type='primary' mode='text'>
        load more
      </Button>
    </div>
  );
  return <List keygen='id' data={ALL.slice(0, count)} bordered renderItem={(d: Person) => <Item d={d} />} footer={footer} />;
}
