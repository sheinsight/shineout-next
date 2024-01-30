/**
 * cn - 不同尺寸
 *    -- 展示不同尺寸下的描述列表
 * en - Different Size
 *    -- Show Descriptions of different sizes
 */
import React from 'react';
import { Descriptions, Radio } from 'shineout';

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
    value: 'Yingdu Building,Zhichun Road,Beijing',
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

type SizeType = 'small' | 'default' | 'large' | undefined;
const Size: SizeType[] = ['small', 'default', 'large'];

export default () => {
  const [size, setSize] = React.useState<SizeType>('default');
  return (
    <div>
      <Radio.Group
        data={Size}
        value={size}
        onChange={setSize}
        keygen
        style={{ marginBottom: 24 }}
      />
      <Descriptions
        items={data}
        title='User Info'
        colon={<span style={{ paddingLeft: '4px' }}>:</span>}
        style={{ marginBottom: '20px' }}
        size={size}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        labelStyle={{ textAlign: 'right' }}
        size={size}
        border
      />
    </div>
  );
};
