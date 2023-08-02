/**
 * cn - 基本用法
 *    --基础 Image 用法
 * en - Base
 *    --Base Image
 */

import React from 'react';
import { Image } from '@sheinx/base';
import { useImageStyle } from '@sheinx/shineout-style';

export default () => {
  const imageStyle = useImageStyle();
  const jssStyle = {
    image: imageStyle,
  };
  const Images = [
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
    // 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
    // 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
    // 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
    // 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-05.png',
  ];
  return (
    <div id='ddd'>
      {Images.map((img, idx) => {
        return (
          <Image
            key={idx}
            target='_modal'
            fit='fill'
            width={128}
            height={128}
            jssStyle={jssStyle}
            src={img}
            href={img}
          ></Image>
        );
      })}
    </div>
  );
};
