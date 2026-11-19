import { Tree } from 'shineout-v3';
import { smallTree } from '../_shared/data';
import { useListBench } from '../_shared/bench';

export default function Demo() {
  const [expanded, setExpanded] = useListBench('expanded');
  return (
    <Tree
      data={smallTree}
      keygen='id'
      renderItem={(node: any) => `node ${node.id}`}
      expanded={expanded}
      onExpand={(ids: any[]) => setExpanded([...ids] as string[])}
    />
  );
}
