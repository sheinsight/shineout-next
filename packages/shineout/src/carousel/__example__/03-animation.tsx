/**
 * cn - 切换方向
 *    -- 轮播组件提供了三种动画过渡方式，可以切换选项查看效果
 * en - Animation
 *    -- The carousel component provides three animation transition modes, you can switch options to see the effect
 */
import React, { useState } from 'react';
import { Carousel, Radio, TYPE } from 'shineout';

type CarouselProps = TYPE.Carousel.Props;

const images = [
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
];
const App: React.FC = () => {
  const [animationType, setAnimation] = useState<CarouselProps['animation']>('slide');

  const rowStyle = { display: 'flex', marginBottom: 16, alignItems: 'center' };
  return (
    <div>
      <div style={rowStyle}>
        <div style={{ width: 150 }}>animation type:</div>
        <Radio.Group
          keygen
          value={animationType}
          data={['slide', 'slide-y', 'fade']}
          onChange={(v) => setAnimation(v)}
        />
      </div>

      <Carousel style={{ width: 600, height: 280 }} interval={3000} animation={animationType}>
        {images.map((src) => (
          <img key={src} src={src} />
        ))}
      </Carousel>
    </div>
  );
};

export default App;
