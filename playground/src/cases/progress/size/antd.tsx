import { Progress } from 'antd';

export default function Demo() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Progress style={{ width: 400 }} strokeWidth={3} percent={75} format={(p) => <span style={{ fontSize: 12 }}>{p}%</span>} />
        <div style={{ marginTop: 24 }}>
          <Progress type='circle' size={48} strokeWidth={8.33} percent={60} format={(p) => <span style={{ fontSize: 12 }}>{p}%</span>} />
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Progress style={{ width: 400 }} percent={75} format={(p) => <span>{p}%</span>} />
        <div style={{ marginTop: 24 }}>
          <Progress type='circle' size={64} strokeWidth={6.25} percent={60} format={(p) => <span>{p}%</span>} />
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Progress style={{ width: 400 }} strokeWidth={8} percent={75} format={(p) => <span style={{ fontSize: 16 }}>{p}%</span>} />
        <div style={{ marginTop: 24 }}>
          <Progress type='circle' size={80} strokeWidth={5.0} percent={60} format={(p) => <span style={{ fontSize: 16 }}>{p}%</span>} />
        </div>
      </div>
    </div>
  );
}
