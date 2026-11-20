import { Breadcrumb } from 'shineout-v3';

const data = [
  { title: 'Home', url: '#' },
  [
    { title: 'Products', url: '#' },
    { title: 'Services', url: '#' },
    { title: 'Solutions', url: '#' },
  ],
  { title: 'Category', url: '#' },
  { title: 'Detail' },
];

const longData = [
  { title: 'Home', url: '#' },
  { title: 'Products', url: '#' },
  { title: 'Category', url: '#' },
  { title: 'SubCategory', url: '#' },
  { title: 'Detail' },
];

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Breadcrumb
        data={data}
        classNames={{ root: 'my-breadcrumb', dropdown: 'my-dropdown', dropdownItem: 'my-dropdown-item' }}
        styles={{ content: { color: '#1890ff' }, separator: { margin: '0 8px', color: '#999' } }}
      />
      <Breadcrumb
        data={data}
        styles={{
          root: { padding: '8px 16px', background: '#f5f5f5', borderRadius: 4 },
          item: { fontSize: 14 },
          content: { fontWeight: 500 },
          dropdown: { border: '1px solid #e8e8e8', borderRadius: 8 },
          dropdownItem: { padding: '4px 12px', color: '#333' },
        }}
      />
      <Breadcrumb
        data={longData}
        max={3}
        styles={{
          root: { padding: '8px 16px', background: '#f0f7ff', borderRadius: 4 },
          content: { color: '#1890ff', fontWeight: 500 },
          separator: { color: '#bbb' },
        }}
      />
    </div>
  );
}
