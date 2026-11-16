import { useState } from 'react';
import { List } from 'antd-v5';
import { makePeople, type Person } from '../_shared/data';

const ALL = makePeople(100);

export default function Demo() {
  const [current, setCurrent] = useState(1);
  const data = ALL.slice((current - 1) * 10, current * 10);
  return (
    <List
      bordered
      rowKey='id'
      dataSource={data}
      renderItem={(d: Person) => <List.Item>{`Name: ${d.firstName}-${d.lastName}`}</List.Item>}
      pagination={{ current, total: 100, pageSize: 10, align: 'end', onChange: setCurrent }}
    />
  );
}
