import { Tree } from 'shineout-v2';
import { makeNested } from '../_shared/data';
import { useListBench } from '../_shared/bench';

const data = makeNested([10, 5, 4]);

export default function Demo() {
  const [value, setValue] = useListBench('checked');
  return (
    <Tree
      value={value}
      onChange={(v: any[]) => setValue([...v] as string[])}
      mode={0}
      defaultExpandAll
      data={data}
      keygen='id'
      renderItem={(node: any) => <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>}
    />
  );
}
