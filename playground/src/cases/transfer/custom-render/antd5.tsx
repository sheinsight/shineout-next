import { Transfer, Button } from 'antd-v5';
import { makeItems } from '../_shared/data';

const data = makeItems(10).map((d) => ({ key: d.id, title: d.name }));

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
        <Button>Button</Button>
      </div>
);

export default function Demo() {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div style={{ minWidth: 530 }}>
        <Transfer
          titles={['Source', 'Target']}
          footer={() => renderFooter()}
          dataSource={data}
          operations={['To right', 'To left']}
          listStyle={{ height: 275, width: 200 }}
          render={(item) => item.title}
          targetKeys={[]}
        />
      </div>
    </div>
  );
}
