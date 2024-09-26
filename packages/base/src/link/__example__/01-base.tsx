/**
* cn - 基本用法
*    --
* en - Basic
*    --
 */
import React from 'react';
import { Link } from '@sheinx/base';
import { useLinkStyle } from '@sheinx/shineout-style';

const jssStyle = {
  link: useLinkStyle
}

export default () => {
  return (
    <div>
      <Link jssStyle={jssStyle} />
    </div>
  );
};
