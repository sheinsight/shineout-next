import { Checkbox } from 'antd';

// 节点对应：Checkbox 的 root / indicator / label ↔ antd 的 root / icon / label；
// Checkbox.Group 的 group ↔ antd Group 的 root，Group 里的 root / indicator ↔ item / itemIcon
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Checkbox
        styles={{
          root: { padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: 6 },
          icon: { borderRadius: 4 },
          label: { fontWeight: 500, color: '#1890ff' },
        }}
      >
        Styled Checkbox
      </Checkbox>

      <Checkbox.Group
        options={['Apple', 'Banana', 'Orange']}
        defaultValue={['Apple']}
        styles={{
          root: { gap: 16, padding: 12, background: '#fafafa', borderRadius: 8 },
          item: { padding: '4px 8px' },
          itemIcon: { borderRadius: '50%' },
        }}
      />
    </div>
  );
}
