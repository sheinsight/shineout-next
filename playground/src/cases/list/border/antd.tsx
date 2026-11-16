import { List } from 'antd';
import { PEOPLE4, type Person } from '../_shared/data';

export default function Demo() {
  return (
    <div style={{ padding: '0 16px', border: '1px solid #E8EBF0' }}>
      <List
        rowKey='id'
        bordered={false}
        dataSource={PEOPLE4}
        renderItem={(d: Person) => <List.Item style={{ paddingInline: 0 }}>{`Name: ${d.firstName}-${d.lastName}`}</List.Item>}
      />
    </div>
  );
}
