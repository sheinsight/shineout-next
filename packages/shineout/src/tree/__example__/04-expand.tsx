/**
 * cn - 控制展开
 *    -- 基础 Tree 组件用法，当配置 `children` 字段时，允许展开和收起节点
 * en - expand
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes.
 */
import { useState } from 'react';
import { Tree, Button, TYPE } from 'shineout';
import { createNestedArray, getIds } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const data: DataItem[] = createNestedArray([2, 2, 2]);
  const [expanded, setExpanded] = useState<TreeProps['expanded']>([]);

  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const handleExpandAll = () => {
    setExpanded(getIds(data));
  };

  const handleCloseAll = () => {
    setExpanded([]);
  };

  const handleExpand: TreeProps['onExpand'] = (ids) => {
    setExpanded([...ids]);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Button size='small' mode='outline' type='secondary' onClick={handleExpandAll}>
          Expand all
        </Button>
        <Button size='small' mode='outline' type='secondary' onClick={handleCloseAll}>
          Collapse all
        </Button>
      </div>
      <Tree
        line={false}
        data={data}
        expanded={expanded}
        onExpand={handleExpand}
        keygen='id'
        renderItem={renderItem}
      ></Tree>
    </div>
  );
};
