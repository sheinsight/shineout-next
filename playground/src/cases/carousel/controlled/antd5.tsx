import { useRef, useState } from 'react';
import { Button, Carousel } from 'antd-v5';
import { images, SIZE, Slide } from '../_shared/slides';

// antd 的 Carousel 没有受控的 value，用 ref.goTo 切换、afterChange 同步当前索引
export default function Demo() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<any>(null);
  const goTo = (n: number) => {
    ref.current?.goTo(n);
    setCurrent(n);
  };
  const prev = () => goTo(current === 0 ? images.length - 1 : current - 1);
  const next = () => goTo(current === images.length - 1 ? 0 : current + 1);
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Current: {current + 1} / {images.length}</span>
        <Button size='small' onClick={() => goTo(0)}>First</Button>
        <Button size='small' onClick={prev} style={{ marginLeft: 8 }}>Prev</Button>
        <Button size='small' onClick={next} style={{ marginLeft: 8 }}>Next</Button>
        <Button size='small' onClick={() => goTo(images.length - 1)} style={{ marginLeft: 8 }}>Last</Button>
      </div>
      <div style={SIZE}>
        <Carousel ref={ref} arrows autoplay autoplaySpeed={3000} afterChange={setCurrent}>
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
