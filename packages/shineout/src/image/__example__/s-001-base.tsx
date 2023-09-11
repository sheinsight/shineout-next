/**
 * cn - 基本用法
 *    --基础 Image 用法
 * en - Base
 *    --Base Image
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  return (
    <div>
      <Image
        fit='fill'
        width={128}
        height={128}
        target='_modal'
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
        href='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
    </div>
  );
};
