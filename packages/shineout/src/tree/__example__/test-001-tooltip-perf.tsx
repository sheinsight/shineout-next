/**
 * cn - 测试Tooltip高并发
 *    --
 * en - Test Tooltip
 *    --
 *
 */
import { Tree, TYPE, Tooltip } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

const data: DataItem[] = createNestedArray([2, 2, 2]);
export default () => {
  const renderItem: TreeProps['renderItem'] = (node) => {
    return <Tooltip persistent tip={`我是提示信息node ${node.id}`}><span style={{ display: 'inline-block' }}>{`node ${node.id}`} - {`node ${node.id}`} - {`node ${node.id}`}</span></Tooltip>;
  };

  return (
    <div>
      <Tree defaultExpandAll line={false} data={data} keygen='id' renderItem={renderItem}></Tree>
    </div>
  );
};
