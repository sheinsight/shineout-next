import { Watermark } from 'shineout-v3';

export default function Demo() {
  return (
    <Watermark content='Shineout' font={{ color: 'rgba(153, 157, 168, 0.55)' }}>
      <div
        style={{
          boxSizing: 'border-box',
          height: 240,
          padding: 24,
          background: '#f2f3f5',
          color: '#666',
        }}
      >
        Basic watermark
      </div>
    </Watermark>
  );
}
