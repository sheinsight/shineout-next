import React, { useMemo } from 'react';
import { Button as UnStyledButton } from '@sheinx/base';
import { useButtonStyle } from '@sheinx/shineout-style';
import { ButtonProps } from './button.type';

const Button = (props: ButtonProps) => {
  const buttonStyle = useButtonStyle();
  const jssStyle = useMemo(() => ({ button: buttonStyle }), [buttonStyle]);
  return <UnStyledButton {...props} jssStyle={jssStyle}></UnStyledButton>;
};

Button.displayName = 'ShineoutButton';

export default Button;
