import { Watermark } from 'antd-v5';

export default function Demo() {
  return (
    <Watermark font={{ color: 'rgba(153, 157, 168, 0.55)' }} content={['Shineout', 'Watermark']}>
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
