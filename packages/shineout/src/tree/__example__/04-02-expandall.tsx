/**
 * cn - 默认展开全部
 *    -- 设置 `defaultExpandAll` 属性，可以默认展开所有节点
 * en - Default Expand all
 *    -- Set the `defaultExpandAll` property to expand all nodes by default
 *
 */
import { Tree, TYPE } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

const data: DataItem[] = createNestedArray([2, 2, 2]);
export default () => {
  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  return (
    <div>
      <Tree defaultExpandAll line={false} data={data} keygen='id' renderItem={renderItem}></Tree>
    </div>
  );
};
