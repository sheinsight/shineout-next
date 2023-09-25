/**
 * cn - 可选择
 *    -- 设置 line 为 false，不显示连接线
 * en - line
 *    -- Set line to false to hide the connection line.
 */

import { useState } from 'react';
import { Tree } from 'shineout';
export default () => {
  const data = [
    {
      id: '0',
      children: [
        {
          id: '0-0',
          children: [
            {
              id: '0-0-0',
            },
          ],
        },
      ],
    },
  ];

  const [value, setValue] = useState([]);

  const renderItem = (node: any) => {
    return <span>{`node ${node.id}`}</span>;
  };

  const handleChange = (v) => {
    console.log(v);
    setValue(v);
  };

  return (
    <div>
      <Tree
        line={false}
        value={value}
        data={data}
        keygen='id'
        renderItem={renderItem}
        onChange={handleChange}
      ></Tree>
    </div>
  );
};
