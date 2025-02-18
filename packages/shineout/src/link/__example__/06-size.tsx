/**
* cn - 不同尺寸
*    -- 链接分为小、中、大，三种尺寸，推荐及默认为尺寸「中」，可在不同场景及不同业务需求选择适合尺寸。
* en - Size
*    -- Link has three sizes: small, default, and large. The default size is recommended. You can choose the appropriate size according to different scenarios and business needs.
 */
import React from 'react';
import { Gap, Link } from 'shineout';

export default () => {
  return (
    <div>
      <Gap column={24}>
        <Link size="small" href="#" type="primary">Link</Link>
        <Link size="small" href="#" type="secondary">Link</Link>
        <Link size="small" href="#" type="danger">Link</Link>
        <Link size="small" href="#" type="warning">Link</Link>
        <Link size="small" href="#" type="success">Link</Link>
      </Gap>

      <br />

      <Gap column={24}>
        <Link href="#" type="primary">Link</Link>
        <Link href="#" type="secondary">Link</Link>
        <Link href="#" type="danger">Link</Link>
        <Link href="#" type="warning">Link</Link>
        <Link href="#" type="success">Link</Link>
      </Gap>

      <br />

      <Gap column={24}>
        <Link size="large" href="#" type="primary">Link</Link>
        <Link size="large" href="#" type="secondary">Link</Link>
        <Link size="large" href="#" type="danger">Link</Link>
        <Link size="large" href="#" type="warning">Link</Link>
        <Link size="large" href="#" type="success">Link</Link>
      </Gap>
    </div>
  );
};
