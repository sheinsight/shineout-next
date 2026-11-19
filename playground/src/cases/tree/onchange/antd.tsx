import { Tree } from 'antd';
import { makeNested, toAntd } from '../_shared/data';
import { useListBench } from '../_shared/bench';

const treeData = toAntd(makeNested([10, 5, 4]));

export default function Demo() {
  const [value, setValue] = useListBench('checked');
  return (
    <Tree
      checkable
      checkedKeys={value}
      onCheck={(keys: any) => setValue(keys as string[])}
      defaultExpandAll
      treeData={treeData}
    />
  );
}
