/**
* cn - 动画
*    -- 设置 `animation` 为true，开启动画效果
* en - animation
*    -- Set `animation` to true to enable animation
 */
import React from 'react';
import { Skeleton, Switch } from 'shineout';

export default () => {
  const [animation, setAnimation] = React.useState(true);
  return (
    <>
      <Switch value={animation} onChange={setAnimation} style={{ marginBottom: 24 }} />
      <Skeleton loading animation={animation} text={{ rows: 5, width: '70%' }} image button={{ count: 2 }}>
        <div>
          I am the content after loading. I am the content after loading. I am the content after loading.
        </div>
      </Skeleton>
    </>
  );
};
