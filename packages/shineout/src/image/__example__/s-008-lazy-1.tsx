/**
 * cn - 懒加载
 *    -- Image 通过配置 `lazy` 属性开启懒加载模式
 * en - Lazy
 *    -- Image enables lazy loading mode by configuring the `lazy` property.
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
    <div>
      {images.map((item, index) => {
        return <Image key={index} lazy fit='fill' width={845} height={528} src={item.src}></Image>;
      })}
    </div>
  );
};
