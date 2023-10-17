import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import type { CollapseItemProps } from './collapse-item.type';
import groupContext from './group-context';
import { useCollapseItem } from '@sheinx/hooks';

const CollapseItem = (props: CollapseItemProps) => {
  const {
    active,
    triggerRegion,
    expandIcon,
    onChange,
    expandContentPosition,
    lazyload,
    destroyOnHide: destroyOnHideProps,
  } = useContext(groupContext);
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
    destroyOnHide = false,
  } = props;
  const [panelStyle, setPanelStyle] = useState<CSSProperties | undefined>();
  const panelRef = useRef<HTMLDivElement>(null);
  const panelHeight = useRef<number>(0);
  const keepAlive = useRef<boolean>(false);

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

  useEffect(() => {
    if (!panelRef.current) return;
    if (!judgeExpanded) {
      panelHeight.current = panelRef.current.clientHeight;
      setPanelStyle({ height: panelRef.current.clientHeight });
      setTimeout(() => {
        setPanelStyle({ height: 0, flex: 'none' });
      }, 10);
    } else {
      if (panelHeight.current === 0) return;
      setPanelStyle({ height: panelHeight.current });
      setTimeout(() => {
        setPanelStyle({ height: 'auto' });
      }, 200);
    }
  }, [judgeExpanded]);

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
    if (!keepAlive.current && !judgeExpanded && lazyload) return null;
    if ((destroyOnHideProps || destroyOnHide) && !judgeExpanded) return null;
    keepAlive.current = true;
    return (
      <div ref={panelRef} style={panelStyle} className={collapseItemContentClassName}>
        <div className={jssStyle?.collapseItem.contentMain} style={contentStyle}>
          {children}
        </div>
      </div>
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
