/**
 * cn - 图片组
 *    -- Image 支持一组图片的展示
 *    -- 通过设置 `pile` 属性折叠图片，通过设置 `showCount` 展示图片数量
 *    -- 注意，showCount 属性仅在 pile 属性为 true 时生效。开启 pile 属性后，图片组将默认开启 _modal 模式预览
 * en - Group
 *    -- Image supports a group of images.
 *    -- Set the `pile` property to fold the images, and set the `showCount` property to show the number of images
 *    -- Note that the showCount property only takes effect when the pile property is true. After the pile property is turned on, the image group will default to preview in _modal mode
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
        gap: 16,
        width: '100%',
        display: 'flex',
      }}
    >
      <Image.Group fit='fill' target='_modal' pile lazy>
        {images.map((item, index) => {
          return <Image key={index} width={128} height={128} src={item} href={item}></Image>;
        })}
      </Image.Group>

      <Image.Group fit='fill' target='_modal' pile showCount lazy>
        {images.map((item, index) => {
          return <Image key={index} width={128} height={128} src={item} href={item}></Image>;
        })}
      </Image.Group>
    </div>
  );
};
