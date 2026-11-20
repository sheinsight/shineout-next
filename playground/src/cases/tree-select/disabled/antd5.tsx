import { TreeSelect } from 'antd-v5';
import { data, toAntd, AntdNode } from '../_shared/data';

const treeData = toAntd(data);
const partial = (list: AntdNode[]): any[] =>
  list.map((d) => ({ ...d, disabled: d.title.startsWith('node 2-'), children: d.children ? partial(d.children) : undefined }));
const partialData = partial(treeData);

export default function Demo() {
  return (
    <div>
      <TreeSelect disabled style={{ width: 300 }} allowClear treeData={treeData} placeholder='Please select content' />
      <TreeSelect
        style={{ width: 300, marginInlineStart: 24 }}
        allowClear
        treeData={partialData}
        placeholder='Please select content'
      />
    </div>
  );
}
