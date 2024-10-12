import React from 'react';
import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { useConfig } from '../config';
import { BaseSpinProps } from './spin.type';

const { range } = util;

const Spin = (props: BaseSpinProps) => {
  const { count = 0, render, size: sizeProps, className, jssStyle } = props;
  const styles = jssStyle?.spin?.();
  const config = useConfig();

  const getSpinSize = () => {
    const { spin } = config;
    if (!spin || typeof spin !== 'object') return;
    const { size } = spin;
    return size;
  };

  const size = sizeProps ?? getSpinSize() ?? 40;

  const style = Object.assign(
    {
      width: size,
      height: size,
    },
    props.style,
  );

  const classname = classNames(className, styles?.spin);

  if (count < 1 || !render) {
    return <div style={style} className={classname} />;
  }

  return (
    <div style={style} className={classname}>
      {range(count + 1, 1).map((i) => render({ ...props, index: i }))}
    </div>
  );
};

export default Spin;
