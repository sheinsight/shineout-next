/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { List } from '@sheinx/base';
import { useListStyle } from '@sheinx/shineout-style';

const jssStyle = {
  list: useListStyle,
};

export default () => {
  return (
    <div>
      <List jssStyle={jssStyle} />
    </div>
  );
};
