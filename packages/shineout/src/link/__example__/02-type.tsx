/**
* cn - 链接状态
*    -- 设置`type`属性可以改变链接的状态，包括 primary, secondary, danger, warning, success。
* en - Link type
*    -- Set the `type` property to change the style of the link, including primary, secondary, danger, warning, success.
 */
import React from 'react';
import { Gap, Link } from 'shineout';

export default () => {
  return (
    <Gap column={24}>
      <Link href="#" type="primary">Link</Link>
      <Link href="#" type="secondary">Link</Link>
      <Link href="#" type="danger">Link</Link>
      <Link href="#" type="warning">Link</Link>
      <Link href="#" type="success">Link</Link>
    </Gap>
  );
};
