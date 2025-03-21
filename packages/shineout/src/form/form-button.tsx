import React from 'react';
import { FormButton } from '@sheinx/base';
import { useButtonStyle, useSpinStyle } from '@sheinx/shineout-style';
import { ButtonProps } from '../button/button.type';

const jssStyle = {
  button: useButtonStyle,
  spin: useSpinStyle,
};

export const Button = (props: ButtonProps) => {
  return <FormButton {...props} htmlType='button' jssStyle={jssStyle} />;
};

export const Submit = (props: ButtonProps) => {
  return <FormButton {...props} htmlType='submit' jssStyle={jssStyle} />;
};

export const Reset = (props: ButtonProps) => {
  return <FormButton mode="outline" {...props} htmlType='reset' jssStyle={jssStyle} />;
};
