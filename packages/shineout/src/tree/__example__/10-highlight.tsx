/**
 * cn - 点击高亮
 *    -- 设置 `highlight` 属性后在点击节点时高亮。
 *    -- 复选框模式的默认不高亮。
 * en - Highlight
 *    -- Set the `highlight` property to highlight the node when clicked
 *    -- The default is not highlighted in checkbox mode.
 */

import { Tree, TYPE, Gap } from 'shineout';
import { createNestedArray } from './utils';
import { useState } from 'react';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const [value, setValue] = useState<TreeProps['value']>(['0', '0-0', '0-0-0', '1', '1-0', '1-0-0']);
  const data: DataItem[] = createNestedArray([5, 1, 1]);

  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  return (
    <Gap style={{gap: 24}}>
      <Tree line={false} highlight data={data} keygen='id' renderItem={renderItem} />
      <Tree line={false} data={data} keygen='id' renderItem={renderItem} value={value} onChange={setValue} />
    </Gap>
  );
};
