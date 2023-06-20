import * as React from 'react';
import { InputGroup } from '@sheinx/base';
import { useInputStyle } from '@sheinx/shineout-style';
import { GroupProps } from './group.type';

export default (props: GroupProps) => {
  const jssStyle = useInputStyle();
  return <InputGroup {...props} jssStyle={jssStyle} />;
};
