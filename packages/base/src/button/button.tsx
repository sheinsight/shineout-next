import { useButton } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { ButtonProps } from './button.type';

const Button = (props: ButtonProps) => {
  const { jssStyle, className, style, children, renderInnerWrapper, renderLoading, ...rest } =
    props;

  const {
    getRootProps,
    getButtonProps,
    getSpaceChildren,
    disabled,
    text,
    space,
    href,
    target,
    loading,
    size,
    type,
    htmlType,
  } = useButton({
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
      [jssStyle.small]: size === 'small',
      [jssStyle.large]: size === 'large',
    },
  ]);

  const buttonProps = getButtonProps();

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
      <a
        {...getRootProps({ className: rootClass, style })}
        {...buttonProps}
        href={href}
        target={target}
      >
        {loading && loadingEl}
        {buttonInnerEl}
      </a>
    );
  }

  return (
    <button
      {...getRootProps({ className: rootClass, style })}
      {...buttonProps}
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
    >
      {loading && loadingEl}
      {buttonInnerEl}
    </button>
  );
};

export default Button;
