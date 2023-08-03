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
        width={256}
        height={128}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
    </div>
  );
};
