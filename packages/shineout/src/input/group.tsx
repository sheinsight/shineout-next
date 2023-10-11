import * as React from 'react';
import { InputGroup } from '@sheinx/base';
import { useInnerTitleStyle, useInputStyle } from '@sheinx/shineout-style';
import { GroupProps } from './group.type';

const jssStyle = {
  input: useInputStyle,
  innerTitle: useInnerTitleStyle,
};
export default (props: GroupProps) => {
  return <InputGroup {...props} jssStyle={jssStyle} />;
};
