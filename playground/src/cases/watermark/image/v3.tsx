import { Watermark } from 'shineout-v3';

const image =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='72' height='48'><rect width='72' height='48' rx='6' fill='#9ec5fe'/><circle cx='36' cy='24' r='12' fill='#0d6efd'/></svg>",
  );

export default function Demo() {
  return (
    <Watermark image={image} content='Shineout' width={72} height={48} font={{ color: 'rgba(153, 157, 168, 0.55)' }}>
      <div
        style={{
          boxSizing: 'border-box',
          height: 240,
          padding: 24,
          background: '#f2f3f5',
          color: '#666',
        }}
      >
        Image watermark
      </div>
    </Watermark>
  );
}
