import { useState } from 'react';
import { Carousel, Radio } from 'antd';
import { images, SIZE, Slide } from '../_shared/slides';

// antd 的切换效果只有 scrollx（横向滑动）和 fade；纵向滑动要用 vertical，对应 Shineout 的 slide-y
export default function Demo() {
  const [animation, setAnimation] = useState<'slide' | 'slide-y' | 'fade'>('slide');
  return (
    <div>
      <div style={{ display: 'flex', marginBottom: 16, alignItems: 'center' }}>
        <div style={{ width: 150 }}>animation type:</div>
        <Radio.Group
          value={animation}
          options={['slide', 'slide-y', 'fade']}
          onChange={(e: any) => setAnimation(e.target.value)}
        />
      </div>
      <div style={SIZE}>
        <Carousel
          key={animation}
          autoplay
          autoplaySpeed={3000}
          effect={animation === 'fade' ? 'fade' : 'scrollx'}
          vertical={animation === 'slide-y'}
        >
          {images.map((src) => (
            <div key={src} style={{ height: 280 }}>
              <Slide src={src} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
