import React from 'react';
import { Rate } from '@sheinx/base';
import { useRateStyle } from '@sheinx/shineout-style';
import { ArgProps, RateProps } from './rate.type';

const jssStyle = {
  rate: useRateStyle,
};

type InnerProps = Omit<RateProps, keyof ArgProps>;
export default (
  background: ArgProps['background'],
  front: ArgProps['front'],
  opts?: InnerProps,
) => {
  return (props: RateProps) => (
    <Rate
      jssStyle={jssStyle}
      {...props}
      {...opts}
      background={background}
      front={front || background}
    />
  );
};
