import { Spin } from 'antd';

export default function Demo() {
  return (
    <div style={{ width: 200 }}>
      <Spin description={<div style={{ fontSize: 14 }}>This may take a while...</div>} />
    </div>
  );
}
