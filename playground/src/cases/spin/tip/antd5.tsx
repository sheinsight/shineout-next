import { Spin } from 'antd-v5';

export default function Demo() {
  return (
    <div style={{ width: 200 }}>
      <Spin tip={<div style={{ fontSize: 14 }}>This may take a while...</div>}>
        <div style={{ height: 60 }} />
      </Spin>
    </div>
  );
}
