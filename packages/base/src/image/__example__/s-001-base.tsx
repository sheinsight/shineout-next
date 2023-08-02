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
  return (
    // <ImageGroup jssStyle={jssStyle} width={128} shape='thumbnail' height={128} showCount pile lazy>
    //   <Image
    //     fit='fill'
    //     jssStyle={jssStyle}
    //     src='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/1_b.jpg'
    //     href='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/1_b.jpg'
    //   ></Image>
    //   <Image
    //     fit='fill'
    //     jssStyle={jssStyle}
    //     src='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/2_b.jpg'
    //     href='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/2_b.jpg'
    //   ></Image>
    //   <Image
    //     fit='fill'
    //     jssStyle={jssStyle}
    //     src='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/3_b.jpg'
    //     href='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/3_b.jpg'
    //   ></Image>
    //   <Image
    //     fit='fill'
    //     jssStyle={jssStyle}
    //     src='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/4_b.jpg'
    //     href='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/4_b.jpg'
    //   ></Image>
    // </ImageGroup>
    <div>
      <Image
        lazy
        fit='fill'
        width={600}
        height={400}
        jssStyle={jssStyle}
        src='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/1_b.jpg'
        href='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/1_b.jpg'
      ></Image>
      <Image
        lazy
        fit='fill'
        width={600}
        height={400}
        jssStyle={jssStyle}
        src='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/2_b.jpg'
        href='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/2_b.jpg'
      ></Image>
      <Image
        lazy
        fit='fill'
        width={600}
        height={400}
        jssStyle={jssStyle}
        src='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/3_b.jpg'
        href='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/3_b.jpg'
      ></Image>
      <Image
        lazy
        fit='fill'
        width={600}
        height={400}
        jssStyle={jssStyle}
        src='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/4_b.jpg'
        href='https://raw.githubusercontent.com/sheinsight/shineout/master/site/images/4_b.jpg'
      ></Image>
    </div>
  );
};
