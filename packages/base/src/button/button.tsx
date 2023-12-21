import { useButton } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { ButtonClasses, ButtonProps } from './button.type';
import ButtonGroup from './button-group';
import Spin from '../spin';

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
    type: typeProp = 'default',
    space,
    target,
    mode: modeProp,
    htmlType: htmlTypeProp = 'button',
    renderInnerWrapper,
    renderLoading,
    ...rest
  } = props;
  const { getButtonProps, getSpaceChildren, getAnchorProps, disabled } = useButton({
    loading,
    htmlType: htmlTypeProp,
    ...rest,
  });
  const buttonStyle = jssStyle?.button?.() || ({} as ButtonClasses);

  const getType = () => {
    if (typeProp === 'default') return 'secondary';
    return typeProp;
  };

  const getMode = () => {
    if (typeProp === 'default' && modeProp === undefined) return 'outline';
    return modeProp;
  };

  const mode = getMode();
  const type = getType();
  const modeSetted = mode || (text ? 'text' : outline ? 'outline' : undefined);

  const rootClass = classNames(
    className,
    buttonStyle[type || 'default'],
    buttonStyle.button,
    !!disabled && buttonStyle.disabled,
    !!loading && buttonStyle.loading,
    !!href && buttonStyle.href,
    modeSetted === 'text' && buttonStyle.text,
    modeSetted === 'dashed' && buttonStyle.dashed,
    modeSetted === 'outline' && buttonStyle.outline,
    shape === 'round' && buttonStyle.round,
    shape === 'circle' && buttonStyle.circle,
    shape === 'square' && buttonStyle.square,
    size === 'small' && buttonStyle.small,
    size === 'large' && buttonStyle.large,
  );
  const rootProps = getButtonProps();

  const { htmlType, onRef, ...buttonProps } = rootProps;

  const getSpinSize = () => {
    if (size === 'small') {
      return 10;
    }
    if (size === 'large') {
      return 14;
    }
    return 12;
  };

  const childrenEl = getSpaceChildren(children, space);

  let buttonInnerEl: React.ReactNode = childrenEl;

  if (typeof renderInnerWrapper === 'function') {
    buttonInnerEl = renderInnerWrapper(childrenEl);
  }

  let loadingEl: React.ReactNode = (
    <span className={buttonStyle.spin}>
      <Spin name='ring' size={getSpinSize()} jssStyle={jssStyle}></Spin>
    </span>
  );

  if (renderLoading) {
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
    <button {...buttonProps} type={htmlType} ref={onRef as any} className={rootClass} style={style}>
      {loading && loadingEl}
      {buttonInnerEl}
    </button>
  );
};

Button.Group = ButtonGroup;

export default Button;
