import React, { useMemo } from 'react';
import { Spin as UnStyledSpin } from '@sheinx/base';
import { useSpinStyle } from '@sheinx/shineout-style';
import { SpinProps } from './spin.type';

export default (props: SpinProps) => {
  const spinStyle = useSpinStyle();
  const jssStyle = useMemo(() => ({ spin: spinStyle }), [spinStyle]);

  return <UnStyledSpin {...props} jssStyle={jssStyle} />;
};
