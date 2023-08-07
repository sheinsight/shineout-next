/**
 * cn - 打开方式
 *    -- Image 通过配置 `target` 属性实现四种打开方式：
 *    -- _modal 通过弹层打开预览、_blank 通过新窗口打开预览、_self 通过当前窗口打开预览、_download 下载图片。
 * en - Target
 *    -- Image has four open modes: _modal open preview through layer, _blank open preview through new window, _self open preview through current window, _download download image.
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  const images = [
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
      target: '_modal',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
      target: '_blank',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
      target: '_self',
    },
    {
      src: 'static/image/s-01.png',
      target: '_download',
    },
  ];
  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
      }}
    >
      {images.map((item, index) => {
        return (
          <div key={index}>
            <Image
              fit='fill'
              width={128}
              height={128}
              target={item.target as any}
              src={item.src}
              href={item.src}
            ></Image>
            <div style={{ fontSize: 12, textAlign: 'center' }}>{item.target}</div>
          </div>
        );
      })}
    </div>
  );
};
