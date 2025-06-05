/**
* cn - 不同元素
*    -- 配置不同的 `text`，`image` 和 `button` 属性来渲染不同的元素
* en - Different elements
*    -- Configure different `text`, `image` and `button` properties to render different elements
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
      <p style={{marginBottom: 16}}>文本</p>
      <Skeleton loading text={{ rows: 1 }}>I am the content after loading. </Skeleton>

      <p style={style}>段落</p>
      <Skeleton loading text={{ rows: 3, width: '70%' }}>I am the content after loading. </Skeleton>

      <p style={style}>头像</p>
      <Skeleton loading text={false} image={{ size: 'large' }}>I am the content after loading. </Skeleton>

      <p style={style}>图片</p>
      <Skeleton loading text={false} image={{ shape: 'square', size: 'large' }}>I am the content after loading. </Skeleton>

      <p style={style}>按钮</p>
      <Skeleton loading text={false} button>I am the content after loading. </Skeleton>
    </div>
  );
};
