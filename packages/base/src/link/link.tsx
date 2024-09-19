// import { } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { LinkProps, LinkClasses } from './link.type';
// import from icons
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
      target,
      children,
      ...restProps
     } = props

    const linkClasses = jssStyle?.link?.() || ({} as LinkClasses);

    const rootClass = classNames(className, linkClasses.wrapper, {
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

    return (
      <a
        href={disabled ? undefined : href}
        target={target}
        className={rootClass}
        {...restProps}
      >
        {typeof icon === 'boolean' && icon && <span className={linkClasses.icon}>{Icons.link.prefixIcon}</span>}
        {React.isValidElement(icon) && <span className={linkClasses.icon}>{icon}</span>}
        {children}
      </a>
    );
}

export default Link;
