import { useState } from 'react';
import { Menu } from 'antd';
import { HORIZONTAL, toAntd } from '../_shared/data';

const ITEMS = toAntd(HORIZONTAL);

export default function Demo() {
  const [active, setActive] = useState('1');
  return (
    <Menu
      mode='horizontal'
      inlineIndent={14}
      items={ITEMS}
      selectedKeys={[active]}
      onClick={({ key }) => setActive(key)}
    />
  );
}
