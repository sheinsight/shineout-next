import React from 'react';
import { Button as UnStyledButton } from '@sheinx/base';
import { useButtonStyle, useSpinStyle } from '@sheinx/shineout-style';
import { ButtonProps } from './button.type';

const jssStyle = {
  button: useButtonStyle,
  spin: useSpinStyle,
};
const Button = (props: ButtonProps) => {
  return <UnStyledButton {...props} jssStyle={jssStyle}></UnStyledButton>;
};

Button.displayName = 'ShineoutButton';

export default Button;
