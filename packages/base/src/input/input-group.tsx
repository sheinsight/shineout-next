// @flow
import * as React from 'react';
import { Children, cloneElement, useRef } from 'react';
import classNames from 'classnames';
import { InputGroupProps } from './input-group.type';
import useWithFormConfig from '../common/use-with-form-config';

export default (props: InputGroupProps) => {
  const [focus, setFocus] = React.useState(false);
  const { jssStyle } = props;
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
    jssStyle?.input?.group,
    size === 'small' && jssStyle?.input?.groupSmall,
    size === 'large' && jssStyle?.input?.groupLarge,
    !!disabled && jssStyle?.input?.groupDisabled,
    !!focus && jssStyle?.input?.groupFocus,
  );
  return (
    <div className={rootClass} style={{ width, ...style }} data-soui-type={'input-group'}>
      {Children.toArray(children).map((child, i) => {
        if (typeof child === 'string') {
          return <span key={i}>{child}</span>;
        }
        if (React.isValidElement(child)) {
          return cloneElement(child, { ...getProps(child), disabled });
        }
        return <span key={i}>{child}</span>;
      })}
    </div>
  );
};
