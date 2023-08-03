import * as React from 'react';
import { useMemo } from 'react';
import { InputGroup } from '@sheinx/base';
import { useInnerTitleStyle, useInputStyle } from '@sheinx/shineout-style';
import { GroupProps } from './group.type';

export default (props: GroupProps) => {
  const inputStyle = useInputStyle();
  const innerTitleStyle = useInnerTitleStyle();
  const jssStyle = useMemo(
    () => ({ input: inputStyle, innerTitle: innerTitleStyle }),
    [inputStyle],
  );
  return <InputGroup {...props} jssStyle={jssStyle} />;
};
