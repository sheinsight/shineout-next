import React, { useMemo } from 'react';
import { Button as UnStyledButton } from '@sheinx/base';
import { useButtonStyle, useSpinStyle } from '@sheinx/shineout-style';
import { ButtonProps } from './button.type';

const Button = (props: ButtonProps) => {
  const buttonStyle = useButtonStyle();
  const spinStyle = useSpinStyle();
  const jssStyle = useMemo(
    () => ({ button: buttonStyle, spin: spinStyle }),
    [buttonStyle, spinStyle],
  );
  return <UnStyledButton {...props} jssStyle={jssStyle}></UnStyledButton>;
};

Button.displayName = 'ShineoutButton';

export default Button;
