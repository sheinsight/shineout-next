import React, { useMemo } from 'react';
import { InputPassword as UnStyleInputPassword } from '@sheinx/base';
import { useInnerTitleStyle, useInputStyle } from '@sheinx/shineout-style';

import { BasePasswordProps, InputPasswordProps } from './password.type';
import useFieldCommon from '../hooks/use-field-common';

const InputPassword = (props: BasePasswordProps) => {
  const inputStyle = useInputStyle();
  const innerTitleStyle = useInnerTitleStyle();
  const jssStyle = useMemo(
    () => ({ input: inputStyle, innerTitle: innerTitleStyle }),
    [inputStyle],
  );
  return <UnStyleInputPassword {...props} jssStyle={jssStyle} />;
};
export default (props: InputPasswordProps) => {
  return useFieldCommon<BasePasswordProps, BasePasswordProps['value']>(props, InputPassword);
};
