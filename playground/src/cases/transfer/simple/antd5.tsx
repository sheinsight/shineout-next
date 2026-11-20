import { useState } from 'react';
import { Transfer } from 'antd-v5';
import { makeItems } from '../_shared/data';

const data = makeItems(10).map((d) => ({ key: d.id, title: d.name }));

export default function Demo() {
  const [keys, setKeys] = useState<string[]>(['id-7', 'id-8', 'id-9']);
  return (
    <Transfer
      oneWay
      dataSource={data}
      targetKeys={keys}
      onChange={(k) => setKeys(k as string[])}
      listStyle={{ height: 274, width: 200 }}
      render={(item) => item.title}
    />
  );
}
