import { Tree } from 'antd';
import { makeNested, allIds, toAntd } from '../_shared/data';
import { useListBench } from '../_shared/bench';

const data = makeNested([10, 10, 10]);
const ids = allIds(data);
const treeData = toAntd(data);

export default function Demo() {
  const [expanded, setExpanded] = useListBench('expanded');
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <button data-bench='expand-all' onClick={() => setExpanded(ids)}>
          Expand all
        </button>
      </div>
      <Tree treeData={treeData} expandedKeys={expanded} onExpand={(keys) => setExpanded(keys as string[])} />
    </div>
  );
}
