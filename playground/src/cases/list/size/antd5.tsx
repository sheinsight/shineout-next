import { List } from 'antd-v5';
import { PEOPLE4, type Person } from '../_shared/data';

const SIZES = ['small', 'default', 'large'] as const;

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {SIZES.map((size) => (
        <List
          key={size}
          bordered
          size={size}
          rowKey='id'
          dataSource={PEOPLE4}
          renderItem={(d: Person) => <List.Item>{`Name: ${d.firstName}-${d.lastName}`}</List.Item>}
        />
      ))}
    </div>
  );
}
