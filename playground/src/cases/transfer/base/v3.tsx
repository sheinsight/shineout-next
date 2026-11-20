import { Transfer } from 'shineout-v3';
import { makeItems } from '../_shared/data';
import { useTransferBench } from '../_shared/bench';

const data = makeItems(10);
const PRESELECT = ['id-0', 'id-1', 'id-2'];

export default function Demo() {
  const { value, setValue, selected, setSelected } = useTransferBench(PRESELECT);
  return (
    <div style={{ width: 600 }}>
      <Transfer
        data={data}
        keygen='id'
        format='id'
        listHeight={232}
        renderItem='name'
        value={value}
        onChange={(v: string[]) => setValue(v)}
        selectedKeys={selected}
        onSelectChange={(s: any[], t?: any[]) => setSelected([...s, ...(t || [])] as string[])}
      />
    </div>
  );
}
