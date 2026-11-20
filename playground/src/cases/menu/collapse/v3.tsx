import { useState } from 'react';
import { Button, Menu } from 'shineout-v3';
import { COLLAPSE, iconOf, type Item } from '../_shared/data';

function IMenu({ theme }: { theme: 'light' | 'dark' }) {
  const [active, setActive] = useState('10');
  const [collapse, setCollapse] = useState(false);
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Button type='primary' onClick={() => setCollapse(!collapse)} style={{ height: 32 }}>
          {collapse ? '展开' : '收起'}
        </Button>
      </div>
      <div style={{ border: '1px solid #ebebeb', float: 'left' }}>
        <Menu
          style={{ width: 200 }}
          key={theme}
          theme={theme}
          keygen='id'
          collapse={collapse}
          data={COLLAPSE}
          inlineIndent={22}
          active={(d: Item) => active === d.id}
          onClick={(d: Item) => setActive(d.id)}
          renderItem={(d: Item) => d.title}
          renderIcon={iconOf}
        />
      </div>
    </div>
  );
}

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <IMenu theme='light' />
      <IMenu theme='dark' />
    </div>
  );
}
