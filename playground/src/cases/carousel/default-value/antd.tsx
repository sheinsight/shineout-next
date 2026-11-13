import { Carousel } from 'antd';
import { images, SIZE, Slide } from '../_shared/slides';

const label = { position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '4px 8px', borderRadius: 4 } as const;

// antd 用 initialSlide 设置起始索引
export default function Demo() {
  return (
    <div style={SIZE}>
      <Carousel arrows initialSlide={2}>
        {images.map((src, index) => (
          <div key={src} style={{ position: 'relative', height: 280 }}>
            <Slide src={src} />
            <div style={label}>Image {index + 1}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
