import { Transfer } from 'antd-v5';
import { makeItems } from '../_shared/data';
import { useTransferBench } from '../_shared/bench';

const data = makeItems(10).map((d) => ({ key: d.id, title: d.name }));
const PRESELECT = ['id-0', 'id-1', 'id-2'];

export default function Demo() {
  const { value, setValue, selected, setSelected } = useTransferBench(PRESELECT);
  return (
    <div style={{ width: 600 }}>
      <Transfer
        dataSource={data}
        render={(item) => item.title}
        listStyle={{ height: 274, width: 200 }}
        targetKeys={value}
        onChange={(keys) => setValue(keys as string[])}
        selectedKeys={selected}
        onSelectChange={(s, t) => setSelected([...s, ...t] as string[])}
      />
    </div>
  );
}
