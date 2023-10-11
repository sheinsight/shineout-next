/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { useEmptyStyle } from '@sheinx/shineout-style';
import { Empty } from '@sheinx/base';

export default () => {
  return <Empty jssStyle={{ empty: useEmptyStyle }}></Empty>;
};
