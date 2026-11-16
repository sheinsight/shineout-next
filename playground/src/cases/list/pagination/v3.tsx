import { useState } from 'react';
import { List } from 'shineout-v3';
import { makePeople, type Person } from '../_shared/data';

const ALL = makePeople(100);

// 原示例用 mock 接口按页取数据，这里在本地按页切片
export default function Demo() {
  const [current, setCurrent] = useState(1);
  const data = ALL.slice((current - 1) * 10, current * 10);
  return (
    <List
      keygen='id'
      bordered
      data={data}
      renderItem={(d: Person) => <div>{`Name: ${d.firstName}-${d.lastName}`}</div>}
      pagination={{ current, total: 100, pageSize: 10, align: 'right', onChange: setCurrent }}
    />
  );
}
