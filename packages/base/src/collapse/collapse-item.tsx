import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import type { CollapseItemProps } from './collapse-item.type';
import groupContext from './group-context';
import { useConfig } from '../config';
import { useCollapseItem } from '@sheinx/hooks';
import AnimationList from '..//animation-list';

const CollapseItem = (props: CollapseItemProps) => {
  const {
    active,
    triggerRegion,
    expandIcon: parentExpandIcon,
    onChange,
    expandIconPosition,
    extraPosition,
    border,
    animation: animationProp,
  } = useContext(groupContext);
  const {
    children,
    keygen,
    className,
    jssStyle,
    style,
    disabled,
    showExpandIcon = true,
    expandIcon,
    title,
    extra,
    contentStyle,
  } = props;

  const [animation, setAnimation] = useState(false);

  const config = useConfig();

  const { judgeExpanded, getItemContentProps, getHeaderIconProps, getTitleProps, getExtraProps } =
    useCollapseItem({
      active,
      keygen,
      triggerRegion,
      disabled,
      onChange,
    });
  const headerIconItem = () => {
    const collapseItemIconClassName = clsx(
      jssStyle?.collapseItem.icon,
      jssStyle?.collapseItem.activeTransform,
      // expandIconPosition === 'right'
      //   ? jssStyle?.collapseItem.activeTransformRight
      //   : jssStyle?.collapseItem.activeTransform,
    );
    const headerIcon = showExpandIcon
      ? expandIcon !== undefined
        ? expandIcon
        : parentExpandIcon
      : null;
    return (
      headerIcon && (
        <div dir={config.direction} {...getHeaderIconProps({ className: collapseItemIconClassName })} role="button">{headerIcon}</div>
      )
    );
  };

  const extraItem = () => {
    return (
      extra && <div {...getExtraProps({ className: jssStyle?.collapseItem.extra })}>{extra}</div>
    );
  };

  const collapseItemClassName = clsx(
    className,
    jssStyle?.collapseItem.wrapper,
    judgeExpanded && jssStyle?.collapseItem.active,
    (disabled || triggerRegion === 'disabled') && jssStyle?.collapseItem.disabled,
    !border && jssStyle?.collapseItem.borderLess,
  );
  const collapseItemHeaderClassName = clsx(
    jssStyle?.collapseItem.header,
    !showExpandIcon && jssStyle?.collapseItem.noIcon,
    triggerRegion !== 'icon' && jssStyle?.collapseItem.region,
  );

  const collapseItemContentClassName = clsx(
    jssStyle?.collapseItem.content,
    judgeExpanded && jssStyle?.collapseItem.expanded,
  );

  const renderContent = () => {
    return (
      <AnimationList
        show={judgeExpanded}
        type={'collapse'}
        animation={animation}
        duration='fast'
        className={collapseItemContentClassName}
      >
        <div className={jssStyle?.collapseItem.contentMain} style={contentStyle}>
          {children}
        </div>
      </AnimationList>
    );
  };

  useEffect(() => {
    if (animationProp) {
      setAnimation(true);
    }
  }, []);

  return (
    <div className={collapseItemClassName} style={style}>
      <div {...getItemContentProps({ className: collapseItemHeaderClassName })}>
        {expandIconPosition === 'left' && headerIconItem()}
        {extraPosition === 'left' && extraItem()}
        <div
          {...getTitleProps({
            className: clsx(
              jssStyle?.collapseItem.title,
              triggerRegion === 'header' && jssStyle?.collapseItem.region,
            ),
          })}
        >
          {title}
        </div>
        {extraPosition === 'right' && extraItem()}
        {expandIconPosition === 'right' && headerIconItem()}
      </div>
      {renderContent()}
    </div>
  );
};

export default CollapseItem;
