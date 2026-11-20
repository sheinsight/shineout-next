import { Watermark } from 'shineout-v3';

export default function Demo() {
  return (
    <Watermark
      content='Shineout'
      width={112}
      height={28}
      gap={[72, 56]}
      offset={[16, 20]}
      rotate={-16}
      zIndex={20}
      font={{ color: 'rgba(153, 157, 168, 0.55)', fontSize: 14, fontWeight: 600 }}
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
        Custom watermark
      </div>
    </Watermark>
  );
}
