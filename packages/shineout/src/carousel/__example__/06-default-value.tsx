/**
 * cn - 设置初始位置
 *    -- 使用 `defaultValue` 设置轮播的起始索引，使用 `onChange` 监听索引变化
 * en - Set Initial Position
 *    -- Use `defaultValue` to set the initial carousel index, use `onChange` to listen for index changes
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
  const handleChange = (index: number) => {
    console.log('Current index:', index);
  };

  return (
    <Carousel
      style={{ width: 600, height: 280 }}
      showArrow={'hover'}
      defaultValue={2}
      onChange={handleChange}
    >
      {images.map((src, index) => (
        <div key={src} style={{ position: 'relative' }}>
          <img src={src} />
          <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '4px 8px', borderRadius: 4 }}>
            Image {index + 1}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default App;
