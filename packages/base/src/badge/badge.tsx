// import { } from '@sheinx/hooks';
import React from 'react';
import classNames from 'classnames';
import { BadgeProps, BadgeClasses } from './badge.type';

const Badge = (props: BadgeProps) => {
  const { jssStyle, children, className, count } = props;
  const badgeStyle = jssStyle?.badge?.() || ({} as BadgeClasses);

  const rootClass = classNames(badgeStyle.badge, className);

  return (
    <span className={rootClass}>
      {children}
      <sup className={badgeStyle.count}>{count}</sup>
    </span>
  );
};

export default Badge;
