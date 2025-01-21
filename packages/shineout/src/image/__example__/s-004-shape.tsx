/**
 * cn - 图片形状
 *    -- Image 可以设置不同的形状
 *    -- 内置三种不同的形状：圆角模式 rounded、圆形模式 circle、带边框模式 thumbnail
 * en - Shape
 *    -- Image can be set to different shapes
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
      }}
    >
      <Image
        shape='rounded'
        fit='fill'
        width={128}
        height={128}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
      <Image
        shape='circle'
        fit='fill'
        width={128}
        height={128}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
      <Image
        shape='thumbnail'
        fit='fill'
        width={128}
        height={128}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
    </div>
  );
};
