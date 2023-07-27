/**
 * cn - 基本用法
 *    --基础 Button 用法
 * en - Base
 *    --Base Button
 */

import React from 'react';
import { Button } from '@sheinx/base';
import { useButtonGroupStyle, useButtonStyle } from '@sheinx/shineout-style';
// import Icon from '../../icons';

export default () => {
  const buttonStyle = useButtonStyle();
  const buttonGroupStyle = useButtonGroupStyle();
  const jssStyle = {
    button: buttonStyle,
    buttonGroup: buttonGroupStyle,
  };

  return (
    <div>
      <Button.Group jssStyle={jssStyle} type='secondary'>
        <Button jssStyle={jssStyle}>123</Button>
        <Button jssStyle={jssStyle}>123</Button>
        <Button jssStyle={jssStyle}>123</Button>
        <Button jssStyle={jssStyle}>123</Button>
      </Button.Group>
    </div>
  );
};
