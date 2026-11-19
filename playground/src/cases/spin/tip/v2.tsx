import { Spin } from 'shineout-v2';

export default function Demo() {
  return (
    <div style={{ width: 200 }}>
      <Spin name='ring' size={24} tip={<div style={{ fontSize: 14 }}>This may take a while...</div>} />
    </div>
  );
}
