/**
 * cn - 外部控制轮播
 *    -- 使用 `value` 和 `onChange` 属性从外部控制轮播的当前索引，配合按钮可实现自定义切换逻辑
 * en - External Control
 *    -- Use `value` and `onChange` to control the carousel index externally, works with buttons for custom switching logic
 */
import React, { useState } from 'react';
import { Carousel, Button } from 'shineout';

const images = [
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
];

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Current: {current + 1} / {images.length}</span>
        <Button size="small" onClick={() => setCurrent(0)}>First</Button>
        <Button size="small" onClick={handlePrev} style={{ marginLeft: 8 }}>Prev</Button>
        <Button size="small" onClick={handleNext} style={{ marginLeft: 8 }}>Next</Button>
        <Button size="small" onClick={() => setCurrent(images.length - 1)} style={{ marginLeft: 8 }}>Last</Button>
      </div>
      <Carousel
        style={{ width: 600, height: 280 }}
        showArrow={'hover'}
        value={current}
        onChange={setCurrent}
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
