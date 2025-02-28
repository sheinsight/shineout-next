/**
 * cn - 指示器
 *    -- 可以指定指示器类型和位置
 * en - Indicator
 *    -- You can set indicator type and position
 */
import React, { useState } from 'react';
import { Carousel, Radio, TYPE } from 'shineout';

type CarouselProps = TYPE.Carousel.Props;
type CarouselIndicatorType = CarouselProps['indicatorType'];
type CarouselIndicatorPosition = CarouselProps['indicatorPosition'];

const images = [
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
];
const App: React.FC = () => {
  const [indicatorType, setIndicatorType] = useState<CarouselIndicatorType>('circle');
  const [indicatorPosition, setIndicatorPosition] = useState<CarouselIndicatorPosition>('center');

  const rowStyle = { display: 'flex', marginBottom: 16, alignItems: 'center' };
  return (
    <div>
      <div style={rowStyle}>
        <div style={{ width: 150 }}>indicator position:</div>
        <Radio.Group
          keygen
          value={indicatorPosition}
          data={['left', 'center', 'right', 'outer']}
          onChange={(v) => setIndicatorPosition(v)}
        />
      </div>
      <div style={rowStyle}>
        <div style={{ width: 150 }}>indicator type:</div>
        <Radio.Group
          keygen
          value={indicatorType}
          data={['circle', 'line', 'bar', 'number']}
          onChange={(v) => setIndicatorType(v)}
        />
      </div>

      <Carousel
        style={{ width: 600, height: 280 }}
        indicatorPosition={indicatorPosition}
        indicatorType={indicatorType}
        interval={3000}
      >
        {images.map((src) => (
          <img key={src} src={src} />
        ))}
      </Carousel>
    </div>
  );
};

export default App;
