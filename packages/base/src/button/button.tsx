import { useButton } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { ButtonProps } from './button.type';
import ButtonGroup from './button-group';

const Button = (props: ButtonProps) => {
  const {
    jssStyle,
    className,
    style,
    children,
    loading,
    href,
    text,
    outline,
    shape,
    size,
    type,
    space,
    target,
    mode,
    renderInnerWrapper,
    renderLoading,
    ...rest
  } = props;

  const { getButtonProps, getSpaceChildren, getAnchorProps, disabled } = useButton({
    ...rest,
  });

  const modeSetted = mode || (text ? 'text' : outline ? 'outline' : undefined);

  const rootClass = classNames([
    className,
    jssStyle[type || 'default'],
    jssStyle.button,
    {
      [jssStyle.disabled]: disabled,
      [jssStyle.loading]: loading,
      [jssStyle.href]: href,
      [jssStyle.text]: modeSetted === 'text',
      [jssStyle.dashed]: modeSetted === 'dashed',
      [jssStyle.outline]: modeSetted === 'outline',
      [jssStyle.round]: shape === 'round',
      [jssStyle.circle]: shape === 'circle',
      [jssStyle.square]: shape === 'square',
      [jssStyle.small]: size === 'small',
      [jssStyle.large]: size === 'large',
    },
  ]);

  const rootProps = getButtonProps();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type: buttonType, onRef, ...buttonProps } = rootProps;

  const childrenEl = getSpaceChildren(children, space);

  let buttonInnerEl: React.ReactNode = childrenEl;

  if (typeof renderInnerWrapper === 'function') {
    buttonInnerEl = renderInnerWrapper(childrenEl);
  }

  let loadingEl: React.ReactNode = <span>Spin</span>;

  if (renderLoading) {
    // Spin 组件，待实现后替换
    loadingEl = renderLoading(loadingEl);
  }

  if (href && !disabled) {
    return (
      <a
        {...getAnchorProps({ className: rootClass, style })}
        href={href}
        target={target}
        ref={onRef as React.Ref<HTMLAnchorElement>}
      >
        {loading && loadingEl}
        {buttonInnerEl}
      </a>
    );
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button {...buttonProps} ref={onRef} className={rootClass} style={style}>
      {loading && loadingEl}
      {buttonInnerEl}
    </button>
  );
};

Button.Group = ButtonGroup;

export default Button;
