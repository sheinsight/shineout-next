import { Transfer, Button } from 'shineout-v3';
import { makeItems } from '../_shared/data';

const data = makeItems(10);

const renderFooter = () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 12px',
          boxSizing: 'border-box',
        }}
      >
        <Button type='secondary'>Button</Button>
      </div>
);

export default function Demo() {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div style={{ minWidth: 530 }}>
        <Transfer
          titles={['Source', 'Target']}
          footers={[renderFooter(), renderFooter()]}
          data={data}
          keygen='id'
          operations={['To right', 'To left']}
          listHeight={184}
          renderItem='name'
        />
      </div>
    </div>
  );
}
