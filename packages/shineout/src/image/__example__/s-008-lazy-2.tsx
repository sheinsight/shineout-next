/**
 * cn -
 *    -- 通过配置 `container` 对指定容器下的 Image 进行懒加载
 * en -
 *    -- Set `container` to lazy load Image in the specified container.
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  const images = [
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
      target: '_modal',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
      target: '_blank',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
      target: '_self',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
      target: '_download',
    },
  ];
  return (
    <div id='image-container' style={{ width: '100%', height: 300, overflow: 'auto' }}>
      {images.map((item, index) => {
        return (
          <Image
            key={index}
            lazy
            container='#image-container'
            fit='fill'
            width='100%'
            height='100%'
            src={item.src}
          ></Image>
        );
      })}
    </div>
  );
};
