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
  const jssStyle = {
    image: useImageStyle,
  };
  return (
    <div id='ddd'>
      <Image
        error='啊哈！图片加载失败了！'
        fit='center'
        width={128}
        height={128}
        jssStyle={jssStyle}
        target='_download'
        href='static/image/s-01.png'
        src='static/image/s-01.png'
        onClick={(e) => console.log(e)}
      ></Image>
    </div>
  );
};
