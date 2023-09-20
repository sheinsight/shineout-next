import React, { useContext } from 'react';
import classNames from 'classnames';
import type { CollapseItemProps } from './collapse-item.type';
import groupContext from './group-context';
import { usePersistFn } from '@sheinx/hooks';

const CollapseItem = (props: CollapseItemProps) => {
  // TODO: lazyload, destroyOnHide, expandContentPosition,
  const { active, triggerRegion, expandIcon, onChange } = useContext(groupContext);
  const {
    name,
    className,
    jssStyle,
    style,
    disabled,
    showExpandIcon,
    expandContent,
    title,
    extra,
  } = props;

  const judgeExpanded = usePersistFn(() => active.indexOf(name) > -1);

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

  const collapseItemClassName = classNames(className, jssStyle?.collapseItem.wrapper);
  const collapseItemHeaderClassName = classNames(
    jssStyle?.collapseItem.header,
    judgeExpanded() && jssStyle?.collapseItem.active,
  );
  return (
    <div className={collapseItemClassName} style={style}>
      <div
        data-soui-disabled={currentDisabled}
        tabIndex={currentDisabled ? -1 : 0}
        className={collapseItemHeaderClassName}
        onClick={(e) => handleClickByRegion(e, 2)}
      >
        {headerIcon && <div onClick={(e) => handleClickByRegion(e, 0)}>{headerIcon}</div>}
        <div onClick={(e) => handleClickByRegion(e, 1)}>{title}</div>
        {extra && <div onClick={(e) => e.stopPropagation()}>{extra}</div>}
      </div>
    </div>
  );
};

export default CollapseItem;
