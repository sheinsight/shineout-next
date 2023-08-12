import React from 'react';
import { util } from '@sheinx/hooks';
import { BaseSpinProps } from './spin.type';

const { range } = util;

const Spin = (props: BaseSpinProps) => {
  const { count = 0, render, size, className } = props;
  const style = Object.assign(
    {
      width: size,
      height: size,
    },
    props.style,
  );

  if (count < 1 || !render) {
    return <div style={style} className={className} />;
  }

  return (
    <div style={style} className={className}>
      {range(count + 1, 1).map((i) => render({ ...props, index: i }))}
    </div>
  );
};

export default Spin;
