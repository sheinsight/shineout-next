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
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-05.png',
  ];
  return (
    <div id='ddd'>
      <Image.Group jssStyle={jssStyle} target='_blank' fit='center'>
        {Images.map((img, idx) => {
          return (
            <Image
              key={idx}
              error='啊哈！图片加载失败了！'
              fit={idx === 2 ? 'fill' : 'center'}
              width={128}
              height={128}
              jssStyle={jssStyle}
              src={img}
              alt='123'
              title='备胎信息'
              href={img}
              onClick={(e) => console.log(e)}
            ></Image>
          );
        })}
      </Image.Group>
    </div>
  );
};
