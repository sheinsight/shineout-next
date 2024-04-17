/**
 * cn - 标签文本对齐
 *    -- 标签文本可以设置左对齐、右对齐，也可以设置垂直的样式排列
 * en - Label text alignment
 *    -- The label text can be set to left-aligned, right-aligned, and can also be set to vertical style arrangement
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
    label: 'Hometown',
    value: 'Beijing',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
];

export default () => {
  return (
    <div style={{ marginBottom: '-12px' }}>
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        colon={<span style={{ paddingInlineStart: '4px' }}>:</span>}
        style={{ marginBottom: '12px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        colon={<span style={{ paddingInlineStart: '4px' }}>:</span>}
        labelStyle={{ textAlign: 'end' }}
        style={{ marginBottom: '12px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='vertical'
        colon={<span style={{ paddingInlineStart: '4px' }}>:</span>}
        labelStyle={{ paddingBottom: '2px' }}
      />
    </div>
  );
};
