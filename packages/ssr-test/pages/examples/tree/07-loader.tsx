/**
 * cn - 动态加载
 *    -- 动态加载节点
 * en - Loader
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes
 */
import { useState } from 'react';
import { Tree, TYPE } from 'shineout';
import { produce } from 'immer';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const initData = ['0', '1', '2', '3', '4'].map((i) => ({ id: i }));
  const [data, setData] = useState(initData);
  const [value, setValue] = useState<TreeProps['value']>([]);

  const renderItem = (node: any) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i);

  const handleChange: TreeProps['onChange'] = (v) => {
    setValue(v);
  };

  const handleLoader: TreeProps['loader'] = (key) => {
    const nextData = produce(data, (draft) => {
      const path: string[] = key.toString().split(',');
      let target: any = draft;
      path.forEach((pid, i) => {
        target = target.find((d: any) => d.id === pid);
        if (i < path.length - 1) target = target.children;
      });
      target.children = [...createRange().map((i) => ({ id: `${target.id}-${i}` }))];
    });
    setTimeout(() => setData(nextData), 1000);
  };

  return (
    <div>
      <Tree
        value={value}
        line={false}
        onChange={handleChange}
        loader={handleLoader}
        data={data}
        keygen={(node, parentKey) => `${parentKey},${node.id}`.replace(/^,/, '')}
        renderItem={renderItem}
      ></Tree>
    </div>
  );
};
