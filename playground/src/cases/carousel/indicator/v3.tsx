import { useState } from 'react';
import { Carousel, Radio } from 'shineout-v3';
import { images, SIZE, Slide } from '../_shared/slides';

const row = { display: 'flex', marginBottom: 16, alignItems: 'center' } as const;

export default function Demo() {
  const [position, setPosition] = useState<any>('center');
  const [type, setType] = useState<any>('circle');
  return (
    <div>
      <div style={row}>
        <div style={{ width: 150 }}>indicator position:</div>
        <Radio.Group keygen value={position} data={["left", "center", "right", "outer"]} onChange={(v: any) => setPosition(v)} />
      </div>
      <div style={row}>
        <div style={{ width: 150 }}>indicator type:</div>
        <Radio.Group keygen value={type} data={["circle", "line", "bar", "number"]} onChange={(v: any) => setType(v)} />
      </div>
      <Carousel style={SIZE} indicatorPosition={position} indicatorType={type} interval={3000}>
        {images.map((src) => (
          <Slide key={src} src={src} />
        ))}
      </Carousel>
    </div>
  );
}
