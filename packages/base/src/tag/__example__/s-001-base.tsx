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

  const jssStyle = {
    tag: tagStyle,
  };
  return (
    <div>
      <Tag jssStyle={jssStyle} type='info'>
        123213
      </Tag>
      <Tag jssStyle={jssStyle} type='secondary'>
        123213
      </Tag>
      <Tag jssStyle={jssStyle} type='success'>
        123213
      </Tag>
      <Tag jssStyle={jssStyle} type='warning'>
        123213
      </Tag>
      <Tag jssStyle={jssStyle} type='danger'>
        123213
      </Tag>
      <br />
      <br />
      <Tag jssStyle={jssStyle} type='info' disabled>
        123213
      </Tag>
      <Tag jssStyle={jssStyle} type='secondary' disabled>
        123213
      </Tag>
      <Tag jssStyle={jssStyle} type='success' disabled>
        123213
      </Tag>
      <Tag jssStyle={jssStyle} type='warning' disabled>
        123213
      </Tag>
      <Tag jssStyle={jssStyle} type='danger' disabled>
        123213
      </Tag>
    </div>
  );
};
