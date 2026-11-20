import { Transfer } from 'antd-v5';
import { makeItems } from '../_shared/data';

const data = makeItems(10).map((d) => ({ key: d.id, title: d.name }));

export default function Demo() {
  return (
    <div style={{ width: 600 }}>
      <Transfer
        dataSource={data}
        render={(item) => item.title}
        listStyle={{ height: 230, width: 200 }}
        showSearch={{ placeholder: 'Input search text' }}
        filterOption={(text, item) => item.title.indexOf(text) > -1}
        targetKeys={[]}
      />
    </div>
  );
}
