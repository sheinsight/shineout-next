/**
 * cn - 基本用法
 *    -- 描述列表的基本样式
 * en - Basic
 *    -- Basic usage of Descriptions
 */
import React from 'react';
import { Descriptions } from 'shineout';

const data = [
  {
    label: 'Name',
    value: 'Mai Mai',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
];

export default () => {
  return (
    <div style={{ marginBottom: '-12px' }}>
      <Descriptions
        items={data}
        title='User Info'
        colon={' :'}
      />
    </div>
  );
};
