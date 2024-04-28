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
  const { size, disabled } = useWithFormConfig(props);

  const getProps = (child: React.ReactElement) => {
    ref.current.propsMap.set(child, {
      onFocus: child.props.onFocus,
      onBlur: child.props.onBlur,
    });
    if (!ref.current.eventMap.get(child)) {
      ref.current.eventMap.set(child, {
        onFocus: (...args: any) => {
          setFocus(true);
          ref.current.propsMap.get(child)?.onFocus?.(args);
        },
        onBlur: (...args: any) => {
          setFocus(false);
          ref.current.propsMap.get(child)?.onBlur?.(args);
        },
      });
    }
    return ref.current.eventMap.get(child) || {};
  };

  const { children, className, width, style } = props;
  const rootClass = classNames(
    className,
    inputStyle?.group,
    size === 'small' && inputStyle?.groupSmall,
    size === 'large' && inputStyle?.groupLarge,
    !!disabled && inputStyle?.groupDisabled,
    !!focus && inputStyle?.groupFocus,
  );
  return (
    <div
      {...util.getDataAttribute({ role: 'input-group' })}
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
          });
        }
        return <span key={i}>{child}</span>;
      })}
    </div>
  );
};
