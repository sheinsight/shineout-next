/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Switch } from '@sheinx/base';
import { useSwitchStyle } from '@sheinx/shineout-style';

export default () => {
  const switchStyle = useSwitchStyle();
  return (
    <div>
      <Switch jssStyle={{ switch: switchStyle }} />
    </div>
  );
};
