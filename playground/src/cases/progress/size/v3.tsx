import { Progress } from 'shineout-v3';

export default function Demo() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Progress style={{ width: 400 }} strokeWidth={3} value={75}>
          <span style={{ fontSize: 12 }}>75%</span>
        </Progress>
        <Progress shape='circle' size={48} strokeWidth={4} value={60} style={{ marginTop: 24 }}>
          <span style={{ fontSize: 12 }}>60%</span>
        </Progress>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Progress style={{ width: 400 }} value={75}>
          <span>75%</span>
        </Progress>
        <Progress shape='circle' size={64} strokeWidth={4} value={60} style={{ marginTop: 24 }}>
          <span>60%</span>
        </Progress>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Progress style={{ width: 400 }} strokeWidth={8} value={75}>
          <span style={{ fontSize: 16 }}>75%</span>
        </Progress>
        <Progress shape='circle' size={80} strokeWidth={4} value={60} style={{ marginTop: 24 }}>
          <span style={{ fontSize: 16 }}>60%</span>
        </Progress>
      </div>
    </div>
  );
}
