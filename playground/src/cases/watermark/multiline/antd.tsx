import { Watermark } from 'antd';

export default function Demo() {
  return (
    <Watermark
      font={{ color: 'rgba(153, 157, 168, 0.55)' }}
      content={[
        { text: 'Shineout', font: { fontSize: 18 } },
        { text: 'Watermark', font: { color: 'rgba(206, 32, 41, 0.55)', fontSize: 12, fontWeight: 600 } },
      ]}
    >
      <div
        style={{
          boxSizing: 'border-box',
          height: 240,
          padding: 24,
          background: '#f2f3f5',
          color: '#666',
        }}
      >
        Multi-line watermark
      </div>
    </Watermark>
  );
}
