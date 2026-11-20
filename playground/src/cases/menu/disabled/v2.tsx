import { useState } from 'react';
import { Menu } from 'shineout-v2';
import { DISABLED, type Item } from '../_shared/data';

export default function Demo() {
  const [active, setActive] = useState(['1']);
  return (
    <Menu
      data={DISABLED}
      keygen='id'
      mode='inline'
      inlineIndent={14}
      active={(d: Item) => active.includes(d.id)}
      onClick={(d: Item) => setActive([d.id])}
      renderItem={(d: Item) => d.title}
      disabled={(d: Item) => !!d.disabled}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
    />
  );
}
