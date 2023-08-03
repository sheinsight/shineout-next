/**
 * cn -
 *    -- Image 支持一组图片的展示。
 * en -
 *    -- Image supports a group of images.
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  const images = [
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-05.png',
  ];
  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
      }}
    >
      <Image.Group fit='fill' target='_modal'>
        {images.map((item, index) => {
          return <Image key={index} width={128} height={128} src={item} href={item}></Image>;
        })}
      </Image.Group>
    </div>
  );
};
