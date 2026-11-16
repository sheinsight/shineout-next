import { useState } from 'react';
import { Menu } from 'shineout-v3';
import { SIMPLE, iconOf, type Item } from '../_shared/data';

export default function Demo() {
  const [active, setActive] = useState(['1']);
  return (
    <Menu
      data={SIMPLE}
      renderIcon={iconOf}
      keygen='id'
      mode='inline'
      inlineIndent={22}
      active={(d: Item) => active.includes(d.id)}
      onClick={(d: Item) => setActive([d.id])}
      renderItem={(d: Item) => d.title}
      defaultOpenKeys={['3']}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
    />
  );
}
