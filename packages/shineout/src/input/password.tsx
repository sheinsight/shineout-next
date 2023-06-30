import React from 'react';
import { InputPassword as UnStyleInputPassword } from '@sheinx/base';
import { useInputStyle, useInnerTitleStyle } from '@sheinx/shineout-style';

import { InputPasswordProps, BasePasswordProps } from './password.type';
import useFieldCommon from '../hooks/use-field-common';

const InputPassword = (props: BasePasswordProps) => (
  <UnStyleInputPassword
    {...props}
    jssStyle={useInputStyle()}
    innerTitleJssStyle={useInnerTitleStyle()}
  />
);
export default (props: InputPasswordProps) => {
  return useFieldCommon<BasePasswordProps, BasePasswordProps['value']>(props, InputPassword);
};
