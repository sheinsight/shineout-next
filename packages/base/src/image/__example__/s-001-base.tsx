/**
 * cn - 基本用法
 *    --基础 Image 用法
 * en - Base
 *    --Base Image
 */

import React from 'react';
import { Image, ImageGroup } from '@sheinx/base';
import { useImageStyle } from '@sheinx/shineout-style';

export default () => {
  const imageStyle = useImageStyle();

  const jssStyle = {
    image: imageStyle,
  };

  return (
    <ImageGroup jssStyle={jssStyle} width={128} shape='thumbnail' height={128} showCount pile>
      <Image
        fit='fill'
        jssStyle={jssStyle}
        src='https://github.com/sheinsight/shineout/blob/master/site/images/1_b.jpg?raw=true'
        href='https://github.com/sheinsight/shineout/blob/master/site/images/1_b.jpg?raw=true'
      ></Image>
      <Image
        fit='fill'
        jssStyle={jssStyle}
        src='https://github.com/sheinsight/shineout/blob/master/site/images/2_b.jpg?raw=true'
        href='https://github.com/sheinsight/shineout/blob/master/site/images/2_b.jpg?raw=true'
      ></Image>
      <Image
        fit='fill'
        jssStyle={jssStyle}
        src='https://github.com/sheinsight/shineout/blob/master/site/images/3_b.jpg?raw=true'
        href='https://github.com/sheinsight/shineout/blob/master/site/images/3_b.jpg?raw=true'
      ></Image>
      <Image
        fit='fill'
        jssStyle={jssStyle}
        src='https://github.com/sheinsight/shineout/blob/master/site/images/4_b.jpg?raw=true'
        href='https://github.com/sheinsight/shineout/blob/master/site/images/4_b.jpg?raw=true'
      ></Image>
    </ImageGroup>
  );
};
