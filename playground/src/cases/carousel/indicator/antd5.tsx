import { useState } from 'react';
import { Carousel, Radio } from 'antd-v5';
import { images, SIZE, Slide } from '../_shared/slides';

const row = { display: 'flex', marginBottom: 16, alignItems: 'center' } as const;

// antd 的指示点只有位置（dotPosition / dotPlacement）可选，没有 line / bar / number 类型，也没有 outer 位置；
// 类型一栏只保留 circle，位置只列 antd 有的
export default function Demo() {
  const [position, setPosition] = useState<any>('bottom');
  return (
    <div>
      <div style={row}>
        <div style={{ width: 150 }}>indicator position:</div>
        <Radio.Group
          value={position}
          options={['top', 'bottom', 'start', 'end']}
          onChange={(e: any) => setPosition(e.target.value)}
        />
      </div>
      <div style={SIZE}>
        <Carousel dotPosition={position} autoplay autoplaySpeed={3000}>
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
