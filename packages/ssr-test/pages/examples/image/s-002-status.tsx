/**
 * cn - 不同状态
 *    -- 图片在加载过程中，会有不同的状态。不同状态下的 Image 展现形式不同
 * en - Status
 *    -- Image has different status when loading
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
        target='_modal'
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
        href='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
      <Image fit='fill' width={128} height={128} src='error'></Image>
    </div>
  );
};
