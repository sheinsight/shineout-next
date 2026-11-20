import { Menu } from 'shineout-v3';
import { SEMANTIC } from '../_shared/data';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Menu
        keygen='id'
        data={SEMANTIC}
        renderItem={(d: any) => d.title}
        defaultOpenKeys={['1']}
        style={{ width: 256, height: 'auto' }}
        classNames={{ root: 'my-menu' }}
        styles={{
          root: { borderRadius: 8 },
          item: { borderRadius: 4 },
          title: { fontSize: 14 },
        }}
      />
      <Menu
        keygen='id'
        data={SEMANTIC}
        renderItem={(d: any) => d.title}
        defaultOpenKeys={['2']}
        style={{ width: 256, height: 'auto' }}
        classNames={{
          item: ({ active, open }) => {
            if (active) return 'menu-item-active';
            if (open) return 'menu-item-open';
            return '';
          },
          expand: ({ open }) => (open ? 'expand-rotated' : ''),
        }}
        styles={{ header: { padding: '12px 16px', fontWeight: 'bold' } }}
        header='My Menu'
      />
    </div>
  );
}
