import { Input } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <Input size='small' width={240} placeholder='small size' clearable />
      <Input width={240} placeholder='default size' clearable />
      <Input size='large' width={240} placeholder='large size' clearable />
    </div>
  );
}
