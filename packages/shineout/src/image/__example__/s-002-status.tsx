/**
 * cn - 不同状态
 *    -- 图片在加载过程中，会有不同的状态。不同状态下的 Image 展现形式不同
 * en - Status
 *    -- Image has different status when loading
 */

import React from 'react';
import { Image, Button } from 'shineout';

export default () => {
  const [key, setKey] = React.useState(0);
  return (
    <>
      <Button
        onClick={() => {
          setKey(key + 1);
        }}
        style={{marginBottom: 12}}
      >
        reload
      </Button>
      <div
        key={key}
        style={{
          gap: 8,
          display: 'flex',
        }}
      >
        <Image
          fit='fill'
          width={128}
          height={128}
          target='_modal'
          src={`https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png?v=${key}`}
          href={`https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png?v=${key}`}
        />
        <Image fit='fill' width={128} height={128} src='error' />
      </div>
    </>
  );
};
