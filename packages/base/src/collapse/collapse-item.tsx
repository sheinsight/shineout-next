import React, { useContext } from 'react';
import classNames from 'classnames';
import type { CollapseItemProps } from './collapse-item.type';
import groupContext from './group-context';
import { useCollapseItem } from '@sheinx/hooks';
import AnimationList from '..//animation-list';

const CollapseItem = (props: CollapseItemProps) => {
  const { active, triggerRegion, expandIcon, onChange, expandContentPosition } =
    useContext(groupContext);
  const {
    children,
    name,
    className,
    jssStyle,
    style,
    disabled,
    showExpandIcon = true,
    expandContent,
    title,
    extra,
    contentStyle,
  } = props;

  const { judgeExpanded, getItemContentProps, getHeaderIconProps, getTitleProps, getExtraProps } =
    useCollapseItem({
      active,
      name,
      triggerRegion,
      disabled,
      onChange,
    });
  const headerIconItem = () => {
    const collapseItemIconClassName = classNames(
      jssStyle?.collapseItem.icon,
      expandContentPosition === 'right'
        ? jssStyle?.collapseItem.activeTransformRight
        : jssStyle?.collapseItem.activeTransform,
    );
    const headerIcon = showExpandIcon
      ? expandContent !== undefined
        ? expandContent
        : expandIcon
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
    disabled && jssStyle?.collapseItem.disabled,
  );
  const collapseItemHeaderClassName = classNames(
    jssStyle?.collapseItem.header,
    !showExpandIcon && jssStyle?.collapseItem.noIcon,
    expandContentPosition === 'right' && jssStyle?.collapseItem.rightIcon,
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
        {headerIconItem()}
        <div {...getTitleProps({ className: jssStyle?.collapseItem.title })}>{title}</div>
        {extraItem()}
      </div>
      {renderContent()}
    </div>
  );
};

export default CollapseItem;
