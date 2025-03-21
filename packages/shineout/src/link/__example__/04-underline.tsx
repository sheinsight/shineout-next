/**
* cn - 链接样式
*    -- 链接样式包含三种，无下划线、常驻下划线、鼠标悬停显示下划线。
* en - Link style
*    -- Link style includes two types, text link and underline link.
 */
import React from 'react';
import { Gap, Link } from 'shineout';

export default () => {
  return (
    <div>
      <Gap column={24}>
        <Link href="#">Link</Link>
        <Link href="#" underline>Link</Link>
        <Link href="#" underline="hover">Link</Link>
      </Gap>

      {/* <br />

      <Gap column={36}>
        <Link type="secondary" href="#">Link</Link>
        <Link type="secondary" href="#" underline>Link</Link>
        <Link type="secondary" href="#" underline="hover">Link</Link>
      </Gap>

      <br />

      <Gap column={36}>
        <Link type="danger" href="#">Link</Link>
        <Link type="danger" href="#" underline>Link</Link>
        <Link type="danger" href="#" underline="hover">Link</Link>
      </Gap>

      <br />

      <Gap column={36}>
        <Link type='warning' href="#">Link</Link>
        <Link type='warning' href="#" underline>Link</Link>
        <Link type='warning' href="#" underline="hover">Link</Link>
      </Gap>

      <br />

      <Gap column={36}>
        <Link type="success" href="#">Link</Link>
        <Link type="success" href="#" underline>Link</Link>
        <Link type="success" href="#" underline="hover">Link</Link>
      </Gap> */}
    </div>
  );
};
