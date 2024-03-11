/**
 * cn - 自定义图片
 *    -- 设置`imgSrc`参数传入图片的Url
 * en - Custom image
 *    -- Set the `imgSrc` parameter to the Url of the image
 */
import React from 'react';
import { Empty, Button } from 'shineout';

export default () => {
  const renderDescription = () => {
    return <Button type='primary'>Refresh</Button>;
  };
  return (
    <Empty
      imgSrc='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      description={renderDescription()}
    ></Empty>
  );
};
