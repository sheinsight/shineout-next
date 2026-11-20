import { useState } from 'react';
import { Menu } from 'antd-v5';
import { SIMPLE, toAntd } from '../_shared/data';

const ITEMS = toAntd(SIMPLE);

export default function Demo() {
  const [active, setActive] = useState('1');
  return (
    <Menu
      mode='inline'
      inlineIndent={14}
      defaultOpenKeys={['3']}
      items={ITEMS}
      selectedKeys={[active]}
      onClick={({ key }) => setActive(key)}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
    />
  );
}
