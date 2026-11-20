import { Carousel } from 'antd';
import { images, SIZE, Slide } from '../_shared/slides';

// antd 的箭头（arrows）没有「悬浮才显示」的选项，这里始终显示；自动播放 autoplaySpeed 对应 interval
export default function Demo() {
  return (
    <div style={SIZE}>
      <Carousel arrows autoplay autoplaySpeed={5000}>
        {images.map((src) => (
          <div key={src} style={{ height: 280 }}>
            <Slide src={src} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
