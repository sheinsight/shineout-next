// @flow
import * as React from 'react';
import { Children, cloneElement, useRef } from 'react';
import classNames from 'classnames';
import { InputGroupProps } from './input-group.type';

export default (props: InputGroupProps) => {
  const [focus, setFocus] = React.useState(false);
  const { jssStyle } = props;
  const ref = useRef({
    eventMap: new WeakMap(),
    propsMap: new WeakMap(),
  });
  const getProps = (child: React.ReactElement) => {
    if (
      !['ShineoutInput', 'ShineoutInputNumber', 'ShineoutInputPassword'].includes(
        (child?.type as any)?.displayName,
      )
    )
      return {};
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
        inGroup: true,
      });
    }
    return ref.current.eventMap.get(child) || {};
  };

  const { children, className, style, size, disabled } = props;
  const rootClass = classNames({
    [jssStyle.group]: true,
    [jssStyle.groupSmall]: size === 'small',
    [jssStyle.groupLarge]: size === 'large',
    [jssStyle.groupDisabled]: !!disabled,
    [className!]: !!props.className,
    [jssStyle.groupFocus]: focus,
  });
  return (
    <div className={rootClass} style={style}>
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
