import { useState } from 'react';
import { Menu } from 'shineout-v2';
import { HORIZONTAL, type Item } from '../_shared/data';

export default function Demo() {
  const [active, setActive] = useState(['1']);
  return (
    <Menu
      keygen='id'
      data={HORIZONTAL}
      mode='horizontal'
      inlineIndent={14}
      active={(d: Item) => active.includes(d.id)}
      onClick={(d: Item) => setActive([d.id])}
      renderItem={(d: Item) => d.title}
      
    />
  );
}
