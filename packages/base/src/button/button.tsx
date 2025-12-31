import { useButton } from '@sheinx/hooks';
import clsx from 'clsx';
import React, { isValidElement } from 'react';
import { useConfig } from '../config';
import { ButtonClasses, ButtonProps } from './button.type';
import ButtonGroup from './button-group';
import Spin from '../spin';
import { util } from '@sheinx/hooks';

const { devUseWarning } = util;

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
    // renderInnerWrapper,
    renderLoading,
    ...rest
  } = props;

  if (outline) {
    devUseWarning.deprecated('outline', 'mode="outline"', 'Button');
  }
  if (text) {
    devUseWarning.deprecated('text', 'mode="text"', 'Button');
  }

  const config = useConfig();
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
    if (typeProp === 'default' && modeProp === undefined && outline) return 'outline';
    if (typeProp === 'default' && modeProp === undefined && text) return 'text';
    return modeProp;
  };

  const mode = getMode();
  const type = getType();
  const modeSetted = mode || (text ? 'text' : outline ? 'outline' : undefined);

  const rootClass = clsx(
    className,
    buttonStyle?.rootClass,
    buttonStyle[type || 'default'],
    buttonStyle.button,
    !!disabled && buttonStyle.disabled,
    !!loading && buttonStyle.loading,
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

  const childrenEl = React.Children.map(getSpaceChildren(children, space), (item, index) => {
    // 仅隐藏前置的icon
    if (loading && index ===0 && isValidElement(item) && (item.type as any).isShineoutIcon) return null;
    return item;
  })?.filter(item => item !== null);

  let buttonInnerEl: React.ReactNode = childrenEl;

  // if (typeof renderInnerWrapper === 'function') {
  //   buttonInnerEl = renderInnerWrapper(childrenEl);
  // }

  let loadingEl: React.ReactNode = (
    <div className={buttonStyle.spin}>
      <Spin size={getSpinSize()} jssStyle={jssStyle} name='ring' ignoreConfig></Spin>
    </div>
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
    <button dir={config.direction} {...buttonProps} type={htmlType} ref={onRef as any} className={rootClass} style={style}>
      {loading && loadingEl}
      {buttonInnerEl}
    </button>
  );
};

Button.Group = ButtonGroup;

export default Button;
