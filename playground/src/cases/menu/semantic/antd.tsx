import { Menu } from 'antd';
import { SEMANTIC, toAntd } from '../_shared/data';

const ITEMS = toAntd(SEMANTIC);

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Menu
        mode='inline'
        items={ITEMS}
        defaultOpenKeys={['1']}
        style={{ width: 256 }}
        classNames={{ root: 'my-menu' }}
        styles={{
          root: { borderRadius: 8 },
          item: { borderRadius: 4 },
          itemTitle: { fontSize: 14 },
        }}
      />
      <Menu
        mode='inline'
        items={ITEMS}
        defaultOpenKeys={['2']}
        style={{ width: 256 }}
        classNames={{ item: 'menu-item', itemIcon: 'menu-item-icon' }}
      />
    </div>
  );
}
