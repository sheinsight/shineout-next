import { useInput } from '@shined/hooks';
import classNames from 'classnames';
import * as React from 'react';
import { InputProps } from './types';
import Clear from '../Icon/clear';

const Input = (props: InputProps) => {
  const { jssStyle = {} } = props;
  const { getRootProps, getClearProps, getInputProps, showClear, focused } = useInput(props);

  return (
    <div
      {...getRootProps()}
      className={classNames([jssStyle.wrapper, { [jssStyle.wrapperFocus]: focused }])}
    >
      <input type='text' {...getInputProps()} className={jssStyle.input} />
      {showClear ? <Clear {...getClearProps()} className={jssStyle.clear} /> : null}
    </div>
  );
};

export default Input;
