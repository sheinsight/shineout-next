import { Carousel } from 'shineout-v3';
import { images, SIZE, Slide } from '../_shared/slides';

const label = { position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '4px 8px', borderRadius: 4 } as const;

export default function Demo() {
  return (
    <Carousel style={SIZE} showArrow='hover' defaultValue={2}>
      {images.map((src, index) => (
        <div key={src} style={{ position: 'relative' }}>
          <Slide src={src} />
          <div style={label}>Image {index + 1}</div>
        </div>
      ))}
    </Carousel>
  );
}
