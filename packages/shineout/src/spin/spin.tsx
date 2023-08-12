import React, { useMemo } from 'react';
import { Spin } from '@sheinx/base';
import { useSpinStyle } from '@sheinx/shineout-style';
import { SpinProps } from './spin.type';

export default (props: SpinProps) => {
  const {} = props;
  const spinStyle = useSpinStyle();
  const jssStyle = useMemo(() => ({ spin: spinStyle }), [spinStyle]);

  return (
    <Spin
      jssStyle={jssStyle}
      // ...
    />
  );
};
