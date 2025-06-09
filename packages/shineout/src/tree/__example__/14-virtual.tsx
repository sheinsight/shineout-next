/**
 * cn - 虚拟列表
 *    -- 设置 `virtual` 属性，开启虚拟列表功能，本例为 100000 条数据
 *    -- 设置虚拟列表后需要指定 `height` 属性或者将其设置在固定高度容器中
 *    -- *虚拟暂不支持高级筛选模式、节点拖拽
 * en - Virtual list
 *    -- Set the `virtual` property to enable the virtual list function, this example has 100000 data
 *
 */
import { Tree, TYPE } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

const data: DataItem[] = createNestedArray([100, 10, 10, 10]);

export default () => {
  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  return (
    <div style={{ height: 300 }}>
      <Tree
        virtual
        line={true}
        data={data}
        defaultExpandAll
        keygen='id'
        parentClickExpand
        mode={2}
        size="small"
        onChange={(v) => console.log(v)}
        renderItem={renderItem}
      ></Tree>
    </div>
  );
};
