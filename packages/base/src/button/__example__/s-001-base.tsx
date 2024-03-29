/**
 * cn - 基本用法
 *    --基础 Button 用法
 * en - Base
 *    --Base Button
 */

import React from 'react';
import { Button } from '@sheinx/base';
import { useButtonStyle, useSpinStyle } from '@sheinx/shineout-style';
// import Icon from '../../icons';

export default () => {
  const jssStyle = {
    button: useButtonStyle,
    spin: useSpinStyle,
  };

  return (
    <div>
      <Button size='large' jssStyle={jssStyle} loading type='primary'>
        123
      </Button>
    </div>
  );
};
