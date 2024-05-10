/**
 * cn - 单列样式
 *    -- 单列的描述列表样式
 * en - One Colums
 *    -- One colums style of Descriptions
 */
import React from 'react';
import { Descriptions } from 'shineout';

const data = [
  {
    label: 'Name',
    value: 'Mai Mai',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
];

export default () => {
  return (
    <div style={{ marginBottom: '-12px' }}>
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        column={1}
        style={{ marginBottom: '12px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        column={1}
        labelStyle={{ textAlign: 'end' }}
      />
    </div>
  );
};
