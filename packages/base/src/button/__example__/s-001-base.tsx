/**
 * cn - 基本用法
 *    --基础 Button 用法
 * en - Base
 *    --Base Button
 */

import React from 'react';
import { Button } from '@sheinx/base';
import { useButtonStyle, useButtonGroupStyle } from '@sheinx/shineout-style';
// import Icon from '../../icons';

export default () => {
  const jssStyle = useButtonStyle();
  const jssGroupStyle = useButtonGroupStyle();

  return (
    <div>
      <Button.Group jssStyle={jssGroupStyle} type='secondary'>
        <Button jssStyle={jssStyle}>123</Button>
        <Button jssStyle={jssStyle}>123</Button>
        <Button jssStyle={jssStyle}>123</Button>
        <Button jssStyle={jssStyle}>123</Button>
      </Button.Group>
    </div>
  );
};
