/**
 * cn - 基本用法
 *    --基础 Tag 用法
 * en - Base
 *    --Base Tag
 */

import React from 'react';
import { Tag } from '@sheinx/base';
import { useTagStyle } from '@sheinx/shineout-style';

export default () => {
  const tagStyle = useTagStyle();
  console.log(tagStyle);
  const jssStyle = {
    tag: tagStyle,
  };
  return (
    <div>
      <Tag jssStyle={jssStyle}></Tag>
    </div>
  );
};
