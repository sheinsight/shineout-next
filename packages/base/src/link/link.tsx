import clsx from 'clsx';
import React from 'react';
import { LinkProps, LinkClasses } from './link.type';
import Icons from '../icons';


const Link = (props: LinkProps) => {
    const {
      jssStyle,
      className,
      type = 'primary',
      underline,
      disabled,
      size,
      icon,
      href,

      children,
      ...restProps
     } = props

    const linkClasses = jssStyle?.link?.() || ({} as LinkClasses);

    const rootClass = clsx(className, linkClasses.rootClass, linkClasses.wrapper, {
      [linkClasses.underline]: underline === true,
      [linkClasses.underlineHover]: underline === 'hover',
      [linkClasses.disabled]: disabled,

      [linkClasses.sizeSmall]: size === 'small',
      [linkClasses.sizeLarge]: size === 'large',

      [linkClasses.primary]: type === 'primary',
      [linkClasses.secondary]: type === 'secondary',
      [linkClasses.danger]: type === 'danger',
      [linkClasses.warning]: type === 'warning',
      [linkClasses.success]: type === 'success',
    });

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        props.onClick?.(e);
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === 'Enter' && !disabled) {
        props.onClick?.(e as any);
      } else if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        props.onKeyDown?.(e);
      }
    }

    return (
      <a
        href={disabled ? undefined : href}
        className={rootClass}
        aria-disabled={disabled}
        {...restProps}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {typeof icon === 'boolean' && icon && <span className={linkClasses.icon}>{Icons.link.prefixIcon}</span>}
        {React.isValidElement(icon) && <span className={linkClasses.icon}>{icon}</span>}
        {children}
      </a>
    );
}

export default Link;
