import { useState } from 'react';
import { Menu } from 'shineout-v3';
import { BASE, type Item } from '../_shared/data';

export default function Demo() {
  const [active, setActive] = useState('1');
  return (
    <Menu
      keygen='id'
      data={BASE}
      inlineAnimate
      inlineIndent={14}
      active={(d: Item) => active === d.id}
      onClick={(d: Item) => setActive(d.id)}
      renderItem={(d: Item) => d.title}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
    />
  );
}
