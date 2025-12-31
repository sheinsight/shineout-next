import { util } from '@sheinx/hooks';
import React from 'react';
import clsx from 'clsx';
import { BadgeProps, BadgeClasses } from './badge.type';

const Badge = (props: BadgeProps) => {
  const {
    jssStyle,
    style,
    children,
    className,
    size,
    dot,
    count,
    overflowCount,
    status,
    showZero,
    color,
    text,
  } = props;
  const badgeStyle = jssStyle?.badge?.() || ({} as BadgeClasses);
  const isTextBadge = text !== undefined || (dot && children === undefined);
  const rootClass = clsx(className, badgeStyle.rootClass, badgeStyle.badge, isTextBadge && badgeStyle.textBadge);
  const isOverflowCount = overflowCount !== undefined && Number(count) > overflowCount;

  const renderCount = () => {
    if (isOverflowCount) {
      return `${overflowCount}+`;
    }
    return count;
  };

  const renderCustomCount = () => {
    return <span className={badgeStyle.custom}>{count}</span>;
  };

  const renderSup = () => {
    let countNode: React.ReactNode = null;
    let supClass: { [className: string]: boolean } = {};

    if (util.isNumber(count)) {
      if (count === 0 && !showZero) return null;
      countNode = renderCount();
      supClass[badgeStyle.number] = true;
      if (count.toString().length === 1 && !isOverflowCount) {
        supClass[badgeStyle.singleWord] = true;
      }
      if (count.toString().length > 1 || isOverflowCount) {
        supClass[badgeStyle.multipleWords] = true;
      }
    }

    if (util.isString(count)) {
      if (Number(count) === 0 && !showZero) return null;
      countNode = isNaN(Number(count)) ? renderCustomCount() : renderCount();
    }

    if (React.isValidElement(count)) {
      countNode = renderCustomCount();

      return (
        <sup style={{ ...style, background: color }} className={badgeStyle.custom}>
          {countNode}
        </sup>
      );
    }

    return (
      <sup
        style={{ ...style, background: color }}
        className={clsx(
          size === 'small' && badgeStyle.small,
          dot ? badgeStyle.dot : badgeStyle.count,
          supClass,
          status &&
            dot && {
              [badgeStyle[status]]: true,
            },
        )}
      >
        {dot !== true && countNode}
      </sup>
    );
  };

  const renderText = () => {
    return (
      <>
        <span
          className={clsx(
            badgeStyle.textDot,
            status && {
              [badgeStyle[status]]: true,
            },
          )}
        ></span>
        {text !== undefined && <span className={badgeStyle.text}>{text}</span>}
      </>
    );
  };

  return (
    <span className={rootClass}>
      {!isTextBadge && children}
      {!isTextBadge && renderSup()}
      {isTextBadge && renderText()}
    </span>
  );
};

export default Badge;
