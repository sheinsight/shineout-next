/**
* cn - 组合用法
*    -- 包含图片、文字、按钮、头像等多种元素组合在一起的占位效果
* en - Combination usage
*    -- A placeholder effect that combines multiple elements such as images, text, buttons, and avatars
 */
import React from 'react';
import { Skeleton } from 'shineout';

const style = {
  marginTop: 32,
  marginBottom: 16,
}

export default () => {
  return (
    <div>
      <p style={{marginBottom: 16}}>头像 + 文本</p>
      <Skeleton loading text={{rows: 5, width: '70%'}} image={{size: 'large'}} style={{marginBottom: 32}}>I am the content after loading. </Skeleton>
      <Skeleton loading text={{rows: 3, width: '70%'}} image={{size: 'large'}}>I am the content after loading. </Skeleton>

      <p style={style}>图片 + 文本 + 按钮</p>
      <Skeleton loading text={{rows: 5, width: '70%'}} image={{ shape: 'square', size: 'large' }} style={{marginBottom: 32}}>I am the content after loading. </Skeleton>
      <Skeleton loading text={{rows: 5, width: '70%'}} image={{ shape: 'square', size: 'large' }} button={{count: 2}}>I am the content after loading. </Skeleton>
    </div>
  );
};
