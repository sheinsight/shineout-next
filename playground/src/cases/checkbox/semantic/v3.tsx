import { Checkbox } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Checkbox
        htmlValue='single'
        styles={{
          root: { padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: 6 },
          indicator: { borderRadius: 4 },
          label: { fontWeight: 500, color: '#1890ff' },
        }}
      >
        Styled Checkbox
      </Checkbox>

      <Checkbox.Group
        keygen
        data={['Apple', 'Banana', 'Orange']}
        defaultValue={['Apple']}
        styles={{
          group: { gap: 16, padding: 12, background: '#fafafa', borderRadius: 8 },
          root: { padding: '4px 8px' },
          indicator: { borderRadius: '50%' },
        }}
      />
    </div>
  );
}
