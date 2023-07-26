import { useCheck } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { SimpleCheckboxProps } from './checkbox.type';

const Checkbox = (props: SimpleCheckboxProps) => {
  const { jssStyle, className, style, children, renderFooter, ...rest } = props;
  const { getRootProps, getIndicatorProps, getInputProps, disabled, checked } = useCheck({
    ...rest,
    checked: props.checked === 'indeterminate' ? false : props.checked,
    defaultChecked: props.defaultChecked === 'indeterminate' ? false : props.defaultChecked,
  });
  const rootClass = classNames(
    className,
    jssStyle?.checkbox?.wrapper,
    !!disabled && jssStyle?.checkbox?.wrapperDisabled,
    !!checked && jssStyle?.checkbox?.wrapperChecked,
    props.checked === 'indeterminate' && jssStyle?.checkbox?.wrapperIndeterminate,
  );

  const inputProps = getInputProps();

  return (
    <div
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      <input {...inputProps} type='checkbox' />
      <div className={jssStyle?.checkbox?.indicatorWrapper}>
        <i {...getIndicatorProps()} className={jssStyle?.checkbox?.indicator} />
      </div>
      <span className={jssStyle?.checkbox?.desc}>{children}</span>
      {typeof renderFooter === 'function' ? renderFooter(checked) : null}
    </div>
  );
};

export default Checkbox;
