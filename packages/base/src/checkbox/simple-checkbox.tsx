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
  const rootClass = classNames([
    jssStyle.wrapper,
    className,
    {
      [jssStyle.wrapperDisabled]: disabled,
      [jssStyle.wrapperChecked]: checked,
      [jssStyle.wrapperIndeterminate]: props.checked === 'indeterminate',
    },
  ]);

  const inputProps = getInputProps();

  return (
    <div
      {...getRootProps({
        className: rootClass,
        style,
      })}
    >
      <input {...inputProps} type='checkbox' />
      <div className={jssStyle.indicatorWrapper}>
        <i {...getIndicatorProps()} className={jssStyle.indicator} />
      </div>
      <span className={jssStyle.desc}>{children}</span>
      {typeof renderFooter === 'function' ? renderFooter(checked) : null}
    </div>
  );
};

export default Checkbox;
