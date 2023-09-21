import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import type { CollapseItemProps } from './collapse-item.type';
import groupContext from './group-context';
import { usePersistFn } from '@sheinx/hooks';

const CollapseItem = (props: CollapseItemProps) => {
  // TODO: lazyload, destroyOnHide, expandContentPosition,
  const { active, triggerRegion, expandIcon, onChange } = useContext(groupContext);
  const {
    children,
    name,
    className,
    jssStyle,
    style,
    disabled,
    showExpandIcon,
    expandContent,
    title,
    extra,
    contentStyle,
  } = props;
  const [panelStyle, setPanelStyle] = useState<CSSProperties | undefined>();
  const panelRef = useRef<HTMLDivElement>(null);
  const panelHeight = useRef<number>(0);

  const judgeExpanded = active.indexOf(name) > -1;

  const headerIcon = showExpandIcon
    ? expandContent !== undefined
      ? expandContent
      : expandIcon
    : null;

  const currentDisabled = triggerRegion === 'disabled' || disabled;

  const handleClickByRegion = usePersistFn((e, regionKey: 0 | 1 | 2) => {
    if (currentDisabled) return;
    const triggerKey = triggerRegion === 'icon' ? 0 : triggerRegion === 'header' ? 1 : 2;
    if (regionKey === triggerKey || (triggerRegion === 'header' && [0, 1].includes(regionKey)))
      onChange(name, e);
  });

  useEffect(() => {
    if (!panelRef.current) return;
    if (judgeExpanded) {
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

  const collapseItemClassName = classNames(className, jssStyle?.collapseItem.wrapper);
  const collapseItemHeaderClassName = classNames(
    jssStyle?.collapseItem.header,
    judgeExpanded && jssStyle?.collapseItem.active,
  );
  const collapseItemIconClassName = classNames(jssStyle?.collapseItem.icon);
  const collapseItemContentClassName = classNames(jssStyle?.collapseItem.content);

  const renderContent = () => (
    <div ref={panelRef} style={panelStyle} className={collapseItemContentClassName}>
      <div style={contentStyle}>{children}</div>
    </div>
  );

  return (
    <div className={collapseItemClassName} style={style}>
      <div
        data-soui-disabled={currentDisabled}
        tabIndex={currentDisabled ? -1 : 0}
        className={collapseItemHeaderClassName}
        onClick={(e) => handleClickByRegion(e, 2)}
      >
        {headerIcon && (
          <div className={collapseItemIconClassName} onClick={(e) => handleClickByRegion(e, 0)}>
            {headerIcon}
          </div>
        )}
        <div className={jssStyle?.collapseItem.title} onClick={(e) => handleClickByRegion(e, 1)}>
          {title}
        </div>
        {extra && (
          <div className={jssStyle?.collapseItem.extra} onClick={(e) => e.stopPropagation()}>
            {extra}
          </div>
        )}
      </div>
      {renderContent()}
    </div>
  );
};

export default CollapseItem;
