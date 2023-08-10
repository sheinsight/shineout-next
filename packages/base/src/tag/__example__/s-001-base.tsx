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

  const colors = [
    'default',
    'success',
    'warning',
    'danger',
    'info',
    'purple',
    'neon',
    'cyan',
    'indigo',
    'lemon',
    'magenta',
    'tangerine',
  ];
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {colors.map((item, idx) => {
        return (
          <Tag jssStyle={jssStyle} key={idx} color={item} mode='fill'>
            {item}
          </Tag>
        );
      })}
    </div>
  );
};
