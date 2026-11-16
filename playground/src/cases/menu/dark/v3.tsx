import { useState } from 'react';
import { Menu } from 'shineout-v3';
import { SIMPLE, type Item } from '../_shared/data';

const MODES = ['inline', 'vertical', 'horizontal'] as const;

// 原示例用 Radio.Group 切换 mode（Radio 还没迁移），这里把三种 mode 同时渲染
export default function Demo() {
  const [active, setActive] = useState(['1']);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {MODES.map((mode) => (
        <Menu
          key={mode}
          mode={mode}
          data={SIMPLE}
          disabled={(d: Item) => d.id === '2'}
          keygen='id'
          inlineIndent={14}
          theme='dark'
          active={(d: Item) => active.includes(d.id)}
          onClick={(d: Item) => setActive([d.id])}
          style={mode === 'horizontal' ? {} : { width: 256 }}
          renderItem={(d: Item) => d.title}
        />
      ))}
    </div>
  );
}
