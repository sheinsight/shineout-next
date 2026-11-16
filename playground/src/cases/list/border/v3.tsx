import { List } from 'shineout-v3';
import { PEOPLE4, type Person } from '../_shared/data';

export default function Demo() {
  return (
    <div style={{ padding: '0 16px', border: '1px solid #E8EBF0' }}>
      <List
        itemStyle={{ paddingLeft: 0, paddingRight: 0 }}
        keygen='id'
        bordered={false}
        data={PEOPLE4}
        renderItem={(d: Person) => <div>{`Name: ${d.firstName}-${d.lastName}`}</div>}
      />
    </div>
  );
}
