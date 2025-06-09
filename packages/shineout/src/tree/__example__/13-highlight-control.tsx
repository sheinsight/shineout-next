/**
 * cn -
 *    -- 受控高亮：设置 `active` 和 `setActive`
 * en -
 *    -- Highlight control: set `active` and `setActive`
 */

import { Button, Tree, TYPE } from 'shineout';
import { createNestedArray } from './utils';
import { useState } from 'react';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const [active, setActive] = useState<string | number | undefined>();
  const data: DataItem[] = createNestedArray([5, 1, 1]);

  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const handleClearHighlight = () => {
    setActive(undefined);
  }

  return (
    <div>
      <Tree
        active={active}
        setActive={setActive}
        data={data}
        keygen='id'
        line={false}
        renderItem={renderItem}
      />

      <br />

      <Button onClick={handleClearHighlight}>Clear highlight</Button>
    </div>
  );
};
