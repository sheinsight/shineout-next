// @flow
import * as React from 'react';
import { Children, cloneElement, useRef } from 'react';
import classNames from 'classnames';
import { InputGroupProps } from './input-group.type';
import useWithFormConfig from '../common/use-with-form-config';
import { util } from '@sheinx/hooks';
import { useConfig } from '../config';

export default (props: InputGroupProps) => {
  const [focus, setFocus] = React.useState(false);
  const config = useConfig();
  const { jssStyle } = props;
  const inputStyle = jssStyle?.input?.();
  const ref = useRef({
    eventMap: new WeakMap(),
    propsMap: new WeakMap(),
  });
  const { size, disabled, status, error, onBlur } = useWithFormConfig(props);

  const getProps = (child: React.ReactElement) => {
    const onChildBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const childBlurEvent = child.props.onBlur;
      if (childBlurEvent) {
        childBlurEvent(e);
      }
      onBlur?.(e);
    };

    ref.current.propsMap.set(child, {
      onFocus: child.props.onFocus,
      onBlur: onChildBlur,
    });
    if (!ref.current.eventMap.get(child)) {
      ref.current.eventMap.set(child, {
        onFocus: (...args: any) => {
          setFocus(true);
          ref.current.propsMap.get(child)?.onFocus?.(...args);
        },
        onBlur: (...args: any) => {
          setFocus(false);
          ref.current.propsMap.get(child)?.onBlur?.(...args);
        },
      });
    }
    return ref.current.eventMap.get(child) || {};
  };

  const { children, className, width, style, seperate, separate } = props;
  const shouldSeparate = separate ?? seperate;
  const rootClass = classNames(
    className,
    inputStyle?.group,
    shouldSeparate && inputStyle?.groupSeparate,
    size === 'small' && inputStyle?.groupSmall,
    size === 'large' && inputStyle?.groupLarge,
    !!disabled && inputStyle?.groupDisabled,
    !!focus && inputStyle?.groupFocus,
    (status === 'error' || error) && inputStyle?.groupError,
  );
  return (
    <div
      {...util.getDataAttribute({ role: shouldSeparate ? 'input-group-separate' : 'input-group' })}
      className={rootClass}
      style={{ width, ...style }}
      dir={config?.direction}
    >
      {Children.toArray(children).map((child, i) => {
        if (typeof child === 'string') {
          return <span key={i}>{child}</span>;
        }
        if (React.isValidElement(child)) {
          return cloneElement(child, {
            ...getProps(child),
            disabled: child.props.disabled || disabled,
            size: child.props.size || size,
          });
        }
        return <span key={i}>{child}</span>;
      })}
    </div>
  );
};
