import { Gap } from 'shineout-v3';

const item = { padding: '8px 16px', background: '#e6f4ff', borderRadius: 4 };

export default function Demo() {
  return (
    <Gap
      column={12}
      row={12}
      styles={{
        root: { padding: 16, background: '#fafafa', borderRadius: 8 },
        item: { flex: '0 0 auto' },
      }}
    >
      <div style={item}>Item 1</div>
      <div style={item}>Item 2</div>
      <div style={item}>Item 3</div>
    </Gap>
  );
}
