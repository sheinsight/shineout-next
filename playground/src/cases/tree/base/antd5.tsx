import { Tree } from 'antd-v5';
import { smallTree, toAntd } from '../_shared/data';
import { useListBench } from '../_shared/bench';

const treeData = toAntd(smallTree);

export default function Demo() {
  const [expanded, setExpanded] = useListBench('expanded');
  return <Tree treeData={treeData} expandedKeys={expanded} onExpand={(keys) => setExpanded(keys as string[])} />;
}
