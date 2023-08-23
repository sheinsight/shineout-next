/**
 * cn - 填充方式
 *    -- Image 四种不同的图片填充方式：
 *    -- fill 填充整个容器、center 剧中、fit 原图、stretch 拉伸。
 * en - Fit
 *    -- Image has four different fill modes:
 *    -- fill, center, fit, stretch.
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
        fit='fill'
        width={128}
        height={128}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
      <Image
        fit='center'
        width={128}
        height={128}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
      <Image
        fit='fit'
        width={128}
        height={128}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
      <Image
        fit='stretch'
        width={128}
        height={128}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
    </div>
  );
};
