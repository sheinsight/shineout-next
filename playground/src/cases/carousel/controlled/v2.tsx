import { useState } from 'react';
import { Button, Carousel } from 'shineout-v2';
import { images, SIZE, Slide } from '../_shared/slides';

export default function Demo() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const next = () => setCurrent(current === images.length - 1 ? 0 : current + 1);
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Current: {current + 1} / {images.length}</span>
        <Button size='small' onClick={() => setCurrent(0)}>First</Button>
        <Button size='small' onClick={prev} style={{ marginLeft: 8 }}>Prev</Button>
        <Button size='small' onClick={next} style={{ marginLeft: 8 }}>Next</Button>
        <Button size='small' onClick={() => setCurrent(images.length - 1)} style={{ marginLeft: 8 }}>Last</Button>
      </div>
      <Carousel style={SIZE} showArrow='hover'  interval={3000}>
        {images.map((src) => (
          <Slide key={src} src={src} />
        ))}
      </Carousel>
    </div>
  );
}
