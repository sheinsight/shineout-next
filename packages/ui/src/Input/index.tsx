import { useInput } from '@shined/hooks';
import classNames from 'classnames';
import * as React from 'react';
import { InputProps } from './types';
import Clear from '../Icon/clear';

const Input = (props: InputProps) => {
  const { jssStyle, className, style, ...rest } = props;
  const { getRootProps, getClearProps, getInputProps, showClear, focused, disabled } =
    useInput(rest);
  const rootClass = classNames([
    jssStyle.wrapper,
    className,
    {
      [jssStyle.wrapperFocus]: focused,
      [jssStyle.wrapperDisabled]: disabled,
    },
  ]);
  const inputProps = getInputProps({ className: jssStyle.input });
  console.log('inputprops', JSON.stringify(inputProps));

  return (
    <div
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      <input type='text' {...inputProps} />
      {showClear ? <Clear {...getClearProps({ className: jssStyle.clear })} /> : null}
    </div>
  );
};

export default Input;
