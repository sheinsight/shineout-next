/**
 * cn - 基本用法
 *    -- 最基本的使用
 * en - Base
 *    -- The basic usage
 */
import React from 'react';
import { Carousel } from 'shineout';

const images = [
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
];
const App: React.FC = () => {
  return (
    <Carousel
      style={{ width: 600, height: 280 }}
      showArrow={'hover'}
      interval={5000}
      onMove={console.log}
    >
      {images.map((src) => (
        <img key={src} src={src} />
      ))}
    </Carousel>
  );
};

export default App;
