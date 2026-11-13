import { useState } from 'react';
import { Carousel, Radio } from 'shineout-v3';
import { images, SIZE, Slide } from '../_shared/slides';

export default function Demo() {
  const [animation, setAnimation] = useState<any>('slide');
  return (
    <div>
      <div style={{ display: 'flex', marginBottom: 16, alignItems: 'center' }}>
        <div style={{ width: 150 }}>animation type:</div>
        <Radio.Group keygen value={animation} data={['slide', 'slide-y', 'fade']} onChange={(v: any) => setAnimation(v)} />
      </div>
      <Carousel style={SIZE} interval={3000} animation={animation}>
        {images.map((src) => (
          <Slide key={src} src={src} />
        ))}
      </Carousel>
    </div>
  );
}
