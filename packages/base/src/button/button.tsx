import { useButton } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { ButtonProps } from './button.type';

const Button = (props: ButtonProps) => {
  const {
    jssStyle,
    className,
    style,
    children,
    loading,
    href,
    text,
    dash,
    outline,
    shape,
    size,
    type,
    space,
    target,
    renderInnerWrapper,
    renderLoading,
    ...rest
  } = props;

  const { getButtonProps, getSpaceChildren, getAnchorProps, disabled } = useButton({
    ...rest,
  });

  const rootClass = classNames([
    className,
    jssStyle[type || 'default'],
    jssStyle.button,
    {
      [jssStyle.disabled]: disabled,
      [jssStyle.loading]: loading,
      [jssStyle.href]: href,
      [jssStyle.text]: text,
      [jssStyle.dash]: dash,
      [jssStyle.outline]: outline,
      [jssStyle.round]: shape === 'round',
      [jssStyle.circle]: shape === 'circle',
      [jssStyle.square]: shape === 'square',
      [jssStyle.small]: size === 'small',
      [jssStyle.large]: size === 'large',
    },
  ]);

  const rootProps = getButtonProps();
  const { type: buttonType, ...buttonProps } = rootProps;
  console.log(buttonType);
  const childrenEl = getSpaceChildren(children, space);

  let buttonInnerEl: React.ReactNode = <span>{childrenEl}</span>;

  if (typeof renderInnerWrapper === 'function') {
    buttonInnerEl = renderInnerWrapper(childrenEl);
  }

  let loadingEl: React.ReactNode = <span>Spin</span>;

  if (renderLoading) {
    // Spin 组件，待实现后替换
    loadingEl = renderLoading(loadingEl);
  }

  if (href) {
    return (
      <a {...getAnchorProps({ className: rootClass, style })} href={href} target={target}>
        {loading && loadingEl}
        {buttonInnerEl}
      </a>
    );
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button {...buttonProps} className={rootClass} style={style}>
      {loading && loadingEl}
      {buttonInnerEl}
    </button>
  );
};

export default Button;
