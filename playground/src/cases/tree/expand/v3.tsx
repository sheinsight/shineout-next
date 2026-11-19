import { Tree } from 'shineout-v3';
import { makeNested, allIds } from '../_shared/data';
import { useListBench } from '../_shared/bench';

const data = makeNested([10, 10, 10]);
const ids = allIds(data);

export default function Demo() {
  const [expanded, setExpanded] = useListBench('expanded');
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <button data-bench='expand-all' onClick={() => setExpanded(ids)}>
          Expand all
        </button>
      </div>
      <Tree
        line={false}
        data={data}
        expanded={expanded}
        onExpand={(v: any[]) => setExpanded([...v] as string[])}
        keygen='id'
        renderItem={(node: any) => <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>}
      />
    </div>
  );
}
