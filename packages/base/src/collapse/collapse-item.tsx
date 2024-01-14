import React, { useContext } from 'react';
import classNames from 'classnames';
import type { CollapseItemProps } from './collapse-item.type';
import groupContext from './group-context';
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

  const { judgeExpanded, getItemContentProps, getHeaderIconProps, getTitleProps, getExtraProps } =
    useCollapseItem({
      active,
      keygen,
      triggerRegion,
      disabled,
      onChange,
    });
  const headerIconItem = () => {
    const collapseItemIconClassName = classNames(
      jssStyle?.collapseItem.icon,
      expandIconPosition === 'right'
        ? jssStyle?.collapseItem.activeTransformRight
        : jssStyle?.collapseItem.activeTransform,
    );
    const headerIcon = showExpandIcon
      ? expandIcon !== undefined
        ? expandIcon
        : parentExpandIcon
      : null;
    return (
      headerIcon && (
        <div {...getHeaderIconProps({ className: collapseItemIconClassName })}>{headerIcon}</div>
      )
    );
  };

  const extraItem = () => {
    return (
      extra && <div {...getExtraProps({ className: jssStyle?.collapseItem.extra })}>{extra}</div>
    );
  };

  const collapseItemClassName = classNames(
    className,
    jssStyle?.collapseItem.wrapper,
    judgeExpanded && jssStyle?.collapseItem.active,
    (disabled || triggerRegion === 'disabled') && jssStyle?.collapseItem.disabled,
    !border && jssStyle?.collapseItem.borderLess,
  );
  const collapseItemHeaderClassName = classNames(
    jssStyle?.collapseItem.header,
    !showExpandIcon && jssStyle?.collapseItem.noIcon,
    triggerRegion === 'header' && jssStyle?.collapseItem.region,
  );

  const collapseItemContentClassName = classNames(
    jssStyle?.collapseItem.content,
    judgeExpanded && jssStyle?.collapseItem.expanded,
  );

  const renderContent = () => {
    return (
      <AnimationList
        show={judgeExpanded}
        type={'collapse'}
        duration='fast'
        className={collapseItemContentClassName}
      >
        <div className={jssStyle?.collapseItem.contentMain} style={contentStyle}>
          {children}
        </div>
      </AnimationList>
    );
  };

  return (
    <div className={collapseItemClassName} style={style}>
      <div {...getItemContentProps({ className: collapseItemHeaderClassName })}>
        {expandIconPosition === 'left' && headerIconItem()}
        {extraPosition === 'left' && extraItem()}
        <div {...getTitleProps({ className: jssStyle?.collapseItem.title })}>{title}</div>
        {extraPosition === 'right' && extraItem()}
        {expandIconPosition === 'right' && headerIconItem()}
      </div>
      {renderContent()}
    </div>
  );
};

export default CollapseItem;
