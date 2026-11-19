import { Tree } from 'antd';
import { makeNested, toAntd } from '../_shared/data';

const treeData = toAntd(makeNested([100, 10, 10, 10]));

export default function Demo() {
  return (
    <div style={{ height: 300 }}>
      <Tree virtual showLine height={300} defaultExpandAll treeData={treeData} />
    </div>
  );
}
