import { util } from '@sheinx/hooks';
import React from 'react';
import classNames from 'classnames';
import { BadgeProps, BadgeClasses, BadgeSemanticKey } from './badge.type';
import { useConfig } from '../config';
import { useSemantic } from '../common';

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
    classNames: classNamesProp,
    styles: stylesProp,
  } = props;
  const badgeStyle = jssStyle?.badge?.() || ({} as BadgeClasses);

  // Semantic DOM
  const config = useConfig();
  const [semClass, semStyle] = useSemantic<BadgeSemanticKey>(
    classNamesProp,
    stylesProp,
    config.badge,
  );

  const isTextBadge = text !== undefined || (dot && children === undefined);
  const isStandalone = !children && !isTextBadge;
  const rootClass = classNames(className, badgeStyle.rootClass, badgeStyle.badge, isTextBadge && badgeStyle.textBadge, isStandalone && badgeStyle.standalone, semClass('root', []));
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
        <sup style={{ ...style, background: color, ...semStyle('badge') }} className={classNames(badgeStyle.custom, semClass('badge', []))}>
          {countNode}
        </sup>
      );
    }

    return (
      <sup
        style={{ ...style, background: color, ...semStyle('badge') }}
        className={classNames(
          size === 'small' && badgeStyle.small,
          dot ? badgeStyle.dot : badgeStyle.count,
          supClass,
          status &&
            dot && {
              [badgeStyle[status]]: true,
            },
          semClass('badge', []),
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
          className={classNames(
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
    <span className={rootClass} style={semStyle('root')}>
      {!isTextBadge && children}
      {!isTextBadge && renderSup()}
      {isTextBadge && renderText()}
    </span>
  );
};

export default Badge;
