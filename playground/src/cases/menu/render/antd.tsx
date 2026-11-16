import { useState } from 'react';
import { Menu } from 'antd';
import { SIMPLE, iconOf, toAntd } from '../_shared/data';

const ITEMS = toAntd(SIMPLE, { icon: iconOf });

export default function Demo() {
  const [active, setActive] = useState('1');
  return (
    <Menu
      mode='inline'
      inlineIndent={22}
      defaultOpenKeys={['3']}
      items={ITEMS}
      selectedKeys={[active]}
      onClick={({ key }) => setActive(key)}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
    />
  );
}
