import { useCheck } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { SimpleCheckboxProps } from './checkbox.type';

const Checkbox = (props: SimpleCheckboxProps) => {
  const { jssStyle, className, style, children, renderFooter, size, ...rest } = props;
  const { getRootProps, getIndicatorProps, getInputProps, disabled, checked } = useCheck({
    ...rest,
    checked: props.checked === 'indeterminate' ? false : props.checked,
    defaultChecked: props.defaultChecked === 'indeterminate' ? false : props.defaultChecked,
  });
  const rootClass = classNames(
    className,
    jssStyle?.checkbox?.wrapper,
    size === 'small' && jssStyle?.checkbox?.wrapperSmall,
    size === 'large' && jssStyle?.checkbox?.wrapperLarge,
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
      <span className={jssStyle?.checkbox?.indicatorWrapper}>
        <i {...getIndicatorProps()} className={jssStyle?.checkbox?.indicator}>
          {props.checked === 'indeterminate' ? (
            <svg width='75%' viewBox='0 0 10 2' fill='currentColor'>
              <path d='M0 1C0 0.447715 0.447715 0 1 0H9C9.55228 0 10 0.447715 10 1V1C10 1.55228 9.55228 2 9 2H1C0.447716 2 0 1.55228 0 1V1Z' />
            </svg>
          ) : checked ? (
            <svg width='75%' viewBox='0 0 15 10' fill='currentColor'>
              <path d='M4.98925 9.65599C5.41882 10.0856 6.1153 10.0856 6.54488 9.65599L14.3231 1.87782C14.7526 1.44824 14.7526 0.751759 14.3231 0.322183C13.8935 -0.107394 13.197 -0.107394 12.7674 0.322182L5.76708 7.32252L1.87782 3.43326C1.44824 3.00368 0.751759 3.00368 0.322182 3.43326C-0.107394 3.86284 -0.107394 4.55932 0.322183 4.9889L4.98422 9.65093C4.98589 9.65262 4.98757 9.65431 4.98925 9.65599Z' />
            </svg>
          ) : null}
        </i>
      </span>
      <span className={jssStyle?.checkbox?.desc}>{children}</span>
      {typeof renderFooter === 'function' ? renderFooter(checked) : null}
    </div>
  );
};

export default Checkbox;
