/**
 * cn - 无连接线
 *    -- 设置 line 为 false，不显示连接线
 * en - line
 *    -- Set line to false to hide the connection line.
 */

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
              children: [
                {
                  id: '0-0-0-0',
                },
              ],
            },
          ],
        },
        {
          id: '0-1',
          children: [
            {
              id: '0-1-0',
            },
          ],
        },
      ],
    },
  ];

  const renderItem = (node: any) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  return (
    <div>
      <Tree
        defaultExpanded={['0', '0-0']}
        line={false}
        data={data}
        keygen='id'
        renderItem={renderItem}
      ></Tree>
    </div>
  );
};
