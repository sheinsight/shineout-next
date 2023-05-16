import { useInput } from '@shined/hooks';
import classNames from 'classnames';
import * as React from 'react';
import { InputProps } from './input.type';
import Clear from '../icon/clear';

const Input = (props: InputProps) => {
  const { jssStyle, className, style, status, clearIcon, ...rest } = props;
  const { getRootProps, getClearProps, getInputProps, showClear, focused, disabled } = useInput({
    ...rest,
    control: 'value' in props,
  });
  const rootClass = classNames([
    jssStyle.wrapper,
    className,
    {
      [jssStyle.wrapperFocus]: focused,
      [jssStyle.wrapperDisabled]: disabled,
      [jssStyle.wrapperError]: status === 'error',
    },
  ]);
  const inputProps = getInputProps({ className: jssStyle.input });

  return (
    <div
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      <div className={jssStyle.inputWrapper}>
        <input type='text' {...inputProps} />
        {showClear ? (
          <Clear {...getClearProps({ className: jssStyle.clear })} icon={clearIcon} />
        ) : null}
      </div>
    </div>
  );
};

export default Input;
