import React from 'react';
import { InputPassword as UnStyleInputPassword } from '@sheinx/base';
import { useInnerTitleStyle, useInputStyle } from '@sheinx/shineout-style';

import { BasePasswordProps, InputPasswordProps } from './password.type';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  input: useInputStyle,
  innerTitle: useInnerTitleStyle,
};
const InputPassword = (props: BasePasswordProps) => {
  return <UnStyleInputPassword {...props} jssStyle={jssStyle} />;
};

InputPassword.displayName = 'ShineoutInputPassword';

export default (props: InputPasswordProps) => {
  return useFieldCommon(props, InputPassword);
};
