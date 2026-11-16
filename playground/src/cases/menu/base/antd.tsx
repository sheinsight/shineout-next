import { useState } from 'react';
import { Menu } from 'antd';
import { BASE, toAntd } from '../_shared/data';

const ITEMS = toAntd(BASE);

export default function Demo() {
  const [active, setActive] = useState('1');
  return (
    <Menu
      mode='inline'
      inlineIndent={14}
      items={ITEMS}
      selectedKeys={[active]}
      onClick={({ key }) => setActive(key)}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
    />
  );
}
