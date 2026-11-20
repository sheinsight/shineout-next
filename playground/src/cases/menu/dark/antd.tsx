import { useState } from 'react';
import { Menu } from 'antd';
import { SIMPLE, toAntd } from '../_shared/data';

const MODES = ['inline', 'vertical', 'horizontal'] as const;
const ITEMS = toAntd(SIMPLE.map((d) => (d.id === '2' ? { ...d, disabled: true } : d)));

export default function Demo() {
  const [active, setActive] = useState('1');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {MODES.map((mode) => (
        <Menu
          key={mode}
          mode={mode}
          theme='dark'
          inlineIndent={14}
          items={ITEMS}
          selectedKeys={[active]}
          onClick={({ key }) => setActive(key)}
          style={mode === 'horizontal' ? {} : { width: 256 }}
        />
      ))}
    </div>
  );
}
