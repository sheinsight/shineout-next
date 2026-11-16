import { useState } from 'react';
import { Button, Menu } from 'antd';
import { COLLAPSE, iconOf, toAntd } from '../_shared/data';

// 初始激活项是 id=10（Navigation Three > Option 4 > Option 2），Shineout 会自动展开它的祖先；antd 要手动指定
const ITEMS = toAntd(COLLAPSE, { icon: iconOf });

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
          style={{ width: collapse ? undefined : 200 }}
          key={theme}
          theme={theme}
          mode='inline'
          inlineCollapsed={collapse}
          defaultOpenKeys={['6', '8']}
          inlineIndent={22}
          items={ITEMS}
          selectedKeys={[active]}
          onClick={({ key }) => setActive(key)}
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
