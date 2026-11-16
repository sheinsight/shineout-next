import { useState } from 'react';
import { Menu } from 'antd-v5';
import { HORIZONTAL, toAntd } from '../_shared/data';

const ITEMS = toAntd(HORIZONTAL);

export default function Demo() {
  const [active, setActive] = useState('1');
  return (
    <Menu
      mode='vertical'
      inlineIndent={14}
      items={ITEMS}
      selectedKeys={[active]}
      onClick={({ key }) => setActive(key)}
      style={{ width: 256, height: 300, border: '1px solid #e8ebf0' }}
    />
  );
}
