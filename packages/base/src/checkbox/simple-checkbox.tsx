import { useCheck } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { SimpleCheckboxProps } from './checkbox.type';

const Checkbox = (props: SimpleCheckboxProps) => {
  const { jssStyle, className, style, children, renderFooter, size, ...rest } = props;
  const checkboxStyle = jssStyle?.checkbox?.();
  const { getRootProps, getIndicatorProps, getInputProps, disabled, checked } = useCheck({
    ...rest,
    checked: props.checked === 'indeterminate' ? false : props.checked,
    defaultChecked: props.defaultChecked === 'indeterminate' ? false : props.defaultChecked,
  });
  const rootClass = classNames(
    className,
    checkboxStyle?.wrapper,
    size === 'small' && checkboxStyle?.wrapperSmall,
    size === 'large' && checkboxStyle?.wrapperLarge,
    !!disabled && checkboxStyle?.wrapperDisabled,
    !!checked && checkboxStyle?.wrapperChecked,
    props.checked === 'indeterminate' && checkboxStyle?.wrapperIndeterminate,
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
      <span className={checkboxStyle?.indicatorWrapper}>
        <i {...getIndicatorProps()} className={checkboxStyle?.indicator}>
          {props.checked === 'indeterminate' ? (
            <svg viewBox='0 0 16 16' fill='currentColor'>
              <path d='M3 8C3 7.44772 3.44772 7 4 7H12C12.5523 7 13 7.44772 13 8V8C13 8.55228 12.5523 9 12 9H4C3.44772 9 3 8.55228 3 8V8Z' />
            </svg>
          ) : checked ? (
            <svg viewBox='0 0 16 16' fill='currentColor'>
              <path d='M2.2216 7.27815C2.61213 6.88763 3.24529 6.88763 3.63582 7.27815L7.17135 10.8137C7.56188 11.2042 7.56188 11.8374 7.17135 12.2279V12.2279C6.78083 12.6184 6.14766 12.6184 5.75714 12.2279L2.2216 8.69237C1.83108 8.30184 1.83108 7.66868 2.2216 7.27815V7.27815Z' />
              <path d='M14.2431 3.7426C14.6336 4.13312 14.6336 4.76629 14.2431 5.15681L7.17202 12.2279C6.7815 12.6184 6.14833 12.6184 5.75781 12.2279V12.2279C5.36728 11.8374 5.36728 11.2042 5.75781 10.8137L12.8289 3.7426C13.2194 3.35208 13.8526 3.35208 14.2431 3.7426V3.7426Z' />
            </svg>
          ) : null}
        </i>
      </span>
      <span className={checkboxStyle?.desc}>{children}</span>
      {typeof renderFooter === 'function' ? renderFooter(checked) : null}
    </div>
  );
};

export default Checkbox;
