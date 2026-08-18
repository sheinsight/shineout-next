import classNames from 'classnames';
import React from 'react';
import { LinkProps, LinkClasses, LinkClassNamesInfo, LinkSemanticKey } from './link.type';
import Icons from '../icons';
import { useSemantic } from '../common';
import { useConfig } from '../config';


const Link = (props: LinkProps) => {
    const {
      jssStyle,
      className,
      style,
      type = 'primary',
      underline,
      disabled,
      size,
      icon,
      href,

      children,
      classNames: classNamesProp,
      styles: stylesProp,
      ...restProps
     } = props

    const config = useConfig();
    const linkClasses = jssStyle?.link?.() || ({} as LinkClasses);

    // Semantic DOM
    const globalSemanticConfig = config.link
      ? { classNames: config.link.classNames, styles: config.link.styles }
      : undefined;

    const semInfo: LinkClassNamesInfo = { disabled: !!disabled };

    const [semClass, semStyle] = useSemantic<LinkSemanticKey, LinkClassNamesInfo>(
      classNamesProp,
      stylesProp,
      globalSemanticConfig,
      semInfo,
    );

    const rootClass = classNames(className, linkClasses.rootClass, linkClasses.wrapper, {
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
    }, semClass('root'));

    const rootStyle = semStyle('root') ? { ...style, ...semStyle('root') } : style;

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
        style={rootStyle}
        aria-disabled={disabled}
        {...restProps}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {typeof icon === 'boolean' && icon && <span className={classNames(linkClasses.icon, semClass('icon'))} style={semStyle('icon')}>{Icons.link.prefixIcon}</span>}
        {React.isValidElement(icon) && <span className={classNames(linkClasses.icon, semClass('icon'))} style={semStyle('icon')}>{icon}</span>}
        {children}
      </a>
    );
}

export default Link;
