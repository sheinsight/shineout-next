/**
 * cn - 填充方式
 *    -- Image 四种不同的图片填充方式：
 *    -- fill 填充整个容器、center 居中、fit 原图、stretch 拉伸
 * en - Fit
 *    -- Image has four different fill modes:
 *    -- fill, center, fit, stretch
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  const fit = ['fill', 'center', 'fit', 'stretch'];

  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
      }}
    >
      {fit.map((item, index) => {
        return (
          <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            <Image
              fit={item as any}
              width={128}
              height={128}
              src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
            ></Image>
            <div style={{ textAlign: 'center', color: '#141737', fontSize: 12, marginTop: 5 }}>
              {item}
            </div>
          </div>
        );
      })}
    </div>
  );
};
